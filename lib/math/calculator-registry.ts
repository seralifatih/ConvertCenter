export type MathFieldType = "number" | "text" | "number-list";

export type MathFieldConstraint = {
  allowNegative?: boolean;
  allowZero?: boolean;
  max?: number;
  min?: number;
};

export interface MathFieldDef {
  constraints?: MathFieldConstraint;
  defaultValue?: string | number;
  helpText?: string;
  id: string;
  label: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  type: MathFieldType;
  width?: "full" | "half" | "third";
}

export interface MathResultDef {
  copyable?: boolean;
  formatOptions?: {
    currency?: string;
    maximumFractionDigits?: number;
    prefix?: string;
    style?: "currency" | "decimal" | "percent" | "unit";
    suffix?: string;
  };
  id: string;
  label: string;
  type: "number" | "text";
}

export interface MathCalculatorVariant {
  calculate: (inputs: Record<string, string | number>) => Record<string, number | string>;
  description?: string;
  fields: readonly MathFieldDef[];
  id: string;
  label: string;
  outputs: readonly MathResultDef[];
  validate?: (inputs: Record<string, string | number>) => string | null;
}

export interface MathCalculatorDef {
  description: string;
  id: string;
  title: string;
  variants: readonly MathCalculatorVariant[];
}

export function parseNumberList(input: string): number[] {
  if (!input.trim()) {
    return [];
  }

  return input
    .split(/[\n,]+/)
    .map((value) => Number.parseFloat(value.trim()))
    .filter((value) => Number.isFinite(value));
}

function gcd(a: number, b: number) {
  let left = Math.abs(Math.trunc(a));
  let right = Math.abs(Math.trunc(b));

  while (right !== 0) {
    const next = right;
    right = left % right;
    left = next;
  }

  return left;
}

function readNumberInput(value: string | number) {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

export function calculateAmortizedPayment(
  principal: number,
  annualRate: number,
  years: number,
) {
  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(years) ||
    principal <= 0 ||
    annualRate < 0 ||
    years <= 0
  ) {
    return null;
  }

  const monthlyRate = annualRate / 100 / 12;
  const paymentCount = years * 12;

  if (monthlyRate === 0) {
    return principal / paymentCount;
  }

  return (
    (principal * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -paymentCount))
  );
}

export function calculateSimpleInterest(
  principal: number,
  annualRate: number,
  years: number,
) {
  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(years) ||
    principal < 0 ||
    annualRate < 0 ||
    years < 0
  ) {
    return null;
  }

  const interest = principal * (annualRate / 100) * years;

  return {
    interest,
    total: principal + interest,
  };
}

export function calculateCompoundInterest(
  principal: number,
  annualRate: number,
  years: number,
  compoundsPerYear: number,
) {
  if (
    !Number.isFinite(principal) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(years) ||
    !Number.isFinite(compoundsPerYear) ||
    principal < 0 ||
    annualRate < 0 ||
    years < 0 ||
    compoundsPerYear <= 0
  ) {
    return null;
  }

  const futureValue =
    principal *
    Math.pow(1 + annualRate / 100 / compoundsPerYear, compoundsPerYear * years);

  return {
    futureValue,
    interestEarned: futureValue - principal,
  };
}

export function calculateSavingsBalance(
  initialDeposit: number,
  monthlyContribution: number,
  annualRate: number,
  years: number,
) {
  if (
    !Number.isFinite(initialDeposit) ||
    !Number.isFinite(monthlyContribution) ||
    !Number.isFinite(annualRate) ||
    !Number.isFinite(years) ||
    initialDeposit < 0 ||
    monthlyContribution < 0 ||
    annualRate < 0 ||
    years < 0
  ) {
    return null;
  }

  const monthCount = years * 12;
  const monthlyRate = annualRate / 100 / 12;

  const futureInitial = initialDeposit * Math.pow(1 + monthlyRate, monthCount);
  const futureContributions =
    monthlyRate === 0
      ? monthlyContribution * monthCount
      : monthlyContribution * ((Math.pow(1 + monthlyRate, monthCount) - 1) / monthlyRate);

  const futureValue = futureInitial + futureContributions;
  const totalContributions = initialDeposit + monthlyContribution * monthCount;

  return {
    futureValue,
    interestEarned: futureValue - totalContributions,
    totalContributions,
  };
}

