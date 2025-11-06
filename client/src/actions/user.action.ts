"use server"

import { auth } from "@/auth"

const getSession = async()=>{
    return auth()
}

export default getSession