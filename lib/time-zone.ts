const FALLBACK_TIME_ZONES = [
  "UTC",
  "Europe/London",
  "Europe/Paris",
  "Europe/Istanbul",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
] as const;

type LocalDateParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

function getFormatter(timeZone: string, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    ...options,
  });
}

function partsToObject(parts: Intl.DateTimeFormatPart[]) {
  return Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  ) as Record<string, number>;
}

export function getTimeZoneOptions() {
  if (typeof Intl.supportedValuesOf === "function") {
    return Intl.supportedValuesOf("timeZone");
  }

  return [...FALLBACK_TIME_ZONES];
}

export function getCurrentDatePartsInTimeZone(timeZone: string) {
  const parts = partsToObject(getFormatter(timeZone).formatToParts(new Date()));

  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
  };
}

export function parseTimeInput(timeValue: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(timeValue.trim());

  if (!match) {
    return null;
  }

  const hour = Number(match[1]);
  const minute = Number(match[2]);

  if (hour > 23 || minute > 59) {
    return null;
  }

  return { hour, minute };
}

function getLocalPartsForInstant(date: Date, timeZone: string): LocalDateParts {
  const parts = partsToObject(getFormatter(timeZone).formatToParts(date));

  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour,
    minute: parts.minute,
  };
}

function partsToUtcMinutes(parts: LocalDateParts) {
  return Math.floor(
    Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute) / 60000,
  );
}

export function zonedDateTimeToUtc(parts: LocalDateParts, timeZone: string) {
  let timestamp = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute);

  for (let index = 0; index < 3; index += 1) {
    const observedParts = getLocalPartsForInstant(new Date(timestamp), timeZone);
    const desiredMinutes = partsToUtcMinutes(parts);
    const observedMinutes = partsToUtcMinutes(observedParts);
    const diffMinutes = desiredMinutes - observedMinutes;

    if (diffMinutes === 0) {
      break;
    }

    timestamp += diffMinutes * 60_000;
  }

  return new Date(timestamp);
}

export function convertTimeBetweenZones(
  timeValue: string,
  fromTimeZone: string,
  toTimeZone: string,
) {
  const parsedTime = parseTimeInput(timeValue);

  if (!parsedTime) {
    return null;
  }

  const currentDate = getCurrentDatePartsInTimeZone(fromTimeZone);
  const utcDate = zonedDateTimeToUtc(
    {
      ...currentDate,
      hour: parsedTime.hour,
      minute: parsedTime.minute,
    },
    fromTimeZone,
  );

  if (Number.isNaN(utcDate.getTime())) {
    return null;
  }

  const targetFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: toTimeZone,
    dateStyle: "medium",
    timeStyle: "short",
  });

  const sourceFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: fromTimeZone,
    dateStyle: "medium",
  });

  return {
    convertedDateTime: targetFormatter.format(utcDate),
    sourceDateLabel: sourceFormatter.format(utcDate),
  };
}

