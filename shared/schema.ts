import { pgTable, text, serial, timestamp, integer, jsonb, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { relations } from 'drizzle-orm';
import { z } from 'zod';

// Users schema (keeping the existing one)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact messages
export const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const contactMessageInsertSchema = createInsertSchema(contactMessages, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  email: (schema) => schema.email("Please provide a valid email address"),
  message: (schema) => schema.min(10, "Message must be at least 10 characters"),
});

export type ContactMessageInsert = z.infer<typeof contactMessageInsertSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Newsletter subscribers
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  isActive: boolean('is_active').default(true).notNull()
});

export const newsletterSubscriberInsertSchema = createInsertSchema(newsletterSubscribers, {
  email: (schema) => schema.email("Please provide a valid email address")
});

export type NewsletterSubscriberInsert = z.infer<typeof newsletterSubscriberInsertSchema>;
export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;

// Services
export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const serviceInsertSchema = createInsertSchema(services);
export type ServiceInsert = z.infer<typeof serviceInsertSchema>;
export type Service = typeof services.$inferSelect;

// Projects
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  category: text('category').notNull(),
  client: text('client'),
  completionDate: timestamp('completion_date'),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const projectInsertSchema = createInsertSchema(projects);
export type ProjectInsert = z.infer<typeof projectInsertSchema>;
export type Project = typeof projects.$inferSelect;

// Team members
export const team = pgTable('team', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  position: text('position').notNull(),
  bio: text('bio'),
  image: text('image'),
  socialLinks: jsonb('social_links'),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const teamInsertSchema = createInsertSchema(team);
export type TeamInsert = z.infer<typeof teamInsertSchema>;
export type TeamMember = typeof team.$inferSelect;

// Testimonials
export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  position: text('position'),
  company: text('company'),
  quote: text('quote').notNull(),
  image: text('image'),
  rating: integer('rating').default(5),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const testimonialInsertSchema = createInsertSchema(testimonials);
export type TestimonialInsert = z.infer<typeof testimonialInsertSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Workshops/Events
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  location: text('location'),
  image: text('image'),
  capacity: integer('capacity'),
  registrationUrl: text('registration_url'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const eventInsertSchema = createInsertSchema(events);
export type EventInsert = z.infer<typeof eventInsertSchema>;
export type Event = typeof events.$inferSelect;

// Industry collaborations
export const collaborations = pgTable('collaborations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  logo: text('logo'),
  website: text('website'),
  description: text('description'),
  isActive: boolean('is_active').default(true).notNull(),
  order: integer('order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const collaborationInsertSchema = createInsertSchema(collaborations);
export type CollaborationInsert = z.infer<typeof collaborationInsertSchema>;
export type Collaboration = typeof collaborations.$inferSelect;

// Internship applications
export const internshipApplications = pgTable('internship_applications', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  education: text('education').notNull(),
  experience: text('experience'),
  motivation: text('motivation').notNull(),
  resume: text('resume'),
  status: text('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const internshipApplicationInsertSchema = createInsertSchema(internshipApplications, {
  name: (schema) => schema.min(2, "Name must be at least 2 characters"),
  email: (schema) => schema.email("Please provide a valid email address"),
  education: (schema) => schema.min(5, "Education details must be at least 5 characters"),
  motivation: (schema) => schema.min(20, "Motivation statement must be at least 20 characters"),
});

export type InternshipApplicationInsert = z.infer<typeof internshipApplicationInsertSchema>;
export type InternshipApplication = typeof internshipApplications.$inferSelect;

// Settings/Configuration
export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const settingInsertSchema = createInsertSchema(settings);
export type SettingInsert = z.infer<typeof settingInsertSchema>;
export type Setting = typeof settings.$inferSelect;
