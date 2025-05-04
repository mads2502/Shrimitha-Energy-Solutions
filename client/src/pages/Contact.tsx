import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { apiRequest } from "@/lib/queryClient";
import { Helmet } from "react-helmet";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  contactPreference: z.enum(["email", "phone"], {
    required_error: "Please select a contact preference",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      service: "",
      message: "",
      contactPreference: "email",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      setSubmissionStatus("success");
      setResponseMessage("Thank you for your message! We'll get back to you shortly.");
      form.reset();
    },
    onError: (error: Error) => {
      setSubmissionStatus("error");
      setResponseMessage(error.message || "Failed to send your message. Please try again.");
    },
  });

  function onSubmit(data: FormValues) {
    mutation.mutate(data);
  }

  return (
    <>
      <Helmet>
        <title>Contact Us - Srimitha Energy Solutions</title>
        <meta name="description" content="Get in touch with Srimitha Energy Solutions for your electrical engineering needs. We're here to help with your energy efficiency and sustainability goals." />
      </Helmet>
      
      <div className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our services or want to discuss your project?
              We're here to help.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              
              <p className="text-muted-foreground mb-8">
                Whether you're interested in our services, have questions about a specific technology,
                or want to explore partnership opportunities, our team is ready to assist you.
                Fill out the form, and we'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Our Location</h3>
                    <p className="text-muted-foreground">
                      123 Energy Avenue, Tech Park<br />
                      Bangalore, Karnataka 560001<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-muted-foreground">
                      General Inquiries: <a href="mailto:info@srimitha.com" className="text-primary hover:underline">info@srimitha.com</a><br />
                      Support: <a href="mailto:support@srimitha.com" className="text-primary hover:underline">support@srimitha.com</a><br />
                      Careers: <a href="mailto:careers@srimitha.com" className="text-primary hover:underline">careers@srimitha.com</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <p className="text-muted-foreground">
                      Main Office: <a href="tel:+919876543210" className="text-primary hover:underline">+91 98765 43210</a><br />
                      Technical Support: <a href="tel:+919876543211" className="text-primary hover:underline">+91 98765 43211</a><br />
                      Hours: Monday to Friday, 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
                <p className="text-muted-foreground mb-4">
                  Follow us on social media for the latest updates, industry insights, and project showcases.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://linkedin.com/company/srimitha-energy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background p-3 rounded-full hover:bg-primary/10 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a
                    href="https://twitter.com/srimitha_energy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background p-3 rounded-full hover:bg-primary/10 transition-colors"
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  </a>
                  <a
                    href="https://facebook.com/srimitha.energy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background p-3 rounded-full hover:bg-primary/10 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a
                    href="https://instagram.com/srimitha.energy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background p-3 rounded-full hover:bg-primary/10 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </a>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-background p-8 rounded-xl shadow-sm"
            >
              <Tabs defaultValue="contact" className="mb-8">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="contact">Contact Form</TabsTrigger>
                  <TabsTrigger value="quote">Request Quote</TabsTrigger>
                </TabsList>
                
                <TabsContent value="contact" className="mt-6">
                  <h3 className="font-semibold text-xl mb-4">Send Us a Message</h3>
                  {submissionStatus === "idle" ? (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="your.email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+91 98765 43210" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company/Organization (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Your company or organization" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="What is your message about?" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service of Interest</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a service" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="renewable_energy">Renewable Energy Solutions</SelectItem>
                                  <SelectItem value="smart_grid">Smart Grid Technologies</SelectItem>
                                  <SelectItem value="energy_efficiency">Energy Efficiency Consulting</SelectItem>
                                  <SelectItem value="ev_charging">EV Charging Infrastructure</SelectItem>
                                  <SelectItem value="building_automation">Building Automation</SelectItem>
                                  <SelectItem value="training">Training & Workshops</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Please provide details about your inquiry or project needs"
                                  className="min-h-[120px] resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="contactPreference"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Preferred Contact Method</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="email" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Email
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="phone" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Phone
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={mutation.isPending}
                        >
                          {mutation.isPending ? (
                            <div className="flex items-center">
                              <div className="animate-spin h-4 w-4 mr-2 border-2 border-t-transparent rounded-full"></div>
                              Sending...
                            </div>
                          ) : (
                            <>
                              Send Message <Send className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  ) : (
                    <Alert 
                      className={`${
                        submissionStatus === "success" ? "bg-secondary/10" : "bg-destructive/10"
                      }`}
                    >
                      {submissionStatus === "success" ? (
                        <CheckCircle className="h-4 w-4 text-secondary" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-destructive" />
                      )}
                      <AlertTitle>
                        {submissionStatus === "success" ? "Success!" : "Error"}
                      </AlertTitle>
                      <AlertDescription>
                        {responseMessage}
                      </AlertDescription>
                      
                      {submissionStatus === "error" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-4" 
                          onClick={() => setSubmissionStatus("idle")}
                        >
                          Try Again
                        </Button>
                      )}
                    </Alert>
                  )}
                </TabsContent>
                
                <TabsContent value="quote" className="mt-6">
                  <h3 className="font-semibold text-xl mb-4">Request a Quote</h3>
                  <p className="text-muted-foreground mb-6">
                    For detailed project quotes, please provide some information about your requirements.
                    Our team will review your request and get back to you within 48 hours with a 
                    customized proposal.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="bg-primary/10 p-3 rounded-full inline-block mb-4">
                              <MessageSquare className="h-6 w-6 text-primary" />
                            </div>
                            <h4 className="font-medium mb-2">Call Us</h4>
                            <p className="text-sm text-muted-foreground">
                              Speak directly with our consultants
                            </p>
                            <Button variant="link" asChild className="mt-4">
                              <a href="tel:+919876543210">+91 98765 43210</a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="bg-primary/10 p-3 rounded-full inline-block mb-4">
                              <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <h4 className="font-medium mb-2">Email Us</h4>
                            <p className="text-sm text-muted-foreground">
                              Send detailed project requirements
                            </p>
                            <Button variant="link" asChild className="mt-4">
                              <a href="mailto:quotes@srimitha.com">quotes@srimitha.com</a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="bg-primary/10 p-3 rounded-full inline-block mb-4">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-clock text-primary"><path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><path d="M17.5 17.5 16 16.25V14"/><path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"/></svg>
                            </div>
                            <h4 className="font-medium mb-2">Schedule Meeting</h4>
                            <p className="text-sm text-muted-foreground">
                              Book a consultation session
                            </p>
                            <Button variant="link" className="mt-4">
                              Book Appointment
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="bg-muted p-6 rounded-lg">
                      <h4 className="font-medium mb-4">What to include in your quote request:</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-primary mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                          <span>Project type and scope (e.g., solar installation for commercial building)</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-primary mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                          <span>Location and facility details</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-primary mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                          <span>Timeline expectations</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-primary mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                          <span>Any specific requirements or constraints</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-primary mr-2 flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                          <span>Budget considerations (if applicable)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-background p-8 rounded-xl shadow-sm">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Find Our Office</h2>
                <p className="text-muted-foreground">
                  Visit us at our headquarters in Bangalore's Tech Park.
                </p>
              </div>
              
              <div className="h-96 rounded-lg overflow-hidden mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124425.87555616735!2d77.5499397561777!3d12.954480082299393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1683567853932!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Srimitha Energy Solutions Office Location"
                ></iframe>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-primary/10 p-3 rounded-full inline-block mb-3">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-1">Address</h4>
                  <p className="text-sm text-muted-foreground">
                    123 Energy Avenue, Tech Park<br />
                    Bangalore, Karnataka 560001
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 p-3 rounded-full inline-block mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock text-primary"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <h4 className="font-medium mb-1">Business Hours</h4>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary/10 p-3 rounded-full inline-block mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-parking-circle text-primary"><circle cx="12" cy="12" r="10"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>
                  </div>
                  <h4 className="font-medium mb-1">Parking</h4>
                  <p className="text-sm text-muted-foreground">
                    Visitor parking available<br />
                    EV charging stations on-site
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
