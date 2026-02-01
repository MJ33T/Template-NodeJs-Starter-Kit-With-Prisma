# 🚀 Template NodeJs Starter Kit with Prisma

A clean, production-ready **Node.js backend starter template** built with **Express**, **Prisma ORM**, and modern tooling. This repository is designed to help you kickstart backend projects quickly with best practices baked in.

---

## ✨ Features

- ⚡ **Node.js (ES Modules)**
- 🚀 **Express 5** setup
- 🧬 **Prisma ORM** (MySQL / PostgreSQL / MariaDB ready)
- 🔐 **JWT Authentication**
- 🔒 **Password hashing with bcryptjs**
- 📦 **File upload support (Multer)**
- 🖼️ **Image processing with Sharp**
- 🔄 **Redis integration**
- 📡 **Socket.IO** support
- 📄 **EJS template engine**
- 🧪 **Zod for request validation**
- 📝 **Winston logging with daily rotation**
- 🌍 **Environment-based configuration**
- 🔥 **Nodemon for development**

---

## 📁 Project Structure

```bash
backend-nodejs/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── config/        # App & service configurations
│   ├── controllers/   # Route controllers
│   ├── middlewares/   # Custom middlewares
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── utils/         # Helper utilities
│   ├── server.js      # App entry point
│   └── app.js         # Express app setup
├── .env.example
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

| Technology | Description |
|---------|------------|
| Node.js | JavaScript runtime |
| Express | Web framework |
| Prisma | Modern ORM |
| MySQL | Default database (configurable) |
| Redis | Caching / PubSub |
| Socket.IO | Realtime communication |
| Zod | Schema validation |
| Winston | Logging |

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/mj33t/Template-NodeJs-Starter-Kit-With-Prisma.git
cd Template-NodeJs-Starter-Kit-With-Prisma
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment setup

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Configure your database and app variables:

```env
DATABASE_URL="mysql://user:password@localhost:3306/db_name"
JWT_SECRET=your_secret_key
PORT=5000
REDIS_URL=redis://127.0.0.1:6379
```

---

## 🧬 Prisma Setup

### Generate Prisma Client

```bash
npx prisma generate
```

### Run migrations

```bash
npx prisma migrate dev
```

### Prisma Studio (optional)

```bash
npx prisma studio
```

---

## ▶️ Running the Project

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

Server will start at:
```
http://localhost:5000
```

---

## 🔐 Authentication

- JWT-based authentication
- Token generation using `jsonwebtoken`
- Password hashing using `bcryptjs`

---

## 📡 Realtime Support

- Socket.IO pre-installed
- Ready for chat, notifications, and live updates

---

## 📝 Logging

- Winston logger
- Daily rotated log files
- Separate error and combined logs

---

## 📤 File Uploads & Image Processing

- File upload using Multer
- Image optimization & resizing using Sharp

---

## 📦 Available Scripts

```json
"scripts": {
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}
```

---

## 📌 Best Use Cases

- REST APIs
- SaaS backends
- Admin panels
- Realtime apps
- Mobile app backends

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

ISC License

---

## 👨‍💻 Author

**J33T**  
Backend Developer | Full Stack Engineer

---

⭐ If you like this template, don’t forget to **star** the repository!

