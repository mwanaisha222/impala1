import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Briefcase, Users, Beaker } from "lucide-react"; // ✅ Fixed import
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Partners from "@/components/Partners";
import ImageSlider from '@/components/ImageSlider';
import collaborationImage from "@/assets/collaboration.png";
import digamsImg from '@/assets/digams.png';
import digams2 from '@/assets/2.png';
import digams3 from '@/assets/3.png';
import digams4 from '@/assets/4.png';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Evidence-Based Health Technology Solutions
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-primary-foreground/90">
                We generate evidence to guide design, development and deployment of transformative healthcare technologies
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link to="/contact">
                    Get Involved <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20 text-primary-foreground">
                  <Link to="/what-we-do">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <div className="absolute top-10 right-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>
        </section>

        {/* DIGAMS Platform Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Flagship Platform: DIGAMS</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Digital Antimicrobial Stewardship Platform - Revolutionizing Healthcare Access and Treatment
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center animate-slide-up">
              <div>
                <h3 className="text-2xl font-bold mb-6">Advanced Healthcare Technology</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  DIGAMS is a digital antimicrobial stewardship platform integrating a microbiology lab marketplace with real-time AI-driven empirical antimicrobial treatment decision support for clinicians.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Patients needing pathogen confirmatory and susceptibility tests can get their samples taken and recorded at local laboratories or clinics, and tested at microbiology labs, all through DIGAMS.
                </p>
                <div className="flex items-center mb-8">
                  <a
                    href="https://digamsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-orange-500 text-white hover:bg-orange-600 font-medium transition-colors"
                  >
                    Explore DIGAMS Platform
                  </a>
                </div>
              </div>
              <div>
                <ImageSlider images={[digamsImg, digams2, digams3, digams4]} />
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <Partners />
       
        {/* Get Involved Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Get Involved</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold mb-6">Looking for a collaboration?</h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Book an appointment with us. We shall give you time to listen to your health technology offering and suggest the best route you out to take to achieve your product sustainability. We shall ensure intellectual property rights protection through a non-disclosure agreement.
                </p>
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                  <Link to="/contact">
                    Book an Appointment <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="animate-slide-up">
                <img 
                  src={collaborationImage} 
                  alt="Collaboration"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
