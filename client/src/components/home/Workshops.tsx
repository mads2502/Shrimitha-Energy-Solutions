import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

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
}

export default function Workshops() {
  const [filter, setFilter] = useState("upcoming");

  // Fetch workshops from the API but provide fallback data
  const { data: workshops, isLoading } = useQuery({
    queryKey: ['/api/workshops'],
    initialData: [
      {
        id: 1,
        title: "Renewable Energy Integration",
        description: "Learn about the technical aspects of integrating renewable energy sources into existing power systems.",
        date: "2023-09-15",
        time: "10:00 AM - 3:00 PM",
        location: "Srimitha Tech Center, Bangalore",
        capacity: 40,
        registeredCount: 32,
        type: "in-person",
        category: "technical"
      },
      {
        id: 2,
        title: "Smart Grid Technologies Workshop",
        description: "Explore the latest innovations in smart grid technologies and their applications in modern power systems.",
        date: "2023-09-22",
        time: "9:00 AM - 1:00 PM",
        location: "Virtual",
        capacity: 100,
        registeredCount: 68,
        type: "virtual",
        category: "technology"
      },
      {
        id: 3,
        title: "EV Charging Infrastructure Design",
        description: "Comprehensive workshop on designing efficient and scalable electric vehicle charging infrastructure.",
        date: "2023-10-05",
        time: "10:00 AM - 4:00 PM",
        location: "Hybrid - Tech Park & Virtual",
        capacity: 60,
        registeredCount: 45,
        type: "hybrid",
        category: "design"
      },
      {
        id: 4,
        title: "Energy Efficiency in Commercial Buildings",
        description: "Strategies and technologies for improving energy efficiency in commercial and industrial buildings.",
        date: "2023-10-12",
        time: "1:00 PM - 5:00 PM",
        location: "Srimitha Tech Center, Bangalore",
        capacity: 50,
        registeredCount: 28,
        type: "in-person",
        category: "efficiency"
      }
    ]
  });

  const today = new Date();
  const filteredWorkshops = workshops.filter(workshop => {
    const workshopDate = new Date(workshop.date);
    return filter === "upcoming" 
      ? workshopDate >= today 
      : workshopDate < today;
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

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Upcoming Workshops & Events</h2>
          <p className="text-lg text-muted-foreground">
            Join our educational workshops and industry events to enhance your knowledge 
            and network with professionals in the electrical engineering field.
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="mb-12" onValueChange={setFilter}>
          <TabsList className="mx-auto flex justify-center">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value={filter} className="mt-8">
            {filteredWorkshops.length === 0 ? (
              <div className="text-center py-12 bg-muted rounded-lg">
                <p className="text-muted-foreground">
                  {filter === "upcoming" 
                    ? "No upcoming workshops at the moment. Check back later!" 
                    : "No past workshops to display."}
                </p>
              </div>
            ) : (
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredWorkshops.map((workshop) => (
                  <motion.div key={workshop.id} variants={item}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{workshop.title}</CardTitle>
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
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{workshop.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-primary" />
                            <span>{new Date(workshop.date).toLocaleDateString()}</span>
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
                      </CardContent>
                      <CardFooter>
                        {filter === "upcoming" ? (
                          <Button asChild>
                            <Link href={`/workshops/${workshop.id}`}>
                              Register Now
                            </Link>
                          </Button>
                        ) : (
                          <Button variant="outline" asChild>
                            <Link href={`/workshops/${workshop.id}`}>
                              View Details
                            </Link>
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/workshops">
              View All Workshops <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
