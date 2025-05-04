import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Electrical engineers working on a renewable energy project"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-primary rounded-lg shadow-xl p-6 max-w-xs">
              <p className="text-white font-medium text-lg mb-2">10+ Years Experience</p>
              <p className="text-primary-foreground text-sm">
                Delivering innovative electrical engineering solutions since 2012.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">About Srimitha Energy Solutions</h2>
            
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                Founded in 2012, Srimitha Energy Solutions has established itself as a leader in 
                electrical engineering services, specializing in sustainable energy solutions 
                and innovative electrical system design.
              </p>
              <p>
                Our team of experienced engineers and technicians brings together decades of 
                industry knowledge to deliver cutting-edge solutions that address the evolving 
                needs of our clients while prioritizing energy efficiency and sustainability.
              </p>
              <p>
                We pride ourselves on our commitment to quality, reliability, and customer 
                satisfaction, working closely with each client to understand their unique 
                requirements and deliver customized solutions that exceed expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-muted rounded-lg p-4">
                <div className="text-3xl font-bold text-primary mb-2">250+</div>
                <p className="text-muted-foreground">Projects Completed</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <p className="text-muted-foreground">Client Satisfaction</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="text-3xl font-bold text-primary mb-2">40+</div>
                <p className="text-muted-foreground">Expert Engineers</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <p className="text-muted-foreground">Industry Awards</p>
              </div>
            </div>

            <Button size="lg" asChild>
              <Link href="/about">
                Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
