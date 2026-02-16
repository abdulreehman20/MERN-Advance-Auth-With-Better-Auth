## MERN Better Auth Backend (Node + Express)

A production-ready **Node.js + Express** authentication backend powered by **[Better Auth](https://www.npmjs.com/package/better-auth)**, with **PostgreSQL (Drizzle ORM)** persistence and email workflows (verification, password reset, 2FA OTP) via **Resend**.

This repo is designed to be dropped into any MERN (or any web/mobile) project as a secure, modern auth service.

---

## What is this?

This is an **authentication backend API** that exposes Better Auth endpoints under:

- **Auth base path**: `GET/POST ... /api/auth/*`
- **Health test route**: `GET /api/test`

It includes database-backed users/sessions/accounts, email verification flows, social login, and optional 2FA.

---

## Features

- **Email + Password auth**
  - Email verification required before sign-in
  - Forgot password / reset password email flow
- **User management**
  - Change email (with verification)
  - Delete account (with optional confirmation email)
- **Social login**
  - Google OAuth (configurable via env)
- **2FA (Two‑Factor Authentication)**
  - Supports 2FA with OTP delivery via email (Resend)
  - Issuer configured for authenticator apps (TOTP-style setups)
- **Rate limiting**
  - Built-in auth endpoint rate limiting (configured at 120 req / 60 sec)
- **OpenAPI reference**
  - Better Auth OpenAPI reference enabled (served by Better Auth)
- **Postgres + Drizzle ORM**
  - Schemas included for `user`, `session`, `account`, `verification`, `twoFactor`
- **CORS + cookie support**
  - Configured for frontend origin with `credentials: true`
- **Centralized error handling**
  - Consistent JSON error responses
  - Stack traces only in development
- **Winston logging**
  - Console + file logs (`logs/error.log`, `logs/combined.log`)

---

## Benefits

- **Ship faster**: Stop re-building auth from scratch and focus on your product.
- **More secure by default**: Verified-email sign-in, rate limiting, and DB-backed sessions.
- **Scales cleanly**: Postgres + Drizzle schema approach works locally or in hosted DBs (e.g., Neon).
- **Easy integration**: Works with any frontend (React/Next.js, mobile, etc.) via HTTP + cookies.
- **Extensible**: Add providers, roles/permissions, and custom API routes alongside Better Auth.

---

## Tech Stack

- **Runtime**: Node.js (TypeScript, ESM)
- **Server**: Express `5.x`
- **Auth**: Better Auth
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM + Drizzle Kit
- **Email**: Resend (with optional Nodemailer dependency available)
- **Logging**: Winston
- **Tooling**: Biome, Husky

---

## Setup Guide

### Prerequisites

- **Node.js**: Recommended \(18+\)
- **PostgreSQL** database (local, Docker, Neon, etc.)
- (Optional) **Resend** account for emails
- (Optional) **Google OAuth** credentials for Google login

### Install

```bash
bun install
```

### Environment variables

Copy `.env.example` to `.env` and fill values:

```bash
cp .env.example .env
```

Required / commonly used variables:

- **`DATABASE_URL`**: Postgres connection string
- **`FRONTEND_URL`**: Your frontend origin (CORS)
- **`BETTER_AUTH_SECRET`**: Secret used by Better Auth
- **`BETTER_AUTH_APP_NAME`**: App name shown in emails/2FA issuer
- **`RESEND_API_KEY`** and **`MAILER_SENDER`**: Email sender configuration
- **`GOOGLE_CLIENT_ID`** and **`GOOGLE_CLIENT_SECRET`**: Google OAuth (optional)

### Database (Drizzle)

Push schema to your database:

```bash
bun run db:push
```

Other useful commands:

```bash
bun run db:generate
bun run db:migrate
bun run db:studio
```

### Run locally (dev)

```bash
bun run dev
```

The server runs on:

- **`http://localhost:7000`**

Quick check:

- `GET http://localhost:7000/api/test` → `{ "message": "API is working!" }`

### Production build

```bash
bun run build
node dist/src/index.js
```

---

## API Notes

- **Auth routes**: mounted at `"/api/auth/*"` via Better Auth Node handler.
- **OpenAPI reference**: enabled via Better Auth OpenAPI plugin (served under the auth route).

Tip: If you’re integrating with a frontend, make sure:

- Your frontend uses the same origin as `FRONTEND_URL`
- Requests include credentials (cookies) when needed (e.g., `fetch(..., { credentials: "include" })`)

---

## Project Structure (high level)

- `src/index.ts`: Express app bootstrapping + route mounting
- `src/lib/auth.ts`: Better Auth configuration (providers, plugins, email handlers)
- `src/db/`: Drizzle DB client + schema definitions
- `src/middlewares/`: error handler and optional request logging middleware

---

## Consultation

If you want help integrating or productionizing authentication, I offer:

- **Architecture review** (sessions vs JWT, cookies, CORS, security hardening)
- **Auth + user flows** (verification, password reset, onboarding)
- **Provider setup** (Google OAuth, email deliverability, domain setup)
- **Database + migrations** (Drizzle best practices, environments)
- **Deployment** (VPS/Docker/Vercel + managed Postgres/Neon)

To book a consult, reach out:

- **Email**: abdulreehman20@gmail.com
- **WhatsApp**: +92 3262504906
- **Portfolio**: http://abdulreehman.vercel.app/

---

## Hire me (I can build your project)

Need a full MERN app or a production backend? I can build:

- **Complete MERN authentication + role-based access**
- **REST APIs** with validation, logging, and error handling
- **Admin dashboards**
- **Payments & subscriptions**
- **Deployment + CI/CD**

Message me with:

- Your idea + timeline
- Features (must-have vs nice-to-have)
- Preferred stack (MERN / Next.js / etc.)

---

