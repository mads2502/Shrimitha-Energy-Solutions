import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/ui/contact-form";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Linkedin, 
  Twitter, 
  Facebook,
  MessageSquare,
  BookOpen,
  Briefcase,
  Lightbulb,
  MailQuestion
} from "lucide-react";

export default function Contact() {
  const [location] = useLocation();
  
  // Get query params for pre-filled subject
  const params = new URLSearchParams(window.location.search);
  const subjectParam = params.get('subject');
  
  // Fetch settings data
  const { data: settings } = useQuery({
    queryKey: ['/api/settings'],
  });

  // Scroll to the top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Contact options
  const contactOptions = [
    {
      title: "General Inquiries",
      description: "For general information about our services or company",
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      subject: "General Inquiry"
    },
    {
      title: "Project Consultation",
      description: "Discuss your specific project requirements with our team",
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      subject: "Project Consultation"
    },
    {
      title: "Technical Support",
      description: "Get help with technical issues or implementation questions",
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      subject: "Technical Support"
    },
    {
      title: "Workshops & Training",
      description: "Inquire about our educational workshops or custom training",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      subject: "Workshop Inquiry"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl opacity-90">
              Get in touch with our team for inquiries, consultation, or support
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-muted-foreground mb-8">
                Whether you have a question about our services, need a quote for your project, or want to learn more about how we can help your organization, our team is ready to assist you.
              </p>
              
              <div className="space-y-6 mb-8">
                {settings?.company_email && (
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-3 mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Email Us</h4>
                      <a 
                        href={`mailto:${settings.company_email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {settings.company_email}
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        We respond to all messages within 24-48 business hours
                      </p>
                    </div>
                  </div>
                )}
                
                {settings?.company_phone && (
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-3 mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Call Us</h4>
                      <a 
                        href={`tel:${settings.company_phone}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {settings.company_phone}
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Monday to Friday, 9:00 AM - 6:00 PM IST
                      </p>
                    </div>
                  </div>
                )}
                
                {settings?.company_address && (
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-3 mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Visit Us</h4>
                      <address className="not-italic text-muted-foreground">
                        {settings.company_address}
                      </address>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t border-slate-200 pt-8">
                <h4 className="font-semibold text-lg mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  {settings?.social_linkedin && (
                    <a 
                      href={settings.social_linkedin}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-primary/10 p-3 rounded-full text-primary hover:bg-primary/20 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  
                  {settings?.social_twitter && (
                    <a 
                      href={settings.social_twitter}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-primary/10 p-3 rounded-full text-primary hover:bg-primary/20 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  
                  {settings?.social_facebook && (
                    <a 
                      href={settings.social_facebook}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-primary/10 p-3 rounded-full text-primary hover:bg-primary/20 transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="mt-8 lg:mt-12">
                <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
                  <div className="flex items-center mb-4">
                    <MailQuestion className="h-6 w-6 text-primary mr-3" />
                    <h4 className="font-semibold text-lg">How can we help you?</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contactOptions.map((option, index) => (
                      <Card 
                        key={index} 
                        className="cursor-pointer hover:shadow-md transition-shadow border-primary/10"
                        onClick={() => {
                          const form = document.getElementById('contact-form');
                          if (form) {
                            form.scrollIntoView({ behavior: 'smooth' });
                            // Note: In a real implementation, we would update the form's subject field
                          }
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start">
                            <div className="mr-3 mt-1">
                              {option.icon}
                            </div>
                            <div>
                              <h5 className="font-medium">{option.title}</h5>
                              <p className="text-xs text-muted-foreground">{option.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div id="contact-form">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
                  <ContactForm defaultSubject={subjectParam || ""} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Location</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visit our headquarters in Bangalore, India to meet our team in person
            </p>
          </div>
          
          <div className="w-full h-96 rounded-lg overflow-hidden shadow-md">
            <iframe 
              title="Srimitha Energy Solutions Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.8865459858!2d77.4400566!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1654152156661!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          
          <div className="flex justify-center mt-8">
            <div className="bg-white shadow-md rounded-lg p-4 inline-flex items-center">
              <Clock className="h-5 w-5 text-primary mr-3" />
              <div className="text-sm">
                <span className="font-medium">Office Hours:</span> Monday - Friday, 9:00 AM - 6:00 PM IST
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Looking for a Career Opportunity?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              If you're interested in joining our team, check out our current openings or apply for an internship program.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/internships">
                  View Internship Opportunities
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href="mailto:careers@srimitha-energy.com?subject=Career Inquiry">
                  Email Our HR Team
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
