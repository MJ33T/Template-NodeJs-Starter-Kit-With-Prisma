# Template-Nodejs-Starter-Kit-With-Prisma

A **production-ready Node.js backend starter kit** built with **Express**, **Prisma ORM**, and modern tooling. This template is designed to help you quickly bootstrap scalable APIs with authentication, validation, logging, file handling, real-time features, and database support.

> Ideal for REST APIs, SaaS backends, admin panels, and real-time applications.

---

## ✨ Features

- 🚀 **Node.js (ESM)** – Modern JavaScript with ES Modules
- ⚡ **Express 5** – Fast, minimalist web framework
- 🧬 **Prisma ORM** – Type-safe database access
- 🔐 **Authentication**
  - JWT
  - Passport (Local, JWT, Bearer)
- 🧾 **Request Validation** – Zod
- 📦 **File Uploads** – Multer + Sharp (image processing)
- 🔊 **Real-time** – Socket.IO
- 🧠 **Caching / Queues Ready** – Redis
- 🪵 **Logging** – Winston + Daily Rotate Logs
- 🌍 **CORS Enabled**
- 🔁 **Hot Reload** – Nodemon
- 📁 Clean & scalable project structure

---

## 🗂️ Project Structure

```bash
backend-nodejs/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── sockets/
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

- **Runtime**: Node.js (ESM)
- **Framework**: Express 5
- **ORM**: Prisma
- **Database**: MySQL / PostgreSQL / MariaDB (Prisma-supported)
- **Auth**: Passport, JWT
- **Cache**: Redis
- **Realtime**: Socket.IO
- **Validation**: Zod
- **Logging**: Winston

---

## ⚙️ Requirements

- Node.js **>= 18**
- NPM or Yarn
- Database (MySQL / PostgreSQL / MariaDB)
- Redis (optional)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/mj33t/Template-Nodejs-Starter-Kit-With-Prisma.git
cd Template-Nodejs-Starter-Kit-With-Prisma
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Setup

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Example `.env`:

```env
PORT=5000
DATABASE_URL="mysql://user:password@localhost:3306/database_name"
JWT_SECRET=super_secret_key
REDIS_URL=redis://127.0.0.1:6379
```

---

## 🧬 Prisma Setup

### Initialize Prisma (already configured)

```bash
npx prisma generate
```

### Run Migrations

```bash
npx prisma migrate dev --name init
```

### Prisma Studio

```bash
npx prisma studio
```

---

## ▶️ Running the App

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server will run at:

```
http://localhost:5000
```

---

## 🔐 Authentication

Supports multiple strategies via **Passport**:

- Local Strategy (Email/Username + Password)
- JWT Strategy
- Bearer Token Strategy

Password hashing is handled using **bcryptjs**.

---

## 📡 Realtime (Socket.IO)

Socket.IO is pre-configured for:

- Real-time notifications
- Chat systems
- Live dashboards

You can extend logic inside:

```bash
src/sockets/
```

---

## 📤 File Upload & Image Processing

- Upload files using **Multer**
- Optimize images using **Sharp**

Great for avatars, thumbnails, and media uploads.

---

## 🪵 Logging

Powered by **Winston** with:

- Daily rotating log files
- Separate error & combined logs

Log files can be configured inside:

```bash
src/config/logger.js
```

---

## 🧪 Validation

Request validation using **Zod** ensures:

- Clean request schemas
- Predictable error handling

---

## 📦 NPM Scripts

```json
"scripts": {
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}
```

---

## 📄 License

Licensed under the **ISC License**.

---

## 👤 Author

**J33T**  
Backend Developer | API Architect

- GitHub: https://github.com/mj33t

---

## ⭐ Support

If this starter kit helped you, consider giving it a ⭐ on GitHub!

Happy coding 🚀

