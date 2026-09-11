# SafeAI School – AI Powered Smart School Safety & Learning Platform

> **Tagline:** *Every Girl Safe. Every Parent Connected. Every Student Empowered.*

---

## 🌟 Overview & Project Vision

**SafeAI School** is a cutting-edge, comprehensive smart school ecosystem created specifically for girls' schools. The platform harmonizes campus physical safety with academic excellence by coupling real-time smart attendance and parent emergency broadcasting with an intelligent, retrieval-augmented (RAG) AI learning assistant strictly grounded in school curriculum textbooks.

---

## 🚀 Key Modules & Capabilities

### 1. 🛡️ Smart Attendance & Parent Real-Time Notifications
- **Multi-Modal Check-In**: High-speed optical QR code badge scanning, RFID card touch terminal emulation, and manual teacher roll call.
- **Instant Guardian Dispatch**: Automated updates sent via WhatsApp, SMS, and in-app feeds the moment a student enters or exits:
  - *“Your daughter Sara Ahmed safely reached school at 7:45 AM.”*
  - *“Your daughter Sara Ahmed has left school at 1:40 PM.”*
- **Attendance Analytics**: Daily/monthly presence curves, late-arrival trends, and punctuality heatmaps built with Recharts.

### 2. 🚨 Campus Emergency SOS & Geofence Radar
- **1-Tap SOS Panic Button**: Instantly dispatches student live GPS coordinates (`33.7201° N, 73.0612° E`) to parents, campus security booth, and female rapid response units.
- **Geofenced Virtual Perimeter**: Continuous radar tracking campus boundaries; alerts guardians if a student departs outside scheduled dismissal.
- **Nearby Emergency Services**: Interactive map radar displaying nearby police stations, maternity/children hospitals, and hotlines with direct dialing and Google Maps navigation.

### 3. 🧠 RAG AI Learning Assistant & Academic Companion
- **Textbook Grounded (Zero Hallucination)**: Answers queries strictly from uploaded school documents (PDF, DOCX, TXT). If a topic is out-of-curriculum, responds:
  - *“I cannot find this information in the uploaded school material.”*
- **Source Citations & Confidence Meter**: Mentions the exact document name, page reference, and verified confidence percentage (e.g. `96%`).
- **MCQ Generator**: Generates 5, 10, 20, or 50 questions across Easy, Medium, and Hard tiers, complete with interactive test taking, immediate answer feedback, and confetti celebration.
- **Assignment & Worksheet Generator**: Generates rubrics, short questions, long derivations, and teacher answer keys.
- **AI Homework & Problem Solver**: Step-by-step guidance, formula breakdowns, and exam tips.
- **Study Assistant**: Active recall flashcards, key concept chapter summaries, and 7-day exam revision timetable.

### 4. 👥 Tailored Multi-Role Portals
- **School Admin**: Full student directory, faculty assignments, RAG knowledge base document ingestion, and institutional safety feeds.
- **Teacher Dashboard**: Smart attendance marker, homework manager, marks and gradebook with remarks, and quiz builders.
- **Parent Portal**: Real-time arrival/departure feed, attendance timestamp history, academic report cards, and emergency radar.
- **Student Dashboard**: Study companion, homework checklist, exam results, and quick SOS access.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router, Server Actions, API Routes)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS, Glassmorphism, Custom Theme Tokens
- **Icons**: Lucide React
- **Themes**: `next-themes` (Light, Dark, and System Mode)
- **Charts**: Recharts (Attendance and Grade distributions)
- **Database & Vector Storage**: Supabase PostgreSQL with `pgvector` extension for 768-dim embeddings (`supabase/schema.sql`)
- **Animations**: Framer Motion & Canvas Confetti

---

## 🗄️ Database Schema (`supabase/schema.sql`)

The repository includes a complete production SQL migration script containing all 17 tables and `pgvector` RPC match functions:
1. `users`
2. `students`
3. `parents`
4. `teachers`
5. `classes`
6. `subjects`
7. `attendance`
8. `homework`
9. `assignments`
10. `marks`
11. `notifications`
12. `emergency_contacts`
13. `documents`
14. `document_chunks`
15. `embeddings` (`vector(768)`)
16. `chat_history`
17. `ai_responses`

---

## 💻 Local Development Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/SafeAI-School.git
cd School_App
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
*(The app runs out-of-the-box with built-in realistic mock data and in-memory RAG vectors even before configuring external database credentials).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment

### Deploying to Vercel
1. Push your code to a GitHub repository.
2. Import the project into [Vercel](https://vercel.com).
3. Set the build command to `npm run build` and install command to `npm install`.
4. (Optional) Provide your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel Environment Variables.
5. Click **Deploy**.

---

## 📄 License
This project is licensed under the MIT License.
