import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/app/settings/profile">Profile</Link>
    </div>
  )
}