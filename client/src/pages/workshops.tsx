import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ArrowRight, 
  CalendarDays,
  ExternalLink,
  Bookmark,
  Lightbulb
} from "lucide-react";
import { Event } from "@shared/schema";

export default function Workshops() {
  // Current date for filtering upcoming/past events
  const now = new Date();
  
  // Fetch events data
  const { data: upcomingEvents, isLoading: upcomingLoading } = useQuery({
    queryKey: ['/api/events', 'upcoming'],
  });

  const { data: pastEvents, isLoading: pastLoading } = useQuery({
    queryKey: ['/api/events', { type: 'past' }],
  });

  // Scroll to the top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const EventCard = ({ event }: { event: Event }) => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    };
    
    const isSameDay = startDate.toDateString() === endDate.toDateString();
    const displayDate = isSameDay 
      ? formatDate(startDate)
      : `${formatDate(startDate)} - ${formatDate(endDate)}`;
    
    return (
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {event.image && (
          <div className="h-48 overflow-hidden">
            <img 
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
        
        <CardContent className="flex-grow pt-6">
          <div className="mb-4">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              {new Date(event.startDate) > now ? 'Upcoming' : 'Past Event'}
            </Badge>
          </div>
          
          <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
              <span>{displayDate}</span>
            </div>
            
            {event.location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{event.location}</span>
              </div>
            )}
            
            {event.capacity && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>Capacity: {event.capacity} attendees</span>
              </div>
            )}
          </div>
          
          <p className="text-muted-foreground line-clamp-3 mb-4">
            {event.description}
          </p>
        </CardContent>
        
        <CardFooter className="border-t pt-4">
          {new Date(event.startDate) > now && event.registrationUrl ? (
            <Button asChild variant="outline" className="w-full justify-between">
              <a 
                href={event.registrationUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Register Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          ) : (
            <Button variant="outline" className="w-full justify-between" disabled={true}>
              {new Date(event.startDate) > now ? 'Registration Coming Soon' : 'Event Completed'}
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  const workshopBenefits = [
    {
      title: "Expert Knowledge",
      description: "Learn directly from industry specialists with extensive experience in electrical engineering and energy systems.",
      icon: <Lightbulb className="h-8 w-8 text-primary" />
    },
    {
      title: "Practical Skills",
      description: "Gain hands-on experience through interactive exercises and real-world case studies relevant to current industry practices.",
      icon: <Users className="h-8 w-8 text-primary" />
    },
    {
      title: "Industry Updates",
      description: "Stay informed about the latest technological advancements, regulatory changes, and market trends in the energy sector.",
      icon: <Bookmark className="h-8 w-8 text-primary" />
    },
    {
      title: "Networking Opportunities",
      description: "Connect with peers, experts, and potential collaborators, building valuable professional relationships in the industry.",
      icon: <CalendarDays className="h-8 w-8 text-primary" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Workshops & Events</h1>
            <p className="text-xl opacity-90">
              Expand your knowledge and skills through our specialized workshops and industry events
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Attend Our Workshops
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enhance your professional development and stay at the forefront of energy engineering
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workshopBenefits.map((benefit, index) => (
              <Card key={index} className="h-full">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events Listing Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Events Calendar
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Browse our upcoming and past workshops and events
            </p>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming">
              {upcomingLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(3)].map((_, index) => (
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
              ) : upcomingEvents && upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingEvents.map((event: Event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center p-12 bg-white rounded-lg border border-slate-200">
                  <Calendar className="h-12 w-12 text-primary/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Upcoming Events</h3>
                  <p className="text-muted-foreground mb-6">
                    We're currently planning our next round of workshops and events. 
                    Check back soon or subscribe to our newsletter for updates.
                  </p>
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/#newsletter">
                      Subscribe to Updates
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              {pastLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(3)].map((_, index) => (
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
              ) : pastEvents && pastEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastEvents.map((event: Event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center p-12 bg-white rounded-lg border border-slate-200">
                  <Clock className="h-12 w-12 text-primary/50 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Past Events</h3>
                  <p className="text-muted-foreground">
                    We haven't conducted any workshops or events yet. 
                    Check our upcoming events tab to see what's coming soon.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Custom Workshop Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Custom Workshops for Organizations</h2>
              <p className="text-muted-foreground mb-6">
                We offer tailored workshops designed specifically for your organization's needs. Our expert trainers can deliver specialized content on a wide range of electrical engineering and energy topics.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-3 mt-1">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Team Training</h4>
                    <p className="text-sm text-muted-foreground">
                      Upskill your entire team with customized group training sessions focused on your specific industry challenges.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-3 mt-1">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Tailored Content</h4>
                    <p className="text-sm text-muted-foreground">
                      Workshop content developed specifically for your organization's technical requirements and knowledge gaps.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full p-2 mr-3 mt-1">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Flexible Scheduling</h4>
                    <p className="text-sm text-muted-foreground">
                      Workshops scheduled at your convenience, whether on-site, at our facilities, or virtually.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/contact?subject=Custom Workshop Inquiry">
                  Inquire About Custom Workshops
                </Link>
              </Button>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
              <h3 className="text-xl font-semibold mb-4">Popular Workshop Topics</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5 text-primary text-xs font-bold">
                    1
                  </div>
                  <span>Renewable Energy Integration Techniques</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5 text-primary text-xs font-bold">
                    2
                  </div>
                  <span>Smart Grid Technology and Implementation</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5 text-primary text-xs font-bold">
                    3
                  </div>
                  <span>Energy Storage Solutions and Applications</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5 text-primary text-xs font-bold">
                    4
                  </div>
                  <span>Power Quality Analysis and Improvement</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5 text-primary text-xs font-bold">
                    5
                  </div>
                  <span>Electric Vehicle Infrastructure Planning</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5 text-primary text-xs font-bold">
                    6
                  </div>
                  <span>Energy Efficiency for Industrial Systems</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5 text-primary text-xs font-bold">
                    7
                  </div>
                  <span>Microgrid Design and Operation</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5 text-primary text-xs font-bold">
                    8
                  </div>
                  <span>Advanced Control Systems for Energy Management</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-4 border-t border-slate-300">
                <p className="text-sm text-muted-foreground italic">
                  Can't find what you're looking for? We can develop custom workshop content for your specific requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Participants Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Feedback from professionals who have attended our workshops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-current inline-block mr-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="italic text-muted-foreground mb-6">
                  "The Renewable Energy Integration workshop provided practical insights that were immediately applicable to our current projects. The hands-on exercises and case studies were particularly valuable."
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    RK
                  </div>
                  <div>
                    <h4 className="font-semibold">Rajesh Kumar</h4>
                    <p className="text-sm text-muted-foreground">Senior Engineer, Power Grid Corporation</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-current inline-block mr-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="italic text-muted-foreground mb-6">
                  "The instructors were incredibly knowledgeable and created an engaging learning environment. I particularly appreciated how they addressed real-world challenges we face in implementing energy management systems."
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    AS
                  </div>
                  <div>
                    <h4 className="font-semibold">Anita Singh</h4>
                    <p className="text-sm text-muted-foreground">Project Manager, Green Buildings Initiative</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="pt-6">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-current inline-block mr-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="italic text-muted-foreground mb-6">
                  "The EV Infrastructure Planning workshop came at a perfect time for our organization. The technical knowledge combined with practical implementation strategies has helped us develop a comprehensive roadmap for our facility."
                </p>
                <div className="flex items-center">
                  <div className="mr-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    MM
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael Mehta</h4>
                    <p className="text-sm text-muted-foreground">Facilities Director, Tech Innovations</p>
                  </div>
                </div>
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
              Ready to Enhance Your Knowledge?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Register for an upcoming workshop or contact us about custom training solutions for your organization.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 btn-hover-animate"
              >
                <a href="#upcoming">
                  Browse Upcoming Events
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 btn-hover-animate"
              >
                <Link href="/contact?subject=Workshop Inquiry">
                  Request Custom Training
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
