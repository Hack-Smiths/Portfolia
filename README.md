

# 🚀 Portfolia – Smart Internship Portfolio Builder

**Portfolia** is a futuristic, AI-powered platform that helps users create stunning, professional portfolios by importing internship projects, extracting key skills, and generating AI-enhanced descriptions. Built with cutting-edge frontend design and scalable backend APIs.

---

## 📦 Tech Stack

### 🖥️ Frontend

* **Framework**: React (Vite) + TypeScript
* **Styling**: TailwindCSS (SaaS-like glassmorphism + neumorphism)
* **UI Framework**: ShadCN-style reusable components
* **Routing**: React Router
* **State Management**: Context API (if needed)

### ⚙️ Backend

* **Framework**: FastAPI (Python)
* **Database**: PostgreSQL
* **ORM**: SQLAlchemy
* **API Auth**: GitHub API with Personal Access Token
* **LLM Integration**: OpenAI or other LLMs (in progress)
* **Environment Config**: `.env` based setup

---

## 🎯 Features

### 🔗 GitHub Integration

* Import public internship/project repos
* Fetch details like name, stars, forks, description, and README content
* Extract live deployed URL if mentioned in the README
* Secure GitHub API usage via `.env`

### 🧠 AI-Powered Enhancements (LLM)

* Generate a neat project summary from raw README content
* Extract tech stacks automatically
* Summarize resume content (from PDF upload) into key achievements/skills
* Identify top skills and tag proficiency levels

### 📄 Portfolio Builder

* Fully responsive UI (mobile + desktop)
* Add/Edit/Delete projects, skills, and achievements manually
* Real-time Portfolio Preview
* Export to PDF / Share via public URL
* Theme switcher (Light · Soft · Neon)

### 🧩 Pages

* Landing Page
* Login / Signup
* Dashboard (Activity timeline, quick actions)
* Projects (GitHub/manual entries)
* Achievements (Resume parser + manual entry)
* Skills (AI + manual skills)
* Portfolio Preview (Live editable)
* Export Page
* Profile Page

---

## 📁 Folder Structure

```bash
Portfolia/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── utils/
│       └── App.tsx
├── backend/
│   ├── app/
│   │   ├── api/v1/routes/github.py
│   │   ├── schemas/github.py
│   │   ├── crud/github.py
│   │   └── db/models/
│   ├── main.py
│   └── .env  (GITHUB_API_TOKEN=...)
```

---

## 🔒 Security

* `.env` is ignored using `.gitignore`
* Secrets never exposed in repo history (BFG used if leaked)
* Token sharing guidelines for collaborators (local `.env` setup)

---

## 🧪 Testing Instructions

### 🖥️ Backend

```bash
# Setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt

# Run
uvicorn app.main:app --reload

# Example Endpoint
GET /api/v1/github/repo-info?repo_url=https://github.com/muneeb50/Dynamic-Scheduler-and-Route-Planner
```

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🤝 Team Roles

| Name     | Role                                     |
| -------- | ---------------------------------------- |
| Riyaz    | Backend Lead + LLM Architect             |
| Ramitha  | Backend API Integration + AI             |
| Mani     | UI/UX Designer (Figma + Tailwind)        |
| Asik     | Frontend Developer (Next.js)             |
| Subeshan | AI Prompt Engineering & Skills Extractor |

---

## 📌 Project Status

* ✅ Frontend UI fully built
* ✅ GitHub API working (import, readme fetch)
* 🔄 LLM integration in progress
* 🔜 Resume parsing, skill detection
* 🔜 PDF export & live share URL

---

## 📬 Setup for Collaborators

1. Clone the repo
2. Create `.env` in `/backend` with:

   ```
   GITHUB_API_TOKEN=your_token_here
   ```
3. Run backend + frontend separately as described above.

---

## 🏁 Final Goal

Create the **most visually explosive and intelligent internship portfolio builder** seen in hackathons — one that impresses recruiters, judges, and teammates alike.

---
