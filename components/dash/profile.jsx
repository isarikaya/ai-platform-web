"use client"
import { useSession, signOut } from "@/lib/auth-client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const Profile = () => {
  const router = useRouter()
  const { data: session, isPending, error } = useSession()
  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
        },
      },
    })
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-4 bg-secondary/20 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Session Details</h2>
        <pre className="whitespace-pre-wrap break-words text-sm bg-background p-3 rounded border">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      <div key={session?.user?.name} className="text-center">
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={session?.user?.name || ""}
            className="h-20 w-20 rounded-full object-cover mx-auto bg-secondary"
            width={120}
            height={120}
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-secondary mx-auto" />
        )}
        <h3 className="mt-4 text-lg font-semibold">{session?.user?.name}</h3>
        <p className="text-muted-foreground">{session?.user?.email}</p>
      </div>
      <Button className="cursor-pointer mt-2" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  )
}
