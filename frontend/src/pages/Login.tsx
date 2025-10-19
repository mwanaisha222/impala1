import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCSRFToken } from "@/lib/csrf";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const csrftoken = getCSRFToken();
    try {
      const body = new URLSearchParams();
      Object.entries(formData).forEach(([k, v]) => body.append(k, String(v)));

      // Use our custom login API endpoint
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/api/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            ...(csrftoken ? { "X-CSRFToken": csrftoken } : {}),
          },
          credentials: "include",
          body: body.toString(),
        }
      );

      if (res.ok) {
        const data = await res.json();
        // dj-rest-auth returns key when TokenAuthentication is enabled
        if (data?.key) {
          localStorage.setItem('authToken', data.key);
        }

        toast({
          title: "Login Successful!",
          description: "Welcome back to Impala.",
        });

        navigate("/");
      } else {
        const text = await res.text();
        console.error("Login failed:", res.status, text);
        toast({ title: "Error", description: "Login failed" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Login failed" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">
                Sign in to access your account
              </p>
            </div>

            <div className="bg-card border rounded-xl p-8 shadow-sm animate-slide-up">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:text-accent"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90"
                >
                  Sign In
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  Don't have an account?{" "}
                </span>
                <Link
                  to="/signup"
                  className="text-primary hover:text-accent font-medium"
                >
                  Sign up
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

export default Login;
