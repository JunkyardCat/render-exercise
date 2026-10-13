# Full Stack Practice Projects

A collection of full-stack and backend projects built while learning the MERN stack and relational databases, based on the [Full Stack Open](https://fullstackopen.com/) curriculum. The repo contains three projects:

| Project | Stack | What it is |
| ------- | ----- | ---------- |
| [Phonebook](#1-phonebook-app) | React, Express, MongoDB | Contact manager with a React frontend (**deployed**) |
| [Bloglist API](#2-bloglist-api) | Express, MongoDB, bcrypt | REST API for saving blogs, with user accounts and automated tests |
| [PostgreSQL backend](#3-postgresql-backend) | Express, PostgreSQL, Sequelize | Notes/users/teams API with migrations and JWT login |

**Live demo (Phonebook):** https://render-exercise-wxhd.onrender.com/

> Hosted on Render's free tier, so the server sleeps when idle. The first load can take up to ~30 seconds while it wakes up.

## Tech Stack

- **Frontend:** React 19, Vite, Axios
- **Backend:** Node.js, Express 5
- **Databases:** MongoDB (Mongoose), PostgreSQL (Sequelize, Umzug migrations)
- **Auth:** bcrypt password hashing, JSON Web Tokens
- **Testing & quality:** Node's built-in test runner, Supertest, ESLint
- **Deployment:** Render

## Getting Started

Prerequisites: Node.js and [pnpm](https://pnpm.io/). Projects 1 and 2 need a MongoDB connection string (e.g. a free MongoDB Atlas cluster). Project 3 needs a PostgreSQL database.

```bash
git clone https://github.com/JunkyardCat/render-exercise.git
cd render-exercise
pnpm install
```

Create a `.env` file in the project root (it is git-ignored):

```bash
# Phonebook and Bloglist
MONGODB_URI=your-mongodb-connection-string
TEST_MONGODB_URI=your-separate-test-database-connection-string
PORT=3001

# PostgreSQL project
DATABASE_URL=postgres://user:password@localhost:5432/dbname
SECRET=any-long-random-string
```

---

## 1. Phonebook App

A phonebook where you can add, update, delete, and search contacts by name and phone number.

**Features**

- Create, read, update, and delete contacts
- Filter the list by name
- On-screen notifications and error messages
- Express serves the production React build, so one server hosts the whole app

**Run in development** (two terminals):

```bash
pnpm dev_express   # Express API on http://localhost:3001
pnpm dev           # Vite dev server; proxies /api to the Express server
```

**Run in production mode:**

```bash
pnpm build         # builds the React app into dist/
pnpm start         # Express serves dist/ and the API
```

**API**

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/persons` | List all contacts |
| GET | `/api/persons/:id` | Get one contact |
| POST | `/api/persons` | Add a contact |
| PUT | `/api/persons/:id` | Update a contact |
| DELETE | `/api/persons/:id` | Delete a contact |
| GET | `/info` | Entry count and request time |

---

## 2. Bloglist API

A REST API for saving blogs you find interesting, with user registration.

**Features**

- CRUD endpoints for blogs
- User registration with bcrypt-hashed passwords
- Unit and API integration tests (Node test runner + Supertest) against a separate test database
- Code organized into controllers, models, middleware, and utilities

**Run:**

```bash
pnpm blogdev       # starts src/bloglist/index.cjs with auto-reload
pnpm test          # runs the test suite (needs TEST_MONGODB_URI)
```

**API**

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/blogs` | List all blogs |
| GET | `/api/blogs/:id` | Get one blog |
| POST | `/api/blogs` | Add a blog |
| PUT | `/api/blogs/:id` | Update a blog |
| DELETE | `/api/blogs/:id` | Delete a blog |
| GET | `/api/users` | List users |
| POST | `/api/users` | Register a user |

---

## 3. PostgreSQL Backend

A notes API built on PostgreSQL with the Sequelize ORM, practicing relational modeling, migrations, and token-based access control.

**Features**

- Schema changes managed through versioned migrations (Umzug); pending migrations run automatically on startup
- Relationships: users have many notes, users and teams are linked through memberships (many-to-many), and users can mark notes (many-to-many)
- JWT login, a token-verification middleware, admin-only routes, and disabled-account handling
- Notes can be filtered with `?important=true` and searched with `?search=text`
- SSL is enabled automatically for non-localhost database URLs

**Run:**

```bash
cd src/postgresql
node index.cjs                                      # connects, runs migrations, starts the server
psql "$DATABASE_URL" -f seed.sql                    # optional: load sample users and notes
node util/rollback.cjs                              # roll back the most recent migration
```

**API**

| Method | Endpoint | Auth | Description |
| ------ | -------- | ---- | ----------- |
| POST | `/api/login` | none | Log in, returns a JWT |
| GET | `/api/notes` | none | List notes (supports `important` and `search` filters) |
| GET | `/api/notes/:id` | none | Get one note |
| POST | `/api/notes` | token | Create a note for the logged-in user |
| PUT | `/api/notes/:id` | none | Update a note's `important` flag |
| DELETE | `/api/notes/:id` | none | Delete a note |
| GET | `/api/users` | none | List users with their notes and teams |
| GET | `/api/users/:id` | none | Get one user |
| POST | `/api/users` | none | Create a user |
| PUT | `/api/users/:username` | admin token | Enable or disable a user |

---

## Known Limitations

These are learning exercises, and some parts are intentionally simplified:

- In the PostgreSQL project, login uses a single shared password (`secret`) for every user instead of per-user hashed passwords. Bcrypt hashing is only implemented in the Bloglist user registration.
- Several PostgreSQL routes (updating and deleting notes) don't require a token yet.
- The Bloglist API doesn't issue login tokens yet.
- Frontend: only the Phonebook has a UI. The `courses` and `unicafe` folders are small React exercises that can be swapped in through `src/main.jsx`.

## What I Learned

- [Add 2-3 honest points in your own words, e.g. what was hardest about migrations, testing against a separate database, or deploying to Render.]
