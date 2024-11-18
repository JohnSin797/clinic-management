import { saveAs } from 'file-saver'
import { Document, Packer, PageOrientation, Table, TableRow, TableCell, HeightRule, Paragraph, TextRun, AlignmentType, WidthType, ImageRun, ITextWrapping } from 'docx'
import formLogo from '@/assets/images/form-logo.png'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

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
    current_illness?: string;
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

export default function Exports() {
    const [formLogo, setFormLogo] = useState<Buffer | null>(null)
    const [phLogo, setPHLogo] = useState<Buffer | null>(null)
    // const [consultation, setConsultation] = useState<ConsultationState>({
    //     patient: null,
    //     address: '',
    //     father_name: '',
    //     father_birthdate: new Date(),
    //     father_occupation: '',
    //     mother_name: '',
    //     mother_birthdate: new Date(),
    //     mother_occupation: '',
    //     height: '',
    //     weight: '',
    //     person_to_be_notified: '',
    //     emergency_contact: '',
    //     other_person_name: '',
    //     other_person_contact: '',
    //     relation: '',
    //     food_allergy: [''],
    //     medicine_allergy: [''],
    //     other_allergy: [''],
    //     asthma_history: null,
    //     illness_history: [],
    //     person_with_disability: [],
    //     current_illness: '',
    //     surgical_operation: null,
    //     operation_date: new Date(),
    //     operation_type: '',
    //     operation_hospital: '',
    //     hospitalized: null,
    //     hospital_name: '',
    //     attending_physician: '',
    //     diagnosis: '',
    //     createdAt: null,
    // })

    const exportConsultation = async (consultation: ConsultationState) => {
        let header: TableRow[] = []
        await addHeader()
        .then(response => {
            if (response)
            header = response 
        })
        // await getConsultation(id)
        // if (!consultation) {
        //     console.log("Consultation data is missing.")
        //     return; // Exit if consultation data is not available
        // }
            const body = addBody(consultation)
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
                saveAs(blob, 'test.docx')
            })
    }

    // const getConsultation = async (id: string) => {
    //     try {
    //         const response = await axios.get(`/api/consultation?consultation_id=${id}`)
    //         const con = response.data?.consultation
    //         if (con) {
    //             console.log(con)
    //             setConsultation(con)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

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

    const addHeader = async () => {
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

    const addBody = (consultation: ConsultationState) => {
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
                                        text: 'Course/Designation: '+consultation?.patient?.course,
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
                        columnSpan: 2,
                        rowSpan: 1,
                        verticalAlign: AlignmentType.CENTER,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: consultation?.patient?.last_name,
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
                        columnSpan: 1,
                        rowSpan: 1,
                        verticalAlign: AlignmentType.CENTER,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: consultation?.patient?.first_name,
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
                        verticalAlign: AlignmentType.CENTER,
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: consultation?.patient?.middle_name,
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
                                        text: consultation?.patient?.extension,
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
                                        text: new Date(consultation.patient?.birthdate ?? '').toISOString().substring(0, 10),
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
                                    (consultation.patient?.sex == 'male' ? 
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
                                    (consultation.patient?.sex == 'female' ? 
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
                            new Paragraph((new Date().getFullYear() - new Date(consultation.patient?.birthdate??'').getFullYear()).toString())
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
                            new Paragraph(consultation.patient?.nationality??'')
                        ]
                    })
                ]
            }),
        ]
        return rows
    }

    const formattedDate = (createdAt: Date | null) => {
        const date = new Date(createdAt??0) 
        // const date = consultation?.createdAt ? new Date(consultation.createdAt) : null;
        const formattedDate = date && !isNaN(date.getTime()) ? date.toISOString().substring(0, 10) : ''
        return formattedDate
    }

    return { exportConsultation }
}