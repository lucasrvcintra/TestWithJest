import { setYear, parseISO } from 'date-fns';

// Receives "2024-11-06" and returns "2025-11-06"

export function getFutureDate(date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1);
}
