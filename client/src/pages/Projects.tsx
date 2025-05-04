import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, CalendarIcon, User2, Building, Zap } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription?: string;
  category: string;
  client: string;
  location: string;
  completionDate: string;
  imageUrl: string;
  features?: string[];
  results?: string[];
  slug: string;
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Fetch projects from API with fallback data
  const { data: projects, isLoading } = useQuery({
    queryKey: ['/api/projects'],
    initialData: [
      {
        id: 1,
        title: "Solar Microgrid Installation",
        description: "A 500kW solar microgrid system designed and installed for a rural community, providing reliable and sustainable power.",
        detailedDescription: "This comprehensive project involved the design and implementation of a 500kW solar microgrid system for a rural community that previously had limited access to reliable electricity. The system includes 1,850 solar panels, advanced battery storage facilities, and intelligent distribution infrastructure.",
        category: "renewable",
        client: "Community Development Foundation",
        location: "Madhya Pradesh, India",
        completionDate: "2022-08-15",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: [
          "500kW solar array with optimized positioning",
          "250kWh battery storage system",
          "Smart distribution network with load management",
          "Remote monitoring and control capabilities",
          "Resilient design for harsh weather conditions"
        ],
        results: [
          "Provided reliable electricity to 450 households",
          "Reduced diesel generator usage by 95%",
          "Decreased energy costs by 40% for community members",
          "Prevented approximately 750 tons of CO2 emissions annually",
          "Created 15 local jobs for system maintenance and operations"
        ],
        slug: "solar-microgrid-installation"
      },
      {
        id: 2,
        title: "Smart Building Management System",
        description: "Comprehensive energy management system for a 30-story commercial building, reducing energy consumption by 35%.",
        detailedDescription: "We designed and implemented a state-of-the-art building management system for a 30-story commercial complex in Bangalore. The system integrates HVAC control, lighting automation, occupancy sensing, and energy analytics to optimize building performance.",
        category: "commercial",
        client: "Horizon Developers Ltd.",
        location: "Bangalore, Karnataka",
        completionDate: "2022-11-10",
        imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: [
          "AI-powered HVAC optimization",
          "Dynamic lighting control with daylight harvesting",
          "Occupancy-based energy management",
          "Predictive maintenance alerts",
          "Comprehensive energy usage dashboard",
          "Integration with renewable energy sources"
        ],
        results: [
          "35% reduction in overall energy consumption",
          "Annual savings of ₹1.2 crore in energy costs",
          "Improved occupant comfort through optimized climate control",
          "Extended equipment lifespan through predictive maintenance",
          "Achieved LEED Platinum certification"
        ],
        slug: "smart-building-management-system"
      },
      {
        id: 3,
        title: "EV Charging Network",
        description: "Citywide electric vehicle charging infrastructure with 50+ stations, supporting the transition to sustainable transportation.",
        detailedDescription: "This transformative project established a comprehensive network of electric vehicle charging stations across Mumbai, supporting the city's transition to sustainable transportation. The network features a mix of fast-charging and standard charging options strategically placed throughout urban and suburban areas.",
        category: "ev",
        client: "Mumbai Metropolitan Development Authority",
        location: "Mumbai, Maharashtra",
        completionDate: "2023-02-28",
        imageUrl: "https://images.unsplash.com/photo-1593941707882-a56bbc8df48c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: [
          "50+ charging stations across the metropolitan area",
          "Mix of Level 2 and DC fast charging options",
          "Smart load balancing to prevent grid strain",
          "Mobile app integration for location and availability",
          "Payment system integration",
          "Solar canopies at select locations"
        ],
        results: [
          "Enabled charging access for over 3,000 EV owners monthly",
          "Reduced carbon emissions by an estimated 1,800 tons annually",
          "Increased EV adoption in the region by 22%",
          "Generated new revenue stream for parking facility owners",
          "Created a sustainable transportation corridor"
        ],
        slug: "ev-charging-network"
      },
      {
        id: 4,
        title: "Industrial Power Optimization",
        description: "Redesigned power distribution system for a manufacturing facility, improving efficiency and reducing downtime.",
        detailedDescription: "For a major textile manufacturing facility, we conducted a comprehensive redesign of their power distribution system to address issues with reliability, efficiency, and power quality. The project included power factor correction, harmonic filtering, and implementation of advanced monitoring systems.",
        category: "industrial",
        client: "Textile Innovations Ltd.",
        location: "Ahmedabad, Gujarat",
        completionDate: "2023-01-15",
        imageUrl: "https://images.unsplash.com/photo-1531758854681-aaa1a8a1f5bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: [
          "Power quality assessment and improvement",
          "Energy-efficient transformer replacements",
          "Implementation of power factor correction",
          "Harmonic mitigation systems",
          "Real-time energy monitoring dashboard",
          "Predictive maintenance program"
        ],
        results: [
          "15% reduction in energy losses",
          "90% decrease in production downtime due to power issues",
          "Improved equipment lifespan through better power quality",
          "Annual energy cost savings of ₹75 lakhs",
          "Enhanced production quality through stable power supply"
        ],
        slug: "industrial-power-optimization"
      },
      {
        id: 5,
        title: "Wind Farm Integration",
        description: "Technical design and grid integration for a 25MW wind farm, including power quality and stability analysis.",
        detailedDescription: "We led the technical design and grid integration for a 25MW wind farm in Tamil Nadu, overcoming significant challenges in power quality and grid stability. Our team conducted extensive analysis and implemented innovative solutions to ensure seamless integration with the regional electricity grid.",
        category: "renewable",
        client: "GreenPower Renewables",
        location: "Coimbatore, Tamil Nadu",
        completionDate: "2022-06-20",
        imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: [
          "Grid impact assessment and mitigation design",
          "Power quality improvement systems",
          "SCADA integration for remote monitoring",
          "Fault ride-through capability",
          "Reactive power compensation",
          "Custom substation design and implementation"
        ],
        results: [
          "Successful integration of 25MW capacity into regional grid",
          "Compliance with all grid code requirements",
          "Generation of approximately 78,000 MWh of clean energy annually",
          "Carbon offset equivalent to removing 16,000 cars from the road",
          "Enhanced grid stability in the region"
        ],
        slug: "wind-farm-integration"
      },
      {
        id: 6,
        title: "Hospital Backup Power System",
        description: "Critical power backup solution for a major hospital, ensuring uninterrupted operation during outages.",
        detailedDescription: "We designed and implemented a comprehensive backup power system for a 450-bed hospital in Chennai, ensuring continuous operation of critical systems during power outages. The solution includes redundant generators, UPS systems, and sophisticated transfer mechanisms with minimal transition time.",
        category: "commercial",
        client: "LifeCare Hospital Group",
        location: "Chennai, Tamil Nadu",
        completionDate: "2022-12-05",
        imageUrl: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: [
          "3x 1,000 kVA diesel generators with N+1 redundancy",
          "Modular UPS systems for critical care areas",
          "Advanced automatic transfer switches with <10ms transition",
          "Intelligent load prioritization system",
          "Fuel management system with 72-hour capacity",
          "Remote monitoring and alert infrastructure"
        ],
        results: [
          "Zero downtime for critical hospital systems during outages",
          "Seamless power transition undetectable to sensitive medical equipment",
          "Enhanced patient safety through reliable power",
          "Reduced emergency response time through automated systems",
          "Compliance with international healthcare power reliability standards"
        ],
        slug: "hospital-backup-power-system"
      },
      {
        id: 7,
        title: "University Campus Microgrid",
        description: "Comprehensive energy solution combining solar, storage, and intelligent distribution for a university campus.",
        detailedDescription: "We designed and implemented a campus-wide microgrid for a prominent technical university, integrating renewable generation, energy storage, and intelligent distribution. The system can operate in both grid-connected and island modes, providing energy security and demonstrating cutting-edge technologies.",
        category: "renewable",
        client: "National Institute of Technology",
        location: "Jaipur, Rajasthan",
        completionDate: "2023-03-15",
        imageUrl: "https://images.unsplash.com/photo-1569441498515-5db81388b488?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: [
          "2 MW solar PV array distributed across campus buildings",
          "1 MWh battery energy storage system",
          "Advanced energy management system with predictive capabilities",
          "Islanding capability during grid outages",
          "Real-time monitoring available as student learning tool",
          "EV charging stations powered by the microgrid"
        ],
        results: [
          "60% reduction in energy drawn from the public grid",
          "Savings of approximately ₹1.8 crore annually in energy costs",
          "Enhanced learning opportunities for engineering students",
          "Resilient power supply during regional outages",
          "Reduction of 1,500 metric tons of CO2 emissions annually"
        ],
        slug: "university-campus-microgrid"
      },
      {
        id: 8,
        title: "Smart Street Lighting System",
        description: "City-wide implementation of intelligent LED street lighting with adaptive controls and monitoring capabilities.",
        detailedDescription: "We transformed the street lighting infrastructure for a mid-sized city by implementing a comprehensive smart LED system with adaptive controls. The project replaced over 12,000 conventional streetlights with energy-efficient LED fixtures equipped with intelligent controls and connected to a central management system.",
        category: "commercial",
        client: "Pune Municipal Corporation",
        location: "Pune, Maharashtra",
        completionDate: "2022-09-30",
        imageUrl: "https://images.unsplash.com/photo-1547357225-7cc1ad2cae7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        features: [
          "12,000+ energy-efficient LED fixtures",
          "Adaptive dimming based on time and traffic conditions",
          "Real-time monitoring and automatic fault detection",
          "Centralized control system with geographic information",
          "Integration with traffic management systems",
          "Emergency response mode capabilities"
        ],
        results: [
          "68% reduction in street lighting energy consumption",
          "Annual energy cost savings of ₹3.2 crore",
          "85% decrease in lighting maintenance costs",
          "Improved lighting quality and public safety",
          "Reduced light pollution through targeted illumination",
          "Enhanced visibility during emergency situations"
        ],
        slug: "smart-street-lighting-system"
      }
    ]
  });

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Helmet>
        <title>Projects - Srimitha Energy Solutions</title>
        <meta name="description" content="Explore our portfolio of successful electrical engineering projects, from renewable energy installations to smart grid technologies and energy efficiency solutions." />
      </Helmet>
      
      <div className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Our Projects</h1>
            <p className="text-lg text-muted-foreground">
              Explore our portfolio of innovative electrical engineering projects
              that are driving sustainability and energy efficiency.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveTab}>
            <TabsList className="mx-auto flex justify-center">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="renewable">Renewable Energy</TabsTrigger>
              <TabsTrigger value="commercial">Commercial</TabsTrigger>
              <TabsTrigger value="industrial">Industrial</TabsTrigger>
              <TabsTrigger value="ev">EV Infrastructure</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-8">
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project) => (
                  <motion.div key={project.id} variants={item}>
                    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-200">
                      <div className="relative h-60 bg-muted">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="capitalize">
                            {project.category.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Building className="h-4 w-4 mr-2" />
                            <span>{project.client}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            <span>{new Date(project.completionDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={() => setSelectedProject(project)}>
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 m-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                <p className="text-muted-foreground">{selectedProject.description}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedProject(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                <span className="sr-only">Close</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Project Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Client</p>
                        <p className="font-medium">{selectedProject.client}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">{selectedProject.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Completion Date</p>
                        <p className="font-medium">{new Date(selectedProject.completionDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium capitalize">{selectedProject.category.replace('-', ' ')}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">{selectedProject.detailedDescription}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {selectedProject.features && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-1 text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedProject.results && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Results & Impact</h3>
                    <ul className="space-y-2">
                      {selectedProject.results.map((result, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-1 text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                          </div>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <Button className="w-full">
                  Contact Us About Similar Projects
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's work together to create innovative electrical engineering solutions
              that align with your sustainability goals and business needs.
            </p>
            <Button size="lg" asChild>
              <a href="/contact">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
