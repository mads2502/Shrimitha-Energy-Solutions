import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Clock, Award, Users, Target } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function About() {
  // Fetch team members and settings data
  const { data: team } = useQuery({
    queryKey: ['/api/team'],
  });

  const { data: settings } = useQuery({
    queryKey: ['/api/settings'],
  });

  // Scroll to the top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Srimitha Energy Solutions</h1>
            <p className="text-xl opacity-90">
              Pioneering sustainable energy solutions through innovative electrical engineering.
            </p>
          </div>
        </div>
      </section>

      {/* About Company Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {settings?.about_company || 
                  "Srimitha Energy Solutions is a premier electrical engineering firm specializing in renewable energy systems, power distribution, and energy efficiency solutions. Founded in 2010, we have successfully completed over 200 projects across India and Southeast Asia, bringing innovative and sustainable energy solutions to industries, municipalities, and communities."}
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p>Expert team with decades of combined experience in electrical engineering</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p>Commitment to sustainable, efficient energy solutions</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                  <p>Industry partnerships to advance energy technology standards</p>
                </div>
              </div>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/contact">Contact Us Today</Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9"
                alt="Srimitha Energy Solutions team working on a project"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Est. Since</p>
                    <p className="font-semibold">2010</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission & Vision</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Driving the global transition to sustainable energy through innovation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    {settings?.company_mission || 
                    "Our mission is to accelerate the global transition to sustainable energy through innovative engineering solutions that are reliable, efficient, and environmentally responsible. We strive to empower our clients with the knowledge and technology to optimize their energy systems and reduce their environmental impact."}
                  </p>
                </CardContent>
              </Card>

              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    {settings?.company_vision || 
                    "We envision a world powered by clean, accessible, and reliable energy. Srimitha Energy Solutions aims to be at the forefront of this transformation, driving innovation in electrical engineering and contributing to a more sustainable future for all."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <motion.div variants={item} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">200+</div>
              <p className="text-muted-foreground">Projects Completed</p>
            </motion.div>
            <motion.div variants={item} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">35+</div>
              <p className="text-muted-foreground">Expert Engineers</p>
            </motion.div>
            <motion.div variants={item} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">12+</div>
              <p className="text-muted-foreground">Years of Experience</p>
            </motion.div>
            <motion.div variants={item} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10+</div>
              <p className="text-muted-foreground">Industry Awards</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      {team && team.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Leadership Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet the experts driving innovation at Srimitha Energy Solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <Card key={member.id} className="h-full">
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={member.image || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5"}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary mb-3">{member.position}</p>
                    <p className="text-sm text-muted-foreground line-clamp-4 mb-4">
                      {member.bio}
                    </p>
                    {member.socialLinks && (
                      <div className="flex space-x-3">
                        {(() => {
                          // Handle both string and object formats
                          const links = typeof member.socialLinks === 'string' 
                            ? JSON.parse(member.socialLinks) 
                            : member.socialLinks;
                          
                          return (
                            <>
                              {links.linkedin && (
                                <a
                                  href={links.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-400 hover:text-primary"
                                  aria-label={`${member.name}'s LinkedIn`}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                </a>
                              )}
                              {links.twitter && (
                                <a
                                  href={links.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-400 hover:text-primary"
                                  aria-label={`${member.name}'s Twitter`}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                                </a>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our work and relationships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="h-full card-hover">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21.64 3.64a1.35 1.35 0 0 0-1.94 0L1.92 21.36a1.35 1.35 0 0 0 0 1.94 1.35 1.35 0 0 0 1.94 0L21.64 5.58a1.35 1.35 0 0 0 0-1.94z"></path><path d="m22 6-3-3"></path><path d="M10 4v10.54a4 4 0 0 1-1.17 2.83L3 23"></path><path d="M10 4 3 3l1 7"></path><path d="m22 6-7 7-1 9-1-9"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We constantly seek innovative solutions to complex energy challenges, pushing the boundaries of what's possible in electrical engineering.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full card-hover">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Reliability</h3>
                <p className="text-muted-foreground">
                  We deliver solutions that our clients can depend on, maintaining the highest standards of quality and safety in all our work.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full card-hover">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22c2.5-2.5 6-6 6-10a6 6 0 0 0-12 0c0 4 3.5 7.5 6 10z"></path><circle cx="12" cy="12" r="2"></circle></svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-muted-foreground">
                  Environmental responsibility is at the core of everything we do, focusing on solutions that minimize ecological impact and promote sustainability.
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
              Join Us in Creating a Sustainable Energy Future
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Whether you're looking for expert electrical engineering services or exploring career opportunities, 
              we'd love to connect with you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 btn-hover-animate"
              >
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 btn-hover-animate"
              >
                <Link href="/internships">
                  Career Opportunities
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
