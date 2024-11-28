'use client'

import React from 'react';

interface DataRow {
    findings: string;
    year: number;
    month: number;
    count: number;
}

interface DataTableProps {
    data: DataRow[];
}

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  // Organize data by month
    const groupedData: Record<number, DataRow[]> = {};

    data.forEach((row) => {
        if (!groupedData[row.month]) {
        groupedData[row.month] = [];
        }
        groupedData[row.month].push(row);
    });

    return (
        <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
                <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-300">Findings</th>
                {months.map((month) => (
                    <th key={month} className="px-4 py-2 border border-gray-300">{month}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys(groupedData).map((year, index) => {
                        const rows = groupedData[parseInt(year)];
                        return rows.map((row, idx) => (
                            <tr key={`${index}-${idx}`} className="odd:bg-white even:bg-gray-50">
                                <td className="px-4 py-2 border border-gray-300">{row.findings}</td>
                                {months.map((_, monthIndex) => {
                                    const monthData = rows.find(r => r.month === monthIndex + 1);
                                    return (
                                        <td key={monthIndex} className="px-4 py-2 border border-gray-300">
                                            {monthData ? monthData.count : 0}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))
                    })
                }
            </tbody>
        </table>
    )
}

export default DataTable;