export function calculateMolarityFromMoles(moles: number, volumeLiters: number) {
  if (
    !Number.isFinite(moles) ||
    !Number.isFinite(volumeLiters) ||
    moles < 0 ||
    volumeLiters <= 0
  ) {
    return null;
  }

  const molarity = moles / volumeLiters;

  return {
    millimolar: molarity * 1000,
    molarity,
  };
}

export function calculateMolarityFromMass(
  massGrams: number,
  molarMass: number,
  volumeLiters: number,
) {
  if (
    !Number.isFinite(massGrams) ||
    !Number.isFinite(molarMass) ||
    !Number.isFinite(volumeLiters) ||
    massGrams < 0 ||
    molarMass <= 0 ||
    volumeLiters <= 0
  ) {
    return null;
  }

  const moles = massGrams / molarMass;
  const molarity = moles / volumeLiters;

  return {
    moles,
    molarity,
  };
}

function classifySolutionByPh(ph: number) {
  if (Math.abs(ph - 7) < 1e-9) {
    return "Neutral";
  }

  return ph < 7 ? "Acidic" : "Basic";
}

export function calculatePhFromHydrogen(hydrogenConcentration: number) {
  if (!Number.isFinite(hydrogenConcentration) || hydrogenConcentration <= 0) {
    return null;
  }

  const ph = -Math.log10(hydrogenConcentration);
  const poh = 14 - ph;

  return {
    classification: classifySolutionByPh(ph),
    ph,
    poh,
  };
}

export function calculatePhFromHydroxide(hydroxideConcentration: number) {
  if (!Number.isFinite(hydroxideConcentration) || hydroxideConcentration <= 0) {
    return null;
  }

  const poh = -Math.log10(hydroxideConcentration);
  const ph = 14 - poh;

  return {
    classification: classifySolutionByPh(ph),
    ph,
    poh,
  };
}

const percentageCalculator: MathCalculatorDef = {
  description: "Calculate percentages, percent-of values, and changes.",
  id: "percentage",
  title: "Percentage Calculator",
  variants: [
    {
      calculate: ({ number, percent }) => ({
        result: (readNumberInput(percent) / 100) * readNumberInput(number),
      }),
      description: "Find x% of y.",
      fields: [
        {
          defaultValue: 25,
          id: "percent",
          label: "Percentage",
          suffix: "%",
          type: "number",
          width: "half",
        },
        {
          defaultValue: 200,
          id: "number",
          label: "Number",
          type: "number",
          width: "half",
        },
      ],
      id: "percent-of",
      label: "Find Percent Of",
      outputs: [{ id: "result", label: "Result", type: "number" }],
    },
    {
      calculate: ({ part, whole }) => ({
        result: (readNumberInput(part) / readNumberInput(whole)) * 100,
      }),
      description: "Find what percent one value is of another.",
      fields: [
        { defaultValue: 45, id: "part", label: "Part", type: "number", width: "half" },
        {
          constraints: { allowZero: false },
          defaultValue: 60,
          id: "whole",
          label: "Whole",
          type: "number",
          width: "half",
        },
      ],
      id: "what-percent",
      label: "What Percent Is",
      outputs: [
        {
          formatOptions: { maximumFractionDigits: 2, style: "percent" },
          id: "result",
          label: "Percentage",
          type: "number",
        },
      ],
    },
    {
      calculate: ({ number, percent }) => ({
        result: readNumberInput(number) * (1 + readNumberInput(percent) / 100),
      }),
      description: "Increase a starting value by a percentage.",
      fields: [
        { defaultValue: 200, id: "number", label: "Start Value", type: "number", width: "half" },
        {
          defaultValue: 15,
          id: "percent",
          label: "Increase",
          suffix: "%",
          type: "number",
          width: "half",
        },
      ],
      id: "increase-by",
      label: "Increase By %",
      outputs: [{ id: "result", label: "New Value", type: "number" }],
    },
    {
      calculate: ({ number, percent }) => ({
        result: readNumberInput(number) * (1 - readNumberInput(percent) / 100),
      }),
      description: "Decrease a starting value by a percentage.",
      fields: [
        { defaultValue: 200, id: "number", label: "Start Value", type: "number", width: "half" },
        {
          defaultValue: 15,
          id: "percent",
          label: "Decrease",
          suffix: "%",
          type: "number",
          width: "half",
        },
      ],
      id: "decrease-by",
      label: "Decrease By %",
      outputs: [{ id: "result", label: "New Value", type: "number" }],
    },
  ],
};

