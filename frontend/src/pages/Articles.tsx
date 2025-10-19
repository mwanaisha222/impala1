import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../lib/api";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Articles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles()
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load articles:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading articles...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Articles & Insights
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with our latest research, insights, and developments in healthcare technology
            </p>
          </div>
          <Button asChild className="bg-orange-500 hover:bg-orange-600 hidden md:flex ml-6">
            <Link to="/articles/new">
              <Plus className="mr-2 h-4 w-4" /> New Article
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div 
              key={article.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                {article.featured_image && (
                  <img
                    src={article.featured_image.startsWith("http")
                      ? article.featured_image
                      : `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}${article.featured_image}`}
                    alt={article.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-orange-500 text-sm font-medium">
                    {new Date(article.created_at || Date.now()).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition-colors leading-tight">
                  {article.title}
                </h2>
                
                <div className="text-gray-600 mb-6 leading-relaxed">
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        article.body && article.body.length > 150
                          ? article.body.replace(/<[^>]*>/g, '').slice(0, 150) + "..."
                          : article.body ? article.body.replace(/<[^>]*>/g, '') : "No content available",
                    }}
                  />
                </div>
                
                <Link
                  to={`/articles/${article.id}`}
                  className="inline-block bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors font-medium"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No articles found</div>
            <p className="text-gray-400 mt-2">Check back later for new content</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
