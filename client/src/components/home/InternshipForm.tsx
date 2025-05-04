import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Send } from "lucide-react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  education: z.string().min(2, "Please enter your educational background"),
  area: z.string().min(1, "Please select an area of interest"),
  message: z.string().optional(),
  resume: z.string().min(1, "Please provide a link to your resume"),
});

type FormValues = z.infer<typeof formSchema>;

export default function InternshipForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      education: "",
      area: "",
      message: "",
      resume: ""
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest("POST", "/api/internships/apply", data);
      return response.json();
    },
    onSuccess: () => {
      setStatus("success");
      setResponseMessage("Your internship application has been submitted successfully! We'll review your application and get back to you soon.");
      form.reset();
    },
    onError: (error: Error) => {
      setStatus("error");
      setResponseMessage(error.message || "Failed to submit your application. Please try again.");
    },
  });

  function onSubmit(data: FormValues) {
    mutation.mutate(data);
  }

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Internship Program</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Are you a student or recent graduate passionate about electrical engineering and
              sustainable energy solutions? Apply for our internship program to gain valuable industry
              experience and work alongside our team of experts.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <span className="text-primary font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Hands-on Experience</h3>
                  <p className="text-muted-foreground">Work on real projects with our engineering team and gain practical industry experience.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <span className="text-primary font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Mentorship</h3>
                  <p className="text-muted-foreground">Receive guidance from industry professionals who will help you develop your skills.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <span className="text-primary font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Career Growth</h3>
                  <p className="text-muted-foreground">Build your professional network and gain insights that will help shape your career path.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <span className="text-primary font-semibold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Innovation Focus</h3>
                  <p className="text-muted-foreground">Work with cutting-edge technologies in renewable energy and electrical engineering.</p>
                </div>
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
            {status === "idle" ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
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
                            <Input type="email" placeholder="your.email@example.com" {...field} />
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
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Educational Background</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., B.Tech in Electrical Engineering, IIT Delhi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area of Interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an area of interest" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="renewable_energy">Renewable Energy</SelectItem>
                            <SelectItem value="smart_grid">Smart Grid Technologies</SelectItem>
                            <SelectItem value="energy_efficiency">Energy Efficiency</SelectItem>
                            <SelectItem value="ev_infrastructure">EV Infrastructure</SelectItem>
                            <SelectItem value="power_systems">Power Systems</SelectItem>
                            <SelectItem value="automation">Building Automation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="resume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resume/CV Link</FormLabel>
                        <FormControl>
                          <Input placeholder="Link to your resume (Google Drive, Dropbox, etc.)" {...field} />
                        </FormControl>
                        <FormDescription>
                          Please provide a link to your resume or CV.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Message (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your relevant experience and why you're interested in joining our team"
                            className="resize-none"
                            {...field}
                          />
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
                        Submitting...
                      </div>
                    ) : (
                      <>
                        Submit Application <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            ) : (
              <Alert 
                className={status === "success" ? "bg-secondary/10" : "bg-destructive/10"}
              >
                {status === "success" ? (
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                )}
                <AlertDescription>{responseMessage}</AlertDescription>
                
                {status === "error" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-4" 
                    onClick={() => setStatus("idle")}
                  >
                    Try Again
                  </Button>
                )}
              </Alert>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
