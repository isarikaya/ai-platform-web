"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ForgotPasswordSchema } from "@/schemes"
import { useEffect, useState, useTransition } from "react"
import { forgetPassword } from "@/lib/auth-client"
import Spinner from "@/components/ui/spinner"
import { toast } from "sonner"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ResetPasswordForm } from "./reset-password-form"
export function ForgotPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  if(token) {
    return <ResetPasswordForm />
  }
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)
  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })
  async function onSubmit(values) {
    startTransition(async () => {
      const { data, error } = await forgetPassword({
        email: values.email,
        redirectTo: "http://localhost:3000/reset-password",
      })
      if (data) {
        setIsSuccess(true)
        toast.success("Check your email for a reset link")
      }
      if (error) {
        toast.error(error.message)
      }
    })
  }
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset your password</CardTitle>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-center">
                Check your email for a link to reset your password. If it
                doesn't appear within a few minutes, check your spam folder.
              </p>
              <Link href="/sign-in" onClick={() => setIsSuccess(false)}>
                <Button>Return to sign in</Button>
              </Link>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormDescription>
                              Enter your user account's verified email address
                              and we will send you a password reset link.
                            </FormDescription>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                disabled={isPending}
                                placeholder="yourmail@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isPending}
                    >
                      {isPending ? <Spinner /> : "Send password reset link"}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
