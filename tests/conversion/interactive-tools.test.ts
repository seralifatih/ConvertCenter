import { describe, expect, it } from "vitest";
import {
  convertMeasurementValue,
  getMeasurementFamily,
} from "../../lib/conversion/measurement-families";
import {
  dbmToWatts,
  voltsToWatts,
  wattsToAmps,
  wattsToDbm,
} from "../../lib/conversion/science";
import {
  getUvRiskLevel,
  isDangerousUvIndex,
} from "../../lib/conversion/uv";

describe("interactive tool formulas", () => {
  it("converts measurement-family values for pressure, torque, and viscosity", () => {
    expect(convertMeasurementValue("pressure:hpa", "pressure:mmhg", 1013.25)).toBeCloseTo(760, 2);
    expect(convertMeasurementValue("pressure:bar", "pressure:psi", 1)).toBeCloseTo(14.5038, 4);
    expect(convertMeasurementValue("torque:nm", "torque:lbft", 100)).toBeCloseTo(73.7562, 4);
    expect(convertMeasurementValue("viscosity:cp", "viscosity:pas", 1000)).toBeCloseTo(1, 6);
  });

  it("keeps family definitions available for multi-unit converters", () => {
    expect(getMeasurementFamily("pressure").units).toHaveLength(4);
    expect(getMeasurementFamily("torque").units).toHaveLength(4);
    expect(getMeasurementFamily("viscosity").units).toHaveLength(4);
  });

  it("calculates watts to amps and volts to watts with optional power factor", () => {
    expect(wattsToAmps(1200, 120)).toBeCloseTo(10, 6);
    expect(wattsToAmps(1000, 120, 0.8)).toBeCloseTo(10.4167, 4);
    expect(voltsToWatts(120, 5)).toBeCloseTo(600, 6);
    expect(voltsToWatts(240, 12, 0.9)).toBeCloseTo(2592, 6);
  });

  it("converts dBm to watts and back for reference values", () => {
    expect(dbmToWatts(30)).toBeCloseTo(1, 8);
    expect(dbmToWatts(20)).toBeCloseTo(0.1, 8);
    expect(wattsToDbm(1)).toBeCloseTo(30, 8);
  });

  it("classifies UV risk levels and dangerous thresholds", () => {
    expect(getUvRiskLevel(2)?.label).toBe("Low");
    expect(getUvRiskLevel(6)?.label).toBe("High");
    expect(getUvRiskLevel(8)?.label).toBe("Very High");
    expect(getUvRiskLevel(11)?.label).toBe("Extreme");
    expect(isDangerousUvIndex(5)).toBe(false);
    expect(isDangerousUvIndex(6)).toBe(true);
  });
});
