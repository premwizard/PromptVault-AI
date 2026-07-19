# 🚀 PromptVault AI

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Security: Bandit](https://img.shields.io/badge/Security-Bandit%20Verified-success)
![Type Checking: Mypy & Pyright](https://img.shields.io/badge/Typing-Strict-success)
![Formatting: Ruff](https://img.shields.io/badge/Code%20Style-Ruff-black)
![Lighthouse Performance](https://img.shields.io/badge/Lighthouse_Performance-91-success)
![Lighthouse SEO](https://img.shields.io/badge/Lighthouse_SEO-100-success)
![CI/CD Frontend](https://github.com/yourusername/promptvault/actions/workflows/ci-frontend.yml/badge.svg)
![CI/CD Backend](https://github.com/yourusername/promptvault/actions/workflows/ci-backend.yml/badge.svg)

**PromptVault AI** is a state-of-the-art, full-stack application designed to seamlessly manage, store, and interact with AI prompts. Built with modern web development practices, it features a highly responsive interface, robust backend architecture, and a production-ready DevOps pipeline.

---

## ✨ Features

- **Semantic Search**: Powered by `pgvector` for advanced prompt discovery.
- **Prompt Management**: Create, edit, tag, and categorize prompts with an intuitive UI.
- **Glassmorphism Design**: A stunning, modern frontend utilizing glass-like transparent components.
- **Production Ready**: Fully containerized with Docker, multi-stage builds, and CI/CD pipelines.
- **Rock-Solid Security**: Automated Bandit, Pip-audit, and npm audits on every push.
- **Fully Typed**: 100% type-checked backend using `mypy` and `pyright`.

---

## 🏗️ Architecture & Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: TailwindCSS 4 & Vanilla CSS
- **Containerization**: Multi-stage Docker build utilizing Next.js `standalone` mode.

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11)
- **Database**: PostgreSQL with `pgvector` extension
- **ORM**: [SQLAlchemy 2.0](https://www.sqlalchemy.org/) (Async)
- **Containerization**: Multi-stage Docker build running non-root Uvicorn processes.

### Infrastructure
- **Container Orchestration**: Docker Compose
- **CI/CD**: GitHub Actions (Linting, Testing, Security Scanning, Build Verification)

---

## 🛡️ Security & Code Quality Metrics

Our CI/CD pipeline enforces the following standards across our stack:

### Frontend Metrics
- **Lighthouse SEO Score**: `100/100`
- **Lighthouse Best Practices Score**: `96/100`
- **Lighthouse Performance Score**: `91/100`
- **Lighthouse Accessibility Score**: `84/100`
- **Linting**: `0` warnings or errors (ESLint & Prettier).
- **Dead Code Elimination**: `0` unused files (Knip).
- **Dependency Auditing**: `0` vulnerabilities (npm audit).

### Backend Metrics
- **Bandit Security Scan**: `0` issues identified.
- **Static Type Checking**: `0` errors (mypy).
- **Dependency Auditing**: Continuously scanned via `pip-audit`.
- **Formatting**: Fully compliant with `ruff` strict formatting.
- **Health Checks**: Included `/health` endpoint for readiness and database liveness.

---

## 🚀 Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js (v18+) (For local development without Docker)
- Python 3.11+ (For local development without Docker)

### 🐳 Run with Docker (Recommended)

1. Clone the repository and navigate to the root directory.
2. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```
3. Start the entire stack:
   ```bash
   docker-compose up --build
   ```
4. Access the application:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000
   - **API Docs**: http://localhost:8000/docs

---

## 🚢 Deployment

### 1. Frontend (Vercel)
The frontend is optimized for deployment on Vercel. 
- Connect your GitHub repository to Vercel.
- The build command is `npm run build` and the output directory is automatically detected.
- Ensure `NEXT_PUBLIC_API_URL` is set in the Vercel Environment Variables to point to your backend.

### 2. Backend (Render / Railway)
The backend is fully containerized and ready for PaaS deployment.
- Connect your repository to Render or Railway.
- Choose **Deploy from Dockerfile**.
- Set the Root Directory to `backend/`.
- Set `DATABASE_URL` and `ENVIRONMENT=production` in the environment variables.

### 3. Database (Supabase)
We recommend Supabase for a managed PostgreSQL instance with `pgvector` built-in.
- Create a new Supabase project.
- Obtain the database connection string and use it for your Backend `DATABASE_URL`.

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. Make sure to run the following checks before committing:

**Backend:**
```bash
ruff check .
ruff format .
mypy .
pytest
```

**Frontend:**
```bash
npm run lint
npx prettier --write .
npx knip
npx vitest run
```

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
