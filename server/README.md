# Blog Hub - Server

This is the Express.js backend API for the **Blog Hub** application. It's built with TypeScript and uses MongoDB as its database.

## ✨ Features & Tech Stack

* **Framework:** [Express.js](https://expressjs.com/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
* **Authentication:** Password hashing with [Bcrypt.js](https://github.com/kelektiv/bcrypt.js)
* **Middleware:** [CORS](https://github.com/expressjs/cors), [Morgan](https://github.com/expressjs/morgan) (for logging), custom error handling
* **Architecture:** Follows an MVC-like pattern (Models, Routes, Controllers)

## 📂 Folder Structure

The server is organized with a clear separation of concerns:

```
server/
├── src/
│   ├── config/             # Database configuration (db.config.ts)
│   ├── controllers/        # Request handling logic (user.controller.ts)
│   ├── interfaces/         # TypeScript interfaces
│   ├── middlewares/        # Custom Express middleware (error.middleware.ts)
│   ├── models/             # Mongoose schemas and models (user.model.ts)
│   ├── routes/             # API route definitions (user.route.ts)
│   ├── utils/              # Utility classes (ApiError.ts, TryCatch.ts)
│   ├── app.ts              # Express application setup
│   └── index.ts            # Server entry point
└── .env.example            # Example environment variables
```

## 🚀 Getting Started

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file by copying the example:
    ```bash
    cp .env.example .env
    ```
    Fill in the necessary variables, especially your `MONGODB_URI` and `PORT`.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The server will start (usually on `http://localhost:5000` or the port you defined in your `.env` file).

## 📜 Available Scripts

* `npm run dev`: Starts the development server with `nodemon` and `ts-node`.
* `npm run build`: Compiles the TypeScript code to JavaScript (in the `/dist` folder).
* `npm run start`: Runs the compiled JavaScript code (for production).