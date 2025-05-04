import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

export function Footer() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch settings data for footer
  const { data: settings } = useQuery({
    queryKey: ['/api/settings'],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", data);
      const result = await response.json();
      
      toast({
        title: "Success!",
        description: result.message || "You have been subscribed to our newsletter.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again later.",
        variant: "destructive",
      });
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Our Services" },
    { href: "/projects", label: "Projects" },
    { href: "/workshops", label: "Workshops & Events" },
    { href: "/internships", label: "Internship Opportunities" },
    { href: "/contact", label: "Contact Us" },
  ];

  const serviceLinks = [
    { href: "/services#power-distribution", label: "Power Distribution" },
    { href: "/services#renewable-energy", label: "Renewable Energy" },
    { href: "/services#energy-management", label: "Energy Management" },
    { href: "/services#ev-infrastructure", label: "EV Infrastructure" },
    { href: "/services#power-electronics", label: "Power Electronics" },
    { href: "/services#energy-audits", label: "Energy Audits" },
  ];

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 7v5h5"></path>
                  <path d="M9 17H4V5h6"></path>
                  <path d="M12 17v-4"></path>
                  <path d="M5 12h5"></path>
                  <path d="M17 12h-2"></path>
                  <path d="M18 9v8"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold">Srimitha Energy</h2>
            </div>
            <p className="text-slate-300 mb-4">
              {settings?.about_company ? settings.about_company.substring(0, 150) + "..." : 
              "Innovative electrical engineering solutions for sustainable energy systems, power distribution, and energy efficiency."}
            </p>
            <div className="flex space-x-4 mb-4">
              {settings?.social_linkedin && (
                <a 
                  href={settings.social_linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {settings?.social_twitter && (
                <a 
                  href={settings.social_twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
              )}
              {settings?.social_facebook && (
                <a 
                  href={settings.social_facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-slate-300 hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight size={16} className="mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-slate-300 hover:text-primary transition-colors flex items-center"
                  >
                    <ChevronRight size={16} className="mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-slate-300 mb-4">
              Subscribe to our newsletter for the latest updates on energy solutions and upcoming events.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex space-x-2">
                          <Input
                            {...field}
                            placeholder="Your email address"
                            className="bg-slate-800 border-slate-700 text-white"
                          />
                          <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="bg-primary hover:bg-primary/90"
                          >
                            {isSubmitting ? "..." : "Subscribe"}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              {settings?.company_email && (
                <a 
                  href={`mailto:${settings.company_email}`}
                  className="flex items-center text-slate-300 hover:text-primary transition-colors"
                >
                  <Mail size={16} className="mr-2" />
                  {settings.company_email}
                </a>
              )}
              {settings?.company_phone && (
                <a 
                  href={`tel:${settings.company_phone}`}
                  className="flex items-center text-slate-300 hover:text-primary transition-colors"
                >
                  <Phone size={16} className="mr-2" />
                  {settings.company_phone}
                </a>
              )}
              {settings?.company_address && (
                <div className="flex items-start text-slate-300">
                  <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                  <span>{settings.company_address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Srimitha Energy Solutions. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-slate-400 hover:text-primary text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-slate-400 hover:text-primary text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
