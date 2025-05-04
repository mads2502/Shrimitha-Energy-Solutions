import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  contactMessageInsertSchema, 
  newsletterSubscriberInsertSchema,
  internshipApplicationInsertSchema 
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const apiPrefix = "/api";

  // GET website content
  app.get(`${apiPrefix}/services`, async (_req, res) => {
    try {
      const services = await storage.getServices();
      return res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      return res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  app.get(`${apiPrefix}/projects`, async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const projects = await storage.getProjects(category);
      return res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      return res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get(`${apiPrefix}/team`, async (_req, res) => {
    try {
      const teamMembers = await storage.getTeamMembers();
      return res.json(teamMembers);
    } catch (error) {
      console.error("Error fetching team:", error);
      return res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  app.get(`${apiPrefix}/testimonials`, async (_req, res) => {
    try {
      const testimonials = await storage.getActiveTestimonials();
      return res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.get(`${apiPrefix}/events`, async (req, res) => {
    try {
      const type = req.query.type as string;
      let events;
      
      if (type === "past") {
        events = await storage.getPastEvents();
      } else {
        events = await storage.getUpcomingEvents();
      }
      
      return res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      return res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  app.get(`${apiPrefix}/collaborations`, async (_req, res) => {
    try {
      const collaborations = await storage.getActiveCollaborations();
      return res.json(collaborations);
    } catch (error) {
      console.error("Error fetching collaborations:", error);
      return res.status(500).json({ message: "Failed to fetch collaborations" });
    }
  });

  app.get(`${apiPrefix}/settings`, async (_req, res) => {
    try {
      const settings = await storage.getAllSettings();
      return res.json(settings);
    } catch (error) {
      console.error("Error fetching settings:", error);
      return res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  // POST endpoints
  app.post(`${apiPrefix}/contact`, async (req: Request, res: Response) => {
    try {
      const validatedData = contactMessageInsertSchema.parse(req.body);
      const newMessage = await storage.insertContactMessage(validatedData);
      return res.status(201).json({ 
        success: true, 
        message: "Your message has been sent successfully. We'll get back to you soon!",
        data: newMessage 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false,
          message: "Please check your inputs and try again.",
          errors: error.errors 
        });
      }
      console.error("Error saving contact message:", error);
      return res.status(500).json({ 
        success: false,
        message: "Failed to send your message. Please try again later." 
      });
    }
  });

  app.post(`${apiPrefix}/newsletter/subscribe`, async (req: Request, res: Response) => {
    try {
      const validatedData = newsletterSubscriberInsertSchema.parse(req.body);
      const result = await storage.insertNewsletterSubscriber(validatedData);
      
      if (!result) {
        return res.status(200).json({ 
          success: true, 
          message: "You are already subscribed to our newsletter." 
        });
      }
      
      return res.status(201).json({ 
        success: true, 
        message: "Thank you for subscribing to our newsletter!" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false,
          message: "Please provide a valid email address.",
          errors: error.errors 
        });
      }
      console.error("Error subscribing to newsletter:", error);
      return res.status(500).json({ 
        success: false,
        message: "Failed to subscribe to the newsletter. Please try again later." 
      });
    }
  });

  app.post(`${apiPrefix}/internships/apply`, async (req: Request, res: Response) => {
    try {
      const validatedData = internshipApplicationInsertSchema.parse(req.body);
      const application = await storage.insertInternshipApplication(validatedData);
      return res.status(201).json({ 
        success: true, 
        message: "Your application has been submitted successfully! We'll review it and get back to you.",
        data: application 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false,
          message: "Please check your application details and try again.",
          errors: error.errors 
        });
      }
      console.error("Error saving internship application:", error);
      return res.status(500).json({ 
        success: false,
        message: "Failed to submit your application. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
