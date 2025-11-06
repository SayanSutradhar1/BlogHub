import { Router } from "express";
import { createNewUser, getUserByEmail } from "../controllers/user.controller";

const userRouter = Router()

userRouter.route("/new").post(createNewUser)
userRouter.route("/get").get(getUserByEmail)

export {userRouter};