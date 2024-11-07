import { describe, expect, it } from '@jest/globals';
import { CreateAppointment } from './create-appointment';
import { Appointment } from '../entities/appointment';
import { getFutureDate } from '../tests/utils/get-future-date';
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository';

describe('create an appointment', () => {
  it('should be able to create an appointment', async () => {
    const startsAt = getFutureDate('2024-11-06');
    const endsAt = getFutureDate('2024-11-07');

    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
});

describe('create an appointment', () => {
  it('should not be able to create an appointment with overlapping dates', async () => {
    const startsAt = getFutureDate('2024-11-06');
    const endsAt = getFutureDate('2024-11-10');

    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    await createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2024-11-10'),
        endsAt: getFutureDate('2024-11-14'),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2024-11-08'),
        endsAt: getFutureDate('2024-11-12'),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2024-11-08'),
        endsAt: getFutureDate('2024-11-15'),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: 'John Doe',
        startsAt: getFutureDate('2024-11-09'),
        endsAt: getFutureDate('2024-11-12'),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
