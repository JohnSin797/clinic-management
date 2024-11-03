import connect from "@/lib/connect";
import MedicalRecord from "@/app/models/MedicalRecord";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connect();
        const medex = await MedicalRecord.aggregate([
            {
                $match: { deletedAt: null }
            },
            {
                $lookup: {
                    from: 'consultations',
                    localField: 'consultation',
                    foreignField: '_id',
                    as: 'consultation'
                }
            },
            {
                $unwind: {
                    path: '$consultation',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'patients',
                    localField: 'consultation.patient',
                    foreignField: '_id',
                    as: 'patient'
                }
            },
            {
                $unwind: {
                    path: '$patient',
                    preserveNullAndEmptyArrays: true,
                }
            },
            {
                $project: {
                    _id: 1,
                    consultation: {
                        _id: 1,
                        patient: {
                            _id: "$patient._id",
                            first_name: "$patient.first_name",
                            middle_name: "$patient.middle_name",
                            last_name: "$patient.last_name",
                            extension: "$patient.extension",
                            position: "$patient.position",
                        }
                    },
                    consultation_type: 1,
                    findings: 1,
                    createdAt: 1,

                }
            },
            // {
            //     $lookup: {
            //         from: 'medical_examination',
            //         localField: '_id',
            //         foreignField: 'medical_examination',
            //         as: 'medical_examination',
            //     }
            // },
            // {
            //     $lookup: {
            //         from: 'dental_consultation',
            //         localField: '_id',
            //         foreignField: 'dental_consultation',
            //         as: 'dental_consultation',
            //     }
            // },
            // {
            //     $lookup: {
            //         from: 'patient',
            //         localField: 'medical_examination.patient',
            //         foreignField: '_id',
            //         as: 'medical_examination.patient'
            //     }
            // },
            // {
            //     $lookup: {
            //         from: 'patient',
            //         localField: 'dental_consultation.patient',
            //         foreignField: '_id',
            //         as: 'dental_consultation.patient'
            //     }
            // },
        ]);
        //.populate('consultation').populate('medical_examination').populate('dental_consultation')
        return new NextResponse(JSON.stringify({message: 'OK', medex: medex}), {status: 200});
    } catch (error: unknown) {
        let message = '';
        if (error instanceof Error) {
            message = error.message;
        }
        return new NextResponse('Error: ' + message, {status: 500});
    }
}