const percentageChangeCalculator: MathCalculatorDef = {
  description: "Calculate the percent difference between two values.",
  id: "percentage-change",
  title: "Percentage Change Calculator",
  variants: [
    {
      calculate: ({ newVal, oldVal }) => {
        const oldNumber = readNumberInput(oldVal);
        const newNumber = readNumberInput(newVal);
        const difference = newNumber - oldNumber;
        const percentChange = (difference / oldNumber) * 100;

        return {
          difference,
          percentChange,
          type:
            percentChange > 0
              ? "Increase"
              : percentChange < 0
                ? "Decrease"
                : "No change",
        };
      },
      fields: [
        {
          constraints: { allowZero: false },
          defaultValue: 100,
          id: "oldVal",
          label: "Old Value",
          type: "number",
          width: "half",
        },
        {
          defaultValue: 120,
          id: "newVal",
          label: "New Value",
          type: "number",
          width: "half",
        },
      ],
      id: "default",
      label: "Percentage Change",
      outputs: [
        {
          formatOptions: { maximumFractionDigits: 2, style: "percent" },
          id: "percentChange",
          label: "Change",
          type: "number",
        },
        { id: "difference", label: "Difference", type: "number" },
        { copyable: false, id: "type", label: "Result Type", type: "text" },
      ],
    },
  ],
};

const averageCalculator: MathCalculatorDef = {
  description: "Calculate the mean of a list of numbers.",
  id: "average",
  title: "Average Calculator",
  variants: [
    {
      calculate: ({ values }) => {
        const list = parseNumberList(String(values));
        const sum = list.reduce((total, value) => total + value, 0);

        return {
          count: list.length,
          mean: list.length ? sum / list.length : 0,
          sum,
        };
      },
      fields: [
        {
          defaultValue: "10, 20, 30, 40",
          id: "values",
          label: "Numbers",
          placeholder: "10, 20, 30, 40",
          type: "number-list",
        },
      ],
      id: "mean",
      label: "Average",
      outputs: [
        {
          formatOptions: { maximumFractionDigits: 4 },
          id: "mean",
          label: "Average",
          type: "number",
        },
        { copyable: false, id: "count", label: "Count", type: "number" },
        { copyable: false, id: "sum", label: "Sum", type: "number" },
      ],
    },
  ],
};

const ratioCalculator: MathCalculatorDef = {
  description: "Simplify ratios or solve proportions.",
  id: "ratio",
  title: "Ratio Calculator",
  variants: [
    {
      calculate: ({ a, b }) => {
        const left = Math.trunc(readNumberInput(a));
        const right = Math.trunc(readNumberInput(b));
        const divisor = gcd(left, right);

        return {
          ratio: `${left / divisor} : ${right / divisor}`,
        };
      },
      fields: [
        {
          constraints: { allowZero: false },
          defaultValue: 4,
          id: "a",
          label: "Left",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowZero: false },
          defaultValue: 8,
          id: "b",
          label: "Right",
          type: "number",
          width: "half",
        },
      ],
      id: "simplify",
      label: "Simplify Ratio",
      outputs: [{ id: "ratio", label: "Simplified Ratio", type: "text" }],
    },
    {
      calculate: ({ a, b, c }) => ({
        x: (readNumberInput(b) * readNumberInput(c)) / readNumberInput(a),
      }),
      description: "Solve a:b = c:x by cross multiplication.",
      fields: [
        {
          constraints: { allowZero: false },
          defaultValue: 2,
          id: "a",
          label: "A",
          type: "number",
          width: "third",
        },
        { defaultValue: 5, id: "b", label: "B", type: "number", width: "third" },
        { defaultValue: 8, id: "c", label: "C", type: "number", width: "third" },
      ],
      id: "proportion",
      label: "Solve Proportion",
      outputs: [
        {
          formatOptions: { maximumFractionDigits: 4 },
          id: "x",
          label: "Result (x)",
          type: "number",
        },
      ],
    },
  ],
};

