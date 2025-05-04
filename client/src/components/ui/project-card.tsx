import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Project } from "@shared/schema";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className = "" }: ProjectCardProps) {
  const { title, description, image, category, client, completionDate, slug } = project;
  
  const formattedDate = completionDate 
    ? new Date(completionDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      }) 
    : null;
  
  return (
    <Card 
      className={`overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge className="absolute top-2 right-2 bg-primary hover:bg-primary/90">
          {category}
        </Badge>
      </div>
      
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          {client && (
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <span>{client}</span>
            </div>
          )}
          
          {formattedDate && (
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Link 
          href={`/projects#${slug}`} 
          className="text-primary hover:text-primary/80 font-medium"
        >
          View project details →
        </Link>
      </CardFooter>
    </Card>
  );
}
