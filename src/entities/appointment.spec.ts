import { describe, expect, test } from '@jest/globals';
import { Appointment } from './appointment';
import { getFutureDate } from '../tests/utils/get-future-date';

describe('create an appointment', () => {
  test('should create an appointment', () => {
    const startsAt = getFutureDate('2024-11-06');
    const endsAt = getFutureDate('2024-11-07');

    const appointment = new Appointment({
      customer: 'John Doe',
      startsAt,
      endsAt,
    });

    expect(appointment).toBeInstanceOf(Appointment);
    expect(appointment.customer).toEqual('John Doe');
  });
});

describe('cannot create an appointment', () => {
  test('cannot create an appointment with endsAt before startsAt', () => {
    const startsAt = getFutureDate('2024-11-06');
    const endsAt = getFutureDate('2024-11-05');

    expect(() => {
      return new Appointment({
        customer: 'John Doe',
        startsAt,
        endsAt,
      });
    }).toThrow();
  });
});

describe('cannot create an appointment', () => {
  test('cannot create an appointment with startsAt before now', () => {
    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() - 1);
    endsAt.setDate(endsAt.getDate() + 3);

    expect(() => {
      return new Appointment({
        customer: 'John Doe',
        startsAt,
        endsAt,
      });
    }).toThrow();
  });
});
