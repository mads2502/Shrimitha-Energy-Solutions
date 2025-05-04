import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  ScrollText,
  Clock,
  BookOpen,
  Users
} from "lucide-react";
import { motion } from "framer-motion";

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  education: z.string().min(5, "Education details must be at least 5 characters"),
  experience: z.string().optional(),
  motivation: z.string().min(20, "Motivation statement must be at least 20 characters"),
  resume: z.string().optional(),
});

type ApplicationValues = z.infer<typeof applicationSchema>;

export default function Internships() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      education: "",
      experience: "",
      motivation: "",
      resume: "",
    },
  });

  // Scroll to the top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle form submission
  const onSubmit = async (data: ApplicationValues) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/internships/apply", data);
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Application Submitted!",
          description: result.message || "Your application has been submitted successfully. We'll be in touch soon!",
          variant: "default",
        });
        form.reset();
      } else {
        throw new Error(result.message || "Failed to submit application");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit your application. Please try again later.",
        variant: "destructive",
      });
      console.error("Application submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const internshipPrograms = [
    {
      id: 1,
      title: "Technical Engineering Internship",
      duration: "3-6 months",
      department: "Engineering",
      description: "Gain hands-on experience in electrical engineering projects, focusing on renewable energy systems and power electronics design. Work alongside senior engineers on real client projects.",
      requirements: [
        "Pursuing a degree in Electrical Engineering or related field",
        "Strong understanding of electrical circuits and systems",
        "Basic knowledge of renewable energy concepts",
        "Proficiency in technical software tools",
        "Excellent analytical and problem-solving skills"
      ],
      responsibilities: [
        "Assist in system design and engineering calculations",
        "Participate in project implementation and testing",
        "Contribute to technical documentation",
        "Support research and development initiatives",
        "Collaborate with cross-functional teams"
      ]
    },
    {
      id: 2,
      title: "Research & Development Internship",
      duration: "6 months",
      department: "R&D",
      description: "Engage in cutting-edge research focused on energy storage technologies, smart grid solutions, and innovative power management systems. Develop prototypes and conduct experiments to advance our technology portfolio.",
      requirements: [
        "Graduate or post-graduate student in Electrical/Power Engineering",
        "Strong academic record with research aptitude",
        "Experience with lab equipment and testing procedures",
        "Knowledge of simulation tools and data analysis",
        "Ability to conduct literature reviews and synthesize information"
      ],
      responsibilities: [
        "Conduct research on emerging energy technologies",
        "Design and execute experiments and tests",
        "Analyze data and prepare technical reports",
        "Assist in developing proof-of-concept prototypes",
        "Present findings to the R&D team"
      ]
    },
    {
      id: 3,
      title: "Energy Systems Analysis Internship",
      duration: "3 months",
      department: "Technical Analysis",
      description: "Focus on energy system modeling, performance analysis, and optimization strategies. Learn to evaluate energy infrastructure for efficiency improvements and sustainability enhancements.",
      requirements: [
        "Background in Engineering, Mathematics, or Physics",
        "Strong analytical skills and attention to detail",
        "Experience with data analysis and computational tools",
        "Understanding of energy systems and efficiency metrics",
        "Ability to translate technical findings into actionable insights"
      ],
      responsibilities: [
        "Analyze energy consumption patterns and performance data",
        "Model energy systems using specialized software",
        "Identify optimization opportunities in existing systems",
        "Support energy audit activities and reporting",
        "Contribute to client recommendations for system improvements"
      ]
    }
  ];

  const successStories = [
    {
      id: 1,
      name: "Arjun Sharma",
      role: "Former Technical Intern, now Senior Engineer",
      image: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4",
      quote: "My internship at Srimitha Energy Solutions provided invaluable hands-on experience with renewable energy systems. The mentorship I received from senior engineers laid the foundation for my career development, and I'm now proud to be a full-time team member leading my own projects.",
      yearJoined: 2018
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Former R&D Intern, now Research Lead",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      quote: "Starting as an R&D intern, I was immediately integrated into meaningful research projects on energy storage technologies. The collaborative environment and exposure to cutting-edge technologies accelerated my professional growth. Three years later, I'm leading our research initiatives in advanced battery systems.",
      yearJoined: 2019
    },
    {
      id: 3,
      name: "Rahul Kapoor",
      role: "Former Analyst Intern, now Project Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      quote: "My internship experience analyzing energy systems taught me how to approach complex problems methodically. The skills I developed in data analysis and project assessment have been instrumental in my current role managing large-scale implementation projects across multiple industries.",
      yearJoined: 2020
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Internship Opportunities</h1>
            <p className="text-xl opacity-90">
              Launch your career in electrical engineering and sustainable energy with hands-on experience and expert mentorship
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-white text-primary hover:bg-white/90 btn-hover-animate"
            >
              <a href="#apply">
                Apply Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Our Internship Program */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Build Your Future with Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our internship programs provide a structured learning environment where you can apply academic knowledge to real-world challenges while developing essential professional skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Practical Learning</h3>
                <p className="text-muted-foreground">
                  Work on actual projects and initiatives under the guidance of experienced professionals, directly applying your knowledge to solve real industry challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mentorship</h3>
                <p className="text-muted-foreground">
                  Receive guidance and feedback from industry experts who are committed to your professional growth and development throughout your internship journey.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Career Pathways</h3>
                <p className="text-muted-foreground">
                  Build connections and showcase your talents for potential full-time opportunities, with many of our current team members beginning as successful interns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Available Internship Programs */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Available Internship Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our current internship opportunities across various departments
            </p>
          </div>

          <Tabs defaultValue="engineering" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-12">
              <TabsTrigger value="engineering">Engineering</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="engineering" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-semibold mb-2">{internshipPrograms[0].title}</h3>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{internshipPrograms[0].duration}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{internshipPrograms[0].department}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        {internshipPrograms[0].description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-lg font-semibold mb-3">Requirements</h4>
                          <ul className="space-y-2">
                            {internshipPrograms[0].requirements.map((req, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold mb-3">Responsibilities</h4>
                          <ul className="space-y-2">
                            {internshipPrograms[0].responsibilities.map((resp, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/3 bg-primary/5 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold mb-4">What You'll Gain</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                            <span className="text-primary text-xs font-bold">1</span>
                          </div>
                          <p className="text-sm">Practical experience in electrical engineering projects</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                            <span className="text-primary text-xs font-bold">2</span>
                          </div>
                          <p className="text-sm">Technical skills in industry-standard tools and methodologies</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                            <span className="text-primary text-xs font-bold">3</span>
                          </div>
                          <p className="text-sm">Professional network within the energy engineering sector</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                            <span className="text-primary text-xs font-bold">4</span>
                          </div>
                          <p className="text-sm">Project portfolio to enhance your resume</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                            <span className="text-primary text-xs font-bold">5</span>
                          </div>
                          <p className="text-sm">Potential pathway to full-time employment</p>
                        </li>
                      </ul>
                      
                      <Button asChild className="w-full mt-6 bg-primary hover:bg-primary/90">
                        <a href="#apply">Apply for This Internship</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="research" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-semibold mb-2">{internshipPrograms[1].title}</h3>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{internshipPrograms[1].duration}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{internshipPrograms[1].department}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        {internshipPrograms[1].description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-lg font-semibold mb-3">Requirements</h4>
                          <ul className="space-y-2">
                            {internshipPrograms[1].requirements.map((req, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold mb-3">Responsibilities</h4>
                          <ul className="space-y-2">
                            {internshipPrograms[1].responsibilities.map((resp, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/3 bg-primary/5 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold mb-4">What You'll Gain</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                            <span className="text-primary text-xs font-bold">1</span>
                          </div>
                          <p className="text-sm">Deep understanding of cutting-edge energy technologies</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                            <span className="text-primary text-xs font-bold">2</span>
                          </div>
                          <p className="text-sm">Experience in research methodology and experimental design</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                            <span className="text-primary text-xs font-bold">3</span>
                          </div>
                          <p className="text-sm">Technical writing and presentation skills</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                            <span className="text-primary text-xs font-bold">4</span>
                          </div>
                          <p className="text-sm">Opportunities to contribute to publications</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                            <span className="text-primary text-xs font-bold">5</span>
                          </div>
                          <p className="text-sm">Connection to the R&D community in energy sector</p>
                        </li>
                      </ul>
                      
                      <Button asChild className="w-full mt-6 bg-primary hover:bg-primary/90">
                        <a href="#apply">Apply for This Internship</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-semibold mb-2">{internshipPrograms[2].title}</h3>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center text-sm">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{internshipPrograms[2].duration}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{internshipPrograms[2].department}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-6">
                        {internshipPrograms[2].description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-lg font-semibold mb-3">Requirements</h4>
                          <ul className="space-y-2">
                            {internshipPrograms[2].requirements.map((req, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold mb-3">Responsibilities</h4>
                          <ul className="space-y-2">
                            {internshipPrograms[2].responsibilities.map((resp, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/3 bg-primary/5 p-6 rounded-lg">
                      <h4 className="text-lg font-semibold mb-4">What You'll Gain</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                            <span className="text-primary text-xs font-bold">1</span>
                          </div>
                          <p className="text-sm">Advanced data analysis and modeling skills</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                            <span className="text-primary text-xs font-bold">2</span>
                          </div>
                          <p className="text-sm">Understanding of energy system optimization techniques</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                            <span className="text-primary text-xs font-bold">3</span>
                          </div>
                          <p className="text-sm">Experience with industry-standard analysis software</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                            <span className="text-primary text-xs font-bold">4</span>
                          </div>
                          <p className="text-sm">Critical thinking and problem-solving capabilities</p>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-primary/10 rounded-full p-1 mr-2 mt-0.5">
                            <span className="text-primary text-xs font-bold">5</span>
                          </div>
                          <p className="text-sm">Client interaction and communication experience</p>
                        </li>
                      </ul>
                      
                      <Button asChild className="w-full mt-6 bg-primary hover:bg-primary/90">
                        <a href="#apply">Apply for This Internship</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from former interns who have built successful careers with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <Card key={story.id} className="h-full">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{story.name}</h3>
                    <p className="text-primary text-sm">{story.role}</p>
                    <p className="text-xs text-muted-foreground">Joined {story.yearJoined}</p>
                  </div>
                  <div className="italic text-muted-foreground mb-4">
                    "{story.quote}"
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 md:py-24 bg-slate-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Apply for an Internship
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take the first step towards building your career with Srimitha Energy Solutions
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Your email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="education"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Education</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your educational background, including institution, degree, field of study, and expected graduation date"
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any relevant work experience, projects, or skills"
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Motivation</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Why are you interested in interning with Srimitha Energy Solutions, and what do you hope to achieve?"
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="resume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resume Link (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Link to your resume (Google Drive, Dropbox, etc.)" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Provide a link to your resume hosted on a cloud storage service
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full md:w-auto bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>

                    <FormDescription className="text-center text-sm">
                      By submitting this application, you consent to our processing of your information for recruitment purposes.
                    </FormDescription>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Common questions about our internship program
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">How long do internships typically last?</h3>
                <p className="text-muted-foreground">
                  Our internships range from 3-6 months, with specific durations mentioned in each program description. Some positions may have extension opportunities based on performance and project needs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Are internships paid?</h3>
                <p className="text-muted-foreground">
                  Yes, all our internships offer competitive stipends based on qualifications and the specific program. We believe in recognizing the valuable contributions of our interns.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">When can I apply for internships?</h3>
                <p className="text-muted-foreground">
                  We accept applications year-round and typically have intake periods at the beginning of each quarter. The review process usually takes 2-3 weeks, followed by interviews for shortlisted candidates.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">What is the selection process like?</h3>
                <p className="text-muted-foreground">
                  Our selection process includes resume screening, a technical assessment relevant to the internship area, and interviews with the team you'd be working with. We evaluate both technical abilities and teamwork potential.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-2">Do interns get hired for full-time positions?</h3>
                <p className="text-muted-foreground">
                  Many of our current team members started as interns! While we can't guarantee full-time employment, exceptional interns are often considered for available positions upon completion of their internship.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
