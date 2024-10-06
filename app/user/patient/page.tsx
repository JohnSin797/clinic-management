'use client'

import PatientForm from "@/app/components/PatientForm"
import { useSession } from "next-auth/react"

export default function Patient() {
    const session = useSession()

    return (
        <div className="w-full flex justify-center items-center py-10">
            <PatientForm email_address={session.data?.user?.email ?? undefined} />
        </div>
    )
}