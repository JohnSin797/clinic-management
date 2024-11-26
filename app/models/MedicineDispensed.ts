import { Schema, model, models } from "mongoose";

interface IMedicineDispensed extends Document {
    medicine: Schema.Types.ObjectId[];
    record: Schema.Types.ObjectId;
    quantity: number;
    deletedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const medicineDispensedSchema = new Schema<IMedicineDispensed>(
    {
        medicine: {
            type: [Schema.Types.ObjectId],
            ref: 'Medicine',
            required: true,
        },
        record: {
            type: Schema.Types.ObjectId,
            ref: 'MedicalRecord',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

const MedicineDispensed = models.MedicineDispensed || model('MedicineDispensed', medicineDispensedSchema);

export default MedicineDispensed;