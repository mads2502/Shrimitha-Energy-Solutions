import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectCard } from "@/components/ui/project-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactForm } from "@/components/ui/contact-form";
import { ArrowRight, Calendar, Users, MapPin, Award, ExternalLink } from "lucide-react";
import { Project } from "@shared/schema";
import { motion } from "framer-motion";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Fetch projects data
  const { data: projects, isLoading } = useQuery({
    queryKey: ['/api/projects'],
  });

  // Scroll to the top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check if there's a hash in the URL to show a specific project
  useEffect(() => {
    if (window.location.hash && projects) {
      const slug = window.location.hash.substring(1);
      const project = projects.find(p => p.slug === slug);
      if (project) {
        setSelectedProject(project);
        setTimeout(() => {
          const element = document.getElementById('project-detail');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }
    }
  }, [projects, window.location.hash]);

  // Get unique categories
  const categories = projects 
    ? [...new Set(projects.map((project) => project.category))]
    : [];

  // Close project detail
  const handleCloseDetail = () => {
    setSelectedProject(null);
    window.history.pushState(null, '', window.location.pathname);
  };

  // Select project for detail view
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    window.history.pushState(null, '', `#${project.slug}`);
    setTimeout(() => {
      const element = document.getElementById('project-detail');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const ProjectDetail = ({ project }: { project: Project }) => {
    const formattedDate = project.completionDate 
      ? new Date(project.completionDate).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long',
          day: 'numeric'
        }) 
      : null;
        
    return (
      <div 
        id="project-detail" 
        className="scroll-mt-24 py-12 bg-slate-50 border-t border-b border-slate-200"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl md:text-3xl font-semibold">{project.title}</h3>
            <Button 
              variant="ghost" 
              onClick={handleCloseDetail}
              className="text-muted-foreground"
            >
              Close
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-lg overflow-hidden mb-6">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="prose max-w-none">
                <h4 className="text-xl font-semibold mb-4">Project Overview</h4>
                <p className="text-muted-foreground">{project.description}</p>
                
                <h4 className="text-xl font-semibold mt-8 mb-4">Challenges</h4>
                <ul>
                  <li>Integration with existing infrastructure while minimizing disruption</li>
                  <li>Engineering solutions to meet specific site constraints</li>
                  <li>Optimizing for both performance and sustainability</li>
                  <li>Meeting tight project timeline and budget requirements</li>
                </ul>
                
                <h4 className="text-xl font-semibold mt-8 mb-4">Solutions Implemented</h4>
                <p className="text-muted-foreground">
                  Our team engineered a custom solution that integrated seamlessly with existing systems while providing significant improvements in efficiency and reliability. Through careful planning and innovative design approaches, we were able to:
                </p>
                <ul>
                  <li>Deploy cutting-edge technology tailored to specific needs</li>
                  <li>Implement phased installation to minimize operational disruption</li>
                  <li>Build in scalability for future capacity expansion</li>
                  <li>Provide comprehensive staff training for optimal system management</li>
                </ul>
                
                <h4 className="text-xl font-semibold mt-8 mb-4">Results</h4>
                <p className="text-muted-foreground">
                  The implemented solution delivered significant improvements in both operational efficiency and sustainability metrics. Key outcomes included:
                </p>
                <ul>
                  <li>Reduced energy consumption by approximately 25-30%</li>
                  <li>Decreased maintenance requirements and associated costs</li>
                  <li>Enhanced system reliability with 99.9% uptime</li>
                  <li>Improved environmental performance with lower carbon emissions</li>
                </ul>
              </div>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h4 className="text-lg font-semibold mb-4">Project Details</h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-primary/10 rounded p-2 mr-3">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Client</p>
                        <p className="font-medium">{project.client || "Corporate Client"}</p>
                      </div>
                    </div>
                    
                    {formattedDate && (
                      <div className="flex items-start">
                        <div className="bg-primary/10 rounded p-2 mr-3">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Completion Date</p>
                          <p className="font-medium">{formattedDate}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 rounded p-2 mr-3">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">Project Site, India</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary/10 rounded p-2 mr-3">
                        <Award className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium">{project.category}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <h4 className="text-sm font-semibold mb-3">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded">Smart Grid</span>
                      <span className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded">IoT Sensors</span>
                      <span className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded">Energy Storage</span>
                      <span className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded">Monitoring Systems</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h4 className="text-lg font-semibold mb-4">Interested in a Similar Solution?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact our team to discuss how we can implement a similar project customized for your specific needs.
                  </p>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link href={`/contact?subject=Project Inquiry: ${encodeURIComponent(project.title)}`}>
                      Request a Consultation
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl opacity-90">
              Showcasing our successful implementations across various sectors
            </p>
          </div>
        </div>
      </section>

      {/* Selected Project Detail */}
      {selectedProject && (
        <ProjectDetail project={selectedProject} />
      )}

      {/* Projects Gallery Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Project Showcase
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our portfolio of completed projects across various energy sectors
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList>
                <TabsTrigger value="all">All Projects</TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="all">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, index) => (
                    <Card key={index} className="h-80 animate-pulse">
                      <div className="h-40 bg-slate-200"></div>
                      <CardContent className="p-6">
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
                  {projects?.map((project) => (
                    <div 
                      key={project.id} 
                      onClick={() => handleSelectProject(project)}
                      className="cursor-pointer"
                    >
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects
                    ?.filter((project) => project.category === category)
                    .map((project) => (
                      <div 
                        key={project.id} 
                        onClick={() => handleSelectProject(project)}
                        className="cursor-pointer"
                      >
                        <ProjectCard project={project} />
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Project Process Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Project Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              How we turn your energy challenges into successful implementations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Consultation & Analysis</h3>
                <p className="text-muted-foreground">
                  We begin with a thorough assessment of your energy needs, site conditions, and objectives to develop a comprehensive understanding of your project requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Engineering & Design</h3>
                <p className="text-muted-foreground">
                  Our expert engineers develop detailed designs and specifications that optimize performance, reliability, and cost-effectiveness while adhering to all applicable standards.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Implementation</h3>
                <p className="text-muted-foreground">
                  Our skilled team manages the installation and integration process with precision, ensuring minimal disruption to your operations and strict adherence to quality standards.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Optimization & Support</h3>
                <p className="text-muted-foreground">
                  After commissioning, we provide ongoing support, monitoring, and optimization services to ensure your system continues to perform at peak efficiency.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Contact our team today to discuss your energy project requirements and discover how we can help you achieve your goals.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 btn-hover-animate"
            >
              <Link href="/contact">
                Start Your Project
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
              <h2 className="text-3xl font-bold mb-6">Discuss Your Project with Us</h2>
              <p className="text-muted-foreground mb-6">
                Have a project in mind or need expert guidance on your energy infrastructure? 
                Fill out the form and our team will get in touch to discuss your specific requirements.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-4 mt-1">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Expert Consultation</h4>
                    <p className="text-muted-foreground">
                      Our specialists will analyze your specific needs and provide tailored recommendations.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-4 mt-1">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Quality Assurance</h4>
                    <p className="text-muted-foreground">
                      We adhere to the highest standards in engineering and project execution for reliable results.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-4 mt-1">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Timely Delivery</h4>
                    <p className="text-muted-foreground">
                      Our project management approach ensures on-time completion within agreed parameters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <ContactForm defaultSubject="Project Inquiry" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
