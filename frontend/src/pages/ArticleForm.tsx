import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCSRFToken } from "@/lib/csrf";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("body", formData.content); // Django expects 'body'
    data.append("keywords", formData.tags); // Django expects 'keywords'
    if (files && files.length > 0) {
      data.append("featured_image", files[0]); // Django expects 'featured_image'
    }

    try {
      const csrftoken = getCSRFToken();
      const authToken = localStorage.getItem('authToken');
      
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/api/articles/`,
        {
          method: "POST",
          body: data,
          credentials: 'include',
          headers: {
            ...(csrftoken ? { "X-CSRFToken": csrftoken } : {}),
            ...(authToken ? { "Authorization": `Token ${authToken}` } : {}),
          },
        }
      );

      if (res.ok) {
        toast({
          title: isEditing ? "Article Updated!" : "Article Created!",
          description: "Your article has been saved successfully.",
        });
        navigate("/articles");
      } else {
        const text = await res.text();
        console.error("Article POST failed:", res.status, res.statusText, text);
        toast({ title: "Error", description: `Failed to save article: ${res.status}` });
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Something went wrong." });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
            </Link>
          </Button>

          <h1 className="text-4xl font-bold mb-8">
            {isEditing ? "Edit Article" : "Create New Article"}
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

              <div className="space-y-2">
                <Label htmlFor="attachments">Upload Files</Label>
                <Input
                  id="attachments"
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
                <p className="text-sm text-muted-foreground">
                  Upload images, videos, or documents.
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-accent hover:bg-accent/90">
                  {isEditing ? "Update Article" : "Publish Article"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link to="/articles">Cancel</Link>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleForm;
