import { useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, PlugZap, Cpu, LightbulbIcon, Car, Building2, School } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export default function Services() {
  // We'll fetch services from the API but provide fallback data
  const { data: services, isLoading } = useQuery({
    queryKey: ['/api/services'],
    initialData: [
      {
        id: 1,
        title: "Renewable Energy Solutions",
        description: "Design and implementation of solar, wind, and hybrid energy systems for residential and commercial applications.",
        icon: "plug-zap"
      },
      {
        id: 2,
        title: "Smart Grid Technologies",
        description: "Advanced monitoring and control systems for optimizing power distribution and energy management.",
        icon: "cpu"
      },
      {
        id: 3,
        title: "Energy Efficiency Consulting",
        description: "Comprehensive assessments and recommendations to reduce energy consumption and operational costs.",
        icon: "lightbulb"
      },
      {
        id: 4,
        title: "EV Charging Infrastructure",
        description: "Design and installation of electric vehicle charging stations for commercial and public spaces.",
        icon: "car"
      },
      {
        id: 5,
        title: "Building Automation",
        description: "Integrated systems for optimizing energy usage in commercial and industrial buildings.",
        icon: "building"
      },
      {
        id: 6,
        title: "Training & Workshops",
        description: "Educational programs on electrical engineering, renewable energy, and sustainable practices.",
        icon: "school"
      }
    ]
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "plug-zap": return <PlugZap className="h-10 w-10 text-primary" />;
      case "cpu": return <Cpu className="h-10 w-10 text-primary" />;
      case "lightbulb": return <LightbulbIcon className="h-10 w-10 text-primary" />;
      case "car": return <Car className="h-10 w-10 text-primary" />;
      case "building": return <Building2 className="h-10 w-10 text-primary" />;
      case "school": return <School className="h-10 w-10 text-primary" />;
      default: return <PlugZap className="h-10 w-10 text-primary" />;
    }
  };

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
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Comprehensive Services</h2>
          <p className="text-lg text-muted-foreground">
            Srimitha Energy Solutions offers a wide range of electrical engineering services 
            focused on innovation, sustainability, and efficiency.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={item}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                    {getIcon(service.icon)}
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/services#${service.id}`} className="text-primary">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link href="/services">
              View All Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
