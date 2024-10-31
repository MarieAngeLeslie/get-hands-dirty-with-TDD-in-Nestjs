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

        if (this.endTimeIsInNextDay(appointmentData)) {
            throw new Error("appointment's endTime should be in the same day as start time's")
        }

        return {
            ...appointmentData,
            confirmed: false
        };
    }

    private endTimeIsInNextDay(appointmentData: AppointmentInput) {
        const differentDays =
            appointmentData.endTime.getUTCDate() !==
            appointmentData.startTime.getUTCDate()

        const differentMonths =
            appointmentData.endTime.getUTCMonth() !==
            appointmentData.startTime.getUTCMonth()

        const differentYears =
            appointmentData.endTime.getUTCFullYear() !==
            appointmentData.startTime.getUTCFullYear()

        return differentDays || differentMonths || differentYears
    }
}
