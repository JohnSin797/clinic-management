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
                            course: "$patient.course",
                            department: "$patient.department",
                            id_number: "$patient.id_number",
                            birthdate: "$patient.birthdate",
                            nationality: "$patient.nationality",
                            religion: "$patient.religion",
                            sex: "$patient.sex",
                            contact: "$patient.contact",
                            email: "$patient.email",
                            address: "$patient.address",
                            father_name: "$patient.father_name",
                            father_birthdate: "$patient.father_birthdate",
                            father_occupation: "$patient.father_occupation",
                            mother_name: "$patient.mother_name",
                            mother_birthdate: "$patient.mother_birthdate",
                            mother_occupation: "$patient.mother_occupation",
                            blood_type: "$patient.blood_type",
                            height: "$patient.height",
                            weight: "$patient.weight",
                            person_to_be_notified: "$patient.person_to_be_notified",
                            emergency_contact: "$patient.emergency_contact",
                            other_person_name: "$patient.other_person_name",
                            other_person_contact: "$patient.other_person_contact",
                            relation: "$patient.relation",
                            food_allergy: "$patient.food_allergy",
                            medicine_allergy: "$patient.medicine_allergy",
                            other_allergy: "$patient.other_allergy",
                        },
                        address: '$consultation.address',
                        father_name: '$consultation.father_name',
                        father_birthdate: '$consultation.father_birthdate',
                        father_occupation: '$consultation.father_occupation',
                        mother_name: '$consultation.mother_name',
                        mother_birthdate: '$consultation.mother_birthdate',
                        mother_occupation: '$consultation.mother_occupation',
                        height: '$consultation.height',
                        weight: '$consultation.weight',
                        person_to_be_notified: '$consultation.person_to_be_notified',
                        emergency_contact: '$consultation.emergency_contact',
                        other_person_name: '$consultation.other_person_name',
                        other_person_contact: '$consultation.other_person_contact',
                        relation: '$consultation.relation',
                        food_allergy: '$consultation.food_allergy',
                        medicine_allergy: '$consultation.medicine_allergy',
                        other_allergy: '$consultation.other_allergy',
                        asthma_history: '$consultation.asthma_history',
                        illness_history: '$consultation.illness_history',
                        person_with_disability: '$consultation.person_with_disability',
                        current_illness: '$consultation.current_illness',
                        surgical_operation: '$consultation.surgical_operation',
                        operation_date: '$consultation.operation_date',
                        operation_type: '$consultation.operation_type',
                        operation_hospital: '$consultation.operation_hospital',
                        hospitalized: '$consultation.hospitalized',
                        hospital_name: '$consultation.hospital_name',
                        attending_physician: '$consultation.attending_physician',
                        diagnosis: '$consultation.diagnosis',
                        createdAt: '$consultation.createdAt',
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