import { useQuery } from "@tanstack/react-query";
import { Check, ChevronDown, PlugZap, Cpu, LightbulbIcon, Car, Building2, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  features: string[];
  caseStudy?: {
    title: string;
    description: string;
    outcome: string;
  };
}

export default function Services() {
  // Fetch services from the API but provide fallback data
  const { data: services, isLoading } = useQuery({
    queryKey: ['/api/services'],
    initialData: [
      {
        id: 1,
        title: "Renewable Energy Solutions",
        description: "Design and implementation of solar, wind, and hybrid energy systems for residential and commercial applications.",
        icon: "plug-zap",
        benefits: [
          "Reduce dependence on grid electricity",
          "Lower energy costs over system lifetime",
          "Minimize environmental impact",
          "Qualify for government incentives and tax credits",
          "Enhance energy independence and security"
        ],
        features: [
          "Comprehensive site assessment and feasibility studies",
          "Custom system design based on energy requirements",
          "Turn-key installation services",
          "System monitoring and maintenance",
          "Performance optimization recommendations"
        ],
        caseStudy: {
          title: "Commercial Solar Installation for Tech Campus",
          description: "Designed and installed a 500kW rooftop solar system for a major tech company campus, providing 40% of their energy needs.",
          outcome: "The system reduced electricity costs by 35% and is expected to pay for itself within 5 years while preventing 450 tons of CO2 emissions annually."
        }
      },
      {
        id: 2,
        title: "Smart Grid Technologies",
        description: "Advanced monitoring and control systems for optimizing power distribution and energy management.",
        icon: "cpu",
        benefits: [
          "Improve grid reliability and resilience",
          "Enable more efficient power distribution",
          "Support integration of renewable energy sources",
          "Reduce power outages and recovery time",
          "Enable demand response capabilities"
        ],
        features: [
          "Advanced metering infrastructure (AMI)",
          "Distribution automation systems",
          "Energy management systems",
          "SCADA integration",
          "Predictive maintenance solutions"
        ],
        caseStudy: {
          title: "Municipal Smart Grid Implementation",
          description: "Designed and implemented a comprehensive smart grid system for a mid-sized municipality serving 75,000 residents.",
          outcome: "Reduced outage response times by 65%, decreased line losses by 18%, and enabled better integration of local renewable energy resources."
        }
      },
      {
        id: 3,
        title: "Energy Efficiency Consulting",
        description: "Comprehensive assessments and recommendations to reduce energy consumption and operational costs.",
        icon: "lightbulb",
        benefits: [
          "Identify energy waste and inefficiencies",
          "Reduce operational costs",
          "Prioritize improvement measures by ROI",
          "Develop sustainability roadmaps",
          "Meet regulatory compliance requirements"
        ],
        features: [
          "Detailed energy audits and assessments",
          "Thermal imaging and equipment efficiency testing",
          "Load profile analysis",
          "Energy management planning",
          "Implementation support and verification"
        ],
        caseStudy: {
          title: "Hospital Energy Efficiency Upgrade",
          description: "Conducted a comprehensive energy audit for a 350-bed hospital and implemented recommended efficiency measures.",
          outcome: "Reduced annual energy consumption by 28% and saved approximately $425,000 in yearly operating costs while improving patient comfort."
        }
      },
      {
        id: 4,
        title: "EV Charging Infrastructure",
        description: "Design and installation of electric vehicle charging stations for commercial and public spaces.",
        icon: "car",
        benefits: [
          "Support sustainability initiatives",
          "Attract environmentally conscious customers",
          "Generate additional revenue streams",
          "Qualify for government incentives",
          "Future-proof your facilities for growing EV adoption"
        ],
        features: [
          "Site assessment and planning",
          "Power capacity analysis and upgrades",
          "Equipment selection and procurement",
          "Installation and commissioning",
          "Management systems and payment solutions"
        ],
        caseStudy: {
          title: "Multi-location Retail EV Charging Network",
          description: "Designed and installed a network of 75 EV charging stations across 18 retail locations for a major shopping center developer.",
          outcome: "Increased customer visit duration by 23% and boosted retail sales while establishing the client as a leader in sustainable retail development."
        }
      },
      {
        id: 5,
        title: "Building Automation",
        description: "Integrated systems for optimizing energy usage in commercial and industrial buildings.",
        icon: "building",
        benefits: [
          "Reduce energy consumption by 15-30%",
          "Improve occupant comfort and productivity",
          "Centralize building systems management",
          "Enable predictive maintenance",
          "Extend equipment lifespan"
        ],
        features: [
          "HVAC control and optimization",
          "Lighting automation systems",
          "Security and access control integration",
          "Indoor air quality monitoring",
          "Energy usage analytics and reporting"
        ],
        caseStudy: {
          title: "Corporate Headquarters Automation Upgrade",
          description: "Implemented a comprehensive building automation system for a 22-story corporate headquarters with 500,000 square feet of space.",
          outcome: "Reduced energy costs by 24%, improved tenant satisfaction scores by 18%, and increased building value by approximately $4.5 million."
        }
      },
      {
        id: 6,
        title: "Training & Workshops",
        description: "Educational programs on electrical engineering, renewable energy, and sustainable practices.",
        icon: "school",
        benefits: [
          "Develop technical expertise in-house",
          "Stay updated on industry advancements",
          "Meet continuing education requirements",
          "Build a culture of innovation",
          "Network with industry professionals"
        ],
        features: [
          "Customized training programs",
          "Hands-on workshops and demonstrations",
          "Certification preparation courses",
          "Virtual and in-person options",
          "Technical documentation and resources"
        ],
        caseStudy: {
          title: "Renewable Energy Training Program for Engineering Firm",
          description: "Developed and delivered a comprehensive 6-month training program for a civil engineering firm transitioning into renewable energy projects.",
          outcome: "Successfully trained 35 engineers, resulting in the firm securing three major renewable energy contracts worth $8.5 million within the first year."
        }
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

  return (
    <>
      <Helmet>
        <title>Services - Srimitha Energy Solutions</title>
        <meta name="description" content="Explore our comprehensive electrical engineering services including renewable energy solutions, smart grid technologies, energy efficiency consulting, and more." />
      </Helmet>
      
      <div className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-lg text-muted-foreground">
              Srimitha Energy Solutions offers a comprehensive range of electrical engineering services
              designed to help businesses and organizations achieve their energy efficiency and sustainability goals.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16">
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                id={`${service.id}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="bg-muted p-8 rounded-xl relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-6">
                      {getIcon(service.icon)}
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    
                    <h3 className="font-semibold text-lg mb-3">Key Features</h3>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="mt-4">
                      Request Consultation
                    </Button>
                  </div>
                  
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary/5 z-0"></div>
                  <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-primary/5 z-0"></div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-xl mb-4">Benefits</h3>
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    {service.benefits.map((benefit, idx) => (
                      <Card key={idx} className="bg-background hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center">
                          <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                            <Check className="h-5 w-5 text-primary" />
                          </div>
                          <span>{benefit}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {service.caseStudy && (
                    <div className="bg-primary/10 p-6 rounded-lg">
                      <h3 className="font-semibold text-xl mb-4">Case Study: {service.caseStudy.title}</h3>
                      <p className="mb-4">{service.caseStudy.description}</p>
                      <p className="font-medium">Outcome: {service.caseStudy.outcome}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="bg-background rounded-lg p-6">
              <AccordionItem value="item-1">
                <AccordionTrigger>What types of projects does Srimitha Energy Solutions typically handle?</AccordionTrigger>
                <AccordionContent>
                  We handle a wide range of projects, from small-scale residential renewable energy installations to large commercial and industrial power systems. Our expertise includes solar and wind energy systems, EV charging infrastructure, smart grid technology implementation, energy efficiency upgrades, and building automation.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>What is the typical return on investment for energy efficiency upgrades?</AccordionTrigger>
                <AccordionContent>
                  The ROI varies based on the specific measures implemented, but most of our clients see payback periods ranging from 1-5 years for energy efficiency upgrades. We conduct thorough assessments to identify the measures with the best ROI for your specific situation.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Do you provide ongoing maintenance services?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer comprehensive maintenance packages for all our installations. These can include regular inspections, performance monitoring, preventive maintenance, and emergency repair services. We recommend maintenance plans to ensure optimal system performance and longevity.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Can you help with government incentives and rebates for energy projects?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. Our team stays up-to-date on all available government incentives, tax credits, and utility rebates. We help our clients navigate the application process to maximize the financial benefits available for their energy projects.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>What makes Srimitha Energy Solutions different from other electrical engineering firms?</AccordionTrigger>
                <AccordionContent>
                  Our approach combines technical excellence with a deep commitment to sustainability. We focus on creating customized solutions that address each client's unique needs rather than offering one-size-fits-all packages. Our team includes specialists in multiple disciplines, allowing us to provide comprehensive services from initial concept to implementation and beyond.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
