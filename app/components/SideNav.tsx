'use client'

import Image from "next/image"
import logo from "@/assets/images/sorsu-logo.png"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SideNav() {
    const pathname = usePathname()

    const isActiveLink = (link: string) => {
        return pathname.startsWith(link)
    }

    return (
        <div className="fixed left-0 top-0 w-full md:w-1/6 bg-red-900 z-10 min-h-screen">
            <div className="flex justify-center items-center w-full my-5">
                <Image src={logo} alt="logo" width={100} height={100} />
            </div>
            <ul className="space-y-5 text-white text-sm text-center">
                <li>
                    <Link href={'/admin/dashboard'} className={`block p-2 w-full ${isActiveLink('/admin/dashboard') ? 'bg-red-950' : ''}`}>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href={'/admin/patient'} className={`block p-2 w-full ${isActiveLink('/admin/patient') ? 'bg-red-950' : ''}`}>
                        Patient
                    </Link>
                </li>
                <li>
                    <Link href={'/admin/scheduling'} className={`block p-2 w-full ${isActiveLink('/admin/scheduling') ? 'bg-red-950' : ''}`}>
                        Scheduling
                    </Link>
                </li>
                <li>
                    <Link href={'/admin/consultation'} className={`block p-2 w-full ${isActiveLink('/admin/consultation') ? 'bg-red-950' : ''}`}>
                        Consultation
                    </Link>
                </li>
                <li>
                    <Link href={'/admin/medicine-dispensed'} className={`block p-2 w-full ${isActiveLink('/admin/medicine-dispensed') ? 'bg-red-950' : ''}`}>
                        Medicine Dispensed
                    </Link>
                </li>
                
                <li>
                    <Link href={'/admin/health-record'} className={`block p-2 w-full ${isActiveLink('/admin/health-record') ? 'bg-red-950' : ''}`}>
                        Health Records
                    </Link>
                </li>
            </ul>
        </div>
    )
}