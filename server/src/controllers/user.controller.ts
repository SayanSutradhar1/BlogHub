import { NextFunction, Request, Response } from "express";
import TryCatch from "../utils/TryCatch";
import User from "../models/user.model";
import ApiError from "../utils/ApiError";

const createNewUser = TryCatch(async (req: Request, res: Response,next:NextFunction) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });

    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists", status: 400 });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    if(!newUser){
      next(new ApiError("Something went wrong", 500));
    }

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        email : newUser.email,
        name : newUser.name,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

const getUserByEmail = TryCatch(async (req: Request, res: Response,next:NextFunction) => {
  const { email } = req.query;

  if(!email){
    next(new ApiError("Email is required", 400));
  }
  

  const user = await User.findOne({
    email,
  });

  if (!user) {
    next(new ApiError("User not found", 404));
  }

  return res.json({
    success: true,
    status: 200,
    message: "User fetched successfully",
    data: user,
  });
});

export { createNewUser,getUserByEmail };
