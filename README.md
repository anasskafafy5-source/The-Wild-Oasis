# 🏨 The Wild Oasis — Hotel Management Dashboard

> The internal dashboard hotel staff actually want to use.

---

## ✨ Overview

Most internal hotel software feels like it was built in 2009 and never touched again. Slow tables, confusing navigation, zero thought put into the people actually using it every day.

**The Wild Oasis** flips that. It's a full-stack management dashboard built for hotel staff — bookings, cabins, guests, and analytics, all in one fast, clean interface. Real-time data through Supabase, smart caching with React Query, and a dark mode that's properly engineered, not an afterthought.

This is a staff-only system. No public sign-up, no guest-facing pages — just a tool built to make the people running the hotel faster at their jobs.

---

## 🌐 Live Demo

👉 **[the-wild-oasis-psi-blue.vercel.app](https://the-wild-oasis-psi-blue.vercel.app)**

Since this is an internal tool, there's no open registration. Log in with the staff credentials below and explore the dashboard, bookings, cabins, and settings.

### 🔑 Test Login

```
📧 Email:    anass@example.com
🔒 Password: amass-1818
```

In a real deployment, staff accounts are created manually by an admin — there's no path for outside users to register themselves.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **UI Library** | React |
| **Data Fetching / Caching** | TanStack Query (React Query) |
| **Global State** | Context API |
| **Forms & Validation** | React Hook Form |
| **Backend / DB / Auth** | Supabase |
| **Styling** | Styled Components |
| **Routing** | React Router |
| **Charts / Analytics** | Recharts |
| **Date Handling** | date-fns |
| **Deployment** | Vercel |

Every piece earns its place here — no Redux, no unnecessary abstraction layers, no charting library bloat. Just tools that fit the job.

---

## 🚀 Features

### 🔐 Authentication & Access
- Secure login/logout flow built on Supabase Auth
- Every dashboard route is protected — no valid session, no access
- Strictly internal: hotel staff only, no public sign-up
- Full account management (update name, avatar, password)

### 📊 Dashboard & Analytics
- Visual analytics overview powered by Recharts — revenue trends, occupancy stats, booking duration breakdowns
- Date-range filtering and formatting handled cleanly with date-fns under the hood
- Designed to answer "how's the hotel doing this week?" in under five seconds

### 🛏️ Core Operations
- Full bookings management — search, filter, check guests in and out, track status
- Cabins management — create, edit, delete, manage pricing and discounts
- Internal users management for staff accounts
- All forms (cabins, bookings, account settings) built with React Hook Form for fast, low-overhead validation — no unnecessary re-renders on every keystroke

### 🎨 UI / UX
- Fully responsive — front desk tablet or back-office desktop, same experience
- Dark mode implemented properly through styled-components + Context API, not a surface-level toggle
- Consistent design system across every page, no visual inconsistency between features

### ⚡ Performance & Architecture
- All server data flows through React Query — caching, background refetching, optimistic updates
- Context API kept lean and reserved for true UI-level state (theme, session) — never abused for server data
- Real-time, structured Supabase integration across bookings, cabins, and guests
- Strong separation of concerns, built to scale past "just a course project"

---

## 🧠 Architecture Overview

The architecture is built around one core principle: **server state and UI state are not the same thing, and shouldn't be managed the same way.**

```
Supabase (Database + Auth + Realtime)
        │
        ▼
   API layer (services/)
        │
        ▼
React Query (caching, mutations, invalidation, refetching)
        │
        ▼
    UI Components ──► Recharts (analytics) / date-fns (date logic) / React Hook Form (forms)
        ▲
        │
Context API (theme, session, UI-only state)
```

**How it breaks down:**

- **React Query owns everything that lives in the database.** Bookings, cabins, and users are fetched, cached, and mutated through it — no manual `useEffect` chains trying to keep data in sync.
- **Context API stays narrow and intentional.** It handles dark mode and the authenticated session — nothing server-related ever leaks in, which keeps re-renders predictable.
- **React Hook Form handles every input in the app** — cabin creation, booking edits, account settings — keeping form state out of both Context and component state, where it doesn't belong.
- **Supabase is the single source of truth** for data, auth, and real-time updates, instead of stitching together separate services for each concern.
- **Recharts and date-fns sit at the presentation layer**, turning raw booking data into something a manager can actually glance at and understand.

This split is what keeps the codebase calm as features get added — nothing fights for ownership of the same piece of state.

---

## 📁 Project Structure

```
src/
├── features/
│   ├── authentication/   # Login, logout, account management
│   ├── bookings/         # Booking list, filters, check-in/out
│   ├── cabins/           # Cabin CRUD, pricing, discounts
│   ├── dashboard/        # Analytics widgets, Recharts visualizations
│   └── settings/         # App-wide configuration
├── ui/                   # Reusable, presentation-only components
├── context/              # Dark mode + global UI context
├── services/             # Supabase API calls
├── hooks/                # Custom hooks (auth, queries, etc.)
└── styles/               # Global styles & theme config
```

Feature-based, not type-based — each domain owns its own components, hooks, and logic instead of everything getting dumped into one shared `components/` folder.

---

## 🙌 Final Note

This project started as Jonas Schmedtmann's *The Wild Oasis* course project, but it's grown well past that at this point. On top of the original scope, I added analytics charts with Recharts, rebuilt date handling with date-fns, rewrote the forms with React Hook Form, and made several architectural calls around React Query and Context that aren't part of the original course.

It's less "course project" and more a working example of how I'd structure a real internal tool if a hotel chain handed me the keys tomorrow.

Take a look at the code, click around the live demo, and if something looks off or you've got feedback — I'm always up for the conversation.

---

<p align="center">Built with React, caffeine, and a strong opinion about where state should live ☕</p>
