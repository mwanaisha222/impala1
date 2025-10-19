import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCSRFToken } from "@/lib/csrf";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const csrftoken = getCSRFToken();

    try {
      const body = new URLSearchParams();
      Object.entries(formData).forEach(([k, v]) => body.append(k, String(v)));
      // add required consent field for Django ContactForm
      body.append("consent_email_updates", "on");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/contact/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            ...(csrftoken ? { "X-CSRFToken": csrftoken } : {}),
          },
          body: body.toString(),
          credentials: "include",
        }
      );

      if (res.ok) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you as soon as possible.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const text = await res.text();
        console.error("Contact POST failed:", res.status, text);
        toast({ title: "Error", description: "Failed to send message." });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to send message." });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Get In Touch
              </h1>
              <p className="text-xl text-muted-foreground">
                Have a question or want to work together? We'd love to hear from
                you.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="animate-slide-up">
                <div className="bg-card border rounded-xl p-8 shadow-sm">
                  <h2 className="text-2xl font-semibold mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
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
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more..."
                        className="min-h-[150px]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent/90"
                    >
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact Information */}
              <div
                className="space-y-8 animate-slide-up"
                style={{ animationDelay: "0.1s" }}
              >
                <div>
                  <h2 className="text-2xl font-semibold mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <p className="text-muted-foreground">
                          operations@impalaresearch.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <p className="text-muted-foreground">+256783731032</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Office</h3>
                        <p className="text-muted-foreground">
                          Plot 712, Mirembe Close, Ntinda, Nakawa
                        </p>
                        <p className="text-muted-foreground">Kampala, Uganda</p>
                        <p className="text-muted-foreground">
                          P. O. Box, 801349, Uganda
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted rounded-xl p-6">
                  <h3 className="font-semibold mb-2">Business Hours</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
