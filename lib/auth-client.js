import { createAuthClient } from "better-auth/react"
export const { signIn, signUp, signOut, useSession, sendVerificationEmail, forgetPassword, resetPassword } =
  createAuthClient({
    baseURL: "http://localhost:3001",
  })
