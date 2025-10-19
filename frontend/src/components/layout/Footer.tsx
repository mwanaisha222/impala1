import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src={logo} 
                alt="Impala Healthtech Research Logo" 
                className="h-8 w-auto"
              />
              <span className="font-bold text-xl">Impala Healthtech Research</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Building innovative solutions for tomorrow's challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/who-we-are" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link to="/what-we-do" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  What We Do
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">operations@impalaresearch.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">+256783731032</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">Plot 712, Mirembe Close, Ntinda, Kampala</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 hover:bg-accent flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 hover:bg-accent flex items-center justify-center transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 hover:bg-accent flex items-center justify-center transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} Impala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
