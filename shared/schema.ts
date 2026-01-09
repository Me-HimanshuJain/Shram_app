import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export * from "./models/auth";
export * from "./models/chat";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("worker"), // 'worker' or 'employer'
  displayName: text("display_name"),
  skills: text("skills").array(), // e.g. ["Masonry", "Plumbing"]
  location: text("location"),
  rating: text("rating").default("0"),
  walletBalance: integer("wallet_balance").default(0),
  verifiedLevel: text("verified_level").default("basic"), // 'basic', 'silver', 'gold'
  commissionModel: text("commission_model"), // 'transaction', 'fixed'
  createdAt: timestamp("created_at").defaultNow(),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  employerId: integer("employer_id").notNull(),
  location: text("location").notNull(),
  wage: integer("wage").notNull(),
  status: text("status").default("open"), // 'open', 'assigned', 'completed'
  createdAt: timestamp("created_at").defaultNow(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull(),
  workerId: integer("worker_id").notNull(),
  status: text("status").default("pending"), // 'pending', 'accepted', 'rejected'
  createdAt: timestamp("created_at").defaultNow(),
});

export const loans = pgTable("loans", {
  id: serial("id").primaryKey(),
  workerId: integer("worker_id").notNull(),
  amount: integer("amount").notNull(),
  status: text("status").default("pending"),
  purpose: text("purpose"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const rewards = pgTable("rewards", {
  id: serial("id").primaryKey(),
  workerId: integer("worker_id").notNull(),
  points: integer("points").default(0),
  badges: text("badges").array(), // e.g. ["Early Bird", "Quality Master"]
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true, rating: true, walletBalance: true, verifiedLevel: true });
export const insertJobSchema = createInsertSchema(jobs).omit({ id: true, createdAt: true });
export const insertApplicationSchema = createInsertSchema(applications).omit({ id: true, createdAt: true });
export const insertLoanSchema = createInsertSchema(loans).omit({ id: true, createdAt: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Application = typeof applications.$inferSelect;
export type Loan = typeof loans.$inferSelect;
export type Reward = typeof rewards.$inferSelect;
