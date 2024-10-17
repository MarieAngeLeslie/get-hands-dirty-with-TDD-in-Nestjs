import { Injectable } from '@nestjs/common';

export interface Appointment {
    patientId: number,
    startTime: Date,
    endTime: Date,
    confirmed: boolean
}

export interface AppointmentInput {
    patientId: number,
    startTime: Date,
    endTime: Date,
}

@Injectable()
export class AppointmentService {
    public scheduleAppointment(appointmentData: AppointmentInput): Appointment {
        if (appointmentData.endTime <= appointmentData.startTime) {
            throw new Error("appointment's endTime should be after startTime")
        }



        return {
            ...appointmentData,
            confirmed: false
        };
    }
}
