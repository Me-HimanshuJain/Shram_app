import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupAuth } from "./auth"; // Auth setup from blueprint

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Set up authentication (added by blueprint usually, but we call it here if available)
  // Since we are overwriting routes.ts, we need to ensure we call auth setup.
  // The blueprint usually creates server/auth.ts and modifies server/index.ts. 
  // But here we need to make sure auth routes are registered.
  // We'll assume server/auth.ts exists after blueprint runs.
  try {
    const { setupAuth } = await import("./auth");
    setupAuth(app);
  } catch (e) {
    console.log("Auth module not found yet, skipping auth setup");
  }

  app.get(api.users.list.path, async (req, res) => {
    const role = req.query.role as string | undefined;
    if (role) {
      const users = await storage.getUsersByRole(role);
      res.json(users);
    } else {
      res.json([]);
    }
  });

  app.get(api.users.get.path, async (req, res) => {
    const user = await storage.getUser(Number(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  });
  
  app.patch(api.users.update.path, async (req, res) => {
    const input = api.users.update.input.parse(req.body);
    const user = await storage.updateUser(Number(req.params.id), input);
    res.json(user);
  });

  app.get(api.jobs.list.path, async (req, res) => {
    const jobs = await storage.getJobs();
    res.json(jobs);
  });

  app.post(api.jobs.create.path, async (req, res) => {
    const input = api.jobs.create.input.parse(req.body);
    const job = await storage.createJob(input);
    res.status(201).json(job);
  });
  
  app.post(api.loans.create.path, async (req, res) => {
    const input = api.loans.create.input.parse(req.body);
    const loan = await storage.createLoan(input);
    res.status(201).json(loan);
  });

  app.post(api.chat.process.path, async (req, res) => {
    const { message, language } = req.body;
    // Mock AI response for now, or use OpenAI if env var is set
    // For prototype, we'll return a simulated helpful response
    
    // Simple simulated logic
    let response = "I can help you with that.";
    if (message.toLowerCase().includes("job")) {
      response = "There are 3 construction jobs available near you. Would you like to see them?";
    } else if (message.toLowerCase().includes("loan")) {
      response = "You are eligible for a microloan of up to ₹20,000. Shall I help you apply?";
    }
    
    // If OpenAI key is available, we could use it here. 
    // But for the "prototype" feel requested, consistent mock responses might be better 
    // unless we want real intelligence.
    // The blueprint adds OPENAI_API_KEY.
    
    if (process.env.OPENAI_API_KEY) {
      try {
        const OpenAI = await import("openai");
        const openai = new OpenAI.default({ apiKey: process.env.OPENAI_API_KEY });
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            { role: "system", content: "You are Shramik-Setu AI, a helpful assistant for gig workers in India. Answer in the requested language (default English). Be simple, helpful, and encouraging." },
            { role: "user", content: `Language: ${language || 'English'}. Message: ${message}` }
          ],
        });
        response = completion.choices[0].message.content || response;
      } catch (err) {
        console.error("OpenAI Error:", err);
      }
    }

    res.json({ response });
  });

  // Seed Data
  if (process.env.NODE_ENV !== 'production') {
    const existingUser = await storage.getUserByUsername("ramesh");
    if (!existingUser) {
      await storage.createUser({
        username: "ramesh",
        password: "password123", // In real app, hash this
        displayName: "Ramesh Kumar",
        role: "worker",
        skills: ["Masonry", "Tiling", "Concrete work"],
        location: "Delhi",
        verifiedLevel: "silver",
        rating: "4.8",
        walletBalance: 8500
      });
      
      await storage.createUser({
        username: "techcorp",
        password: "password123",
        displayName: "TechCorp CSR Fund",
        role: "employer",
        location: "Delhi",
        verifiedLevel: "gold"
      });
      
      const employer = await storage.getUserByUsername("techcorp");
      if (employer) {
        await storage.createJob({
          title: "Masonry Work Needed",
          description: "Need skilled mason for 3 days work.",
          employerId: employer.id,
          location: "South Delhi",
          wage: 800,
          status: "open"
        });
      }
    }
  }

  return httpServer;
}
