import { expect, it } from '@jest/globals';
import { getFutureDate } from './get-future-date';

it('increases date by one year', () => {
  const year = new Date().getFullYear();
  expect(getFutureDate(`${year}-11-06`).getFullYear()).toEqual(2025);
});
