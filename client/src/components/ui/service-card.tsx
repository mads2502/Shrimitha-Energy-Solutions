import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { FaBolt, FaSun, FaGaugeHigh, FaCarBattery, FaMicrochip, FaMagnifyingGlassChart } from "react-icons/fa6";
import { Service } from "@shared/schema";
import { Link } from "wouter";

interface ServiceCardProps {
  service: Service;
  className?: string;
  isCompact?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  "bolt": <FaBolt className="h-10 w-10 text-primary" />,
  "sun": <FaSun className="h-10 w-10 text-primary" />,
  "gauge": <FaGaugeHigh className="h-10 w-10 text-primary" />,
  "car-battery": <FaCarBattery className="h-10 w-10 text-primary" />,
  "microchip": <FaMicrochip className="h-10 w-10 text-primary" />,
  "magnifying-glass-chart": <FaMagnifyingGlassChart className="h-10 w-10 text-primary" />,
};

export function ServiceCard({ service, className = "", isCompact = false }: ServiceCardProps) {
  const { title, description, icon, slug } = service;
  
  return (
    <Card 
      className={`overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      <CardHeader className={`${isCompact ? 'pb-2' : 'pb-4'}`}>
        <div className="mb-4">
          {iconMap[icon] || <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary" />}
        </div>
        <CardTitle className={`${isCompact ? 'text-lg' : 'text-xl'}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className={`text-muted-foreground ${isCompact ? 'line-clamp-3' : ''}`}>
          {description}
        </CardDescription>
        {!isCompact && (
          <Link 
            href={`/services#${slug}`}
            className="inline-block mt-4 text-primary hover:text-primary/80 font-medium"
          >
            Learn more →
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