const loanCalculator: MathCalculatorDef = {
  description: "Estimate amortized loan payments, total repayment, and total interest.",
  id: "loan",
  title: "Loan Calculator",
  variants: [
    {
      calculate: ({ annualRate, principal, years }) => {
        const principalNumber = readNumberInput(principal);
        const annualRateNumber = readNumberInput(annualRate);
        const yearsNumber = readNumberInput(years);
        const monthlyPayment =
          calculateAmortizedPayment(principalNumber, annualRateNumber, yearsNumber) ?? 0;
        const totalPayment = monthlyPayment * yearsNumber * 12;

        return {
          monthlyPayment,
          totalInterest: totalPayment - principalNumber,
          totalPayment,
        };
      },
      description:
        "Use a fixed-rate loan formula to estimate the monthly payment and overall borrowing cost.",
      fields: [
        {
          constraints: { allowZero: false, min: 0 },
          defaultValue: 25000,
          id: "principal",
          label: "Loan Amount",
          prefix: "$",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 7.25,
          id: "annualRate",
          label: "Annual Interest Rate",
          suffix: "%",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowZero: false, min: 0 },
          defaultValue: 5,
          id: "years",
          label: "Loan Term",
          suffix: "years",
          type: "number",
          width: "half",
        },
      ],
      id: "amortized",
      label: "Fixed Loan",
      outputs: [
        {
          formatOptions: { currency: "USD", maximumFractionDigits: 2, style: "currency" },
          id: "monthlyPayment",
          label: "Monthly Payment",
          type: "number",
        },
        {
          formatOptions: { currency: "USD", maximumFractionDigits: 2, style: "currency" },
          id: "totalPayment",
          label: "Total Repayment",
          type: "number",
        },
        {
          formatOptions: { currency: "USD", maximumFractionDigits: 2, style: "currency" },
          id: "totalInterest",
          label: "Total Interest",
          type: "number",
        },
      ],
    },
  ],
};

const simpleInterestCalculator: MathCalculatorDef = {
  description: "Calculate simple interest from principal, annual rate, and time.",
  id: "simple-interest",
  title: "Simple Interest Calculator",
  variants: [
    {
      calculate: ({ annualRate, principal, years }) => {
        const result =
          calculateSimpleInterest(
            readNumberInput(principal),
            readNumberInput(annualRate),
            readNumberInput(years),
          ) ?? { interest: 0, total: 0 };

        return result;
      },
      description: "Simple interest grows linearly over time, using principal x rate x time.",
      fields: [
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 5000,
          id: "principal",
          label: "Principal",
          prefix: "$",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 6,
          id: "annualRate",
          label: "Annual Interest Rate",
          suffix: "%",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 3,
          id: "years",
          label: "Time",
          suffix: "years",
          type: "number",
          width: "half",
        },
      ],
      id: "default",
      label: "Simple Interest",
      outputs: [
        {
          formatOptions: { currency: "USD", maximumFractionDigits: 2, style: "currency" },
          id: "interest",
          label: "Interest Earned",
          type: "number",
        },
        {
          formatOptions: { currency: "USD", maximumFractionDigits: 2, style: "currency" },
          id: "total",
          label: "Ending Amount",
          type: "number",
        },
      ],
    },
  ],
};

