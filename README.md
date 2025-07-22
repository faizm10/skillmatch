## 🧠 **Project Name:** SkillMatch

### 🔍 **What Is It About?**

**SkillMatch** is a web platform that helps students and developers find hackathon teammates based on shared interests, skills, and project goals. Think of it as **“LinkedIn meets Tinder for hackathons”** — users create profiles with their skillsets, interests, and past projects, then get **matched with compatible teammates** via a smart recommendation engine powered by GraphQL.

---

## 🌟 **Key Features**

### 🧑‍💻 User Profiles

* Create/edit profiles with:

  * Name, email
  * Skills (tag-based)
  * Project interests (AI, web, mobile, etc.)
  * Time availability (weekend-only, full-time, etc.)
  * Past hackathon experience
  * GitHub/portfolio links

### 🧠 GraphQL-Powered Matching

* GraphQL query finds top N compatible teammates using:

  * Shared skills
  * Shared project tags
  * Time availability match
  * Mutual likes (like Tinder-style)

### 📨 Messaging (via GraphQL Subscriptions)

* One-on-one chat between matched users
* Live updates using WebSockets (Apollo Subscriptions)

### 🔍 Teammate Discovery

* Browse other users
* “Like” profiles
* Filters for skills, tech stack, hackathon type

### 🐳 Dockerization

* `frontend`: Next.js (on port 3000)
* `backend`: Apollo Server (on port 4000)
* `db`: PostgreSQL (on port 5432)
* All running via `docker-compose` for isolation

---

## 🧱 **Architecture Overview**

```
┌────────────┐       GraphQL        ┌─────────────┐
│  Frontend  │  ◀──────────────▶    │   Backend   │
│  (Next.js) │     Apollo Client    │ Apollo GQL  │
└────────────┘                      │  + Prisma   │
       ▲                            └─────▲───────┘
       │                                  │
  User Input                          PostgreSQL
       │                                  │
  Tailwind UI                      Users, Skills,
       │                          Projects Tables
       ▼                                  ▼
        ─────────────────────────────────
                Docker Compose Network
```

---

##General Notes

- `docker-compose up -d` use this to run the servers
- `docker-compose up --build` use this to build newest versions
- `docker-compose logs [folder name]` use this to detect log errors

Running Locally for Frontend and Backend and DB:
- db: `docker-compose up postgres`
- backend || frontend: `npm run dev`