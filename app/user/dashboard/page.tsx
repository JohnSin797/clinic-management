'use client'

import { useSession } from "next-auth/react"

export default function Dashboard() {
    const session = useSession()

    return (
        <div className="w-full pt-20">{session.data?.user?.email}</div>
    )
}