import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ui/service-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/ui/contact-form";
import { ArrowRight, CheckCircle2, LucideIcon, ExternalLink } from "lucide-react";
import { FaBolt, FaSun, FaGaugeHigh, FaCarBattery, FaMicrochip, FaMagnifyingGlassChart } from "react-icons/fa6";
import { Service } from "@shared/schema";
import { motion } from "framer-motion";

const iconMap: Record<string, any> = {
  "bolt": FaBolt,
  "sun": FaSun,
  "gauge": FaGaugeHigh,
  "car-battery": FaCarBattery,
  "microchip": FaMicrochip,
  "magnifying-glass-chart": FaMagnifyingGlassChart,
};

export default function Services() {
  // Fetch services data
  const { data: services, isLoading } = useQuery({
    queryKey: ['/api/services'],
  });

  // Scroll to the top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check if there's a hash in the URL to scroll to a specific service
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    }
  }, [services]);

  const ServiceDetail = ({ service }: { service: Service }) => {
    const Icon = iconMap[service.icon];
    
    return (
      <div id={service.slug} className="scroll-mt-24 py-12 border-b border-slate-200 last:border-b-0">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <div className="flex items-center mb-6">
              {Icon && <Icon className="h-12 w-12 text-primary mr-4" />}
              <h3 className="text-2xl md:text-3xl font-semibold">{service.title}</h3>
            </div>
            <p className="text-muted-foreground mb-6">{service.description}</p>
            
            <h4 className="text-xl font-semibold mb-4">Key Benefits</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <p>Enhanced system reliability and resilience</p>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <p>Reduced operational and maintenance costs</p>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <p>Improved energy efficiency and sustainability</p>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <p>Future-ready infrastructure with scaling options</p>
              </div>
            </div>
            
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href={`/contact?subject=${encodeURIComponent(service.title)}`}>
                Request a Consultation
              </Link>
            </Button>
          </div>
          
          <div className="md:w-1/3">
            <Card>
              <CardContent className="pt-6">
                <h4 className="text-lg font-semibold mb-4">Our Approach</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <span className="text-primary text-sm font-bold">1</span>
                    </div>
                    <p className="text-sm">Comprehensive site assessment & requirements analysis</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <span className="text-primary text-sm font-bold">2</span>
                    </div>
                    <p className="text-sm">Detailed system design & technology selection</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <span className="text-primary text-sm font-bold">3</span>
                    </div>
                    <p className="text-sm">Professional installation & commissioning</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <span className="text-primary text-sm font-bold">4</span>
                    </div>
                    <p className="text-sm">Rigorous testing & quality assurance</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <span className="text-primary text-sm font-bold">5</span>
                    </div>
                    <p className="text-sm">Ongoing maintenance & optimization support</p>
                  </li>
                </ul>
                
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <h4 className="text-sm font-semibold mb-2">Applicable Standards</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    All our solutions comply with international standards including IEEE, IEC, and local regulations.
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-xs text-primary hover:text-primary/80 font-medium"
                  >
                    View Certifications <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl opacity-90">
              Comprehensive electrical engineering solutions for modern energy challenges
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Our Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From power distribution systems to renewable energy integration, our services are designed
              to optimize energy infrastructure for efficiency, reliability, and sustainability.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="h-64 animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-10 w-10 rounded-full bg-slate-200 mb-4"></div>
                    <div className="h-6 w-3/4 bg-slate-200 rounded mb-3"></div>
                    <div className="h-4 bg-slate-200 rounded mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-slate-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services?.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Service Details
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dive deeper into our specific service offerings and how they can benefit your organization
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
                <TabsTrigger value="all">All Services</TabsTrigger>
                <TabsTrigger value="power">Power Distribution</TabsTrigger>
                <TabsTrigger value="renewable">Renewable Energy</TabsTrigger>
                <TabsTrigger value="management">Energy Management</TabsTrigger>
                <TabsTrigger value="ev">EV Infrastructure</TabsTrigger>
                <TabsTrigger value="electronics">Power Electronics</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="space-y-4">
              {services?.map((service) => (
                <ServiceDetail key={service.id} service={service} />
              ))}
            </TabsContent>

            <TabsContent value="power" className="space-y-4">
              {services?.filter(s => s.slug.includes('power-distribution'))
                .map((service) => (
                  <ServiceDetail key={service.id} service={service} />
                ))}
            </TabsContent>

            <TabsContent value="renewable" className="space-y-4">
              {services?.filter(s => s.slug.includes('renewable'))
                .map((service) => (
                  <ServiceDetail key={service.id} service={service} />
                ))}
            </TabsContent>

            <TabsContent value="management" className="space-y-4">
              {services?.filter(s => s.slug.includes('management') || s.slug.includes('audit'))
                .map((service) => (
                  <ServiceDetail key={service.id} service={service} />
                ))}
            </TabsContent>

            <TabsContent value="ev" className="space-y-4">
              {services?.filter(s => s.slug.includes('ev'))
                .map((service) => (
                  <ServiceDetail key={service.id} service={service} />
                ))}
            </TabsContent>

            <TabsContent value="electronics" className="space-y-4">
              {services?.filter(s => s.slug.includes('electronic'))
                .map((service) => (
                  <ServiceDetail key={service.id} service={service} />
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Enhance Your Energy Infrastructure?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Contact our team of experts to discuss your specific requirements and discover how we can help.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 btn-hover-animate"
            >
              <Link href="/contact">
                Get a Custom Quote
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Us About Our Services</h2>
              <p className="text-muted-foreground mb-6">
                Have questions about our services or want to discuss a specific project? 
                Fill out the form and our team will get back to you promptly.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p>Get expert advice on selecting the right solutions for your needs</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p>Receive a customized proposal tailored to your specific requirements</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p>Learn about financing options and potential incentives for energy upgrades</p>
                </div>
              </div>
              
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">Why Choose Srimitha Energy Solutions?</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      <span className="text-sm">Over 200 successful projects completed</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      <span className="text-sm">Industry leading expertise in electrical engineering</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      <span className="text-sm">Comprehensive end-to-end project management</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                      <span className="text-sm">Strong focus on sustainability and efficiency</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <ContactForm defaultSubject="Service Inquiry" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
