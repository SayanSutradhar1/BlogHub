import { Request, Response } from "express";
import ApiError from "../utils/ApiError";

const errorMiddleware = (
  err: Error,
  _: Request,
  res: Response,
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ApiError) {
    message = err.message;
    statusCode = err.statusCode;
  }

  console.log(err.message);
  

  res.status(statusCode).json({
    success : false,
    status : statusCode,
    message,
  });
};

export { errorMiddleware };

