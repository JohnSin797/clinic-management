import fs from 'fs'
import path from 'path'
import Docxtemplater from 'docxtemplater'
import pizzip from 'pizzip'
import { NextResponse } from 'next/server'
import { saveAs } from 'file-saver'
import Consultation from '@/app/models/Consultation'

export const POST = async (request: Request) => {
    try {
        const { id } = await request.json();
        const consultation = await Consultation.aggregate([
            {
                $match: { _id: id },
            },
            {
                $lookup: {
                    from: 'patients',
                    localField: 'patient',
                    foreignField: '_id',
                    as: 'patient',
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
                    patient: {
                        _id: '$patient._id',
                        first_name: '$patient.first_name'
                    },
                    address: 1,
                    father_name: 1,
                    father_birthdate: 1,
                    father_occupation: 1,
                    mother_name: 1,
                    mother_birthdate: 1,
                    mother_occupation: 1,
                    height: 1,
                    weight: 1,
                    person_to_be_notified: 1,
                    emergency_contact: 1,
                    other_person_name: 1,
                    other_person_contact: 1,
                    relation: 1,
                    food_allergy: 1,
                    medicine_allergy: 1,
                    other_allergy: 1,
                    asthma_history: 1,
                    illness_history: 1,
                    person_with_disability: 1,
                    current_illness: 1,
                    surgical_operation: 1,
                    operation_date: 1,
                    operation_type: 1,
                    operation_hospital: 1,
                    hospitalized: 1,
                    hospital_name: 1,
                    attending_physician: 1,
                    diagnosis: 1,
                }
            }
        ]);
        console.log(consultation);
        const templatePath = path.join(process.cwd(), 'assets', 'templates', 'test.docx');
        const templateContent = fs.readFileSync(templatePath, 'binary');
        const zip = new pizzip(templateContent);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        const first_name = 'John'; //consultation[0]?.patient?.first_name;
        doc.setData({ first_name });
        doc.render();

        const buffer = await doc.getZip().generate({ 
            type: 'nodebuffer',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
         });

        const response = new NextResponse(buffer, {
            status: 200,
            headers: {
              'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'Content-Disposition': `attachment; filename=${'jack'}_document.docx`,
            },
        });

        return response;
        // const blob = doc.getZip().generate({
        //     type: 'blob',
        //     mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        // });
        // saveAs(blob, `${first_name}_consultation.docx`);
        // return new NextResponse(JSON.stringify({message: 'OK'}), {status: 200});
    } catch (error: unknown) {
        let message = '';
        if (error instanceof Error) {
            message = error.message;
        }
        return new NextResponse('Error: ' + message, {status: 500});
    }
}