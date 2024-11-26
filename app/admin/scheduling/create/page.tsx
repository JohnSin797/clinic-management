'use client'

import axios from "axios";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
interface Patient {
    _id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    extension?: string; 
}

export default function Create() {
    const [scheduleForm, setScheduleForm] = useState<{
        patient: string;
        schedule: Date;
        consultation_type: string;
    }>({
        patient: '',
        schedule: new Date(),
        consultation_type: 'consultation',
    })
    const [patients, setPatients] = useState<Patient[]>([])

    const getPatients = useCallback(async () => {
        await axios.get('/api/patient')
            .then(response => {
                const p = response.data?.patient
                setPatients(p)
            })
            .catch(error => {
                console.log(error)
                toast.error('Error')
            })
    }, [])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        await axios.post('/api/schedule/admin', scheduleForm)
        .then(response => {
            const sched = response.data?.schedules
            
        })
    }
    
    useEffect(() => {
        getPatients()
    }, [getPatients])

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setScheduleForm({
            ...scheduleForm,
            [name]: value
        })
    }

    return(
        <div className="w-full flex justify-center items-center">
            <ToastContainer position="bottom-right" />
            <section className="w-full md:w-[550px] rounded-lg shadow-xl p-5 bg-zinc-400">
                <header className="mb-5 font-semibold flex justify-between items-center">
                    <h1 className="text-2xl">Create Appointment</h1>
                </header>
                <form onSubmit={handleSubmit}>
                    <div className="w-full space-y-2">
                        <div className="w-full group">
                            <label htmlFor="patient" className="text-xs font-bold">Patient:</label>
                            <select 
                                className="w-full p-2 rounded"
                                name="patient" 
                                id="patient"
                                value={scheduleForm.patient}
                                onChange={handleOnChange}
                            >
                                <option value="">--select--</option>
                                {
                                    patients.map((patient,index) => {
                                        return(
                                            <option key={index} value={patient._id}>
                                                {patient.first_name} {patient.middle_name} {patient.last_name} {patient.extension}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="w-full group">
                            <label htmlFor="schedule" className="text-xs font-bold">Schedule:</label>
                            <input 
                                type="date" 
                                name="schedule" 
                                id="schedule" 
                                className="w-full p-2 rounded" 
                                value={scheduleForm.schedule ? new Date(scheduleForm.schedule).toISOString().substring(0, 10) : ''}
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="w-full group">
                            <label htmlFor="consultation_type" className="text-xs font-bold">Consultation Type:</label>
                            <input 
                                type="text" 
                                name="consultation_type" 
                                id="consultation_type" 
                                className="w-full p-2 rounded" 
                                value={scheduleForm.consultation_type}
                                onChange={handleOnChange}
                            />
                        </div>
                        <button className="p-2 rounded text-white text-xs font-bold bg-indigo-600 hover:bg-indigo-900">
                            submit
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}