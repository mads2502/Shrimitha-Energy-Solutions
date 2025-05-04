import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight, Download, CalendarDays, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Helmet } from "react-helmet";

interface Workshop {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registeredCount: number;
  type: "in-person" | "virtual" | "hybrid";
  category: string;
  presenter: string;
  presenterTitle: string;
  price: number | null;
  registrationLink: string;
  materials?: Array<{
    name: string;
    url: string;
  }>;
  agenda?: Array<{
    time: string;
    title: string;
    description: string;
  }>;
}

export default function Workshops() {
  const [filter, setFilter] = useState("upcoming");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);

  // Fetch workshops from the API with fallback data
  const { data: workshops, isLoading } = useQuery({
    queryKey: ['/api/workshops'],
    initialData: [
      {
        id: 1,
        title: "Renewable Energy Integration",
        description: "Learn about the technical aspects of integrating renewable energy sources into existing power systems. This comprehensive workshop covers grid connection challenges, power quality issues, and practical solutions to common integration problems.",
        date: "2023-09-15",
        time: "10:00 AM - 3:00 PM",
        location: "Srimitha Tech Center, Bangalore",
        capacity: 40,
        registeredCount: 32,
        type: "in-person",
        category: "technical",
        presenter: "Dr. Anand Sharma",
        presenterTitle: "Chief Technical Officer, Srimitha Energy",
        price: 2500,
        registrationLink: "/workshops/register/1",
        materials: [
          {
            name: "Workshop Agenda",
            url: "/materials/renewable-energy-integration-agenda.pdf"
          },
          {
            name: "Pre-reading Materials",
            url: "/materials/renewable-energy-prereading.pdf"
          }
        ],
        agenda: [
          {
            time: "10:00 AM - 10:30 AM",
            title: "Introduction & Overview",
            description: "Welcome and introduction to renewable energy integration challenges"
          },
          {
            time: "10:30 AM - 12:00 PM",
            title: "Technical Fundamentals",
            description: "Grid connection requirements, inverter technologies, and power quality considerations"
          },
          {
            time: "12:00 PM - 1:00 PM",
            title: "Lunch Break",
            description: "Networking opportunity with refreshments provided"
          },
          {
            time: "1:00 PM - 2:30 PM",
            title: "Practical Applications",
            description: "Case studies and hands-on exercises with simulation tools"
          },
          {
            time: "2:30 PM - 3:00 PM",
            title: "Q&A and Conclusion",
            description: "Open discussion and takeaway resources"
          }
        ]
      },
      {
        id: 2,
        title: "Smart Grid Technologies Workshop",
        description: "Explore the latest innovations in smart grid technologies and their applications in modern power systems. From advanced metering infrastructure to distribution automation, this workshop provides a comprehensive overview of the smart grid ecosystem.",
        date: "2023-09-22",
        time: "9:00 AM - 1:00 PM",
        location: "Virtual",
        capacity: 100,
        registeredCount: 68,
        type: "virtual",
        category: "technology",
        presenter: "Er. Rajiv Mehta",
        presenterTitle: "Smart Grid Specialist, Srimitha Energy",
        price: 1500,
        registrationLink: "/workshops/register/2",
        materials: [
          {
            name: "Workshop Slides",
            url: "/materials/smart-grid-slides.pdf"
          },
          {
            name: "Reference Guide",
            url: "/materials/smart-grid-reference.pdf"
          }
        ],
        agenda: [
          {
            time: "9:00 AM - 9:30 AM",
            title: "Introduction to Smart Grids",
            description: "Evolution from traditional to smart grid architecture"
          },
          {
            time: "9:30 AM - 10:30 AM",
            title: "Advanced Metering Infrastructure",
            description: "Smart meters, communication networks, and data management systems"
          },
          {
            time: "10:30 AM - 10:45 AM",
            title: "Short Break",
            description: ""
          },
          {
            time: "10:45 AM - 12:00 PM",
            title: "Distribution Automation",
            description: "Fault detection, isolation, and restoration systems"
          },
          {
            time: "12:00 PM - 1:00 PM",
            title: "Future Trends and Q&A",
            description: "Emerging technologies and interactive discussion"
          }
        ]
      },
      {
        id: 3,
        title: "EV Charging Infrastructure Design",
        description: "Comprehensive workshop on designing efficient and scalable electric vehicle charging infrastructure. Learn about different charging standards, power requirements, load management, and integration with building electrical systems.",
        date: "2023-10-05",
        time: "10:00 AM - 4:00 PM",
        location: "Hybrid - Tech Park & Virtual",
        capacity: 60,
        registeredCount: 45,
        type: "hybrid",
        category: "design",
        presenter: "Ms. Priya Venkat",
        presenterTitle: "EV Infrastructure Lead, Srimitha Energy",
        price: 3500,
        registrationLink: "/workshops/register/3",
        materials: [
          {
            name: "Design Guidelines",
            url: "/materials/ev-charging-design-guidelines.pdf"
          },
          {
            name: "Case Studies Document",
            url: "/materials/ev-charging-case-studies.pdf"
          }
        ],
        agenda: [
          {
            time: "10:00 AM - 11:00 AM",
            title: "EV Charging Fundamentals",
            description: "Charging levels, standards, and vehicle compatibility"
          },
          {
            time: "11:00 AM - 12:30 PM",
            title: "Site Assessment & Planning",
            description: "Location criteria, electrical capacity evaluation, and traffic flow analysis"
          },
          {
            time: "12:30 PM - 1:30 PM",
            title: "Lunch Break",
            description: "Networking lunch provided for in-person attendees"
          },
          {
            time: "1:30 PM - 2:45 PM",
            title: "Load Management Strategies",
            description: "Smart charging, load balancing, and peak demand mitigation"
          },
          {
            time: "2:45 PM - 3:45 PM",
            title: "Installation & Commissioning",
            description: "Best practices, safety considerations, and testing procedures"
          },
          {
            time: "3:45 PM - 4:00 PM",
            title: "Conclusion & Resources",
            description: "Additional learning resources and certificate distribution"
          }
        ]
      },
      {
        id: 4,
        title: "Energy Efficiency in Commercial Buildings",
        description: "Strategies and technologies for improving energy efficiency in commercial and industrial buildings. This workshop covers energy auditing, HVAC optimization, lighting upgrades, and building automation systems.",
        date: "2023-10-12",
        time: "1:00 PM - 5:00 PM",
        location: "Srimitha Tech Center, Bangalore",
        capacity: 50,
        registeredCount: 28,
        type: "in-person",
        category: "efficiency",
        presenter: "Er. Suresh Kumar",
        presenterTitle: "Energy Efficiency Consultant, Srimitha Energy",
        price: 2000,
        registrationLink: "/workshops/register/4",
        materials: [
          {
            name: "Efficiency Assessment Toolkit",
            url: "/materials/energy-efficiency-toolkit.pdf"
          },
          {
            name: "ROI Calculator Template",
            url: "/materials/efficiency-roi-calculator.xlsx"
          }
        ],
        agenda: [
          {
            time: "1:00 PM - 1:30 PM",
            title: "Introduction to Building Energy Efficiency",
            description: "Importance, regulatory landscape, and economic benefits"
          },
          {
            time: "1:30 PM - 2:30 PM",
            title: "Energy Auditing Methodologies",
            description: "Assessment techniques, measurement tools, and analysis methods"
          },
          {
            time: "2:30 PM - 3:15 PM",
            title: "HVAC & Lighting Optimization",
            description: "Technology options, control strategies, and implementation approaches"
          },
          {
            time: "3:15 PM - 3:30 PM",
            title: "Tea Break",
            description: ""
          },
          {
            time: "3:30 PM - 4:30 PM",
            title: "Building Automation Systems",
            description: "Integration strategies, monitoring, and continuous commissioning"
          },
          {
            time: "4:30 PM - 5:00 PM",
            title: "Investment Analysis & Conclusion",
            description: "ROI calculations, funding opportunities, and action planning"
          }
        ]
      },
      {
        id: 5,
        title: "Power Quality Analysis & Improvement",
        description: "A technical workshop focusing on power quality issues, measurement techniques, and mitigation strategies in industrial and commercial settings.",
        date: "2023-10-25",
        time: "9:00 AM - 4:00 PM",
        location: "Srimitha Training Center, Chennai",
        capacity: 30,
        registeredCount: 22,
        type: "in-person",
        category: "technical",
        presenter: "Dr. Ramesh Iyer",
        presenterTitle: "Power Systems Specialist, Srimitha Energy",
        price: 4000,
        registrationLink: "/workshops/register/5",
        materials: [
          {
            name: "Power Quality Standards Guide",
            url: "/materials/power-quality-standards.pdf"
          },
          {
            name: "Harmonic Analysis Software (Trial)",
            url: "/materials/harmonic-analyzer-trial.zip"
          }
        ],
        agenda: [
          {
            time: "9:00 AM - 10:00 AM",
            title: "Power Quality Fundamentals",
            description: "Key parameters, standards, and their impact on equipment reliability"
          },
          {
            time: "10:00 AM - 11:30 AM",
            title: "Measurement Techniques & Equipment",
            description: "Proper use of power quality analyzers and interpretation of results"
          },
          {
            time: "11:30 AM - 12:30 PM",
            title: "Common Power Quality Issues",
            description: "Harmonics, sags, swells, flicker, and transients"
          },
          {
            time: "12:30 PM - 1:30 PM",
            title: "Lunch Break",
            description: ""
          },
          {
            time: "1:30 PM - 3:00 PM",
            title: "Mitigation Strategies",
            description: "Filtering, power conditioning, and system design considerations"
          },
          {
            time: "3:00 PM - 4:00 PM",
            title: "Case Studies & Hands-on Analysis",
            description: "Real-world problem solving with measurement equipment"
          }
        ]
      },
      {
        id: 6,
        title: "Solar PV System Design",
        description: "Comprehensive workshop on designing solar photovoltaic systems for residential and small commercial applications, covering site assessment, component selection, and system sizing.",
        date: "2023-11-08",
        time: "10:00 AM - 3:30 PM",
        location: "Virtual",
        capacity: 75,
        registeredCount: 42,
        type: "virtual",
        category: "design",
        presenter: "Ms. Lakshmi Nair",
        presenterTitle: "Solar Design Engineer, Srimitha Energy",
        price: 1800,
        registrationLink: "/workshops/register/6",
        materials: [
          {
            name: "Design Calculation Spreadsheet",
            url: "/materials/solar-design-calculator.xlsx"
          },
          {
            name: "Component Selection Guide",
            url: "/materials/solar-component-guide.pdf"
          }
        ],
        agenda: [
          {
            time: "10:00 AM - 10:45 AM",
            title: "Solar Resource Assessment",
            description: "Understanding insolation data, shading analysis, and site evaluation"
          },
          {
            time: "10:45 AM - 12:00 PM",
            title: "System Components & Architecture",
            description: "Modules, inverters, mounting systems, and balance of system components"
          },
          {
            time: "12:00 PM - 12:45 PM",
            title: "Break",
            description: ""
          },
          {
            time: "12:45 PM - 2:00 PM",
            title: "System Sizing & Performance Estimation",
            description: "Load analysis, system sizing calculations, and energy yield prediction"
          },
          {
            time: "2:00 PM - 3:00 PM",
            title: "Installation Considerations",
            description: "Mounting, wiring, safety, and code compliance"
          },
          {
            time: "3:00 PM - 3:30 PM",
            title: "Economic Analysis & Conclusion",
            description: "Cost estimation, incentives, and ROI calculation"
          }
        ]
      },
      {
        id: 7,
        title: "Battery Energy Storage Systems",
        description: "Technical workshop covering the fundamentals, applications, and implementation of battery energy storage systems for grid support, renewable integration, and backup power.",
        date: "2023-11-20",
        time: "9:30 AM - 4:00 PM",
        location: "Hybrid - Multiple Locations",
        capacity: 60,
        registeredCount: 38,
        type: "hybrid",
        category: "technology",
        presenter: "Dr. Vikram Patel",
        presenterTitle: "Energy Storage Specialist, Srimitha Energy",
        price: 3000,
        registrationLink: "/workshops/register/7",
        materials: [
          {
            name: "Battery Technology Comparison Chart",
            url: "/materials/battery-technology-comparison.pdf"
          },
          {
            name: "Sizing & Simulation Software Guide",
            url: "/materials/battery-sizing-guide.pdf"
          }
        ],
        agenda: [
          {
            time: "9:30 AM - 10:30 AM",
            title: "Battery Technologies Overview",
            description: "Lithium-ion, flow batteries, and emerging technologies"
          },
          {
            time: "10:30 AM - 11:45 AM",
            title: "Applications & Use Cases",
            description: "Peak shaving, frequency regulation, renewable integration, and resilience"
          },
          {
            time: "11:45 AM - 12:45 PM",
            title: "Lunch Break",
            description: ""
          },
          {
            time: "12:45 PM - 2:00 PM",
            title: "System Design & Sizing",
            description: "Capacity determination, power specifications, and configuration options"
          },
          {
            time: "2:00 PM - 3:00 PM",
            title: "Battery Management Systems",
            description: "Control algorithms, monitoring, and safety systems"
          },
          {
            time: "3:00 PM - 4:00 PM",
            title: "Economic Analysis & Future Trends",
            description: "Cost projections, revenue streams, and emerging applications"
          }
        ]
      },
      {
        id: 8,
        title: "Electrical Safety in Energy Systems",
        description: "Essential workshop on electrical safety practices for professionals working with renewable energy systems, energy storage, and electrical distribution equipment.",
        date: "2023-08-15",
        time: "9:00 AM - 1:00 PM",
        location: "Srimitha Tech Center, Mumbai",
        capacity: 40,
        registeredCount: 40,
        type: "in-person",
        category: "safety",
        presenter: "Er. Manoj Verma",
        presenterTitle: "Safety Compliance Manager, Srimitha Energy",
        price: 1500,
        registrationLink: "/workshops/register/8",
        materials: [
          {
            name: "Safety Procedures Handbook",
            url: "/materials/electrical-safety-handbook.pdf"
          },
          {
            name: "Risk Assessment Templates",
            url: "/materials/safety-risk-assessment.docx"
          }
        ],
        agenda: [
          {
            time: "9:00 AM - 9:45 AM",
            title: "Electrical Hazards & Risk Assessment",
            description: "Identifying hazards and evaluating risks in energy systems"
          },
          {
            time: "9:45 AM - 10:45 AM",
            title: "Safety Standards & Regulations",
            description: "Relevant codes, standards, and compliance requirements"
          },
          {
            time: "10:45 AM - 11:00 AM",
            title: "Short Break",
            description: ""
          },
          {
            time: "11:00 AM - 12:00 PM",
            title: "Safe Work Practices",
            description: "Lockout/tagout procedures, PPE, and live work considerations"
          },
          {
            time: "12:00 PM - 1:00 PM",
            title: "Emergency Response & Case Studies",
            description: "Handling electrical incidents and learning from past accidents"
          }
        ]
      }
    ]
  });

  const today = new Date();
  
  // Apply all filters
  let filteredWorkshops = workshops.filter(workshop => {
    const workshopDate = new Date(workshop.date);
    const matchesDateFilter = filter === "upcoming" 
      ? workshopDate >= today 
      : workshopDate < today;
    
    const matchesTypeFilter = typeFilter === "all" || workshop.type === typeFilter;
    
    const matchesCategoryFilter = categoryFilter === "all" || workshop.category === categoryFilter;
    
    const matchesSearchQuery = searchQuery === "" || 
      workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workshop.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesDateFilter && matchesTypeFilter && matchesCategoryFilter && matchesSearchQuery;
  });

  // Sort upcoming workshops by date (nearest first)
  filteredWorkshops = filteredWorkshops.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return filter === "upcoming" 
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });

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

  // Get unique categories for filter
  const categories = ["all", ...new Set(workshops.map(workshop => workshop.category))];

  return (
    <>
      <Helmet>
        <title>Workshops & Events - Srimitha Energy Solutions</title>
        <meta name="description" content="Join our educational workshops and training events to enhance your knowledge in renewable energy, smart grid technologies, and electrical engineering." />
      </Helmet>
      
      <div className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Workshops & Training</h1>
            <p className="text-lg text-muted-foreground">
              Enhance your knowledge and skills with our specialized workshops and training programs
              in electrical engineering and sustainable energy technologies.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="upcoming" className="mb-8" onValueChange={setFilter}>
            <TabsList className="mx-auto flex justify-center">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="mb-8 bg-muted p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="search" className="block text-sm font-medium mb-2">
                  Search Workshops
                </label>
                <div className="relative">
                  <Input
                    id="search"
                    placeholder="Search by keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <div className="absolute left-3 top-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search text-muted-foreground"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="type-filter" className="block text-sm font-medium mb-2">
                  Workshop Type
                </label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger id="type-filter">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="virtual">Virtual</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="category-filter" className="block text-sm font-medium mb-2">
                  Category
                </label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger id="category-filter">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.filter(cat => cat !== "all").map(category => (
                      <SelectItem key={category} value={category} className="capitalize">
                        {category.replace("-", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {filteredWorkshops.length === 0 ? (
            <div className="text-center py-12 bg-muted rounded-lg">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No Workshops Found</h3>
              <p className="text-muted-foreground">
                {filter === "upcoming" 
                  ? "There are no upcoming workshops matching your filters." 
                  : "There are no past workshops matching your filters."}
              </p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchQuery("");
                setCategoryFilter("all");
                setTypeFilter("all");
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {filteredWorkshops.map((workshop) => (
                <motion.div key={workshop.id} variants={item}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant={
                                workshop.type === "in-person" 
                                  ? "default" 
                                  : workshop.type === "virtual" 
                                    ? "secondary" 
                                    : "outline"
                              }
                            >
                              {workshop.type === "in-person" 
                                ? "In-Person" 
                                : workshop.type === "virtual" 
                                  ? "Virtual" 
                                  : "Hybrid"}
                            </Badge>
                            <Badge variant="outline" className="capitalize">
                              {workshop.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl">{workshop.title}</CardTitle>
                        </div>
                        {workshop.registeredCount >= workshop.capacity ? (
                          <Badge variant="destructive">Full</Badge>
                        ) : filter === "upcoming" && (new Date(workshop.date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) ? (
                          <Badge variant="secondary">Few Spots Left</Badge>
                        ) : null}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{workshop.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-primary" />
                          <span>{new Date(workshop.date).toLocaleDateString('en-US', { 
                            weekday: 'long',
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          <span>{workshop.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-primary" />
                          <span>{workshop.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-primary" />
                          <span>{workshop.registeredCount} / {workshop.capacity} registered</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user text-primary"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{workshop.presenter}</p>
                            <p className="text-xs text-muted-foreground">{workshop.presenterTitle}</p>
                          </div>
                        </div>
                        <div>
                          {workshop.price ? (
                            <p className="text-lg font-semibold">₹{workshop.price}</p>
                          ) : (
                            <Badge variant="outline">Free</Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => setSelectedWorkshop(workshop)}>
                        View Details
                      </Button>
                      
                      {filter === "upcoming" ? (
                        <Button disabled={workshop.registeredCount >= workshop.capacity}>
                          {workshop.registeredCount >= workshop.capacity ? "Sold Out" : "Register Now"}
                        </Button>
                      ) : workshop.materials && workshop.materials.length > 0 ? (
                        <Button variant="secondary">
                          <Download className="mr-2 h-4 w-4" /> Materials
                        </Button>
                      ) : null}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      
      {selectedWorkshop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 m-4">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant={
                      selectedWorkshop.type === "in-person" 
                        ? "default" 
                        : selectedWorkshop.type === "virtual" 
                          ? "secondary" 
                          : "outline"
                    }
                  >
                    {selectedWorkshop.type === "in-person" 
                      ? "In-Person" 
                      : selectedWorkshop.type === "virtual" 
                        ? "Virtual" 
                        : "Hybrid"}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {selectedWorkshop.category}
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold">{selectedWorkshop.title}</h2>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedWorkshop(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                <span className="sr-only">Close</span>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About This Workshop</h3>
                    <p className="text-muted-foreground">{selectedWorkshop.description}</p>
                  </div>
                  
                  {selectedWorkshop.agenda && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Workshop Agenda</h3>
                      <div className="space-y-4">
                        {selectedWorkshop.agenda.map((item, index) => (
                          <div key={index} className="flex">
                            <div className="mr-4 flex flex-col items-center">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <CalendarDays className="h-5 w-5 text-primary" />
                              </div>
                              {index < selectedWorkshop.agenda!.length - 1 && (
                                <div className="h-full w-0.5 bg-border mt-2"></div>
                              )}
                            </div>
                            <div className="pb-5">
                              <p className="text-sm text-muted-foreground">{item.time}</p>
                              <h4 className="font-medium">{item.title}</h4>
                              {item.description && (
                                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedWorkshop.materials && selectedWorkshop.materials.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Workshop Materials</h3>
                      <div className="space-y-2">
                        {selectedWorkshop.materials.map((material, index) => (
                          <div key={index} className="flex items-center">
                            <Download className="h-4 w-4 mr-2 text-primary" />
                            <a href={material.url} className="text-primary hover:underline">
                              {material.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <div className="bg-muted p-6 rounded-lg space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium">{new Date(selectedWorkshop.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                    <p className="font-medium">{selectedWorkshop.time}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{selectedWorkshop.location}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Presented by</p>
                    <p className="font-medium">{selectedWorkshop.presenter}</p>
                    <p className="text-sm">{selectedWorkshop.presenterTitle}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Registration</p>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      <span>{selectedWorkshop.registeredCount} / {selectedWorkshop.capacity} registered</span>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Price:</span>
                      <span className="font-bold text-lg">
                        {selectedWorkshop.price ? `₹${selectedWorkshop.price}` : "Free"}
                      </span>
                    </div>
                    
                    {new Date(selectedWorkshop.date) > today ? (
                      <Button 
                        className="w-full mt-2" 
                        disabled={selectedWorkshop.registeredCount >= selectedWorkshop.capacity}
                      >
                        {selectedWorkshop.registeredCount >= selectedWorkshop.capacity 
                          ? "Sold Out" 
                          : "Register Now"}
                      </Button>
                    ) : (
                      <p className="text-sm text-center text-muted-foreground mt-2">
                        This workshop has already taken place.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Custom Training Programs</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Need specialized training for your team? We offer customized training programs 
              tailored to your organization's specific needs and objectives.
            </p>
            <Button size="lg" asChild>
              <a href="/contact?training=true">
                Request Custom Training <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
