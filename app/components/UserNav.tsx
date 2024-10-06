'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"

export default function UserNav() {
    
    const pathname = usePathname()

    const isActiveLink = (link: string) => {
        return pathname.startsWith(link)
    }

    return (
        <div className="fixed w-full top-0 z-10 flex justify-between items-center bg-zinc-600 p-2">
            <div className="flex justify-center items-center gap-2">
                <Link href={'/user/dashboard'} className={`${isActiveLink('/user/dashboard') ? 'text-white' : ''}`}>Dashboard</Link>
                <Link href={'/user/patient'} className={`${isActiveLink('/user/patient') ? 'text-white' : ''}`}>Patient</Link>
                <Link href={'/user/schedule'} className={`${isActiveLink('/user/schedule') ? 'text-white' : ''}`}>Schedule</Link>
            </div>
            <div className="">
                <button className="text-gray-200 hover:text-white">logout</button>
            </div>
        </div>
    )
}