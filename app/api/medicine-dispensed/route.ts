import connect from "@/lib/connect";
import MedicineDispensed from "@/app/models/MedicineDispensed";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connect();
        const dispensed = await MedicineDispensed.find({ deletedAt: null }).sort({ createdAt: -1 });
        return new NextResponse(JSON.stringify({message: 'OK', dispensed: dispensed}), {status: 200});
    } catch (error: unknown) {
        let message = '';
        if (error instanceof Error) {
            message = error.message;
        }
        return new NextResponse('Error: ' + message, {status: 500});
    }
}

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        await connect();
        const result = await MedicineDispensed.create(body);
        if (!result) {
            return new NextResponse(JSON.stringify({message: 'Failed to dispense medicine'}), {status: 400});
        }
        return new NextResponse(JSON.stringify({message: 'OK'}), {status: 200});
    } catch (error: unknown) {
        let message = '';
        if (error instanceof Error) {
            message = error.message;
        }
        return new NextResponse('Error: ' + message, {status: 500});
    }
}

export const PATCH = async (request: Request) => {
    try {

    } catch (error: unknown) {
        let message = '';
        if (error instanceof Error) {
            message = error.message;
        }
        return new NextResponse('Error: ' + message, {status: 500});
    }
}