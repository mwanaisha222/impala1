import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Who We Are", path: "/who-we-are" },
    { name: "What We Do", path: "/what-we-do" },
    { name: "Digams", path: "https://digamsapp.com", external: true },
    { name: "Articles", path: "/articles" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="Impala Healthtech Research Logo" 
              className="h-8 w-auto"
            />
            <span className="font-bold text-xl text-primary">Impala Healthtech Research</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors text-foreground hover:bg-muted`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          {/* Temporarily hidden - will be visible later
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-accent hover:bg-accent/90">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
          */}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors text-foreground hover:bg-muted`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
            {/* Temporarily hidden - will be visible later
            <div className="pt-2 space-y-2">
              <Button variant="ghost" asChild className="w-full">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
              </Button>
              <Button asChild className="w-full bg-accent hover:bg-accent/90">
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
            */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
