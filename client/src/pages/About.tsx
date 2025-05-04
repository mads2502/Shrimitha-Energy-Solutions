import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - Srimitha Energy Solutions</title>
        <meta name="description" content="Learn about Srimitha Energy Solutions, our mission, values, team, and journey in providing innovative electrical engineering services." />
      </Helmet>
      
      <div className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">About Srimitha Energy Solutions</h1>
            <p className="text-lg text-muted-foreground">
              Pioneering sustainable energy solutions for a greener future.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2012 by a team of visionary electrical engineers, Srimitha Energy Solutions 
                  was established with a clear mission: to accelerate the transition to sustainable energy 
                  through innovative electrical engineering solutions.
                </p>
                <p>
                  What began as a small consulting firm has grown into a comprehensive engineering services 
                  company with expertise across renewable energy, smart grid technologies, energy efficiency, 
                  and electric vehicle infrastructure.
                </p>
                <p>
                  Over the past decade, we've successfully completed more than 250 projects across India and 
                  internationally, ranging from residential solar installations to large-scale industrial 
                  power system optimizations.
                </p>
                <p>
                  Today, Srimitha Energy Solutions stands at the forefront of the electrical engineering industry, 
                  combining technical excellence with a deep commitment to sustainability and innovation.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Srimitha Energy Solutions office"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-primary rounded-lg shadow-xl p-6 max-w-xs">
                <p className="text-white font-medium text-lg mb-2">Our Mission</p>
                <p className="text-primary-foreground text-sm">
                  To drive the global transition to sustainable energy through innovative electrical engineering solutions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">
              The principles that guide our work and relationships.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="bg-background p-6 rounded-xl"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                We prioritize environmental responsibility in every project and decision, 
                driving positive change through our work.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-background p-6 rounded-xl"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                We embrace emerging technologies and creative approaches to deliver 
                cutting-edge solutions for complex energy challenges.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-background p-6 rounded-xl"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12h6M2 12l3.45 4M2 12l3.45-4M22 12h-6m0 0l3.45 4m-3.45-4l3.45-4M12 2v20"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards of technical quality and professional 
                service in everything we do.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-background p-6 rounded-xl"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-muted-foreground">
                We believe in the power of partnerships – with clients, communities, and 
                industry stakeholders – to create lasting impact.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground">
              Meet the experts behind our innovative solutions.
            </p>
          </div>
          
          <Tabs defaultValue="leadership" className="w-full">
            <TabsList className="mx-auto flex justify-center mb-8">
              <TabsTrigger value="leadership">Leadership Team</TabsTrigger>
              <TabsTrigger value="technical">Technical Experts</TabsTrigger>
              <TabsTrigger value="project">Project Managers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="leadership">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TeamMember
                  name="Rajesh Kumar"
                  title="Founder & CEO"
                  image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  description="With 25+ years of experience in electrical engineering, Rajesh founded Srimitha Energy Solutions with a vision to revolutionize the industry through sustainable practices."
                />
                <TeamMember
                  name="Priya Sharma"
                  title="Chief Technical Officer"
                  image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  description="Priya oversees all technical aspects of our projects, bringing her extensive expertise in power systems and renewable energy technologies."
                />
                <TeamMember
                  name="Vikram Mehta"
                  title="Chief Operating Officer"
                  image="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  description="Vikram ensures operational excellence across the organization, focusing on efficiency, quality, and continuous improvement."
                />
              </div>
            </TabsContent>
            
            <TabsContent value="technical">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TeamMember
                  name="Ananya Patel"
                  title="Lead Solar Engineer"
                  image="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  description="Specializing in photovoltaic system design, Ananya has led the implementation of over 50 solar projects of varying scales."
                />
                <TeamMember
                  name="Sanjay Verma"
                  title="Smart Grid Specialist"
                  image="https://images.unsplash.com/photo-1500048993953-d23a436266cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  description="Sanjay's expertise in advanced grid technologies has been instrumental in our smart city and utility modernization projects."
                />
                <TeamMember
                  name="Meera Krishnan"
                  title="Energy Efficiency Expert"
                  image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  description="With a background in sustainable architecture, Meera leads our building energy optimization and efficiency initiatives."
                />
              </div>
            </TabsContent>
            
            <TabsContent value="project">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TeamMember
                  name="Arjun Singh"
                  title="Senior Project Manager"
                  image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  description="Arjun specializes in large-scale commercial and industrial projects, ensuring they're delivered on time and within budget."
                />
                <TeamMember
                  name="Neha Reddy"
                  title="Residential Projects Lead"
                  image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  description="Neha oversees our residential renewable energy installations, focusing on customer satisfaction and system performance."
                />
                <TeamMember
                  name="Karthik Rao"
                  title="International Projects Manager"
                  image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  description="With experience across multiple countries, Karthik manages our growing portfolio of international energy projects."
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/contact">
                Connect with Our Team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark opacity-90" />
        <div className="absolute inset-0 bg-grid-white/[0.2] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Commitment to Sustainability</h2>
            <p className="text-xl mb-8">
              At Srimitha Energy Solutions, sustainability isn't just what we do—it's who we are.
            </p>
            <p className="mb-6">
              We're committed to reducing environmental impact in both our own operations 
              and through the solutions we provide to our clients. Our office facilities are 
              powered entirely by renewable energy, and we maintain carbon-neutral operations 
              through careful resource management and carbon offset programs.
            </p>
            <p className="mb-8">
              Through our projects, we've helped clients reduce carbon emissions by over 50,000 
              metric tons annually—equivalent to planting 825,000 trees. But we're not stopping 
              there. We continuously research and implement new technologies and approaches to 
              maximize the environmental benefits of our work.
            </p>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/projects">
                See Our Impact <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

interface TeamMemberProps {
  name: string;
  title: string;
  image: string;
  description: string;
}

function TeamMember({ name, title, image, description }: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-primary font-medium mb-3">{title}</p>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}
