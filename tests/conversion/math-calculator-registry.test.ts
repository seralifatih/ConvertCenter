import { describe, expect, it } from "vitest";
import {
  calculateAmortizedPayment,
  calculateCompoundInterest,
  calculateMolarityFromMass,
  calculateMolarityFromMoles,
  calculatePhFromHydrogen,
  calculatePhFromHydroxide,
  calculateSavingsBalance,
  calculateSimpleInterest,
  getAllCalculatorIds,
  getCalculatorDef,
} from "../../lib/math/calculator-registry";

describe("math calculator registry", () => {
  it("registers the new finance and science calculators in the shared registry", () => {
    expect(getAllCalculatorIds()).toEqual(
      expect.arrayContaining([
        "loan",
        "simple-interest",
        "compound-interest",
        "mortgage",
        "savings",
        "molarity",
        "ph",
      ]),
    );
  });

  it("exposes finance calculators with structured fields and outputs", () => {
    expect(getCalculatorDef("loan")?.variants[0]?.fields.map((field) => field.label)).toEqual([
      "Loan Amount",
      "Annual Interest Rate",
      "Loan Term",
    ]);
    expect(getCalculatorDef("mortgage")?.variants[0]?.outputs.map((output) => output.id)).toEqual([
      "loanAmount",
      "monthlyPrincipalAndInterest",
      "estimatedMonthlyPayment",
      "totalInterest",
    ]);
  });

  it("calculates amortized loan and mortgage-style payments", () => {
    expect(calculateAmortizedPayment(25000, 7.25, 5)).toBeCloseTo(497.984, 3);
    const result = getCalculatorDef("loan")?.variants[0]?.calculate({
      annualRate: 7.25,
      principal: 25000,
      years: 5,
    });

    expect(result?.monthlyPayment).toBeCloseTo(497.984, 3);
    expect(result?.totalInterest).toBeCloseTo(4879.042, 3);
    expect(result?.totalPayment).toBeCloseTo(29879.042, 3);
  });

  it("calculates simple, compound, and savings growth correctly", () => {
    expect(calculateSimpleInterest(5000, 6, 3)).toEqual({
      interest: 900,
      total: 5900,
    });
    const compound = calculateCompoundInterest(10000, 7, 10, 12);
    const savings = calculateSavingsBalance(5000, 300, 4.5, 10);

    expect(compound?.futureValue).toBeCloseTo(20096.6138, 4);
    expect(compound?.interestEarned).toBeCloseTo(10096.6138, 4);
    expect(savings?.futureValue).toBeCloseTo(53194.386, 3);
    expect(savings?.interestEarned).toBeCloseTo(12194.386, 3);
    expect(savings?.totalContributions).toBe(41000);
  });

  it("calculates molarity from both supported chemistry workflows", () => {
    expect(calculateMolarityFromMoles(0.25, 0.5)).toEqual({
      millimolar: 500,
      molarity: 0.5,
    });
    expect(calculateMolarityFromMass(58.44, 58.44, 1)).toEqual({
      moles: 1,
      molarity: 1,
    });
  });

  it("calculates pH and pOH from hydrogen or hydroxide concentration", () => {
    expect(calculatePhFromHydrogen(1e-7)).toEqual({
      classification: "Neutral",
      ph: 7,
      poh: 7,
    });
    expect(calculatePhFromHydroxide(1e-2)).toEqual({
      classification: "Basic",
      ph: 12,
      poh: 2,
    });
  });
});
