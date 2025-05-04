import { useRef, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ZapIcon, PlugZap, BarChart3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-900/20 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col max-w-xl"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6 w-fit">
              <ZapIcon size={16} className="mr-2" />
              Powering the future with sustainable solutions
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-foreground">Innovating</span>{" "}
              <span className="text-primary">Energy</span>{" "}
              <span className="text-foreground">Solutions</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Srimitha Energy Solutions delivers cutting-edge electrical engineering
              services, specializing in renewable energy systems, EV infrastructure,
              and smart grid applications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/services">
                  Our Services <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-primary/20">
              <svg viewBox="0 0 400 400" className="w-full">
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                  </linearGradient>
                </defs>
                <rect width="400" height="400" fill="url(#gradient)" fillOpacity="0.1" />
                <circle cx="200" cy="200" r="150" fill="none" stroke="url(#gradient)" strokeWidth="4" />
                
                {/* Technology nodes animation */}
                <g>
                  <circle cx="150" cy="120" r="25" fill="hsl(var(--primary))" fillOpacity="0.3" />
                  <circle cx="270" cy="170" r="20" fill="hsl(var(--secondary))" fillOpacity="0.3" />
                  <circle cx="180" cy="280" r="28" fill="hsl(var(--accent))" fillOpacity="0.3" />
                  
                  <line x1="150" y1="120" x2="270" y2="170" stroke="url(#gradient)" strokeWidth="2" />
                  <line x1="270" y1="170" x2="180" y2="280" stroke="url(#gradient)" strokeWidth="2" />
                  <line x1="180" y1="280" x2="150" y2="120" stroke="url(#gradient)" strokeWidth="2" />
                </g>
                
                {/* Center electrical symbol */}
                <path 
                  d="M215,200 L185,200 M200,185 L200,215 M170,150 L230,250 M230,150 L170,250" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
            
            {/* Feature highlights */}
            <div className="absolute -bottom-5 -left-5 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 flex items-center space-x-3">
              <div className="rounded-full bg-primary/10 p-2">
                <PlugZap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Renewable Energy</p>
                <p className="text-xs text-muted-foreground">Sustainable power solutions</p>
              </div>
            </div>
            
            <div className="absolute -top-5 -right-5 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 flex items-center space-x-3">
              <div className="rounded-full bg-secondary/10 p-2">
                <BarChart3 className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="font-medium text-sm">Energy Efficiency</p>
                <p className="text-xs text-muted-foreground">Optimize power consumption</p>
              </div>
            </div>
            
            <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 flex items-center space-x-3">
              <div className="rounded-full bg-accent/10 p-2">
                <ShieldCheck className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-sm">Reliable Systems</p>
                <p className="text-xs text-muted-foreground">Built to last solutions</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
