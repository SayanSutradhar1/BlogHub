"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { apiPost } from "@/lib/apiRequest"
import toast from "react-hot-toast"

export default function SignupPage() {
  const [signUpCredentials, setSignUpCredentials]=useState({
    name: "",
    email: "",
    password: ""
  })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignup = async(e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (signUpCredentials.password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (signUpCredentials.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    const toastId = toast.loading("Creating account...")


    const response = await apiPost<typeof signUpCredentials>("/user/new", signUpCredentials)

    if(response.success){
      toast.success("Account created successfully")
      router.push("/login")
    } else {
      setError(response.message)
      toast.error(response.message)
    }

    toast.dismiss(toastId)
  }

  return (
    <>
      <main className="min-h-screen bg-linear-to-b from-background to-blue-50/5 dark:to-blue-950/10 flex items-center justify-center px-4">
        <div className="w-full max-w-md animate-fade-in">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <Card className="p-8 border-border/40 bg-card/50 backdrop-blur-sm">
            <h1 className="text-3xl font-bold mb-2">Join BlogHub</h1>
            <p className="text-muted-foreground mb-6">Create your account and start writing</p>

            {error && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={signUpCredentials.name}
                  onChange={(e) => setSignUpCredentials({ ...signUpCredentials, name: e.target.value })}
                  className="bg-input border-border/40"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={signUpCredentials.email}
                  onChange={(e) => setSignUpCredentials({ ...signUpCredentials, email: e.target.value })  }
                  className="bg-input border-border/40"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={signUpCredentials.password}
                  onChange={(e) => setSignUpCredentials({ ...signUpCredentials, password: e.target.value }) }
                  className="bg-input border-border/40"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-input border-border/40"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:shadow-lg transition-all duration-300 py-6"
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}
