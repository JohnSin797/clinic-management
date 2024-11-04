'use client'

import PatientFinder from "@/app/components/PatientFinder";
import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Patient {
    _id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    extension: string;
    department: string;
    position: string;
}

interface Consultation {
    _id: string;
    patient: Patient;
    consultation_type: string;
    createdAt: Date;
}

interface MedexState {
    consultation: Consultation;
    consultation_type: string;
    findings: string;
    createdAt: Date;
}

export default function Consultation() {
    const [isHidden, setIsHidden] = useState<boolean>(true)
    const [goTo, setGoTo] = useState<string>('')
    const [consultations, setConsultations] = useState<MedexState[]>([])

    const togglePatientFinder = () => {
        setIsHidden(!isHidden)
    }

    const setFinderPath = (link: string) => {
        setGoTo(link)
        togglePatientFinder()
    }

    const getConsultations = useCallback(async () => {
        await axios.get('/api/medical-record')
        .then(response => {
            console.log(response)
            const con = response.data?.medex
            setConsultations(con)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        getConsultations()
    }, [getConsultations])

    const consultationExport = async () => {
        toast.promise(
            axios.post('/api/consultation/export'),
            {
                pending: 'Exporting file...',
                success: {
                    render({ data }) {
                        const url = window.URL.createObjectURL(new Blob([data.data]))
                        const link = document.createElement('a')
                        link.href = url
                        link.setAttribute('download', 'Generated_Document.docx')
                        document.body.appendChild(link)
                        link.click()
                        link.remove()
                        window.URL.revokeObjectURL(url)
                        return 'Download done'
                    }
                },
                error: {
                    render({ data }: { data: AxiosResponse }) {
                        return data?.data?.message
                    }
                }
            }
        )
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                consultations.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {item?.consultation?.patient?.first_name} {item?.consultation?.patient?.middle_name} {item?.consultation?.patient?.last_name} {item?.consultation?.patient?.extension}

                                            </td>
                                            <td>{item?.consultation?.patient?.position}</td>
                                            <td>{item?.consultation_type}</td>
                                            <td>{new Date(item?.createdAt).toLocaleDateString('en-PH')}</td>
                                            <td>
                                                <div className="w-full flex flex-wrap justify-center items-center gap-2">
                                                    <button onClick={consultationExport} className="p-2 text-sm text-white font-bold bg-blue-400 hover:bg-blue-600 rounded">export</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}