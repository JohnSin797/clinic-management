import { saveAs } from 'file-saver'
import { Document, Packer, PageOrientation, Table, TableRow, TableCell, HeightRule, Paragraph, TextRun, AlignmentType, WidthType, ImageRun, BorderStyle } from 'docx'
// import formLogo from '@/assets/images/form-logo.png'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface Patient {
    _id: string
    first_name: string;
    middle_name: string;
    last_name: string;
    extension?: string;
    position: 'student' | 'teacher' | 'non-teaching-staff';
    course?: string | null;
    year?: number | null;
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
    patient: Patient | null;
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

interface MedicalState {
    patient: Patient;
    civil_status: string;
    purpose: string;
    past_medical_history: string;
    family_history: string;
    occupational_history: string;
    body_mass_index: string;
    skin: string;
    heads: string;
    eyes: string;
    ears: string;
    mouth: string;
    neck: string;
    chest: string;
    abdomen: string;
    rectal: string;
    musculo_skeletal: string;
    extremeties: string;
    other: string;
    blood_pressure: string;
    temperature: string;
    hr: string;
    rr: string;
    height: string;
    weight: string;
    hearing: string;
    vision: string;
    vision_l: string;
    vision_r: string;
    chest_xray: string;
    xray_type: string;
    complete_blood_count: string;
    routine_urinalysis: string;
    fecalysis: string;
    hepatitis_b_screening: string;
    metaphetamine: string;
    tetrahydrocannabinol: string;
    image: string;
    classification: string;
    needs_treatment: string[];
    remarks: string;
    createdAt: Date;
}

