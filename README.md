# 🏆 LeetCrack | LeetCode Progress Tracker & Revision Helper

LeetCrack is a premium, full-stack web application designed to help software engineers track, visualize, and optimize their Data Structures and Algorithms (DSA) preparation. 

Inspired by popular roadmaps like Striver's A2Z DSA Sheet, LeetCrack allows you to catalog your daily coding solves, organize problems by topic, store critical notes/tricks, and automatically receive revision prompts based on spaced repetition.

## 🚀 Key Features

*   **Multi-Device Synchronization:** Powered by Supabase, allowing you to access and update your notes seamlessly from your phone or laptop.
*   **Daily Progress Tracker:** Add log entries with problem names, LeetCode links, difficulties, and custom markdown notes. Search and filter logs easily.
*   **Topic Sheets (Roadmap):** Access a curated database of ~50 foundational DSA problems across 8 topics (Arrays, Strings, Stacks, Queues, Binary Search, Linked Lists, Trees, Graphs, DP).
*   **Solving Heatmap:** A GitHub-style daily activity calendar visualizing your coding consistency.
*   **Difficulty Analytics:** Custom visual statistics showing your Easy, Medium, and Hard solved ratios.
*   **Spaced Repetition Revision Center:** Alerts you when a problem is due for revision (default: 5 days ago). Easily mark items as revised to maintain recall.
*   **Data Export & Backup:** Export your entire database log as a JSON file and import it anytime.
*   **Offline Development Fallback:** Works immediately in local storage mode if Supabase configurations are not present.

---

## 🛠️ Technology Stack

*   **Frontend:** React (React 19 + Vite)
*   **Backend & DB:** Supabase (PostgreSQL with Row Level Security policies)
*   **Icons:** Lucide React
*   **Styling:** Custom Vanilla CSS (Dark glassmorphism theme, fully responsive)

---

## 💻 Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/your-username/leetcode_project.git
cd leetcode_project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Supabase Database Schema
1. Create a free account at [Supabase](https://supabase.com/).
2. Create a new project.
3. Open the **SQL Editor** in the Supabase dashboard.
4. Copy and paste the contents of `supabase/schema.sql` into the SQL Editor and click **Run**.

### 4. Configure Environment Variables
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in your Supabase project URL and anon public key. You can find these in the Supabase Dashboard under **Project Settings -> API**.
   *   `VITE_SUPABASE_URL`
   *   `VITE_SUPABASE_ANON_KEY`

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔒 Security & Authorization

To protect user privacy, Row Level Security (RLS) is enabled on all tables in Supabase:
*   Users can only **View**, **Create**, **Update**, and **Delete** logs that match their authenticated user ID (`auth.uid() = user_id`).
*   Your personal notes and problems will never be visible to other users.

---

## 🌐 Deployment to GitHub Pages

Since the app is a React Single Page Application (SPA), you can easily host it for free on GitHub Pages:

1. Install `gh-pages` as a dev dependency:
   ```bash
   npm i -D gh-pages
   ```
2. Add the following scripts to your `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Add a `homepage` field to `package.json` pointing to your deployment URL:
   ```json
   "homepage": "https://your-username.github.io/leetcode_project"
   ```
4. Deploy the app:
   ```bash
   npm run deploy
   ```

---

## 💡 Key Architectural Insights & Learnings

Building LeetCrack taught us several core lessons about modern software engineering and system architecture:

### 1. Static Web Apps & Client-Side Execution
Instead of hosting a running application server (like Node.js, Express, or Python), LeetCrack compiles into pure **static HTML, CSS, and JavaScript** via Vite.
*   **Result:** The entire application runs 100% inside the user's web browser. 
*   **Hosting Benefit:** Because there is no server-side compilation or routing required, we can host the entire app completely for free on **GitHub Pages** with zero setup costs.

### 2. Serverless Database Architecture (Supabase)
Instead of managing a physical database instance and writing server APIs to connect to it:
*   We use **Supabase** as a Backend-as-a-Service (BaaS).
*   Supabase manages the PostgreSQL server and exposes secure API endpoints.
*   The frontend communicates directly with these database APIs using secure HTTPS web calls, eliminating the need to maintain backend servers.

### 3. Row Level Security (RLS)
Security is implemented directly in the database layers using Postgres RLS:
*   Instead of writing middleware routes to authorize queries, the database automatically filters query requests using policies like `auth.uid() = user_id`.
*   This ensures that no user can ever inspect or modify another user's solved logs or notes, even when accessing the database APIs directly.

### 4. Smart LocalStorage Mocking
To achieve a "zero-configuration" first-run experience, we implemented an API wrapper:
*   If cloud configuration variables (`.env`) are missing, the client automatically defaults to **Offline Local Mode**.
*   It mocks the entire Supabase database and Auth behavior using the browser's built-in **LocalStorage**.
*   This allows recruiters and guests to run, view, and interact with the application instantly without needing to sign up or set up databases.

### 5. Why Docker was Bypassed
Docker is traditionally used to package up complex backend running environments (databases, dependencies, server engines) so they behave identically across dev and production.
*   Because our app runs completely client-side in the browser and connects to a serverless cloud database, **we have zero server code to containerize**. This makes the project lightweight, portable, and extremely easy to scale!

