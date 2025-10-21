import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

const ArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    imageUrl: "",
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("url");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        toast({
          title: "Unauthorized",
          description: "You must be logged in to create or edit articles.",
          variant: "destructive",
        });
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate, toast]);

  useEffect(() => {
    if (isEditing && id) {
      const fetchArticle = async () => {
        const docRef = doc(db, "articles", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            title: data.title,
            content: data.body,
            tags: data.keywords,
            imageUrl: data.featured_image || "",
          });
        }
      };
      fetchArticle();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to publish articles.",
        variant: "destructive",
      });
      return;
    }

    // Validate form data
    if (!formData.title.trim()) {
      toast({
        title: "Missing Title",
        description: "Please enter an article title.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.content.trim() || formData.content === '<p><br></p>') {
      toast({
        title: "Missing Content",
        description: "Please add some content to your article.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      let imageUrl = formData.imageUrl; // Use URL from input first
      
      // Upload image file if provided (overrides URL)
      if (uploadMethod === "file" && files && files.length > 0) {
        try {
          setUploading(true);
          toast({
            title: "Uploading Image...",
            description: "Please wait while we upload your image.",
          });
          
          const storage = getStorage();
          const storageRef = ref(storage, `articles/${Date.now()}_${files[0].name}`);
          await uploadBytes(storageRef, files[0]);
          imageUrl = await getDownloadURL(storageRef);
          setUploading(false);
        } catch (uploadError: any) {
          console.error("Upload error:", uploadError);
          setUploading(false);
          
          // If upload fails, continue without image if URL is provided
          if (!formData.imageUrl) {
            throw new Error("Failed to upload image. Please enable Firebase Storage or use an image URL instead.");
          }
          
          toast({
            title: "Upload Failed",
            description: "Using provided URL instead. Consider enabling Firebase Storage.",
            variant: "destructive",
          });
          imageUrl = formData.imageUrl;
        }
      }

      // Show saving toast
      toast({
        title: isEditing ? "Updating..." : "Publishing...",
        description: "Saving your article to the database.",
      });

      const articleData: any = {
        title: formData.title,
        body: formData.content,
        keywords: formData.tags,
        ...(imageUrl && { featured_image: imageUrl }),
      };

      if (isEditing && id) {
        // Update existing article
        articleData.updated_at = new Date().toISOString();
        await updateDoc(doc(db, "articles", id), articleData);
      } else {
        // Create new article
        articleData.created_at = new Date().toISOString();
        articleData.author = {
          uid: user.uid,
          displayName: user.displayName || user.email,
        };
        await addDoc(collection(db, "articles"), articleData);
      }
      
      // Success notification
      toast({
        title: isEditing ? "✅ Article Updated!" : "✅ Article Published!",
        description: isEditing 
          ? "Your changes have been saved successfully." 
          : "Your article is now live and visible to everyone.",
      });
      
      // Wait a moment for user to see the success message
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
      
    } catch (error: any) {
      console.error("Error saving article:", error);
      
      let errorMessage = "Something went wrong. Please try again.";
      
      // Provide specific error messages
      if (error.code === 'storage/unauthorized') {
        errorMessage = "You don't have permission to upload files.";
      } else if (error.code === 'permission-denied') {
        errorMessage = "You don't have permission to create articles.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "❌ Failed to Publish",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Updates
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-8">
            {isEditing ? "Edit Update" : "Create New Update"}
          </h1>
          <div className="bg-card border rounded-xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter article title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="Technology, Innovation..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  className="min-h-[300px]"
                />
              </div>

              {/* Featured Image Section */}
              <div className="space-y-4">
                <Label>Featured Image</Label>
                
                {/* Method Selector */}
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={uploadMethod === "url" ? "default" : "outline"}
                    onClick={() => setUploadMethod("url")}
                    size="sm"
                  >
                    Use Image URL
                  </Button>
                  <Button
                    type="button"
                    variant={uploadMethod === "file" ? "default" : "outline"}
                    onClick={() => setUploadMethod("file")}
                    size="sm"
                  >
                    Upload File
                  </Button>
                </div>

                {/* URL Input */}
                {uploadMethod === "url" && (
                  <div className="space-y-2">
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, imageUrl: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                      type="url"
                    />
                    <p className="text-sm text-muted-foreground">
                      ✅ Recommended: Paste a URL to an image hosted online
                    </p>
                    {formData.imageUrl && (
                      <div className="mt-2 p-2 border rounded-md">
                        <p className="text-xs text-muted-foreground mb-2">Preview:</p>
                        <img 
                          src={formData.imageUrl} 
                          alt="Preview" 
                          className="max-w-xs max-h-32 object-cover rounded"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* File Upload */}
                {uploadMethod === "file" && (
                  <div className="space-y-2">
                    <Input
                      id="attachments"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFiles(e.target.files)}
                    />
                    <p className="text-sm text-muted-foreground">
                      ⚠️ Note: Requires Firebase Storage to be enabled
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  className="bg-accent hover:bg-accent/90"
                  disabled={loading || uploading}
                >
                  {loading || uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {uploading ? "Uploading..." : "Publishing..."}
                    </>
                  ) : (
                    isEditing ? "Update Article" : "Publish Article"
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  asChild
                  disabled={loading || uploading}
                >
                  <Link to="/admin">Cancel</Link>
                </Button>
              </div>
              
              {/* Status indicators */}
              {uploading && (
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                  Uploading image...
                </div>
              )}
              {loading && !uploading && (
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                  Saving article...
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticleForm;