# Blog Hub - Client

This is the Next.js frontend for the **Blog Hub** application. It's built with the App Router, TypeScript, and Tailwind CSS.

## ✨ Features & Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (v16 App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/), [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge)
* **UI Components:** [Radix UI](https://www.radix-ui.com/), [Lucide Icons](https://lucide.dev/)
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/), React Context
* **Authentication:** [NextAuth.js](https://next-auth.js.org/) (v5)
* **API Communication:** [Axios](https://axios-http.com/)
* **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
* **Text Editor:** [React Simple WYSIWYG](https://github.com/sumitgohil/react-simple-wysiwyg)

## 📂 Folder Structure

The client application uses the Next.js App Router structure:

```
client/
├── src/
│   ├── app/
│   │   ├── (auth)/         # Auth-related routes (login, register)
│   │   ├── (main)/         # Main application routes (dashboard, blogs)
│   │   └── api/            # Next.js API routes (e.g., for NextAuth)
│   ├── actions/            # Server Actions (auth.action.ts, etc.)
│   ├── components/         # Reusable React components (UI, Shared)
│   ├── context/            # React Context providers
│   ├── lib/                # Utility functions and libraries (db.ts, apiRequest.ts)
│   ├── models/             # Mongoose models (for NextAuth/Server Actions)
│   └── services/           # Business logic services
└── public/                 # Static assets
```

## 🚀 Getting Started

1.  **Navigate to the client directory:**
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file by copying the example:
    ```bash
    cp env.example.txt .env.local
    ```
    Fill in the necessary variables (like `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, and the backend API URL).

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

* `npm run dev`: Starts the development server.
* `npm run build`: Builds the application for production.
* `npm run start`: Starts the production server.
* `npm run lint`: Lints the codebase.