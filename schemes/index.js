import { z } from "zod"

export const SignInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
})

export const SignUpSchema = z.object({
  name: z.string().min(8, { message: "Name is required" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
})

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, { message: "New password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match'
  })