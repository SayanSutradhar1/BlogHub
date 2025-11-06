import { hash } from "bcryptjs";
import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  bio?:string
  password: string;
  blogs: mongoose.Schema.Types.ObjectId[];
  totalReadCount: number;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    blogs: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Blog",
    },
    totalReadCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await hash(this.password, 10);
  next();
});

const User =
  (mongoose.models.User as mongoose.Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

export default User;
