export function wattsToAmps(watts: number, volts: number, powerFactor = 1) {
  if (!Number.isFinite(watts) || !Number.isFinite(volts) || !Number.isFinite(powerFactor)) {
    return null;
  }

  if (volts === 0 || powerFactor === 0) {
    return null;
  }

  return watts / (volts * powerFactor);
}

export function voltsToWatts(volts: number, amps: number, powerFactor = 1) {
  if (!Number.isFinite(volts) || !Number.isFinite(amps) || !Number.isFinite(powerFactor)) {
    return null;
  }

  return volts * amps * powerFactor;
}

export function dbmToWatts(dbm: number) {
  if (!Number.isFinite(dbm)) {
    return null;
  }

  return 10 ** ((dbm - 30) / 10);
}

export function wattsToDbm(watts: number) {
  if (!Number.isFinite(watts) || watts <= 0) {
    return null;
  }

  return 10 * Math.log10(watts) + 30;
}

export function formatScienceNumber(value: number, maximumFractionDigits = 6) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(Number(value.toFixed(maximumFractionDigits)));
}
