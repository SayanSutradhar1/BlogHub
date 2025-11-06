"use client";

import getSession from "@/actions/user.action";
import { apiGet } from "@/lib/apiRequest";
import { User } from "@/lib/types";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "./user.context";

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>();

  const fetchUser = useCallback(async () => {
    const session = await getSession();

    if(!session?.user?.email){
      return
    }

    try {
      const response = await apiGet<User>(
        `/user/get?email=${session?.user?.email}`
      );

      console.log(response);

      if (response.success) {
        setUser(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
