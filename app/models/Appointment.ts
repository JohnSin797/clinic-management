import { Schema, model, models } from "mongoose";
// import Patient from "./Patient";

interface IAppointment extends Document {
    patient: string;
    schedule: Date;
    consultation_type: string;
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date; 
}

const appointmentSchema = new Schema<IAppointment>(
    {
        patient: {
            type: String,
            required: true,
            ref: 'Patient',
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