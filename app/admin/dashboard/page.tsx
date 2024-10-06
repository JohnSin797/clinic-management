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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export default function Dashboard() {
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

    const appointments = [
        new Date(2024, 9, 10), // Appointment on October 10, 2024
        new Date(2024, 9, 15), // Appointment on October 15, 2024
        new Date(2024, 9, 22), // Appointment on October 22, 2024
    ];

    const patients = [
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
        {
            name: 'John Doe',
            position: 'student',
            department: 'ICT',
        },
    ]

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
                        patients.map((patient,index)=>{
                            return(
                                <div className="grid grid-cols-3 text-xs p-1 hover:bg-zinc-600 hover:text-white" key={index}>
                                    <span>{patient.name}</span>
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
                    <Calendar appointments={appointments} />
                </section>
            </div>
            <section className="w-full bg-zinc-200 p-5">
                <Bar options={options} data={data} />
            </section>
        </div>
    )
}