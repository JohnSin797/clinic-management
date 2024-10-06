import { Schema, model, models } from "mongoose";
import Patient from "./Patient"; // eslint-disable-next-line @typescript-eslint/no-unused-vars

interface IAppointment extends Document {
    patient: Schema.Types.ObjectId;
    schedule: Date;
    consultation_type: string;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date; 
}

const appointmentSchema = new Schema<IAppointment>(
    {
        patient: {
            type: Schema.Types.ObjectId,
            ref: 'Patient',
            required: true,
        },
        schedule: {
            type: Date,
            required: true,
        },
        consultation_type: {
            type: String,
            required: true,
        },
        deletedAt: Date,
    },
    {
        timestamps: true
    }
)

const Appointment = models.Appointment || model('Appointment', appointmentSchema);

export default Appointment;