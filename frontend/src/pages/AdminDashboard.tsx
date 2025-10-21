import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Mail, Users, FileText, Plus, Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

interface Article {
  id: string;
  title: string;
  created_at: string;
  author: {
    displayName: string;
  };
}

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        fetchArticles();
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchArticles = async () => {
    setLoadingArticles(true);
    try {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const articlesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Article[];
      setArticles(articlesData.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ));
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast({
        title: "Error",
        description: "Failed to load articles.",
        variant: "destructive",
      });
    } finally {
      setLoadingArticles(false);
    }
  };

  const handleDeleteArticle = async (articleId: string) => {
    if (!confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      return;
    }

    setDeletingId(articleId);
    try {
      await deleteDoc(doc(db, "articles", articleId));
      setArticles(articles.filter(article => article.id !== articleId));
      toast({
        title: "Success!",
        description: "Article deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting article:", error);
      toast({
        title: "Error",
        description: "Failed to delete article.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const downloadCSV = async (type: "contacts" | "subscriptions") => {
    setDownloading(type);
    try {
      // Get the Firebase project ID from your config
      const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
      const region = "us-central1"; // Update this if your functions are in a different region
      
      // Construct the Cloud Function URL
      const functionName = type === "contacts" ? "generateContactsCSV" : "generateSubscriptionsCSV";
      const url = `https://${region}-${projectId}.cloudfunctions.net/${functionName}`;

      // Get the user's ID token for authentication
      const idToken = await auth.currentUser?.getIdToken();

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Create a blob from the response
      const blob = await response.blob();
      
      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element and trigger download
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${type}-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);

      toast({
        title: "Success!",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} CSV downloaded successfully.`,
      });
    } catch (error: any) {
      console.error(`Error downloading ${type}:`, error);
      toast({
        title: "Error",
        description: `Failed to download ${type}. ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.email}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Contacts Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-accent" />
                  Contact Submissions
                </CardTitle>
                <CardDescription>
                  Download all contact form submissions as CSV
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => downloadCSV("contacts")}
                  disabled={downloading === "contacts"}
                  className="w-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {downloading === "contacts" ? "Downloading..." : "Download Contacts CSV"}
                </Button>
              </CardContent>
            </Card>

            {/* Subscriptions Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Newsletter Subscriptions
                </CardTitle>
                <CardDescription>
                  Download all newsletter subscribers as CSV
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => downloadCSV("subscriptions")}
                  disabled={downloading === "subscriptions"}
                  className="w-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {downloading === "subscriptions" ? "Downloading..." : "Download Subscriptions CSV"}
                </Button>
              </CardContent>
            </Card>

            {/* Updates Management Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  Updates Management
                </CardTitle>
                <CardDescription>
                  Create and manage updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => navigate("/articles/new")}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Update
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Updates List Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Published Updates</CardTitle>
              <CardDescription>
                Manage your published updates - edit or delete as needed
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loadingArticles ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-muted-foreground">Loading updates...</p>
                </div>
              ) : articles.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No updates published yet</p>
                  <Button
                    onClick={() => navigate("/articles/new")}
                    className="mt-4"
                    variant="outline"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Update
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {articles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell className="font-medium max-w-md truncate">
                            {article.title}
                          </TableCell>
                          <TableCell>{article.author?.displayName || "Unknown"}</TableCell>
                          <TableCell>
                            {new Date(article.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/articles/${article.id}`)}
                              >
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/articles/${article.id}/edit`)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteArticle(article.id)}
                                disabled={deletingId === article.id}
                              >
                                {deletingId === article.id ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Instructions Section */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">📧 Contact Submissions</h3>
                <p className="text-sm text-muted-foreground">
                  Click "Download Contacts CSV" to export all contact form submissions including name, email, subject, message, and submission date.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">📰 Newsletter Subscriptions</h3>
                <p className="text-sm text-muted-foreground">
                  Click "Download Subscriptions CSV" to export all newsletter subscribers with their email addresses and subscription dates.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">⚠️ Important Notes</h3>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>Make sure your Firebase Cloud Functions are deployed</li>
                  <li>CSV files are generated in real-time from your Firestore database</li>
                  <li>Files are named with the current date for easy organization</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
