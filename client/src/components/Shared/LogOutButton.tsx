"use client";

import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { logOut } from "@/actions/auth.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LogOutButton = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    const response = await logOut();

    if (response.success) {
      toast.success(response.message);
      router.push("/login");
    } else {
      toast.error(response.message);
      console.log(response.error);
    }
  };

  return (
    <Button variant="ghost" size="icon" title="Logout" onClick={handleLogOut}>
      <LogOut className="w-4 h-4" />
    </Button>
  );
};

export default LogOutButton;
