import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';

// Accomplish the requirements to schedule an **Appointment,**
/** 
 * Les critères d'acceptance
[x] An unconfirmed schedule should be created on success
[x] The end time should not be before the start time
[x] The end time should be after the start time
[x] An appointment start and end time should be within the same day (NEW)
[ ] The patientId should be validated?
 */

describe('AppointmentService', () => {
  let service: AppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentService],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should schedule an unconfirmed appointment for a user on success', () => {
    const startTime = new Date('2024-10-17T14:00:00Z');
    const endTime = new Date('2024-10-17T18:00:00Z');

    const newAppointment = service.scheduleAppointment({
      patientId: 1,
      startTime,
      endTime
    });

    expect(newAppointment).toEqual({
      patientId: 1,
      startTime,
      endTime,
      confirmed: false
    })

  })


  it('should throw an error when end time is before start time', () => {
    const startTime = new Date('2024-10-17T14:00:00Z');
    const endTime = new Date('2024-10-17T13:00:00Z');

    expect(() => service.scheduleAppointment({
      patientId: 1,
      startTime,
      endTime
    })).toThrow("appointment's endTime should be after startTime")
  })


  it('should throw an error when end time is equal to start time', () => {
    const startTime = new Date('2024-10-17T14:00:00Z');
    const endTime = startTime;

    expect(() => service.scheduleAppointment({
      patientId: 1,
      startTime,
      endTime
    })).toThrow("appointment's endTime should be after startTime")
  })

  it('should throw an error when endTime is not on same date as startTime', () => {
    const startTime = new Date('2024-10-17T14:00:00Z');
    const endTime = new Date('2024-11-10T14:00:00Z');

    expect(() => service.scheduleAppointment({
      patientId: 1,
      startTime,
      endTime
    })).toThrow("appointment's endTime should be in the same day as start time's")
  })

  // we do this because we check early that endTime shouldn't be come the month after
  it('should throw an error when end time is in same day and hour of next month', () => {
    const startTime = new Date('2024-10-31T20:00:00Z');
    const endTime = new Date('2024-11-31T20:00:00Z');

    expect(() => service.scheduleAppointment({
      patientId: 1,
      startTime,
      endTime
    })).toThrow("appointment's endTime should be in the same day as start time's")
  })

  it('should throw an error when end time is in same day and hour and month of next year', () => {
    const startTime = new Date('2024-10-31T20:00:00Z');
    const endTime = new Date('2025-10-31T20:00:00Z');

    expect(() => service.scheduleAppointment({
      patientId: 1,
      startTime,
      endTime
    })).toThrow("appointment's endTime should be in the same day as start time's")
  })

});
