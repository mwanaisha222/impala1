import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  date_published: string;
  author: {
    email: string;
    first_name: string;
    surname: string;
  };
}

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/articles/")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Articles & Research
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest research, insights, and developments in healthcare technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="relative overflow-hidden">
                <img
                  src={`http://127.0.0.1:8000${article.image}`}
                  alt={article.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-orange-500 text-sm font-medium">
                    {new Date(article.date_published).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition-colors leading-tight">
                  {article.title}
                </h2>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {article.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                </p>
                
                <Link
                  to={`/article/${article.id}`}
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
