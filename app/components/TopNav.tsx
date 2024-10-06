'use client'

import { SignOut } from "../utils/SignOut"

export default function TopNav() {

    const handleLogout = async () => {
        await SignOut()
    }

    return (
        <div className="fixed top-0 right-0 w-full md:w-5/6 bg-zinc-600 z-10 flex justify-between items-center p-2">
            <header>
                <h1 className="text-2xl text-white">Clinic Mangement</h1>
            </header>
            <button onClick={handleLogout} type="button" className="">logout</button>
        </div>
    )
}