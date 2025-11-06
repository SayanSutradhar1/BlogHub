"use client"

import type React from "react"

import { login } from "@/actions/auth.action"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault()

    const response = await login({
      email,
      password
    })

    if (response.success) {
      toast.success("Logged in successfully")
      router.push("/dashboard")
    } else {
      toast.error(response.error || response.message)
      setError(response.error || response.message)
    }
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
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground mb-6">Sign in to your BlogHub account</p>

            {error && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input border-border/40"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input border-border/40"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:shadow-lg transition-all duration-300 py-6"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}
