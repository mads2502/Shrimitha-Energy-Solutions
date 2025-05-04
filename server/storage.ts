import { db } from "@db";
import { 
  contactMessages, 
  newsletterSubscribers, 
  services, 
  projects, 
  team, 
  testimonials, 
  events, 
  collaborations,
  internshipApplications,
  settings,
  ContactMessageInsert,
  NewsletterSubscriberInsert,
  InternshipApplicationInsert
} from "@shared/schema";
import { eq, desc, and, like, gte } from "drizzle-orm";

export const storage = {
  // Contact messages
  async insertContactMessage(data: ContactMessageInsert) {
    return (await db.insert(contactMessages).values(data).returning())[0];
  },
  
  async getContactMessages(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    return await db.query.contactMessages.findMany({
      orderBy: desc(contactMessages.createdAt),
      limit,
      offset
    });
  },
  
  async getContactMessageById(id: number) {
    return await db.query.contactMessages.findFirst({
      where: eq(contactMessages.id, id)
    });
  },
  
  // Newsletter subscribers
  async insertNewsletterSubscriber(data: NewsletterSubscriberInsert) {
    try {
      return (await db.insert(newsletterSubscribers).values(data).returning())[0];
    } catch (error) {
      if ((error as Error).message.includes('duplicate key')) {
        // Already subscribed
        return null;
      }
      throw error;
    }
  },
  
  async getNewsletterSubscribers(page = 1, limit = 10, onlyActive = true) {
    const offset = (page - 1) * limit;
    const query = onlyActive 
      ? eq(newsletterSubscribers.isActive, true)
      : undefined;
      
    return await db.query.newsletterSubscribers.findMany({
      where: query,
      orderBy: desc(newsletterSubscribers.createdAt),
      limit,
      offset
    });
  },
  
  // Services
  async getServices() {
    return await db.query.services.findMany({
      orderBy: desc(services.createdAt)
    });
  },
  
  async getServiceBySlug(slug: string) {
    return await db.query.services.findFirst({
      where: eq(services.slug, slug)
    });
  },
  
  // Projects
  async getProjects(category?: string) {
    return await db.query.projects.findMany({
      where: category ? eq(projects.category, category) : undefined,
      orderBy: desc(projects.completionDate)
    });
  },
  
  async getProjectBySlug(slug: string) {
    return await db.query.projects.findFirst({
      where: eq(projects.slug, slug)
    });
  },
  
  // Team members
  async getTeamMembers() {
    return await db.query.team.findMany({
      orderBy: team.order
    });
  },
  
  // Testimonials
  async getActiveTestimonials() {
    return await db.query.testimonials.findMany({
      where: eq(testimonials.isActive, true),
      orderBy: desc(testimonials.createdAt)
    });
  },
  
  // Events/Workshops
  async getUpcomingEvents() {
    const now = new Date();
    return await db.query.events.findMany({
      where: and(
        eq(events.isActive, true),
        gte(events.startDate, now)
      ),
      orderBy: events.startDate
    });
  },
  
  async getPastEvents() {
    const now = new Date();
    return await db.query.events.findMany({
      where: and(
        eq(events.isActive, true),
        gte(now, events.startDate)
      ),
      orderBy: desc(events.startDate)
    });
  },
  
  async getEventById(id: number) {
    return await db.query.events.findFirst({
      where: eq(events.id, id)
    });
  },
  
  // Industry collaborations
  async getActiveCollaborations() {
    return await db.query.collaborations.findMany({
      where: eq(collaborations.isActive, true),
      orderBy: collaborations.order
    });
  },
  
  // Internship applications
  async insertInternshipApplication(data: InternshipApplicationInsert) {
    return (await db.insert(internshipApplications).values(data).returning())[0];
  },
  
  async getInternshipApplications(page = 1, limit = 10, status?: string) {
    const offset = (page - 1) * limit;
    return await db.query.internshipApplications.findMany({
      where: status ? eq(internshipApplications.status, status) : undefined,
      orderBy: desc(internshipApplications.createdAt),
      limit,
      offset
    });
  },
  
  // Settings
  async getSetting(key: string) {
    const result = await db.query.settings.findFirst({
      where: eq(settings.key, key)
    });
    return result?.value;
  },
  
  async getAllSettings() {
    const settingsData = await db.query.settings.findMany();
    return settingsData.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string>);
  }
};
