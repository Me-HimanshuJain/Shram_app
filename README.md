# 🛠️ Shramik-Setu (Shram_app)

> **Empowering India's Informal & Gig Economy** — Verifiable Digital Identity, Transparent Commission Models, Financial Inclusion, and AI-Powered Assistance.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![OpenAI](https://img.shields.io/badge/OpenAI_API-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)

---

## 📌 Overview

**Shramik-Setu** is a full-stack, mobile-responsive web platform tailored specifically for India's gig workers and tradespeople (masons, plumbers, electricians, carpenters, daily-wage laborers). 

Informal workers often struggle with a lack of verifiable work history, predatory commission cuts from aggregators, financial exclusion, and literacy barriers. Shramik-Setu solves these systemic challenges by providing:
1. **Verifiable Digital Credentials**: Portable digital certificates with work history and trust scoring.
2. **Transparent Commission Choices**: Freedom to choose between fair per-transaction fees or predictable monthly plans.
3. **Multilingual AI Guidance**: An intelligent assistant providing voice and text support in regional Indian languages.
4. **Financial Tools**: Built-in wallet, earnings analytics, and microloan eligibility tools.

---

## ✨ Key Features

### 1. 🪪 Digital Worker ID & Certificate
* Official digital certificate with holographic styling, unique Worker ID (e.g., `SHW-2024-001234`), and scannable QR verification.
* Certified skill levels (e.g., Masonry Gold, Plumbing Silver).
* Dynamic Trust Score (out of 100) and verified job completion metrics.
* Downloadable PDF certificates and shareable verification links.

### 2. ⚖️ Fair Commission Models
* **Option A: Per-Transaction Model (5%–8%)**:
  * Pay-as-you-earn with low platform deductions.
  * Includes ₹2 Lakh accident coverage.
* **Option B: Fixed Monthly Model (₹2,499/month)**:
  * 0% platform commission on unlimited completed jobs.
  * Premium ₹5 Lakh insurance cover, priority job notifications, and free skill certifications.

### 3. 🤖 Multilingual AI Assistant
* Built-in conversational AI assistant powered by OpenAI (`gpt-4o`).
* Simplifies job searching, loan application guidance, and platform navigation in plain regional languages.

### 4. 💼 Job Marketplace & Worker Discovery
* **For Workers**: Browse nearby job postings with upfront wage disclosures and location details.
* **For Employers & Contractors**: Filter and discover verified workers by trade, location, and verified rating tier.

### 5. 💳 Financial Hub & Microloans
* Interactive earnings breakdown and wallet management.
* Transparent microloan calculator with eligibility simulation and instant application.
* Gamified rewards and achievements for completing safety and quality milestones.

---

## 🏗️ Architecture & Tech Stack

```mermaid
graph TD
    Client[React 18 + Vite + Tailwind + Radix UI]
    Server[Node.js + Express API Server]
    DB[(PostgreSQL Database)]
    AI[OpenAI API Engine]

    Client <-->|REST API / JSON| Server
    Server <-->|Drizzle ORM| DB
    Server <-->|AI Assistant Queries| AI
```

### **Frontend**
* **Framework**: React 18 with Vite
* **Styling**: Tailwind CSS, PostCSS, Framer Motion (page transitions and micro-interactions)
* **Components**: Radix UI primitives, Lucide React icons, Recharts
* **Routing**: Wouter (lightweight client-side router)
* **Data Fetching**: `@tanstack/react-query`

### **Backend**
* **Runtime**: Node.js 20+
* **Framework**: Express.js with TypeScript (`tsx`)
* **ORM**: Drizzle ORM with `pg` (PostgreSQL driver)
* **Validation**: Zod & `drizzle-zod`
* **Session & Auth**: `express-session`, `connect-pg-simple`, Passport-compatible session storage

---

## 📁 Project Directory Structure

```text
Shram-App/
├── client/                     # Frontend Application
│   ├── public/                 # Static assets & favicons
│   ├── src/
│   │   ├── components/         # Reusable UI components & navigation
│   │   │   ├── ui/             # Radix & design system primitives
│   │   │   ├── Navigation.tsx  # Bottom & top app navigation
│   │   │   └── GradientCard.tsx
│   │   ├── hooks/              # Custom React hooks (use-auth, use-toast)
│   │   ├── lib/                # Query client & utility helpers
│   │   ├── pages/              # Application views
│   │   │   ├── Home.tsx        # Dashboard & Landing
│   │   │   ├── DigitalId.tsx   # Digital Worker ID & Certificate
│   │   │   ├── Jobs.tsx        # Job listings & application flow
│   │   │   ├── Finance.tsx     # Earnings, wallet & microloan calculator
│   │   │   ├── Rewards.tsx     # Points, badges & achievements
│   │   │   ├── AiAssistant.tsx # Multilingual AI chatbot
│   │   │   └── FindWorkers.tsx # Employer worker discovery portal
│   │   ├── App.tsx             # Main router
│   │   └── index.css           # Global theme & typography styles
│   └── index.html              # Frontend entry point
├── server/                     # Backend API Server
│   ├── db.ts                   # PostgreSQL connection pool with Drizzle
│   ├── index.ts                # Express app bootstrap & Vite middleware
│   ├── routes.ts               # Core API endpoints & sample seed data
│   ├── storage.ts              # Database repository abstraction
│   └── replit_integrations/    # Replit Auth & integrations
├── shared/                     # Shared Types & Schemas
│   ├── schema.ts               # Drizzle database tables & Zod schemas
│   └── routes.ts               # Typed API contract definitions
├── attached_assets/            # Specifications and assets
├── drizzle.config.ts           # Drizzle Kit configuration
├── package.json                # Project dependencies and scripts
├── tailwind.config.ts          # Tailwind CSS theme configuration
└── tsconfig.json               # TypeScript compiler config
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v20 or higher recommended)
* [PostgreSQL](https://www.postgresql.org/) (v14 or higher)
* [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/Me-HimanshuJain/Shram_app.git
cd Shram_app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the example environment configuration:
```bash
cp .env.example .env
```
Update `.env` with your database credentials and optional OpenAI API key:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/shramik_db
SESSION_SECRET=your-secret-session-key
OPENAI_API_KEY=sk-...
```

### 4. Setup Database Schema
Push the Drizzle schema to your PostgreSQL database:
```bash
npm run db:push
```

### 5. Run the Application
Start the development server (runs both the backend API and Vite client on port 5000):
```bash
npm run dev
```

Visit `http://localhost:5000` in your browser.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the full-stack development server with hot-reload |
| `npm run build` | Builds the client bundle and compiles server scripts |
| `npm run start` | Launches the production server using compiled artifacts |
| `npm run check` | Runs TypeScript type checking across the project |
| `npm run db:push` | Pushes the Drizzle ORM schema to the PostgreSQL database |

---

## 📡 API Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/users?role=:role` | List users filtered by role (`worker` or `employer`) |
| `GET` | `/api/users/:id` | Fetch user profile, skills, verified level & trust score |
| `PATCH` | `/api/users/:id` | Update user commission model, wallet balance, or details |
| `GET` | `/api/jobs` | Retrieve all open job listings |
| `POST` | `/api/jobs` | Post a new job requisition (Employers) |
| `POST` | `/api/loans` | Submit a microloan application |
| `POST` | `/api/chat` | Query the Multilingual AI Assistant |

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).
