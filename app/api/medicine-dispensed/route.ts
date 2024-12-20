import connect from "@/lib/connect";
import MedicineDispensed from "@/app/models/MedicineDispensed";
import MedicineDispensedItem from "@/app/models/MedicineDispensedItem";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const GET = async () => {
    try {
        await connect();
        // const dispensed = await MedicineDispensed.find({ deletedAt: null }).populate('items').populate('record').sort({ createdAt: -1 });
        const dispensed = await MedicineDispensed.aggregate([
            {
                $match: { deletedAt: null },
            },
            {
                $lookup: {
                    from: 'medicinedispenseditems',
                    localField: 'items',
                    foreignField: '_id',
                    as: 'items'
                }
            },
            {
                $unwind: {
                    path: '$items',
                    preserveNullAndEmptyArrays: true
                },
            },
            {
                $lookup: {
                    from: 'medicines',
                    localField: 'items.medicine',
                    foreignField: '_id',
                    as: 'medicine'
                },
            },
            {
                $unwind: {
                    path: '$medicine',
                    preserveNullAndEmptyArrays: true
                },
            },
            {
                $lookup: {
                    from: 'medicalrecords',
                    localField: 'record',
                    foreignField: '_id',
                    as: 'record'
                }
            },
            {
                $unwind: {
                    path: '$record',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    items: [{
                        _id: '$items._id',
                        medicine: {
                            _id: '$medicine._id',
                            medicine_name: '$medicine.medicine_name',
                        },
                        quantity: '$items.quantity',
                    }],
                    record: {
                        _id: '$record._id',
                        consultation_type: '$record.consultation_type'
                    },
                    createdAt: 1,
                }
            }
        ]);
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
        const { medicine, record } = await request.json();
        const itemId = [];
        if (!Types.ObjectId.isValid(record)) {
            return new NextResponse(JSON.stringify({message: 'Invalid record id'}), {status: 400});
        }
        await connect();
        for (let index = 0; index < medicine.length; index++) {
            const temp = await MedicineDispensedItem.create({
                medicine: medicine[index].id,
                quantity: medicine[index].quantity,
            });
            itemId.push(temp?._id);
        }
        const result = await MedicineDispensed.create({
            record: record,
            items: itemId,
        });
        if (!result) {
            return new NextResponse(JSON.stringify({message: 'Failed to dispense medicine'}), {status: 400});
        }
        return new NextResponse(JSON.stringify({message: 'OK', test: result}), {status: 200});
    } catch (error: unknown) {
        let message = '';
        if (error instanceof Error) {
            message = error.message;
        }
        return new NextResponse('Error: ' + message, {status: 500});
    }
}

// export const PATCH = async (request: Request) => {
//     try {

//     } catch (error: unknown) {
//         let message = '';
//         if (error instanceof Error) {
//             message = error.message;
//         }
//         return new NextResponse('Error: ' + message, {status: 500});
//     }
// }