# Tasky

A full-stack task management application built with **React**, **Node.js/Express**, and **PostgreSQL**. Tasky lets users organise their daily tasks by due date, track weekly activity, manage profiles, and sign in via Google OAuth or email/password.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [API Reference](#api-reference)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Roadmap](#roadmap)

---

## Features

- 🔐 **Authentication** — Email/password sign-up & sign-in with JWT; Google OAuth 2.0.
- ✅ **Task Management** — Create, read, update, delete, and toggle tasks. Filter by due date, priority, category, or search.
- 📅 **Day Slider** — Swipe through days of the week; tasks are filtered to the selected date in real time.
- 📊 **Activity Chart** — Smooth area chart (Recharts) showing daily task counts for the current or last week.
- 🖼️ **Image Uploads** — Attach images to tasks; upload a custom profile avatar (compressed via `sharp`).
- 👤 **Profile Management** — View and edit name, email, date of birth, and avatar.
- 🌙 **Dark Mode** — System-aware theme with a manual toggle, persisted via Redux.
- 📱 **Responsive Layout** — Mobile-first with a persistent sidebar navigation on `md+` screens.

---

## Tech Stack

### Client
| Library | Purpose |
|---------|---------|
| React 19 | UI framework |
| TypeScript | Static typing |
| Vite | Build tool & dev server |
| Tailwind CSS v4 | Utility-first styling |
| Redux Toolkit | Global state management |
| React Router v7 | Client-side routing |
| Axios | HTTP client |
| Recharts | Activity chart |
| MUI X Date Pickers | Date input component |
| Lucide React | Icon library |
| date-fns | Date utilities |

### Server
| Library | Purpose |
|---------|---------|
| Node.js + Express v5 | HTTP server & routing |
| TypeScript + tsx | Type-safe runtime |
| Prisma v7 | ORM & DB migrations |
| PostgreSQL (Neon) | Hosted relational database |
| bcrypt | Password hashing |
| JSON Web Token | Stateless authentication |
| Google Auth Library | OAuth 2.0 token exchange |
| Multer | Multipart file upload handling |
| sharp | Image compression & resizing |
| Zod | Request schema validation |
| date-fns | Server-side date utilities |

---

## Project Structure

```
Tasky/
├── client/                   # React frontend
│   ├── public/
│   │   └── icons/            # SVG assets (logo, etc.)
│   ├── src/
│   │   ├── components/
│   │   │   ├── buttons/      # BrandButton variants
│   │   │   ├── dashboard/    # DaySlider, ActivityChart, DesktopSidebar, MobileHeader
│   │   │   ├── forms/        # InputField, DatePicker, NewTaskSetter
│   │   │   ├── profile/      # ProfileContainer, ProfileEditForm
│   │   │   └── tasks/        # TaskList, TaskCard
│   │   ├── modals/           # Portal-based modal dialogs
│   │   ├── pages/
│   │   │   ├── dashboard/    # DashboardLayout, Home, AddTask
│   │   │   ├── onboarding/   # Step 1-3 onboarding flow
│   │   │   ├── profile/      # ViewProfile, EditProfile
│   │   │   ├── signIn/       # SignIn page
│   │   │   ├── signUp/       # SignUp page
│   │   │   ├── tasksExplore/ # Full task list with search & sort
│   │   │   └── google/       # OAuth callback handler
│   │   ├── services/         # apiClient, authService, taskService, statsService
│   │   ├── store/            # Redux slices (auth, tasks, calendar, theme)
│   │   ├── types/            # Shared TypeScript interfaces
│   │   └── utils/            # resolveAvatarUrl, etc.
│   ├── .env
│   └── vite.config.ts
│
└── server/                   # Express backend
    ├── src/
    │   ├── controllers/      # auth, tasks, user controllers
    │   ├── lib/              # prisma, upload, uploadAvatar, googleAuth
    │   ├── middleware/       # auth (JWT protect)
    │   └── routes/           # auth, tasks, user routers
    ├── prisma/
    │   └── schema.prisma
    ├── uploads/              # Local file storage (dev only)
    └── .env
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A **PostgreSQL** database (local or hosted — [Neon](https://neon.tech) recommended)
- A **Google Cloud** project with OAuth 2.0 credentials (for Google sign-in)

---

### Environment Variables

#### `server/.env`

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@HOST/DB?sslmode=require"

JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="7d"

GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GOOGLE_REDIRECT_URI="http://localhost:5000/api/auth/google/callback"

CLIENT_URL="http://localhost:5173"

# Optional — Cloudinary (for cloud image storage)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

#### `client/.env`

```env
VITE_API_URL="http://localhost:5000"
```

> **For production**, swap `VITE_API_URL` to your deployed server URL and update `GOOGLE_REDIRECT_URI` and `CLIENT_URL` accordingly.

---

### Running Locally

**1. Clone the repo**

```bash
git clone https://github.com/your-username/tasky.git
cd tasky
```

**2. Set up the server**

```bash
cd server
npm install
npx prisma generate
npx prisma migrate deploy   # or `prisma migrate dev` for a fresh local DB
npm run dev                  # starts on http://localhost:5000
```

**3. Set up the client** (in a new terminal)

```bash
cd client
npm install
npm run dev                  # starts on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## API Reference

All task and user routes require a `Bearer <token>` header.

### Auth — `/api/auth`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/signup` | Register with name, email, password |
| `POST` | `/signin` | Sign in; returns JWT + user |
| `GET` | `/google` | Returns Google OAuth redirect URL |
| `GET` | `/google/callback` | Exchanges OAuth code; redirects to client |

### Tasks — `/api/tasks`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Get all tasks (filterable by `dueDate`, `status`, `priority`, `category`, `search`) |
| `POST` | `/` | Create a task (supports optional image upload) |
| `GET` | `/stats/weekly` | Weekly task count per day (`?week=current\|last`) |
| `GET` | `/:id` | Get a single task |
| `PATCH` | `/:id` | Update a task (partial, supports image upload) |
| `PATCH` | `/:id/toggle` | Toggle task status `PENDING ↔ COMPLETED` |
| `DELETE` | `/:id` | Delete a task (cleans up image file) |

### Users — `/api/users`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/me` | Get current user profile |
| `PATCH` | `/me` | Update profile (name, email, dob, avatar) |
| `DELETE` | `/me` | Delete account and all associated tasks |

---

## Scripts

### Client

```bash
npm run dev       # Start Vite dev server
npm run build     # Type-check + production build
npm run preview   # Serve production build locally
npm run lint      # ESLint
```

### Server

```bash
npm run dev       # tsx watch (hot reload)
npm run build     # Compile TypeScript → dist/
npm run start     # Run compiled output (production)
```

---

## Deployment

The app is configured for deployment on **[Render](https://render.com)**:

- **Server** — Web Service
  - Build command: `npm run build`
  - Start command: `npm run start`
  - Set all `server/.env` variables in the Render dashboard.

- **Client** — Static Site
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Set `VITE_API_URL` to the Render server URL.

> Make sure to update `GOOGLE_REDIRECT_URI` and `CLIENT_URL` to the production URLs before deploying.

---

## Roadmap

- [ ] Cloudinary integration for persistent image storage
- [ ] Desktop sidebar animated collapse / drawer
- [ ] Push notifications
- [ ] Task reminders / due date alerts
- [ ] Recurring tasks
- [ ] Shared / collaborative task lists
