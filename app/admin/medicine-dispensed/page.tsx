'use client'

import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface Medicine {
    medicine_name: string;
    description?: string[];
    stock: number;
}

interface Item {
    medicine: Medicine;
    quantity: number;
}

// interface Patient {
//     first_name: string;
//     middle_name: string;
//     last_name: string;
//     extension: string;
// }

interface Record {
    consultation_type: string;
}

interface MedicineDispensed {
    record: Record;
    items?: Item[];
    createdAt: Date;
}

export default function MedicineDispensed() {
    const [dispensed, setDispensed] = useState<MedicineDispensed[]>([])

    const getData = useCallback(async () => {
        await axios.get('/api/medicine-dispensed')
        .then(response => {
            console.log(response)
            const dis = response.data?.dispensed
            setDispensed(dis)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div className="w-full flex justify-center items-center">
            <section className="w-full md:w-2/3 rounded-lg shadow-xl p-5 bg-zinc-400">
                <header className="mb-5 font-semibold flex justify-between items-center">
                    <h1 className="text-2xl">Medicines</h1>
                </header>
                <div className="relative w-full h-96">
                    <table className="w-full table-auto md:table-fixed text-center">
                        <thead className="text-white bg-zinc-600">
                            <tr>
                                <th>Medicine</th>
                                <th>Type</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dispensed.map((dis, index) => {
                                    return(
                                        <tr key={index}>
                                            <td className="p-2 border-b border-gray-200">
                                                {
                                                    dis.items?.map((item,idx) => {
                                                        return(
                                                            <div className="w-full" key={idx}>
                                                                <p className="text-sm">
                                                                    <span>Medicine Name: </span>
                                                                    <span className="font-bold">{item?.medicine?.medicine_name}</span>
                                                                </p>
                                                                <p className="text-sm">
                                                                    <span>Quantity: </span>
                                                                    <span className="font-bold">{item.quantity}</span>
                                                                </p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td className="p-2 border-b border-gray-200">{dis?.record?.consultation_type}</td>
                                            <td className="p-2 border-b border-gray-200">{new Date(dis?.createdAt).toLocaleDateString('en-PH')}</td>
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