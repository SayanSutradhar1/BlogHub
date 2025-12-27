import Application from "./server";
import { dbconnect } from "./config/db.config";
import { errorMiddleware } from "./middlewares/error.middleware";
import { blogRouter } from "./routes/blog.route";
import dotenv from "dotenv";
import morgan from "morgan";
import { userRouter } from "./routes/user.route";
import express from "express"

dotenv.config({
  path: "./.env",
});

const app = new Application(Number(process.env.PORT) || 3000, "Blog App");

app.init();

app.instance.use(express.json())
app.instance.use(express.urlencoded({ extended: true }))


app.instance.use(morgan("dev"));


app.useRouter(
  {
    path: "/blog",
    router: blogRouter,
  },
  {
    path: "/user",
    router: userRouter,
  }
);

app.instance.get("/", (req, res) => {
  res.send("You are not authorized to access this route");
});



app.instance.use(errorMiddleware);

dbconnect()
  .then(() =>
    app.start(() => {
      console.log(`${app.appName} is running on port ${app.port}`);
    })
  )
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
