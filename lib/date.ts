const MS_PER_DAY = 1000 * 60 * 60 * 24;

export type AgeBreakdown = {
  approxMonths: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  months: number;
  years: number;
};

function parseDateInput(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (!match) {
    return null;
  }

  const [, yearValue, monthValue, dayValue] = match;
  const year = Number(yearValue);
  const month = Number(monthValue) - 1;
  const day = Number(dayValue);
  const date = new Date(Date.UTC(year, month, day));

  if (
    Number.isNaN(date.getTime()) ||
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

function toUtcStartOfToday(referenceDate: Date) {
  return new Date(
    Date.UTC(
      referenceDate.getUTCFullYear(),
      referenceDate.getUTCMonth(),
      referenceDate.getUTCDate(),
    ),
  );
}

function getDaysInMonth(year: number, monthIndex: number) {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

export function calculateAge(
  birthDateInput: string,
  referenceDate = new Date(),
): AgeBreakdown | null {
  const birthDate = parseDateInput(birthDateInput);

  if (!birthDate) {
    return null;
  }

  const today = toUtcStartOfToday(referenceDate);

  if (birthDate.getTime() > today.getTime()) {
    return null;
  }

  const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / MS_PER_DAY);
  let years = today.getUTCFullYear() - birthDate.getUTCFullYear();
  let months = today.getUTCMonth() - birthDate.getUTCMonth();
  let days = today.getUTCDate() - birthDate.getUTCDate();

  if (days < 0) {
    months -= 1;

    const previousMonth =
      today.getUTCMonth() === 0 ? 11 : today.getUTCMonth() - 1;
    const previousMonthYear =
      today.getUTCMonth() === 0 ? today.getUTCFullYear() - 1 : today.getUTCFullYear();

    days += getDaysInMonth(previousMonthYear, previousMonth);
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    approxMonths: Math.floor(totalDays / 30.4375),
    days,
    months,
    totalDays,
    totalWeeks: Math.floor(totalDays / 7),
    years,
  };
}
