# 🚀 Blog Hub

Welcome to **Blog Hub**, a full-stack blogging application built with a modern MERN-style stack (MongoDB, Express, React/Next.js, Node.js).

This project is structured as a monorepo with two main components:
* `/client`: A Next.js 16 frontend with the App Router.
* `/server`: An Express.js and TypeScript backend API.

## ✨ Tech Stack Overview

| Area | Technology |
| :--- | :--- |
| **Frontend** | Next.js 16 (React 19), TypeScript, Redux, Tailwind CSS |
| **Backend** | Express.js, Node.js, TypeScript |
| **Database** | MongoDB (with Mongoose) |
| **Authentication** | NextAuth (client-side), Bcrypt.js (server-side) |

## 🏁 How to Run the Full Application

You will need to run both the `client` and `server` applications simultaneously in two separate terminal sessions.

### 1. Run the Backend Server

First, get the API server running.

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables (copy `.env.example` to `.env`):
    ```bash
    cp .env.example .env
    ```
4.  Update `.env` with your **MongoDB connection string** (`MONGODB_URI`) and a `PORT` (e.g., `5000`).
5.  Start the server:
    ```bash
    npm run dev
    ```
    *Your backend is now running, likely at `http://localhost:5000`.*

### 2. Run the Frontend Client

In a **new terminal**, get the Next.js client running.

1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables (copy `.env.example` to `.env.local`):
    ```bash
    cp .env.example .env.local
    ```
4.  Update `.env.local` to point to your backend API (e.g., `NEXT_PUBLIC_API_URL=http://localhost:5000`) and add your `NEXTAUTH_SECRET`.
5.  Start the client:
    ```bash
    npm run dev
    ```
    *Your frontend is now running, likely at `http://localhost:3000`.*

---

You can now open [http://localhost:3000](http://localhost:3000) in your browser to use the **Blog Hub** application!