const compoundInterestCalculator: MathCalculatorDef = {
  description: "Estimate compound growth using principal, rate, time, and compounding frequency.",
  id: "compound-interest",
  title: "Compound Interest Calculator",
  variants: [
    {
      calculate: ({ annualRate, compoundsPerYear, principal, years }) => {
        const result =
          calculateCompoundInterest(
            readNumberInput(principal),
            readNumberInput(annualRate),
            readNumberInput(years),
            readNumberInput(compoundsPerYear),
          ) ?? { futureValue: 0, interestEarned: 0 };

        return result;
      },
      description:
        "Compound interest reinvests growth into the balance each compounding period.",
      fields: [
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 10000,
          id: "principal",
          label: "Starting Principal",
          prefix: "$",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 7,
          id: "annualRate",
          label: "Annual Interest Rate",
          suffix: "%",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowNegative: false, allowZero: false, min: 1 },
          defaultValue: 12,
          helpText: "12 for monthly, 4 for quarterly, 1 for annual compounding.",
          id: "compoundsPerYear",
          label: "Compounds Per Year",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 10,
          id: "years",
          label: "Time",
          suffix: "years",
          type: "number",
          width: "half",
        },
      ],
      id: "default",
      label: "Compound Interest",
      outputs: [
        {
          formatOptions: { currency: "USD", maximumFractionDigits: 2, style: "currency" },
          id: "futureValue",
          label: "Future Value",
          type: "number",
        },
        {
          formatOptions: { currency: "USD", maximumFractionDigits: 2, style: "currency" },
          id: "interestEarned",
          label: "Interest Earned",
          type: "number",
        },
      ],
    },
  ],
};

const mortgageCalculator: MathCalculatorDef = {
  description:
    "Estimate mortgage borrowing, monthly housing cost, and total interest from common home-buying inputs.",
  id: "mortgage",
  title: "Mortgage Calculator",
  variants: [
    {
      calculate: ({
        annualInsurance,
        annualPropertyTax,
        annualRate,
        downPayment,
        homePrice,
        years,
      }) => {
        const homePriceNumber = readNumberInput(homePrice);
        const downPaymentNumber = readNumberInput(downPayment);
        const loanAmount = homePriceNumber - downPaymentNumber;
        const annualRateNumber = readNumberInput(annualRate);
        const yearsNumber = readNumberInput(years);
        const monthlyPrincipalAndInterest =
          calculateAmortizedPayment(loanAmount, annualRateNumber, yearsNumber) ?? 0;
        const estimatedMonthlyPayment =
          monthlyPrincipalAndInterest +
          readNumberInput(annualPropertyTax) / 12 +
          readNumberInput(annualInsurance) / 12;
        const totalInterest = monthlyPrincipalAndInterest * yearsNumber * 12 - loanAmount;

        return {
          estimatedMonthlyPayment,
          loanAmount,
          monthlyPrincipalAndInterest,
          totalInterest,
        };
      },
      description:
        "Start with home price and down payment, then add rate, taxes, and insurance for a more realistic monthly estimate.",
      fields: [
        {
          constraints: { allowNegative: false, allowZero: false, min: 0 },
          defaultValue: 400000,
          id: "homePrice",
          label: "Home Price",
          prefix: "$",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 80000,
          id: "downPayment",
          label: "Down Payment",
          prefix: "$",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 6.5,
          id: "annualRate",
          label: "Annual Interest Rate",
          suffix: "%",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowNegative: false, allowZero: false, min: 1 },
          defaultValue: 30,
          id: "years",
          label: "Mortgage Term",
          suffix: "years",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 4800,
          id: "annualPropertyTax",
          label: "Annual Property Tax",
          prefix: "$",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 1800,
          id: "annualInsurance",
          label: "Annual Home Insurance",
          prefix: "$",
          type: "number",
          width: "half",
        },
      ],
      id: "default",
      label: "Mortgage Estimate",
      outputs: [
        {
          formatOptions: { currency: "USD", maximumFractionDigits: 2, style: "currency" },
          id: "loanAmount",
          label: "Loan Amount",
          type: "number",
        },
        {
          formatOptions: { currency: "USD", maximumFractionDigits: 2, style: "currency" },
          id: "monthlyPrincipalAndInterest",
          label: "Monthly Principal + Interest",
          type: "number",
        },
        {
          formatOptions: { currency: "USD", maximumFractionDigits: 2, style: "currency" },
          id: "estimatedMonthlyPayment",
          label: "Estimated Monthly Housing Cost",
          type: "number",
        },
        {
          formatOptions: { currency: "USD", maximumFractionDigits: 2, style: "currency" },
          id: "totalInterest",
          label: "Total Interest",
          type: "number",
        },
      ],
      validate: ({ downPayment, homePrice }) =>
        readNumberInput(downPayment) >= readNumberInput(homePrice)
          ? "Down payment must be smaller than the home price."
          : null,
    },
  ],
};

