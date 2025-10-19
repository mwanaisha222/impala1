import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/* -------------------------------------------------------------------------- */
/* 🌍 Base URL for your Django backend                                        */
/* -------------------------------------------------------------------------- */
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

/* -------------------------------------------------------------------------- */
/* 🧩 Get CSRF token from cookie                                              */
/* -------------------------------------------------------------------------- */
export function getCSRFToken(): string | null {
  const match = document.cookie.match(/csrftoken=([\w-]+)/);
  return match ? match[1] : null;
}

/* -------------------------------------------------------------------------- */
/* 🧩 Fetch CSRF cookie from Django                                           */
/* -------------------------------------------------------------------------- */
async function fetchCSRFToken() {
  try {
    const res = await fetch(`${BASE_URL}/api/csrf/`, {
      method: "GET",
      credentials: "include", // ✅ crucial for Django to set cookies
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error(`Failed to fetch CSRF token (${res.status})`);

    const data = await res.json();
    console.log("✅ CSRF token fetched:", data?.csrfToken);
    return data?.csrfToken || getCSRFToken();
  } catch (err) {
    console.error("❌ Failed to fetch CSRF token:", err);
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* 🧩 Signup Component                                                        */
/* -------------------------------------------------------------------------- */
const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    surname: "",
    password1: "",
    password2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password1 !== formData.password2) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // 1️⃣ Fetch CSRF cookie and token first
    const csrftoken = await fetchCSRFToken();

    try {
      const body = new URLSearchParams();
      Object.entries(formData).forEach(([k, v]) => body.append(k, String(v)));

      // 2️⃣ Send signup request to Django API endpoint
      const res = await fetch(`${BASE_URL}/api/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          ...(csrftoken ? { "X-CSRFToken": csrftoken } : {}),
        },
        credentials: "include", // ✅ allows cookie exchange
        body: body.toString(),
      });

      if (res.ok) {
        try {
          const data = await res.json();
          if (data?.key) localStorage.setItem("authToken", data.key);
        } catch {
          /* Non-JSON responses are fine */
        }

        toast({
          title: "Account Created",
          description: "Welcome to Impala!",
        });
        navigate("/");
      } else {
        const text = await res.text();
        console.error("Signup failed:", res.status, text);
        toast({
          title: "Signup failed",
          description: text || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Signup failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /* 💅 Component UI                                                           */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold mb-2">Create Account</h1>
              <p className="text-muted-foreground">
                Join Impala today and get started
              </p>
            </div>

            <div className="bg-card border rounded-xl p-8 shadow-sm animate-slide-up">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="John"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="surname">Surname</Label>
                  <Input
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password1">Password</Label>
                  <Input
                    id="password1"
                    name="password1"
                    type="password"
                    value={formData.password1}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password2">Confirm Password</Label>
                  <Input
                    id="password2"
                    name="password2"
                    type="password"
                    value={formData.password2}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90"
                >
                  Create Account
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  Already have an account?{" "}
                </span>
                <Link
                  to="/login"
                  className="text-primary hover:text-accent font-medium"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
