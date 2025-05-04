import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link?: string;
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState("all");

  // We'll fetch projects from the API but provide fallback data
  const { data: projects, isLoading } = useQuery({
    queryKey: ['/api/projects'],
    initialData: [
      {
        id: 1,
        title: "Solar Microgrid Installation",
        description: "A 500kW solar microgrid system designed and installed for a rural community, providing reliable and sustainable power.",
        category: "renewable",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 2,
        title: "Smart Building Management System",
        description: "Comprehensive energy management system for a 30-story commercial building, reducing energy consumption by 35%.",
        category: "commercial",
        imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 3,
        title: "EV Charging Network",
        description: "Citywide electric vehicle charging infrastructure with 50+ stations, supporting the transition to sustainable transportation.",
        category: "ev",
        imageUrl: "https://images.unsplash.com/photo-1593941707882-a56bbc8df48c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 4,
        title: "Industrial Power Optimization",
        description: "Redesigned power distribution system for a manufacturing facility, improving efficiency and reducing downtime.",
        category: "industrial",
        imageUrl: "https://images.unsplash.com/photo-1531758854681-aaa1a8a1f5bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 5,
        title: "Wind Farm Integration",
        description: "Technical design and grid integration for a 25MW wind farm, including power quality and stability analysis.",
        category: "renewable",
        imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 6,
        title: "Hospital Backup Power System",
        description: "Critical power backup solution for a major hospital, ensuring uninterrupted operation during outages.",
        category: "commercial",
        imageUrl: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground">
            Explore our portfolio of successful electrical engineering projects across various sectors.
          </p>
        </div>

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
                  <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-200">
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
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/projects/${project.id}`}>
                          View Details <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/projects">
              Explore All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
