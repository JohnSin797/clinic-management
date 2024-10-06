'use client'

import PatientFinder from "@/app/components/PatientFinder";
import Link from "next/link";
import { useState } from "react";

export default function Consultation() {
    const [isHidden, setIsHidden] = useState<boolean>(true)
    const [goTo, setGoTo] = useState<string>('')

    const togglePatientFinder = () => {
        setIsHidden(!isHidden)
    }

    const setFinderPath = (link: string) => {
        setGoTo(link)
        togglePatientFinder()
    }

    return (
        <div className="w-full flex justify-center items-center">
            <PatientFinder isHidden={isHidden} goTo={goTo} toggle={togglePatientFinder} />
            <section className="w-full md:w-2/3 rounded-lg shadow-xl p-5 bg-zinc-400">
                <header className="mb-5 font-semibold flex justify-between items-center">
                    <h1 className="text-2xl">Consultations</h1>
                    <div className="flex flex-wrap gap-2">
                        <button onClick={()=>setFinderPath('/admin/consultation/consultation')} className="p-2 rounded text-white font-semibold bg-emerald-600 hover:bg-emerald-700">Consultation</button>
                        <button onClick={()=>setFinderPath('/admin/consultation/medical-examination')} className="p-2 rounded text-white font-semibold bg-lime-600 hover:bg-lime-700">Medical Examination</button>
                        <button onClick={()=>setFinderPath('/admin/consultation/dental-consultation')} className="p-2 rounded text-white font-semibold bg-teal-600 hover:bg-teal-700">Dental Consultation</button>
                    </div>
                </header>
                <div className="relative w-full h-96">
                    <table className="w-full table-auto md:table-fixed text-center">
                        <thead className="text-white bg-zinc-600">
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Type</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </section>
        </div>
    )
}