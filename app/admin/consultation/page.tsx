'use client'

import PatientFinder from "@/app/components/PatientFinder";
import axios from "axios";
import Link from "next/link";
import Exports from "@/app/utils/Exports";
import { useCallback, useEffect, useState } from "react";

interface Patient {
    _id: string
    first_name: string;
    middle_name: string;
    last_name: string;
    extension?: string;
    position: 'student' | 'teacher' | 'non-teaching-staff';
    course?: string | null;
    department: string;
    id_number: string;
    birthdate: Date;
    nationality: string;
    religion: string;
    sex: 'male' | 'female';
    contact: string;
    email: string;
    address: string;
    father_name?: string;
    father_birthdate?: Date;
    father_occupation?: string;
    mother_name?: string;
    mother_birthdate?: Date;
    mother_occupation?: string;
    blood_type?: string;
    height?: string;
    weight?: string;
    person_to_be_notified?: 'father' | 'mother' | '';
    emergency_contact?: string;
    other_person_name?: string;
    other_person_contact?: string;
    relation?: string;
    food_allergy: string[];
    medicine_allergy: string[];
    other_allergy: string[];
}

interface ConsultationState {
    _id: string;
    patient: Patient;
    consultation_type: string;
    address: string;
    father_name?: string;
    father_birthdate?: Date;
    father_occupation?: string;
    mother_name?: string;
    mother_birthdate?: Date;
    mother_occupation?: string;
    height?: string;
    weight?: string;
    person_to_be_notified?: 'father' | 'mother' | '';
    emergency_contact?: string;
    other_person_name?: string;
    other_person_contact?: string;
    relation?: string;
    food_allergy: string[];
    medicine_allergy: string[];
    other_allergy: string[];
    asthma_history?: boolean | null;
    illness_history: string[];
    person_with_disability: string[];
    current_illness?: string[];
    surgical_operation: boolean | null;
    operation_date?: Date;
    operation_type?: string;
    operation_hospital?: string;
    hospitalized: boolean | null;
    hospital_name?: string;
    attending_physician?: string;
    diagnosis?: string;
    createdAt: Date | null;
}

interface MedexState {
    consultation: ConsultationState;
    consultation_type: string;
    findings: string;
    createdAt: Date;
}

export default function Consultation() {
    const [isHidden, setIsHidden] = useState<boolean>(true)
    // const [goTo, setGoTo] = useState<string>('')
    const [consultations, setConsultations] = useState<MedexState[]>([])
    const { exportConsultation } = Exports()

    const togglePatientFinder = () => {
        setIsHidden(!isHidden)
    }

    // const setFinderPath = (link: string) => {
    //     setGoTo(link)
    //     togglePatientFinder()
    // }

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

    // const consultationExport = async (id: string) => {
    //     // exportConsultation()
    //     toast.promise(
    //         axios.post('/api/consultation/export', { id: id }),
    //         {
    //             pending: 'Exporting file...',
    //             success: {
    //                 render({ data }) {
    //                     const url = window.URL.createObjectURL(new Blob([data.data]))
    //                     saveAs(url, 'test.docx');
    //                     window.URL.revokeObjectURL(url);
    //                     // const link = document.createElement('a')
    //                     // link.href = url
    //                     // link.setAttribute('download', 'Generated_Document.docx')
    //                     // document.body.appendChild(link)
    //                     // link.click()
    //                     // link.remove()
    //                     // window.URL.revokeObjectURL(url)
    //                     return 'Download ready'
    //                 }
    //             },
    //             error: {
    //                 render({ data }: { data: AxiosResponse }) {
    //                     console.log(data)
    //                     return data?.data?.message
    //                 }
    //             }
    //         }
    //     )
    // }

    return (
        <div className="w-full flex justify-center items-center">
            <PatientFinder isHidden={isHidden} goTo={'consultation'} toggle={togglePatientFinder} />
            <section className="w-full md:w-2/3 rounded-lg shadow-xl p-5 bg-zinc-400">
                <header className="mb-5 font-semibold flex justify-between items-center">
                    <h1 className="text-2xl">Consultations</h1>
                    <div className="flex flex-wrap gap-2">
                        {/* <button onClick={()=>setFinderPath('/admin/consultation/consultation')} className="p-2 rounded text-white font-semibold bg-emerald-600 hover:bg-emerald-700">Consultation</button>
                        <button onClick={()=>setFinderPath('/admin/consultation/medical-examination')} className="p-2 rounded text-white font-semibold bg-lime-600 hover:bg-lime-700">Medical Examination</button>
                        <button onClick={()=>setFinderPath('/admin/consultation/dental-consultation')} className="p-2 rounded text-white font-semibold bg-teal-600 hover:bg-teal-700">Dental Consultation</button> */}
                        <Link href={'/admin/consultation/archive'} className="p-2 rounded text-white text-center font-semibold bg-cyan-400 hover:bg-cyan-600">Archive</Link>
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
                                                    <button onClick={()=>exportConsultation(item?.consultation)} className="p-2 text-sm text-white font-bold bg-blue-400 hover:bg-blue-600 rounded">export</button>
                                                    {/* <button onClick={()=>consultationExport(item?.consultation?._id)} className="p-2 text-sm text-white font-bold bg-blue-400 hover:bg-blue-600 rounded">export</button> */}
                                                    <button className="p-2 text-sm text-white font-bold bg-rose-400 hover:bg-rose-600 rounded">archive</button>
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