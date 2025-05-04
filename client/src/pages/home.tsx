import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceCard } from "@/components/ui/service-card";
import { ProjectCard } from "@/components/ui/project-card";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Award,
  Users,
  Lightbulb,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Home() {
  // Fetch services, projects, testimonials, and events data
  const { data: services } = useQuery({
    queryKey: ['/api/services'],
  });

  const { data: projects } = useQuery({
    queryKey: ['/api/projects'],
  });

  const { data: testimonials } = useQuery({
    queryKey: ['/api/testimonials'],
  });

  const { data: events } = useQuery({
    queryKey: ['/api/events'],
  });

  const { data: collaborations } = useQuery({
    queryKey: ['/api/collaborations'],
  });

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

  // Scroll to the top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 z-0">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Powering a Sustainable Future with Innovative Energy Solutions
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Srimitha Energy Solutions delivers expert electrical engineering services 
              for renewable energy, power systems, and energy efficiency projects.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 btn-hover-animate"
              >
                <Link href="/services">
                  Explore Our Services
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 btn-hover-animate"
              >
                <Link href="/contact">
                  Get a Quote
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="fill-background h-[60px] w-full"
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V69.81C57.1,68.17,277.6,85.13,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Srimitha Energy Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our expertise in electrical engineering and renewable energy systems
              helps organizations optimize their energy infrastructure.
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={item} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Industry Expertise</h3>
              <p className="text-muted-foreground">
                With over a decade of experience, our team delivers solutions
                that are reliable, efficient, and tailored to your specific needs.
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovative Approach</h3>
              <p className="text-muted-foreground">
                We stay at the forefront of energy technology, implementing
                cutting-edge solutions that maximize efficiency and sustainability.
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Dedicated Support</h3>
              <p className="text-muted-foreground">
                Our client-focused approach means you'll receive personalized
                attention and ongoing support throughout your project lifecycle.
              </p>
            </motion.div>
          </motion.div>

          <div className="mt-16 text-center">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/about">
                Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive electrical engineering solutions for modern energy challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/services">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our successful implementations across various industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/projects">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/90 to-secondary/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Energy Infrastructure?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Contact us today to discuss your project requirements and discover how
              our expertise can help you achieve your energy goals.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 btn-hover-animate"
            >
              <Link href="/contact">
                Get Started Today
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Hear from organizations that have transformed their energy systems with our solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-500 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <div className="mb-6">
                      <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                    </div>
                    <div className="flex items-center">
                      {testimonial.image && (
                        <div className="mr-4">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.position}
                          {testimonial.company && `, ${testimonial.company}`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events/Workshops Section */}
      {events && events.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Upcoming Events & Workshops
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join us for educational sessions and networking opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.slice(0, 2).map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="pt-6">
                    <div className="flex items-center text-primary mb-3">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>
                        {new Date(event.startDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {event.location}
                      </span>
                      {event.registrationUrl && (
                        <Button asChild variant="outline" className="text-primary border-primary hover:bg-primary/5">
                          <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                            Register <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/workshops">
                  View All Events <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Industry Collaborations */}
      {collaborations && collaborations.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Industry Collaborations
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We partner with leading organizations to advance energy technology and standards
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {collaborations.map((collaboration) => (
                <div key={collaboration.id} className="text-center">
                  <a
                    href={collaboration.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <div className="flex flex-col items-center">
                      <div className="h-24 flex items-center justify-center mb-3">
                        {/* If we had actual logos instead of placeholder URLs */}
                        <div className="w-40 h-20 bg-slate-100 rounded-md flex items-center justify-center text-slate-500 font-medium">
                          {collaboration.name}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {collaboration.name}
                      </span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with Industry Insights
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Subscribe to our newsletter for the latest energy trends, technology updates, and company news.
            </p>
            <NewsletterForm
              buttonText="Subscribe"
              inputClassName="bg-white border-white"
              buttonClassName="bg-primary hover:bg-primary/90"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
