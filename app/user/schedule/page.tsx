'use client'

import Link from "next/link"

export default function Schedule() {
    return (
        <div className="w-full flex justify-center items-center">
            <section className="w-full md:w-2/3 rounded-lg shadow-xl p-5 bg-zinc-400">
                <header className="mb-5 font-semibold flex justify-between items-center">
                    <h1 className="text-2xl">Appointments</h1>
                    <Link href={'/admin/schedule/create'} className="p-2 rounded bg-green-300 hover:bg-green-400 text-black hover:text-white font-semibold">Create</Link>
                </header>
                <div className="relative w-full h-96">
                    <table className="w-full table-auto md:table-fixed text-center">
                        <thead className="text-white bg-zinc-600">
                            <tr>
                                <th>Consultation</th>
                                <th>Schedule</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </section>
        </div>
    )
}