'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"
import { SignOut } from "../utils/SignOut";
import { useRouter } from "next/navigation";

export default function UserNav() {
    
    const pathname = usePathname()
    const router = useRouter()

    const isActiveLink = (link: string) => {
        return pathname.startsWith(link)
    }

    const logout = async () => {
        await SignOut()
        router.push('/')
    }

    return (
        <div className="fixed w-full top-0 z-10 flex justify-between items-center bg-zinc-600 p-2">
            <div className="flex justify-center items-center gap-2">
                <Link href={'/user/dashboard'} className={`${isActiveLink('/user/dashboard') ? 'text-white' : ''}`}>Dashboard</Link>
                <Link href={'/user/patient'} className={`${isActiveLink('/user/patient') ? 'text-white' : ''}`}>Patient</Link>
                <Link href={'/user/schedule'} className={`${isActiveLink('/user/schedule') ? 'text-white' : ''}`}>Schedule</Link>
            </div>
            <div className="">
                <button onClick={logout} className="text-gray-200 hover:text-white">logout</button>
            </div>
        </div>
    )
}