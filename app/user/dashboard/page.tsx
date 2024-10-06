'use client'

import { useSession } from "next-auth/react"

export default function Dashboard() {
    const session = useSession()

    return (
        <div>{session.data?.user?.email}</div>
    )
}