export default function Exports() {
    const [formLogo, setFormLogo] = useState<Buffer | null>(null)
    const [phLogo, setPHLogo] = useState<Buffer | null>(null)

    const exportConsultation = (consultation: ConsultationState, patient: Patient) => {
        
        const header = addHeader() ?? []
            const body = addBody(consultation, patient)
            const rows = [...header, ...body] 
            const doc = new Document({
                sections: [{
                    properties: {
                        page: {
                            size: {
                                orientation: PageOrientation.PORTRAIT,  
                                width: 11906,  
                                height: 16838, 
                            },
                            margin: {
                                top: 567,    
                                right: 567,  
                                bottom: 567, 
                                left: 567,   
                            },
                        },
                    },
                    children: [
                        new Table({
                            alignment: AlignmentType.CENTER,
                            width: { size: "100%", type: "auto" },
                            rows: rows ?? [new TableRow({children:[]})],
                        })
                    ]
                }]
            })
            Packer.toBlob(doc).then(blob => {
                saveAs(blob, patient.first_name+' '+patient.middle_name+' '+patient.last_name+' '+patient.extension+ '-consultation-form.docx')
            })
    }

    const exportMedicalExamination = (medex: MedicalState, patient: Patient) => {
        const header = addHeader() ?? []
        const body = [
            new TableRow({
                height: {
                    value: 346,
                    rule: HeightRule.EXACT,
                },
                children: [
                    new TableCell({
                        columnSpan: 8,
                        width: {
                            size: 10785,
                            type: WidthType.DXA,
                        },
                        verticalAlign: AlignmentType.CENTER,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 10,
                                    after: 10,
                                },
                                children: [
                                    new TextRun({
                                        text: 'MEDICAL EXAMINATION FORM',
                                        font: 'Arial',
                                        size: 22,
                                        bold: true,
                                    }),
                                ]
                            })
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 6,
                        width: {
                            size: 6480,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph('')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('Document Control:'),
                                    new TextRun('')
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 1440,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('LAST NAME:')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 5,
                        width: {
                            size: 5040,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(patient.last_name)
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 2160,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('DATE:')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(new Date(medex.createdAt).toLocaleDateString('en-PH'))
                                ]
                            })
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 1440,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('FIRST NAME:')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 5,
                        width: {
                            size: 5040,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(patient.first_name)
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 2160,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('BIRTHDAY:')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(new Date(patient.birthdate).toLocaleDateString('en-PH'))
                                ]
                            })
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 1440,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('MIDDLE NAME:')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 5,
                        width: {
                            size: 5040,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(patient.middle_name)
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 2160,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('DATE:')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun((new Date().getFullYear()-new Date(patient.birthdate).getFullYear()).toString())
                                ]
                            })
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 1440,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('GENDER:')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 5,
                        width: {
                            size: 5040,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(patient.sex)
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 2160,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('CIVIL STATUS:')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(medex.civil_status)
                                ]
                            })
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 1440,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('CELLPHONE No:')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 5,
                        width: {
                            size: 5040,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(patient.contact)
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 2160,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('EMAIL-ADDRESS:')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(patient.email)
                                ]
                            })
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 2,
                        width: {
                            size: 1440,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('ADDRESS:')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 2,
                        width: {
                            size: 5040,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(patient.address)
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 2160,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('COURSE & YEAR or DESIGNATION:')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun((patient.course + ' ')),
                                    new TextRun(patient.year?.toString()??'')
                                ]
                            })
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 2160,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('PURPOSE:')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(medex.purpose)
                                ]
                            })
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 8,
                        rowSpan: 1,
                        children: [
                            new Paragraph('PAST MEDICAL HISTORY')
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 8,
                        rowSpan: 2,
                        children: [
                            new Paragraph(medex.past_medical_history)
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 8,
                        rowSpan: 1,
                        children: [
                            new Paragraph('')
                        ]
                    })
                ]
            }),

            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 8,
                        rowSpan: 1,
                        children: [
                            new Paragraph('FAMILY HISTORY')
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 8,
                        rowSpan: 2,
                        children: [
                            new Paragraph(medex.family_history)
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 8,
                        rowSpan: 1,
                        children: [
                            new Paragraph('')
                        ]
                    })
                ]
            }),
            // new TableRow({
            //     children: [
            //         new TableCell({
            //             columnSpan: 8,
            //             rowSpan: 1,
            //             children: [
            //                 new Paragraph('OCCUPATIONAL HISTORY')
            //             ]
            //         })
            //     ]
            // }),
            // new TableRow({
            //     children: [
            //         new TableCell({
            //             columnSpan: 8,
            //             rowSpan: 2,
            //             children: [
            //                 new Paragraph(medex.occupational_history)
            //             ]
            //         })
            //     ]
            // }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 3,
                        rowSpan: 3,
                        verticalAlign: 'bottom',
                        children: [
                            new Paragraph('')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "TO BE SIGNED BY STUDENT'S PARENT/GUARDIAN ONLY",
                                        font: 'Arial',
                                        size: 20,
                                        bold: true,
                                    })
                                ]
                            })
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 2,
                        children: [
                            new Paragraph('')
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 2,
                        children: [
                            new Paragraph('')
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 3,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun("Student/Employee's Signation")
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun("Parent/Guardian's Printed Name & Signature")
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
        const rows = [...header, ...body]
        const doc = new Document({
            sections: [{
                properties: {
                    page: {
                        size: {
                            orientation: PageOrientation.PORTRAIT,  
                            width: 12240,  
                            height: 20160, 
                        },
                        margin: {
                            top: 567,    
                            right: 567,  
                            bottom: 567, 
                            left: 567,   
                        },
                    },
                },
                children: [
                    new Table({
                        alignment: AlignmentType.CENTER,
                        width: { size: "100%", type: "auto" },
                        rows: rows ?? [new TableRow({children:[]})],
                    })
                ]
            }]
        })
        Packer.toBlob(doc).then(blob => {
            saveAs(blob, 'medical-examination-form.docx')
        })
    }

    useEffect(() => {
        getImage('form-logo.png')
        getImage('ph-logo.png')
    }, [])

    const getImage = async (filename: string) => {
        await axios.get(`/api/images?filename=${filename}`, {
            responseType: 'arraybuffer'
        })
        .then(response => {
            console.log(response)
            const buffr = Buffer.from(response.data)
            if (filename==='form-logo.png') {
                setFormLogo(buffr)
            }
            else if (filename==='ph-logo.png') {
                setPHLogo(buffr)
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    const addHeader = () => {
        if(formLogo && phLogo)
        {const header = [
            new TableRow({
                height: {
                    value: 1296,  
                    rule: HeightRule.EXACT, 
                },
                children: [
                    new TableCell({
                        verticalAlign: 'center',
                        width: {
                            size: 2160,
                            type: WidthType.DXA,
                        },
                        rowSpan: 2,
                        columnSpan: 2,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new ImageRun({
                                        data: formLogo,
                                        transformation: {
                                            width: 100,
                                            height: 100,
                                        },
                                        type: 'png',
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 4,
                        width: {
                            size: 6206,
                            type: WidthType.DXA,
                        },
                        verticalAlign: 'center',
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 10,
                                    after: 10,
                                },
                                children: [
                                    new TextRun({
                                        text: 'Republic of the Philippines',
                                        font: 'Arial',
                                        size: 20,
                                    }),
                                ]
                            }),
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 10,
                                    after: 10,
                                },
                                children: [
                                    new TextRun({
                                        text: 'SORSOGON STATE UNIVERSITY',
                                        font: 'Arial',
                                        size: 22,
                                        bold: true,
                                    }),
                                ]
                            }),
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 10,
                                    after: 10,
                                },
                                children: [
                                    new TextRun({
                                        text: 'Office of the Student Development and Services',
                                        font: 'Arial',
                                        size: 20,
                                        bold: true,
                                    }),
                                ]
                            }),
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 10,
                                    after: 10,
                                },
                                children: [
                                    new TextRun({
                                        text: 'Health Services Unit - Bulan Campus',
                                        font: 'Arial',
                                        size: 20,
                                        bold: true,
                                    }),
                                ]
                            }),
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 10,
                                    after: 10,
                                },
                                children: [
                                    new TextRun({
                                        text: 'Zone 8, Bulan, Sorsogon',
                                        font: 'Arial',
                                        size: 20,
                                        italics: true,
                                    }),
                                ]
                            }),
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        verticalAlign: 'center',
                        width: {
                            size: 2419,
                            type: WidthType.DXA,
                        },
                        rowSpan: 2,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new ImageRun({
                                        data: phLogo,
                                        transformation: {
                                            width: 100,
                                            height: 100,
                                        },
                                        type: 'png'
                                    })
                                ]
                            })
                        ]
                    }),
                ]
            }),
            new TableRow({
                height: {
                    value: 374,
                    rule: HeightRule.EXACT
                },
                children: [
                    new TableCell({
                        columnSpan: 4,
                        width: {
                            size: 6206,
                            type: WidthType.DXA,
                        },
                        verticalAlign: 'center',
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: 'Tel. No. 056-311-9800, E-mail Address: hsubulan@sorsu.edu.ph',
                                        font: 'Arial',
                                        size: 20,
                                    }),
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
        return header}
    }

    const addBody = (consultation: ConsultationState, patient: Patient) => {
        const rows = [
            new TableRow({
                height: {
                    value: 346,
                    rule: HeightRule.EXACT,
                },
                children: [
                    new TableCell({
                        columnSpan: 8,
                        width: {
                            size: 10785,
                            type: WidthType.DXA,
                        },
                        verticalAlign: AlignmentType.CENTER,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                spacing: {
                                    before: 10,
                                    after: 10,
                                },
                                children: [
                                    new TextRun({
                                        text: 'MEDICAL CONSULTATION FORM',
                                        font: 'Arial',
                                        size: 22,
                                        bold: true,
                                    }),
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                height: {
                    value: 346,
                    rule: HeightRule.EXACT,
                },
                children: [
                    new TableCell({
                        columnSpan: 5,
                        width: {
                            size: 6480,
                            type: WidthType.DXA,
                        },
                        verticalAlign: AlignmentType.CENTER,
                        children: [
                            new Paragraph({
                                spacing: {
                                    before: 10,
                                    after: 10,
                                },
                                children: [
                                    new TextRun({
                                        text: 'Course/Designation: '+patient?.course,
                                        font: 'Arial',
                                        size: 20,
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 3,
                        verticalAlign: AlignmentType.CENTER,
                        children: [
                            new Paragraph({
                                spacing: {
                                    before: 10,
                                    after: 10,
                                },
                                children: [
                                    new TextRun({
                                        text: 'Date: '+ formattedDate(consultation.createdAt),
                                        font: 'Arial',
                                        size: 20,
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 1296,
                            type: WidthType.DXA,
                        },
                        columnSpan: 1,
                        rowSpan: 2,
                        verticalAlign: 'top',
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: 'Name: ',
                                        font: 'Arial',
                                        size: 20,
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 2160,
                            type: WidthType.DXA,
                        },
                        borders: {
                            right: { style: 'none' }
                        },
                        columnSpan: 2,
                        rowSpan: 1,
                        verticalAlign: AlignmentType.CENTER,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: patient?.last_name,
                                        font: 'Arial',
                                        size: 20,
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 2160,
                            type: WidthType.DXA,
                        },
                        borders: {
                            right: { style: 'none' }
                        },
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: AlignmentType.CENTER,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: patient?.first_name,
                                        font: 'Arial',
                                        size: 20,
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 2160,
                            type: WidthType.DXA,
                        },
                        borders: {
                            right: { style: 'none' }
                        },
                        columnSpan: 2,
                        rowSpan: 1,
                        verticalAlign: AlignmentType.CENTER,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: patient?.middle_name,
                                        font: 'Arial',
                                        size: 20,
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 1881,
                            type: WidthType.DXA,
                        },
                        columnSpan: 2,
                        rowSpan: 1,
                        verticalAlign: AlignmentType.CENTER,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: patient?.extension,
                                        font: 'Arial',
                                        size: 20,
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        borders: {
                            right: { style: 'none' }
                        },
                        verticalAlign: AlignmentType.CENTER,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: 'Surname',
                                        font: 'Arial',
                                        size: 20,
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        borders: {
                            right: { style: 'none' }
                        },
                        verticalAlign: AlignmentType.CENTER,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: 'First Name',
                                        font: 'Arial',
                                        size: 20,
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        width: {
                            size: 2160,
                            type: WidthType.DXA,
                        },
                        columnSpan: 2,
                        rowSpan: 1,
                        borders: {
                            right: { style: 'none' }
                        },
                        verticalAlign: AlignmentType.CENTER,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: 'Middle Name',
                                        font: 'Arial',
                                        size: 20,
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        verticalAlign: AlignmentType.CENTER,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: 'Ext.',
                                        font: 'Arial',
                                        size: 20,
                                    })
                                ]
                            })
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 1296,
                            type: WidthType.DXA,
                        },
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: 'Birthdate: ',
                                        font: 'Arial',
                                        size: 20,
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 4,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: new Date(patient?.birthdate ?? '').toISOString().substring(0, 10),
                                        font: 'Arial',
                                        size: 20,
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: 'Sex:',
                                        font: 'Arial',
                                        size: 20,
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('Male:'),
                                    (patient?.sex == 'male' ? 
                                    new TextRun("☑")
                                    :
                                    new TextRun("☐")),
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('Female:'),
                                    (patient?.sex == 'female' ? 
                                    new TextRun("☑")
                                    :
                                    new TextRun("☐")),
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Age:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 4,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph((new Date().getFullYear() - new Date(patient?.birthdate??'').getFullYear()).toString())
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Nationality:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph(patient?.nationality??'')
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 3,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Address:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 4,
                        rowSpan: 3,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph(consultation.address)
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Religion:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph(patient?.religion ?? '')
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Cellphone No.:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph(patient?.contact ?? '')
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Email Address:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph(patient?.email ?? '')
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 8,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.LEFT,
                                children: [
                                    new TextRun({
                                        text: 'Name of Parents',
                                        font: 'Arial',
                                        size: 20,
                                        bold: true,
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Father:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 4,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.LEFT,
                                children: [
                                    new TextRun({ text: consultation.father_name })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Date of Birth:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph(new Date(consultation.father_birthdate??'').toLocaleDateString('en-PH'))
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        children: [
                            new Paragraph('')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Occupation:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph(consultation.father_occupation??'')
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Mother:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 4,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.LEFT,
                                children: [
                                    new TextRun({ text: consultation.mother_name })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Date of Birth:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph(new Date(consultation.mother_birthdate??'').toLocaleDateString('en-PH'))
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        children: [
                            new Paragraph('')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Occupation:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph(consultation.mother_occupation??'')
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 8,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.LEFT,
                                children: [
                                    new TextRun({
                                        text: 'IN CASE OF EMERGENCY',
                                        font: 'Arial',
                                        size: 22,
                                        bold: true,
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Person to be notified:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.RIGHT,
                                children: [
                                    new TextRun(consultation.person_to_be_notified == 'father' ? "☑" : "☐")
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Father')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.DISTRIBUTE,
                                children: [
                                    new TextRun(consultation.person_to_be_notified == 'mother' ? "☑" : "☐"),
                                    new TextRun('Mother')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 3,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: 'If parents cannot be reached',
                                        font: 'Arial',
                                        size: 22,
                                        bold: true,
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Cellphone No.:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 3,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph(consultation.other_person_contact??'')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Name:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph(consultation.other_person_name??'')
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        children: [
                            new Paragraph('')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        children: [
                            new Paragraph('Cellphone No.:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph(consultation.other_person_contact??'')
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        children: [
                            new Paragraph('')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        children: [
                            new Paragraph('Relation to the patient:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph(consultation.relation??'')
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 8,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: 'MEDICAL HISTORY',
                                        font: 'Arial',
                                        size: 22,
                                        bold: true,
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph('Blood Type:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.RIGHT,
                                children: [
                                    new TextRun(patient?.blood_type?.toLowerCase() == 'a' ? "☑" : "☐")
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        borders: {
                            left: { style: 'none' }
                        },
                        children: [
                            new Paragraph('A')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        borders: {
                            left: { style: 'none' },
                            right: { style: 'none' }
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun(patient?.blood_type?.toLowerCase() == 'b' ? "☑" : "☐"),
                                    new TextRun('B')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        borders: {
                            right: { style: 'none' }
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun(patient?.blood_type?.toLowerCase() == 'ab' ? "☑" : "☐"),
                                    new TextRun('AB')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 3,
                        rowSpan: 1,
                        verticalAlign: 'center',
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun(patient?.blood_type?.toLowerCase() == 'o' ? "☑" : "☐"),
                                    new TextRun('O')
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        children: [
                            new Paragraph('Height:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 4,
                        rowSpan: 1,
                        children: [
                            new Paragraph(consultation.height??'')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        children: [
                            new Paragraph('Weight:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph(consultation.weight??'')
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        borders: {
                            bottom: { style: 'none' }
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: 'History of Allergy:',
                                        font: 'Arial',
                                        size: 20,
                                        bold: true,
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 3,
                        rowSpan: 1,
                        borders: {
                            bottom: { style: 'none' }
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: 'History of Asthma for the past 3 years:',
                                        font: 'Arial',
                                        size: 20,
                                        bold: true,
                                    })
                                ]
                            })
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        borders: {
                            bottom: { style: 'none' }
                        },
                        children: [
                            new Paragraph('')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        borders: {
                            bottom: { style: 'none' }
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.RIGHT,
                                children: [
                                    new TextRun(consultation.asthma_history ? "☑" : "☐")
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        borders: {
                            bottom: { style: 'none' }
                        },
                        children: [
                            new Paragraph('YES')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        borders: {
                            bottom: { style: 'none' }
                        },
                        children: [
                            new Paragraph((consultation.asthma_history ? "☐" : "☑")+'NO')
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        borders: {
                            bottom: { style: 'none' }
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.RIGHT,
                                children: [
                                    new TextRun(consultation.food_allergy.length > 0 ? "☑" : "☐")
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        borders: {
                            bottom: { style: BorderStyle.SINGLE, size: 1, color: 'FFFFFF' },
                            right: { style: BorderStyle.SINGLE, size: 1, color: 'FFFFFF' },
                            top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                            left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                        },
                        children: [
                            new Paragraph('Food (pls. specify)')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        borders: {
                            bottom: { style: 'none' },
                            left: { style: 'none' },
                        },
                        children: [
                            new Paragraph(consultation.food_allergy.join(', '))
                        ]
                    }),
                    new TableCell({
                        columnSpan: 3,
                        rowSpan: 1,
                        borders: { bottom: { style: 'none' } },
                        children: [new Paragraph('')]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        borders: { bottom: { style: 'none' } },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.RIGHT,
                                children: [
                                    new TextRun(consultation.medicine_allergy.length > 0 ? "☑" : "☐")
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        borders: {
                            bottom: { style: 'none' },
                            right: { style: 'none' },
                        },
                        children: [
                            new Paragraph('Medicine (pls. specify)')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        borders: {
                            bottom: { style: 'none' },
                        },
                        children: [
                            new Paragraph(consultation.medicine_allergy.join(', '))
                        ]
                    }),
                    new TableCell({
                        columnSpan: 3,
                        rowSpan: 1,
                        borders: { bottom: { style: 'none' } },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: 'Past/Present Illness (pls. check)',
                                        font: 'Arial',
                                        size: 20,
                                        bold: true,
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.RIGHT,
                                children: [
                                    new TextRun(consultation.other_allergy.length > 0 ? "☑" : "☐")
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        borders: {
                            right: { style: 'none' }
                        },
                        children: [
                            new Paragraph('Others (pls. specify)')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph(consultation.other_allergy.join(', '))
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        borders: {
                            right: { style: 'none' },
                            bottom: { style: 'none' }
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.JUSTIFIED,
                                children: [
                                    new TextRun(consultation.illness_history.includes('asthma') ? "☑" : "☐"),
                                    new TextRun('Asthma')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        borders: {
                            right: { style: 'none' },
                            bottom: { style: 'none' }
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.JUSTIFIED,
                                children: [
                                    new TextRun(consultation.illness_history.includes('measles') ? "☑" : "☐"),
                                    new TextRun('Measles')
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: 'For PWD (Person With Disabilities)',
                                        font: 'Arial',
                                        size: 20,
                                        bold: true,
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.illness_history.includes('bronchitits') ? "☑" : "☐"),
                                    new TextRun('Bronchitis')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.illness_history.includes('muscle spasm') ? "☑" : "☐"),
                                    new TextRun('Muscle Spasm')
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        children: [new Paragraph('')]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.illness_history.includes('chicken pox') ? "☑" : "☐"),
                                    new TextRun('Chicken Pox')
                                ]
                            }),
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.illness_history.includes('pneumonia') ? "☑" : "☐"),
                                    new TextRun('Pneumonia')
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 3,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.person_with_disability.includes('blind') ? "☑" : "☐"),
                                    new TextRun('Blind or Visually Impaired')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.person_with_disability.includes('autism') ? "☑" : "☐"),
                                    new TextRun('Autism')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.illness_history.includes('epilepsy') ? "☑" : "☐"),
                                    new TextRun('Epilepsy')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.illness_history.includes('skin allergy') ? "☑" : "☐"),
                                    new TextRun('Skin Allergy')
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 3,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.person_with_disability.includes('deaf/mute') ? "☑" : "☐"),
                                    new TextRun('Deaf/Mute')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.person_with_disability.includes('chronic illness') ? "☑" : "☐"),
                                    new TextRun('Chronic Illness (stroke, diabetes)')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.illness_history.includes('gastritis') ? "☑" : "☐"),
                                    new TextRun('Gastritis')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.illness_history.includes('tonsilitis') ? "☑" : "☐"),
                                    new TextRun('Tonsilitis')
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.person_with_disability.includes('orthopedically challenged') ? "☑" : "☐"),
                                    new TextRun('Orthopedically Challenged')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.illness_history.includes('heart disease') ? "☑" : "☐"),
                                    new TextRun('Heart Disease')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.illness_history.includes('Tuberculosis') ? "☑" : "☐"),
                                    new TextRun('Tuberculosis')
                                ]
                            })
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.person_with_disability.includes('congenital defects') ? "☑" : "☐"),
                                    new TextRun('Congenital Defects')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 3,
                        rowSpan: 1,
                        children: [
                            new Paragraph('')
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.person_with_disability.includes('communication disorder') ? "☑" : "☐"),
                                    new TextRun('Communication Disorder, Speech & Language Impairment (cleft lip/palate)')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.illness_history.includes('hypertension') ? "☑" : "☐"),
                                    new TextRun('Hypertension')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.illness_history.includes('uti') ? "☑" : "☐"),
                                    new TextRun('UTI (Urinary Tract Infection)')
                                ]
                            })
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        children: [new Paragraph('')]
                    }),
                    new TableCell({
                        columnSpan: 3,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun(consultation.illness_history.includes('others') ? "☑" : "☐"),
                                    new TextRun('Others (pls specify)')
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 8,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: 'A. Are you suffering from an illness at the moment? Which do you think we need to be aware of? Please state',
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 8,
                        rowSpan: 1,
                        children: [
                            new Paragraph(consultation?.current_illness?.join(' ') ?? '')
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 8,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: 'B. Did you undergo Surgical operation? Please state',
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun(consultation.surgical_operation ? "☑" : "☐"),
                                    new TextRun('YES')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph('Date of operation:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 4,
                        rowSpan: 1,
                        children: [
                            new Paragraph(new Date(consultation.operation_date??'').toLocaleDateString('en-PH'))
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph('')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph('Type of operation:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 4,
                        rowSpan: 1,
                        children: [
                            new Paragraph(consultation.operation_type??'')
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph('')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph('Hospital:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 4,
                        rowSpan: 1,
                        children: [
                            new Paragraph(consultation.operation_hospital??'')
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun(!consultation.surgical_operation ? "☑" : "☐"),
                                    new TextRun('NO')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 6,
                        rowSpan: 1,
                        children: [
                            new Paragraph('')
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 8,
                        rowSpan: 1,
                        children: [
                            new Paragraph('C. Have you been hospitalized for the past 6 months?')
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun(consultation.hospitalized ? "☑" : "☐"),
                                    new TextRun('YES')
                                ]
                            }),
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph('Hospital:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 4,
                        rowSpan: 1,
                        children: [
                            new Paragraph(consultation.hospital_name??'')
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph('')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph('Attending Physician:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 4,
                        rowSpan: 1,
                        children: [
                            new Paragraph(consultation.attending_physician??'')
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph('')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph('Diagnosis:')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 4,
                        rowSpan: 1,
                        children: [
                            new Paragraph(consultation.diagnosis??'')
                        ]
                    }),
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 2,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun(!consultation.hospitalized ? "☑" : "☐"),
                                    new TextRun('NO')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 6,
                        rowSpan: 1,
                        children: [
                            new Paragraph('')
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 3,
                        rowSpan: 3,
                        verticalAlign: 'bottom',
                        children: [
                            new Paragraph('')
                        ]
                    }),
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "TO BE SIGNED BY STUDENT'S PARENT/GUARDIAN ONLY",
                                        font: 'Arial',
                                        size: 20,
                                        bold: true,
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        children: [
                            new Paragraph('')
                        ]
                    })
                ]
            }),
            // new TableRow({
            //     children: [
            //         new TableCell({
            //             columnSpan: 5,
            //             rowSpan: 2,
            //             children: [
            //                 new Paragraph('')
            //             ]
            //         })
            //     ]
            // }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 3,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun("Student/Employee's Signation")
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 5,
                        rowSpan: 1,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun("Parent/Guardian's Printed Name & Signature")
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
        return rows
    }

    const formattedDate = (createdAt: Date | null) => {
        const date = new Date(createdAt??0) 
        // const date = consultation?.createdAt ? new Date(consultation.createdAt) : null;
        const formattedDate = date && !isNaN(date.getTime()) ? date.toISOString().substring(0, 10) : ''
        return formattedDate
    }

    return { exportConsultation, exportMedicalExamination }
}