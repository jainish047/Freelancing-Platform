# 🧑‍💻 Freelancing Platform

A modern full-stack web application where freelancers and employers can collaborate, post jobs, submit proposals, and communicate in real-time via chat.

> Built with a powerful MERN-ish stack (React + Redux + Express + JWT), styled using TailwindCSS, and powered by real-time chat using Socket.io.

---

## 📽️ Demo

[![Watch the Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

> Replace the above link with a YouTube video of your app or a [demo.gif](demo/demo.gif)

---

## 📸 Screenshots

| Home Page | Login Page | Chat Feature |
|----------|-------------|---------------|
| ![](screenshots/home.png) | ![](screenshots/login.png) | ![](screenshots/chat.png) |

---

## 📦 Features

- 👤 User Authentication (Signup/Login)
- 🔐 JWT-based Auth with Secure Routes
- 📝 Create, View, and Apply to Jobs
- 💬 Real-time Chat using Socket.io
- 👨‍💻 User Profiles for Freelancers and Employers
- 🔍 Job Search and Filtering
- 🛠️ Admin Panel (Optional)
- ☁️ Image Upload with Cloudinary
- 🎨 Fully responsive UI with TailwindCSS
- 🗃️ Scalable and modular folder structure

---

## 🔧 Tech Stack

### 🖥️ Frontend

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux--Toolkit-764ABC?style=flat&logo=redux)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwindcss)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat)
![React Hook Form](https://img.shields.io/badge/React--Hook--Form-EC5990?style=flat&logo=reacthookform)
![Zod](https://img.shields.io/badge/Zod-3B82F6?style=flat)

### 🔙 Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat&logo=socket.io)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens)
![Passport.js](https://img.shields.io/badge/Passport.js-34A853?style=flat)
![Bcrypt](https://img.shields.io/badge/Bcrypt-003B57?style=flat)
![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=flat)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=flat)

### ☁️ Cloud / DevOps

![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel)

---

## 🗃️ Folder Structure

```
Freelancing-Platform/
├── Backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── server.js
└── Frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── redux/
    │   └── main.jsx
```

---

## 🛠️ Setup Instructions

### 📦 Backend

```bash
cd Backend
npm install
npm run dev
```

### 💻 Frontend

```bash
cd Frontend
npm install
npm run dev
```

### 🧪 Environment Variables

Create a `.env` file in both `Frontend` and `Backend` with:

```env
# Backend .env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🗂️ Database Schema (ER Diagram)

> Created using dbdiagram.io / DrawSQL

![DB Schema](schema/db-schema.png)

---

## 🌐 Deployment

| Layer     | Platform                         |
|-----------|----------------------------------|
| Frontend  | [Vercel](https://vercel.com/)    |
| Backend   | [Render](https://render.com/) or [Railway](https://railway.app/) |
| Database  | MongoDB Atlas                    |
| Media     | Cloudinary                       |

---

## ✨ Future Enhancements

- 📃 Resume Upload & Verification
- ⭐ Employer Review System
- 💸 Payment Gateway Integration (Stripe/Razorpay)
- 📊 Admin Dashboard
- 🌍 Multi-language Support

---

## 🤝 Contributing

Feel free to fork the repo, submit pull requests, or open issues. All kinds of contributions are welcome!

---

## 📄 License

This project is licensed under the **MIT License**.

---

> Made with ❤️ by [Jainish Patel](https://github.com/jainish047)