const savingsCalculator: MathCalculatorDef = {
  description:
    "Project savings growth from an initial deposit, monthly contributions, rate, and time.",
  id: "savings",
  title: "Savings Calculator",
  variants: [
    {
      calculate: ({ annualRate, initialDeposit, monthlyContribution, years }) => {
        const result =
          calculateSavingsBalance(
            readNumberInput(initialDeposit),
            readNumberInput(monthlyContribution),
            readNumberInput(annualRate),
            readNumberInput(years),
          ) ?? { futureValue: 0, interestEarned: 0, totalContributions: 0 };

        return result;
      },
      description: "Estimate how a balance can grow when you keep adding to it over time.",
      fields: [
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 5000,
          id: "initialDeposit",
          label: "Initial Deposit",
          prefix: "$",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 300,
          id: "monthlyContribution",
          label: "Monthly Contribution",
          prefix: "$",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 4.5,
          id: "annualRate",
          label: "Annual Return Rate",
          suffix: "%",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 10,
          id: "years",
          label: "Time",
          suffix: "years",
          type: "number",
          width: "half",
        },
      ],
      id: "default",
      label: "Savings Growth",
      outputs: [
        {
          formatOptions: { currency: "USD", maximumFractionDigits: 2, style: "currency" },
          id: "futureValue",
          label: "Estimated Balance",
          type: "number",
        },
        {
          formatOptions: { currency: "USD", maximumFractionDigits: 2, style: "currency" },
          id: "totalContributions",
          label: "Total Contributions",
          type: "number",
        },
        {
          formatOptions: { currency: "USD", maximumFractionDigits: 2, style: "currency" },
          id: "interestEarned",
          label: "Growth Earned",
          type: "number",
        },
      ],
    },
  ],
};

const molarityCalculator: MathCalculatorDef = {
  description:
    "Calculate molarity from moles and volume, or from mass, molar mass, and solution volume.",
  id: "molarity",
  title: "Molarity Calculator",
  variants: [
    {
      calculate: ({ moles, volumeLiters }) => {
        const result =
          calculateMolarityFromMoles(readNumberInput(moles), readNumberInput(volumeLiters)) ?? {
            millimolar: 0,
            molarity: 0,
          };

        return result;
      },
      description:
        "Use the direct molarity formula when you already know moles of solute and total solution volume.",
      fields: [
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 0.25,
          id: "moles",
          label: "Moles of Solute",
          suffix: "mol",
          type: "number",
          width: "half",
        },
        {
          constraints: { allowNegative: false, allowZero: false, min: 0 },
          defaultValue: 0.5,
          id: "volumeLiters",
          label: "Solution Volume",
          suffix: "L",
          type: "number",
          width: "half",
        },
      ],
      id: "from-moles",
      label: "From Moles + Volume",
      outputs: [
        {
          formatOptions: { maximumFractionDigits: 4, style: "unit", suffix: " M" },
          id: "molarity",
          label: "Molarity",
          type: "number",
        },
        {
          formatOptions: { maximumFractionDigits: 2, style: "unit", suffix: " mM" },
          id: "millimolar",
          label: "Millimolar",
          type: "number",
        },
      ],
    },
    {
      calculate: ({ massGrams, molarMass, volumeLiters }) => {
        const result =
          calculateMolarityFromMass(
            readNumberInput(massGrams),
            readNumberInput(molarMass),
            readNumberInput(volumeLiters),
          ) ?? { moles: 0, molarity: 0 };

        return result;
      },
      description:
        "Start from mass and molar mass when the solute amount is known in grams rather than moles.",
      fields: [
        {
          constraints: { allowNegative: false, min: 0 },
          defaultValue: 58.44,
          id: "massGrams",
          label: "Solute Mass",
          suffix: "g",
          type: "number",
          width: "third",
        },
        {
          constraints: { allowNegative: false, allowZero: false, min: 0 },
          defaultValue: 58.44,
          id: "molarMass",
          label: "Molar Mass",
          suffix: "g/mol",
          type: "number",
          width: "third",
        },
        {
          constraints: { allowNegative: false, allowZero: false, min: 0 },
          defaultValue: 1,
          id: "volumeLiters",
          label: "Solution Volume",
          suffix: "L",
          type: "number",
          width: "third",
        },
      ],
      id: "from-mass",
      label: "From Mass + Molar Mass",
      outputs: [
        {
          formatOptions: { maximumFractionDigits: 4, style: "unit", suffix: " mol" },
          id: "moles",
          label: "Moles",
          type: "number",
        },
        {
          formatOptions: { maximumFractionDigits: 4, style: "unit", suffix: " M" },
          id: "molarity",
          label: "Molarity",
          type: "number",
        },
      ],
    },
  ],
};

