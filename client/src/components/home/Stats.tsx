import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Battery, Zap, Users, Building, Award } from "lucide-react";

export default function Stats() {
  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark opacity-90" />
      <div className="absolute inset-0 bg-grid-white/[0.2] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Impact by the Numbers</h2>
          <p className="text-lg text-primary-foreground/80">
            At Srimitha Energy Solutions, we measure our success through the impact
            we make on energy efficiency and sustainability goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatsCard 
            icon={<Battery className="h-12 w-12" />}
            value="125+"
            label="MW of Power Systems Installed"
            delay={0}
          />
          <StatsCard 
            icon={<Zap className="h-12 w-12" />}
            value="40%"
            label="Average Energy Savings Delivered"
            delay={0.1}
          />
          <StatsCard 
            icon={<Users className="h-12 w-12" />}
            value="500+"
            label="Satisfied Clients Worldwide"
            delay={0.2}
          />
          <StatsCard 
            icon={<Building className="h-12 w-12" />}
            value="750+"
            label="Projects Successfully Completed"
            delay={0.3}
          />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <AchievementCard 
            title="Industry Recognition"
            description="Recipient of the 2023 Energy Innovation Award for pioneering work in microgrids and renewable integration."
            icon={<Award className="h-8 w-8" />}
            delay={0.4}
          />
          <AchievementCard 
            title="Carbon Reduction"
            description="Our solutions have helped clients reduce their carbon emissions by over 50,000 metric tons annually."
            icon={<Zap className="h-8 w-8" />}
            delay={0.5}
          />
          <AchievementCard 
            title="Expert Team"
            description="Our team includes certified engineers with decades of combined experience in electrical systems design."
            icon={<Users className="h-8 w-8" />}
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
}

interface StatsCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

function StatsCard({ icon, value, label, delay }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm"
    >
      <div className="mx-auto flex justify-center mb-4">
        {icon}
      </div>
      <div className="text-4xl font-bold mb-2">{value}</div>
      <p className="text-primary-foreground/80">{label}</p>
    </motion.div>
  );
}

interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

function AchievementCard({ title, description, icon, delay }: AchievementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/5 p-6 rounded-xl backdrop-blur-sm"
    >
      <div className="flex items-center mb-4">
        <div className="p-2 bg-white/20 rounded-full mr-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-primary-foreground/80">{description}</p>
    </motion.div>
  );
}
