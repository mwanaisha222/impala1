import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Article {
  id: string;
  title: string;
  body: string;
  featured_image: string;
  created_at: string;
  author: {
    displayName: string;
  };
}

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "articles"));
        const articlesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Article[];
        setArticles(articlesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setLoading(false);
      }
    };
    fetchArticles();
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
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-orange-500 text-sm font-medium">
                    {new Date(article.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition-colors leading-tight">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {article.body.replace(/<[^>]*>/g, "").substring(0, 150)}...
                </p>
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