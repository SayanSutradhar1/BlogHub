import { User } from "@/lib/types";
import { createContext } from "react";

interface UserContextType{
    user : User | undefined
}

export const UserContext = createContext<UserContextType>({
    user : undefined
})