const phCalculator: MathCalculatorDef = {
  description: "Calculate pH and pOH from hydrogen-ion or hydroxide-ion concentration.",
  id: "ph",
  title: "pH Calculator",
  variants: [
    {
      calculate: ({ hydrogenConcentration }) => {
        const result =
          calculatePhFromHydrogen(readNumberInput(hydrogenConcentration)) ?? {
            classification: "Neutral",
            ph: 0,
            poh: 0,
          };

        return result;
      },
      description: "Use pH = -log10[H+] when the hydrogen-ion concentration is known.",
      fields: [
        {
          constraints: { allowNegative: false, allowZero: false, min: 0 },
          defaultValue: 1e-7,
          helpText: "Concentration in moles per liter, such as 1e-7 for neutral water.",
          id: "hydrogenConcentration",
          label: "[H+] Concentration",
          suffix: "mol/L",
          type: "number",
        },
      ],
      id: "from-hydrogen",
      label: "From [H+]",
      outputs: [
        {
          formatOptions: { maximumFractionDigits: 4 },
          id: "ph",
          label: "pH",
          type: "number",
        },
        {
          formatOptions: { maximumFractionDigits: 4 },
          id: "poh",
          label: "pOH",
          type: "number",
        },
        { copyable: false, id: "classification", label: "Solution Type", type: "text" },
      ],
    },
    {
      calculate: ({ hydroxideConcentration }) => {
        const result =
          calculatePhFromHydroxide(readNumberInput(hydroxideConcentration)) ?? {
            classification: "Neutral",
            ph: 0,
            poh: 0,
          };

        return result;
      },
      description: "Use pOH = -log10[OH-] first when hydroxide concentration is the known value.",
      fields: [
        {
          constraints: { allowNegative: false, allowZero: false, min: 0 },
          defaultValue: 1e-7,
          helpText: "Concentration in moles per liter, such as 1e-7 for neutral water.",
          id: "hydroxideConcentration",
          label: "[OH-] Concentration",
          suffix: "mol/L",
          type: "number",
        },
      ],
      id: "from-hydroxide",
      label: "From [OH-]",
      outputs: [
        {
          formatOptions: { maximumFractionDigits: 4 },
          id: "ph",
          label: "pH",
          type: "number",
        },
        {
          formatOptions: { maximumFractionDigits: 4 },
          id: "poh",
          label: "pOH",
          type: "number",
        },
        { copyable: false, id: "classification", label: "Solution Type", type: "text" },
      ],
    },
  ],
};

export const calculatorRegistry: Record<string, MathCalculatorDef> = {
  [percentageCalculator.id]: percentageCalculator,
  [percentageChangeCalculator.id]: percentageChangeCalculator,
  [averageCalculator.id]: averageCalculator,
  [ratioCalculator.id]: ratioCalculator,
  [loanCalculator.id]: loanCalculator,
  [simpleInterestCalculator.id]: simpleInterestCalculator,
  [compoundInterestCalculator.id]: compoundInterestCalculator,
  [mortgageCalculator.id]: mortgageCalculator,
  [savingsCalculator.id]: savingsCalculator,
  [molarityCalculator.id]: molarityCalculator,
  [phCalculator.id]: phCalculator,
};

export function getCalculatorDef(id: string) {
  return calculatorRegistry[id];
}

export function getAllCalculatorIds() {
  return Object.keys(calculatorRegistry);
}
