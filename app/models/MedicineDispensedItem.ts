import { Schema, model, models } from "mongoose";

interface IMedicineDispensedItem extends Document {
    medicine: Schema.Types.ObjectId;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

const medicineDispensedItemSchema = new Schema<IMedicineDispensedItem>(
    {
        medicine: {
            type: Schema.Types.ObjectId,
            ref: 'Medicine',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const MedicineDispensedItem = models.MedicineDispensedItem || model('MedicineDispensedItem', medicineDispensedItemSchema);

export default MedicineDispensedItem;