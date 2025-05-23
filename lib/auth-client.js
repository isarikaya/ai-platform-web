import { createAuthClient } from "better-auth/react"
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  sendVerificationEmail,
  forgetPassword,
  resetPassword,
} = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})
