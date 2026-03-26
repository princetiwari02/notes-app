# 📒 Notes App API

A full-featured Notes backend with tags, full-text search, pin, archive, and per-user isolation.

## ✨ Features
- Create / Read / Update / Delete notes
- Tag system (multi-tag per note)
- Full-text search (title, content, tags)
- Pin important notes (sorted to top)
- Archive notes (hide without deleting)
- Custom note colors
- Pagination support
- JWT-protected (each user only sees their own notes)

## 🛠 Tech Stack
- Node.js, Express.js, MongoDB + Mongoose, JWT + bcryptjs

## 📁 Project Structure
```
03-notes-app/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── note.controller.js
│   ├── middleware/auth.middleware.js
│   ├── models/
│   │   ├── note.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── note.routes.js
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

## 🚀 Setup & Run
```bash
npm install && cp .env.example .env
npm run dev
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/notes` | Get all notes (with filters) |
| GET | `/api/notes/tags/all` | Get all unique tags |
| GET | `/api/notes/:id` | Get note by ID |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update note |
| DELETE | `/api/notes/:id` | Delete note |

## 🔍 Query Parameters (GET /api/notes)
```
?search=meeting      → Full-text search
?tag=work            → Filter by tag
?pinned=true         → Only pinned notes
?archived=true       → Only archived notes
?page=1&limit=20     → Pagination
```

## 📋 Example: Create Note
```json
POST /api/notes
Authorization: Bearer <token>
{
  "title": "Meeting Notes",
  "content": "Discussed Q4 roadmap and sprint planning...",
  "tags": ["work", "meeting", "q4"],
  "color": "#fef3c7",
  "isPinned": true
}
```

