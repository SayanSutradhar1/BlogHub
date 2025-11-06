"use server";

import { signIn, signOut } from "@/auth";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
      message: "Login successful",
      status: 200,
    };
  } catch (error) {
    return {
      success: false,
      message: "Invalid credentials",
      status: 401,
      error: (error as Error).cause as string || "Internal Server Error",
    };
  }
};

const logOut = async () => {
  try {
    await signOut({
      redirect : false
    });

    return {
      success: true,
      message: "Logout successful",
      status: 200,
    };
  } catch (error) {
    
    return {
      success: false,
      message: "Logout failed",
      status: 500,
      error: (error as Error).cause || "Internal Server Error",
    };
  }
};

export { login,logOut };
