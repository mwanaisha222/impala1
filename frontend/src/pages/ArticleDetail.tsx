// src/pages/ArticleDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Article {
  id: number;
  title: string;
  body: string;
  featured_image: string;
  created_at: string;
  author: {
    email: string;
    first_name: string;
    surname: string;
  } | string;
}

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/articles/${id}/`)
      .then((res) => res.json())
      .then((data) => setArticle(data));
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-center mt-10">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-20 bg-background">
        <div className="max-w-3xl mx-auto p-6">
          {article.featured_image && (
            <img
              src={article.featured_image.startsWith("http")
                ? article.featured_image
                : `http://127.0.0.1:8000${article.featured_image}`}
              alt={article.title}
              className="w-full h-80 object-cover rounded-lg shadow-md mb-6"
            />
          )}
          <div className="mb-4 text-sm text-gray-600 space-y-1">
            <p className="text-orange-600">
              Published on {new Date(article.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
            <p>
              By {typeof article.author === 'string' 
                ? article.author 
                : `${article.author.first_name} ${article.author.surname}`}
            </p>
          </div>
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <div 
            className="text-gray-700 leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />
          <Link
            to="/articles"
            className="inline-block mt-6 text-orange-500 border border-orange-500 px-4 py-2 rounded hover:bg-orange-500 hover:text-white transition"
          >
            ← Back to Articles
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
