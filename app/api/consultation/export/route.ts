import fs from 'fs'
import path from 'path'
import Docxtemplater from 'docxtemplater'
import pizzip from 'pizzip'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
    try {
        // const {
        //     first_name
        // } = await request.json();
        const templatePath = path.join(process.cwd(), 'assets', 'templates', 'consultation.docx');
        const templateContent = fs.readFileSync(templatePath, 'binary');
        const zip = new pizzip(templateContent);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });
        doc.render();

        const buffer = doc.getZip().generate({ type: 'nodebuffer' });

        const response = new NextResponse(buffer, {
            status: 200,
            headers: {
              'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'Content-Disposition': `attachment; filename=${'test'}_document.docx`,
            },
        });

        return response;
    } catch (error: unknown) {
        let message = '';
        if (error instanceof Error) {
            message = error.message;
        }
        return new NextResponse('Error: ' + message, {status: 500});
    }
}