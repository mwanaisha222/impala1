import { TestTube, TrendingUp, Briefcase, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ImageSlider from '@/components/ImageSlider';
import digamsImg from '@/assets/digams.png';
import digams2 from '@/assets/2.png';
import digams3 from '@/assets/3.png';
import digams4 from '@/assets/4.png';

const services = [
  {
    icon: TestTube,
    title: "Research and Development",
    description: "We conduct explorative research to establish the most pressing health challenges, and customize technology based solutions for them. We do routine, and on demand research in health systems, health service access and delivery, health economics and pharmaceutics.",
  },
  {
    icon: TrendingUp,
    title: "Impact Evaluation",
    description: "We use strong research methodologies to conduct independent impact evaluation of internally and externally developed health technology solutions, to prepare them for scaled implementation.",
  },
  {
    icon: Briefcase,
    title: "Business Development",
    description: "We conduct market research and analysis, and use the scientific evidence generated to develop and test business and revenue models for health technology solutions with high scaled impact potential.",
  },
  {
    icon: Monitor,
    title: "Health Software Development",
    description: "We design and develop digital health platforms that address critical healthcare challenges. Our flagship platform DIGAMS is a digital antimicrobial stewardship solution integrating microbiology lab marketplace with AI-driven empirical treatment decision support for clinicians.",
  },
];

const WhatWeDo = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl animate-fade-in">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">What We Do</h1>
              <p className="text-xl text-primary-foreground/90">
                We conduct both explorative and evaluative research, in addition to technology and business development
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Evidence-based health technology solutions using strong research methodologies
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <Card
                  key={service.title}
                  className="group hover:shadow-lg transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* DIGAMS Platform Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Flagship Platform: DIGAMS</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Digital Antimicrobial Stewardship Platform - Revolutionizing Healthcare Access and Treatment
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center animate-slide-up">
              <div>
                <h3 className="text-2xl font-bold mb-6">Advanced Connected Diagnostics</h3>
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

        {/* Research Focus Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Research Focus</h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Building a strong evidence base for health technology solutions using strong research methodologies
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center animate-slide-up">
              <div>
                <h3 className="text-2xl font-bold mb-6">Evidence-Based Approach</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  We are committed to generating robust evidence to guide the design, development, and deployment of transformative healthcare technologies. Our multidisciplinary team uses rigorous research methodologies to ensure sustainable impact.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-3" />
                    Health Systems Research
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-3" />
                    Health Service Access and Delivery
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-3" />
                    Health Economics
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-3" />
                    Pharmaceutics Research
                  </li>
                </ul>
                <a
                  href="/articles"
                  className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-orange-500 text-white hover:bg-orange-600 font-medium transition-colors"
                >
                  Learn More
                </a>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Research and Development"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Collaborate?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Let's discuss how we can support your health technology development journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 font-medium transition-colors"
                >
                  Book an Appointment
                </a>
                <a
                  href="/articles"
                  className="inline-flex items-center justify-center h-11 px-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground font-medium transition-colors"
                >
                  Read Our Research
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhatWeDo;
