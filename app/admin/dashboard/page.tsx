'use client'

import Clock from "@/app/components/Clock"
import Calendar from "@/app/components/Calendar"
import { 
    Chart as ChartJS,  
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

interface Patient {
    _id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    extension?: string;
    position: 'student' | 'teacher' | 'non-teaching-staff' | '';
    department: string;
    id_number: string;
    birthdate: Date | null;
    nationality: string;
    religion: string;
    sex: 'male' | 'female';
    contact: string;
    email: string;
    address: string;
    father_name?: string;
    father_birthdate?: Date | null;
    father_occupation?: string;
    mother_name?: string;
    mother_birthdate?: Date | null;
    mother_occupation?: string;
    blood_type?: string;
    height?: string;
    weight?: string;
    person_to_be_notified?: 'father' | 'mother' | null;
    emergency_contact?: string;
    other_person_name?: string;
    other_person_contact?: string;
    relation?: string;
    food_allergy: string[];
    medicine_allergy: string[];
    other_allergy: string[];
}

interface PatientState {
    patients: Patient[];
    loading: boolean;
}

interface Appointment {
    consultation_type: string;
    schedule: Date;
}

interface AppointmentState {
    appointments: Appointment[];
    loading: boolean;
}

export default function Dashboard() {
    const [patients, setPatients] = useState<PatientState>({
        patients: [],
        loading: true
    })
    const [appointments, setAppointments] = useState<AppointmentState>({
        appointments: [],
        loading: true
    })
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Clinic Consultations',
            },
        },
    }

    const dataArr = [0, 1, 10, 2, 13, 15, 3, 1, 0, 0, 0, 0]

    const data: ChartData<"bar", number[], string> = {
        labels,
        datasets: [
        {
            label: "Number of consultations",
            data: dataArr, 
            backgroundColor: "rgba(69, 10, 10, 0.8)", 
        },
        ],
    }

    const getAppointments = useCallback(async () => {
        await axios.get('/api/schedule')
        .then(response => {
            const app = response.data.schedule
            setAppointments({
                appointments: app,
                loading: false
            })
        })
        .catch(error => {
            console.log(error)
            setAppointments({
                ...appointments,
                loading: false
            })
        })
    }, [])

    const getPatients = useCallback(async () => {
        await axios.get('/api/patient')
            .then(response => {
                const p = response.data?.patient;
                setPatients({
                    patients: p,
                    loading: false
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, []); 
    
    useEffect(() => {
        getPatients();
        getAppointments();
    }, [getPatients, getAppointments]);

    return (
        <div className="w-full p-5 md:px-20">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                <section className="w-96 rounded-lg shadow-xl bg-zinc-400 p-5">
                    <header className="mb-1 font-semibold">
                        <h1 className="">Patients</h1>
                    </header>
                    <div className="grid grid-cols-3 bg-zinc-600 text-white p-1">
                        <span className="font-semibold text-xs">Name</span>
                        <span className="font-semibold text-xs">Position</span>
                        <span className="font-semibold text-xs">Department</span>
                    </div>
                    <div className="h-36 overflow-y-auto divide-y-2">
                    {
                        patients.patients.map((patient,index)=>{
                            return(
                                <div className="grid grid-cols-3 text-xs p-1 hover:bg-zinc-600 hover:text-white" key={index}>
                                    <span>{patient.first_name} {patient.middle_name} {patient.last_name} {patient.extension}</span>
                                    <span>{patient.position}</span>
                                    <span>{patient.department}</span>
                                </div>
                            )
                        })
                    }
                    </div>
                </section>
                <section className="w-96 rounded-lg shadow-xl bg-[#ccc] p-5 flex justify-center items-center gap-4 h-60">
                    <Clock datediff={8} />
                    <Calendar appointments={appointments.appointments} />
                </section>
            </div>
            <section className="w-full bg-zinc-200 p-5">
                <Bar options={options} data={data} />
            </section>
        </div>
    )
}