import type { FaqEntry, StructuredContent } from "@/lib/config/conversion-registry";
import type { SearchEntry } from "@/lib/search";

export type MathToolWidgetConfig =
  | {
    defaultPrimary: number;
    defaultSecondary: number;
    defaultMode?: "change" | "percentOf" | "whatPercent";
    kind: "percentage";
  }
  | {
    calculatorId: string;
    defaultVariant?: string;
    defaultValues?: Record<string, string | number>;
    kind: "generic";
  }
  | {
    defaultNewValue: number;
    defaultOldValue: number;
    kind: "percentage-change";
  }
  | {
    defaultMode?: "proportion" | "simplify";
    defaultLeft: number;
    defaultRight: number;
    defaultThird: number;
    kind: "ratio";
  }
  | {
    defaultValue: string;
    kind: "number-list-stat";
    metric: "average" | "median" | "mode" | "range" | "standardDeviation";
  }
  | {
    defaultDecimal?: string;
    defaultDenominator: number;
    defaultMode?: "decimalToFraction" | "fractionToDecimal" | "simplify";
    defaultNumerator: number;
    kind: "fraction";
  }
  | {
    defaultLeft: number;
    defaultMode?: "gcd" | "lcm";
    defaultRight: number;
    kind: "integer-math";
  }
  | {
    defaultCoefficient: string;
    defaultDecimal: string;
    defaultExponent: string;
    defaultMode?: "decimalToScientific" | "scientificToDecimal";
    kind: "scientific-notation";
  };

export type MathToolExample = {
  expression: string;
  note?: string;
  result: string;
};

export type MathToolPageDefinition = {
  aliases: readonly string[];
  description: string;
  examples: readonly MathToolExample[];
  faq: readonly FaqEntry[];
  keywords: readonly string[];
  longDescription: StructuredContent;
  metaDescription?: string;
  relatedSlugs: readonly string[];
  route: `/${string}`;
  slug: string;
  title: string;
  useCases: readonly string[];
  widget: MathToolWidgetConfig;
};

type MathToolSeed = Omit<MathToolPageDefinition, "longDescription" | "route"> & {
  overview: readonly string[];
  supportingNotes: readonly string[];
};

export const mathHubConfig = {
  description:
    "Math calculator hub for percentages, finance, chemistry, and everyday number comparisons.",
  intro:
    "Math calculators work best when they answer one question quickly and still provide enough context to trust the result. This hub now stretches beyond basic percentage and ratio work into practical finance and chemistry formulas too, including loan planning, savings growth, molarity, and pH calculations. Each page stays lightweight, static-first, and easy to scan, with worked examples, validation, and related tools built in.",
  keywords: [
    "math calculators",
    "online math calculator",
    "percentage calculator",
    "ratio calculator",
    "average calculator",
    "percentage change calculator",
    "loan calculator",
    "compound interest calculator",
    "mortgage calculator",
    "savings calculator",
    "molarity calculator",
    "ph calculator",
  ],
  route: "/math-calculators" as const,
  title: "Math Calculators",
  useCases: [
    "Check percentage, ratio, and average math without opening a spreadsheet.",
    "Estimate loans, mortgage costs, savings growth, and interest scenarios quickly.",
    "Handle chemistry calculations like molarity and pH with clear browser-based formulas.",
  ],
};

const initialMathToolSlugs = new Set([
  "percentage-calculator",
  "percentage-change",
  "average-calculator",
  "ratio-calculator",
  "loan-calculator",
  "simple-interest-calculator",
  "compound-interest-calculator",
  "mortgage-calculator",
  "savings-calculator",
  "molarity-calculator",
  "ph-calculator",
]);

function buildMathLongDescription(
  title: string,
  overview: readonly string[],
  supportingNotes: readonly string[],
  useCases: readonly string[],
): StructuredContent {
  return {
    sections: [
      {
        heading: "How this calculator works",
        paragraphs: overview,
      },
      {
        heading: "Where it is useful",
        listItems: useCases,
        paragraphs: supportingNotes,
      },
    ],
    title: `About the ${title.toLowerCase()}`,
  };
}

const mathToolSeeds: MathToolSeed[] = [
  {
    aliases: [
      "percentage calculator",
      "percent calculator",
      "what is x percent of y",
      "what percent calculator",
    ],
    description: "Calculate percentages, percent-of values, and percentage comparisons instantly.",
    examples: [
      { expression: "25% of 200", result: "50" },
      { expression: "45 is what percent of 60", result: "75%" },
      { expression: "200 increased by 15%", note: "increase by percent", result: "230" },
    ],
    faq: [
      {
        answer: "Use the percent-of mode and enter 25 for the percent value plus 200 for the base value. The result is 50.",
        question: "How do I find 25% of 200?",
      },
      {
        answer: "Use the what-percent mode when you know the part and the whole and want the percentage relationship between them.",
        question: "When should I use the what-percent mode?",
      },
      {
        answer: "Yes. Negative numbers work in the same formulas as long as the inputs are valid numeric values.",
        question: "Can this calculator handle negative values?",
      },
    ],
    keywords: [
      "percentage formula",
      "calculate percent of a number",
      "what percent of",
      "percentage math",
    ],
    overview: [
      "This page combines the three percentage tasks people use most often: finding a percent of a number, finding what percent one value is of another, and increasing or decreasing a starting value by a percentage.",
      "The calculator updates instantly as you type, which makes it useful for shopping math, school assignments, dashboards, and quick business checks.",
    ],
    relatedSlugs: ["percentage-change", "average-calculator", "ratio-calculator"],
    slug: "percentage-calculator",
    supportingNotes: [
      "Percentages show up in pricing, grades, growth reports, tax calculations, and performance comparisons.",
      "Keeping the three related modes in one tool makes it easier to move between everyday percent questions without re-entering numbers somewhere else.",
    ],
    title: "Percentage Calculator",
    useCases: [
      "Calculate discounts, tips, commissions, and taxes.",
      "Check conversion rates, completion rates, and score percentages.",
      "Increase or decrease a starting value by a chosen percentage.",
    ],
    widget: {
      calculatorId: "percentage",
      defaultVariant: "percent-of",
      kind: "generic",
    },
  },
  {
    aliases: [
      "percentage change calculator",
      "percentage increase calculator",
      "percentage decrease calculator",
      "percent change",
    ],
    description: "Calculate percentage increase or decrease between two numbers instantly.",
    examples: [
      { expression: "100 to 120", result: "20% increase" },
      { expression: "250 to 200", result: "20% decrease" },
      { expression: "-100 to -80", note: "negative baseline", result: "20% increase" },
    ],
    faq: [
      {
        answer: "Subtract the old value from the new value, divide by the old value, then multiply by 100.",
        question: "What formula is used for percentage change?",
      },
      {
        answer: "The old or original value cannot be zero because percentage change divides by that starting value.",
        question: "Why does the old value need to be non-zero?",
      },
      {
        answer: "Yes. The result card shows the raw difference as well as the percentage increase, decrease, or no-change result.",
        question: "Does the calculator show the absolute difference too?",
      },
    ],
    keywords: [
      "percentage increase",
      "percentage decrease",
      "compare two numbers",
      "growth rate calculator",
    ],
    overview: [
      "Percentage change compares how far a new value has moved relative to the starting value. That makes it more useful than just looking at the raw difference on its own.",
      "This page is focused on before-and-after comparisons, so it keeps the inputs and explanation simpler than the broader percentage calculator.",
    ],
    relatedSlugs: ["percentage-calculator", "average-calculator", "ratio-calculator"],
    slug: "percentage-change",
    supportingNotes: [
      "The tool is useful for revenue changes, traffic trends, score changes, pricing shifts, and KPI snapshots.",
      "A dedicated page also makes it easier to send people directly to the increase/decrease workflow when that is the exact task they need.",
    ],
    title: "Percentage Change Calculator",
    useCases: [
      "Measure price increases and discount differences.",
      "Compare performance metrics across weeks or months.",
      "Check growth or decline for traffic, sales, and production counts.",
    ],
    widget: {
      calculatorId: "percentage-change",
      defaultValues: { oldVal: 100, newVal: 120 },
      kind: "generic",
    },
  },
  {
    aliases: ["average calculator", "mean calculator", "calculate average", "arithmetic mean"],
    description: "Calculate the average of a list of numbers instantly.",
    examples: [
      { expression: "10, 20, 30, 40", result: "25" },
      { expression: "4, 6, 8", result: "6" },
      { expression: "2.5, 3.5, 4.5", result: "3.5" },
    ],
    faq: [
      {
        answer: "The arithmetic mean adds every value together and divides the total by the number of values entered.",
        question: "What kind of average does this page calculate?",
      },
      {
        answer: "Yes. You can paste comma-separated values, line-separated values, or a mix of both.",
        question: "Can I paste values from a spreadsheet or note?",
      },
      {
        answer: "Invalid values are ignored, so the calculation only uses numbers that can be parsed correctly.",
        question: "What happens if the list contains invalid text?",
      },
    ],
    keywords: ["mean calculator", "average of numbers", "list average", "average a list"],
    overview: [
      "Average is often the fastest way to summarize a short list of numbers into one representative value.",
      "This calculator is built for quick pasted input, which makes it handy for grades, expenses, ratings, measurements, and small datasets.",
    ],
    relatedSlugs: ["percentage-calculator", "percentage-change", "ratio-calculator"],
    slug: "average-calculator",
    supportingNotes: [
      "Mean values are useful when you want a single headline number and the dataset is not extremely skewed by outliers.",
      "For more detail about distribution, it often helps to check median, mode, or standard deviation alongside the average.",
    ],
    title: "Average Calculator",
    useCases: [
      "Average test scores, expenses, and survey ratings.",
      "Check the mean of a small exported list from a spreadsheet.",
      "Summarize repeated measurements during planning or analysis.",
    ],
    widget: {
      calculatorId: "average",
      defaultValues: { values: "10, 20, 30\n40" },
      kind: "generic",
    },
  },
  {
    aliases: ["median calculator", "find median", "median of numbers", "list median"],
    description: "Find the median of a list of numbers using a fast online median calculator.",
    examples: [
      { expression: "4, 9, 12, 15, 18", result: "12" },
      { expression: "4, 9, 12, 15", result: "10.5" },
      { expression: "1, 2, 100", result: "2" },
    ],
    faq: [
      {
        answer: "The median is the middle value after sorting the list. If the list has an even number of values, it is the average of the two middle numbers.",
        question: "How is the median calculated?",
      },
      {
        answer: "Median is less sensitive to extreme outliers than average, so it can describe a skewed dataset more clearly.",
        question: "When is median better than average?",
      },
      {
        answer: "Yes. Decimal values are sorted and handled the same way as whole numbers.",
        question: "Can the median calculator use decimals?",
      },
    ],
    keywords: ["middle value calculator", "median formula", "median of a list", "sorted data median"],
    overview: [
      "Median highlights the middle of a dataset instead of the total balance of all values. That makes it helpful when a few unusually high or low values would distort the average.",
      "This page sorts your pasted values automatically and returns the center point without requiring manual ordering.",
    ],
    relatedSlugs: ["average-calculator", "mode-calculator", "range-calculator"],
    slug: "median-calculator",
    supportingNotes: [
      "Median is commonly used for salaries, home prices, response times, and any list where outliers can pull the mean too far away from a typical result.",
      "It pairs especially well with range and mode when you want a quick read on the overall shape of a small dataset.",
    ],
    title: "Median Calculator",
    useCases: [
      "Find the middle test score or response time in a set.",
      "Summarize skewed price data more reliably than with a mean alone.",
      "Check the central value of sorted measurements or ranked results.",
    ],
    widget: {
      defaultValue: "4, 9, 12, 15, 18",
      kind: "number-list-stat",
      metric: "median",
    },
  },
  {
    aliases: ["mode calculator", "find mode", "most common value calculator"],
    description: "Find the mode, or most common value, in a list of numbers.",
    examples: [
      { expression: "2, 3, 3, 4, 5, 5, 5", result: "5" },
      { expression: "1, 1, 2, 2, 3", result: "1 and 2" },
      { expression: "4, 5, 6", result: "no mode" },
    ],
    faq: [
      {
        answer: "Mode is the value or values that appear most often in the list.",
        question: "What does mode mean in a dataset?",
      },
      {
        answer: "Yes. If two or more values share the highest frequency, the calculator returns each of them.",
        question: "Can a list have more than one mode?",
      },
      {
        answer: "If every value appears only once, the result is reported as no mode.",
        question: "What happens when there is no repeated value?",
      },
    ],
    keywords: ["most common value", "mode of a list", "mode formula", "multimodal list"],
    overview: [
      "Mode helps you spot which value shows up most often. That makes it useful for repeated measurements, survey responses, and score clustering.",
      "Unlike average or median, mode is about frequency rather than central position or total balance.",
    ],
    relatedSlugs: ["median-calculator", "average-calculator", "range-calculator"],
    slug: "mode-calculator",
    supportingNotes: [
      "Mode is helpful when the most common value matters more than the mathematical center, such as sizing, counts, or repeated survey answers.",
      "If you need a fuller summary, compare mode with median and average from the same list.",
    ],
    title: "Mode Calculator",
    useCases: [
      "Find the most common test score or response value.",
      "Check which size, quantity, or measurement occurs most often.",
      "Spot repeated patterns in small operational datasets.",
    ],
    widget: {
      defaultValue: "2, 3, 3, 4, 5, 5, 5",
      kind: "number-list-stat",
      metric: "mode",
    },
  },
  {
    aliases: ["range calculator", "data range calculator", "max minus min"],
    description: "Calculate the range of a list of numbers by subtracting the minimum from the maximum.",
    examples: [
      { expression: "12, 18, 9, 27, 14", result: "18" },
      { expression: "4, 4, 4", result: "0" },
      { expression: "2.5, 7.5, 5", result: "5" },
    ],
    faq: [
      {
        answer: "Range is the difference between the highest value and the lowest value in the list.",
        question: "How do you calculate range?",
      },
      {
        answer: "Yes. A larger range means the numbers are spread farther apart, while a small range means they cluster more tightly.",
        question: "Does range tell me how spread out the data is?",
      },
      {
        answer: "No. If all values are the same, the range is zero because the minimum and maximum are identical.",
        question: "Can the range be zero?",
      },
    ],
    keywords: ["spread calculator", "maximum minus minimum", "data spread", "range of values"],
    overview: [
      "Range is one of the quickest ways to understand how spread out a list of numbers is.",
      "This calculator sorts the list behind the scenes, finds the minimum and maximum, and returns their difference immediately.",
    ],
    relatedSlugs: ["standard-deviation-calculator", "median-calculator", "mode-calculator"],
    slug: "range-calculator",
    supportingNotes: [
      "Range is simple and useful for a quick scan, but it only uses the two extreme values and ignores the rest of the distribution.",
      "That is why it is often paired with median or standard deviation when you need more context.",
    ],
    title: "Range Calculator",
    useCases: [
      "Check the spread of scores, costs, or durations.",
      "Compare the width of two short datasets quickly.",
      "Review variability before deciding whether you need a deeper stats tool.",
    ],
    widget: {
      defaultValue: "12, 18, 9, 27, 14",
      kind: "number-list-stat",
      metric: "range",
    },
  },
  {
    aliases: ["standard deviation calculator", "std deviation calculator", "population standard deviation"],
    description: "Calculate the population standard deviation of a list of numbers instantly.",
    examples: [
      { expression: "8, 10, 12, 14, 16", result: "2.8284" },
      { expression: "3, 3, 3, 3", result: "0" },
      { expression: "5, 7, 9", note: "population standard deviation", result: "1.633" },
    ],
    faq: [
      {
        answer: "This page uses the population standard deviation formula, which divides the variance by the total number of values entered.",
        question: "Does this use sample or population standard deviation?",
      },
      {
        answer: "Standard deviation measures how far values typically sit from the mean. Larger results mean the list is more spread out.",
        question: "What does standard deviation tell me?",
      },
      {
        answer: "If every value is the same, the standard deviation is zero because there is no spread around the mean.",
        question: "Why can standard deviation equal zero?",
      },
    ],
    keywords: ["std dev", "data spread calculator", "variance and standard deviation", "statistics calculator"],
    overview: [
      "Standard deviation gives a fuller measure of spread than range because it uses every value in the list rather than only the minimum and maximum.",
      "This page is useful for a quick population-standard-deviation check when you have a short list and want an immediate answer.",
    ],
    relatedSlugs: ["average-calculator", "range-calculator", "median-calculator"],
    slug: "standard-deviation-calculator",
    supportingNotes: [
      "It is useful for quality checks, classwork, dashboards, and quick descriptive statistics where understanding consistency matters.",
      "Because the calculator also shows the mean, it is easy to compare the center of the data with its spread.",
    ],
    title: "Standard Deviation Calculator",
    useCases: [
      "Measure how consistent a series of scores or measurements is.",
      "Compare the spread of two short datasets.",
      "Support homework or reporting with a quick population standard deviation result.",
    ],
    widget: {
      defaultValue: "8, 10, 12, 14, 16",
      kind: "number-list-stat",
      metric: "standardDeviation",
    },
  },
  {
    aliases: ["ratio calculator", "simplify ratio", "ratio simplifier", "ratio math"],
    description: "Simplify ratios and solve proportions instantly with one ratio calculator.",
    examples: [
      { expression: "4 : 8", result: "1 : 2" },
      { expression: "6 : 9", result: "2 : 3" },
      { expression: "2 : 5 = 8 : x", result: "x = 20" },
    ],
    faq: [
      {
        answer: "The simplify mode reduces both numbers by their greatest common divisor so the ratio is shown in lowest terms.",
        question: "How does the simplify-ratio mode work?",
      },
      {
        answer: "Proportion mode solves a:b = c:x using cross multiplication, which makes scaling problems much faster.",
        question: "What does the proportion mode calculate?",
      },
      {
        answer: "Simplify mode expects whole numbers. Proportion mode can use decimal values for the entered ratio and third value.",
        question: "Can the ratio calculator use decimals?",
      },
    ],
    keywords: ["ratio simplifier", "solve proportion", "scale ratio", "equivalent ratios"],
    overview: [
      "Ratios are useful when you care about relative size rather than standalone numbers. That comes up in recipes, drawings, scaling, model building, and performance comparisons.",
      "This page combines ratio simplification with a direct proportion solver so you can handle both common workflows from the same interface.",
    ],
    relatedSlugs: ["percentage-calculator", "percentage-change", "average-calculator"],
    slug: "ratio-calculator",
    supportingNotes: [
      "A ratio page is especially handy when the relationship between values matters more than the exact totals.",
      "Because the calculator shows the reduced ratio and the solved value, it is useful for both quick checks and explainable reference work.",
    ],
    title: "Ratio Calculator",
    useCases: [
      "Reduce ratios for classroom math, recipes, and comparisons.",
      "Solve missing-value scale problems in drawings or plans.",
      "Check whether two ratios are equivalent before sharing results.",
    ],
    widget: {
      calculatorId: "ratio",
      defaultVariant: "simplify",
      kind: "generic",
    },
  },
  {
    aliases: ["loan calculator", "loan payment calculator", "monthly loan payment", "amortization calculator"],
    description: "Estimate monthly loan payments, total repayment, and total interest with a fixed-rate loan calculator.",
    examples: [
      { expression: "$25,000 at 7.25% for 5 years", result: "$497.98 per month" },
      { expression: "$12,000 at 0% for 3 years", result: "$333.33 per month" },
      { expression: "$40,000 at 6% for 6 years", result: "$662.92 per month" },
    ],
    faq: [
      {
        answer: "It uses the standard fixed-rate amortization formula, which turns the loan amount, annual rate, and term into an equal monthly payment.",
        question: "What formula does the loan calculator use?",
      },
      {
        answer: "Yes. If the interest rate is zero, the calculator simply divides the loan amount by the total number of monthly payments.",
        question: "Can the loan calculator handle a 0% rate?",
      },
      {
        answer: "Use this calculator for a plain fixed loan. Mortgage pages are better when you also want down payment, property tax, or insurance in view.",
        question: "How is this different from the mortgage calculator?",
      },
    ],
    keywords: ["loan payment formula", "monthly loan payment", "fixed loan calculator", "loan amortization"],
    overview: [
      "Loan math is most useful when it turns a borrowed amount into something you can compare month to month. This calculator focuses on that practical question first.",
      "It shows the monthly payment, total repayment, and total interest together so the cost of borrowing is easier to scan than a formula alone.",
    ],
    relatedSlugs: ["simple-interest-calculator", "compound-interest-calculator", "mortgage-calculator"],
    slug: "loan-calculator",
    supportingNotes: [
      "The page is useful for auto loans, personal loans, equipment financing, and any other fixed-rate borrowing scenario.",
      "Because the tool is registry-based, it can reuse the same generic calculator shell as the broader finance set without extra page code.",
    ],
    title: "Loan Calculator",
    useCases: [
      "Estimate a monthly payment before applying for financing.",
      "Compare total repayment across different rates and loan terms.",
      "Understand how much of a fixed loan cost comes from interest.",
    ],
    widget: {
      calculatorId: "loan",
      kind: "generic",
    },
  },
  {
    aliases: ["simple interest calculator", "simple interest formula", "calculate simple interest"],
    description: "Calculate simple interest and ending amount from principal, annual rate, and time.",
    examples: [
      { expression: "$5,000 at 6% for 3 years", result: "$900 interest" },
      { expression: "$1,200 at 4% for 2 years", result: "$96 interest" },
      { expression: "$10,000 at 5% for 1.5 years", result: "$750 interest" },
    ],
    faq: [
      {
        answer: "Simple interest uses principal x rate x time, so the interest grows linearly instead of compounding on previous interest.",
        question: "What is simple interest?",
      },
      {
        answer: "Yes. Time can be entered as fractional years, which is useful when the investment or borrowing period is not a whole number.",
        question: "Can I use partial years in the simple interest calculator?",
      },
      {
        answer: "Compound interest reinvests growth and earns interest on earlier interest, while simple interest only uses the starting principal.",
        question: "How is simple interest different from compound interest?",
      },
    ],
    keywords: ["simple interest formula", "principal rate time", "simple interest math", "interest earned calculator"],
    overview: [
      "Simple interest is the most direct finance formula in the set because the growth depends only on principal, annual rate, and time.",
      "That makes the page useful for quick classroom checks, basic agreements, and side-by-side comparisons before moving to compound growth models.",
    ],
    relatedSlugs: ["compound-interest-calculator", "loan-calculator", "savings-calculator"],
    slug: "simple-interest-calculator",
    supportingNotes: [
      "It is a good fit for educational examples and straightforward contracts where interest is not periodically added back into the balance.",
      "Showing interest earned and ending amount together keeps the result practical instead of leaving users with only a raw formula output.",
    ],
    title: "Simple Interest Calculator",
    useCases: [
      "Check a basic interest agreement without using a spreadsheet.",
      "Compare simple-interest growth with compound-interest growth.",
      "Work through finance homework or training examples quickly.",
    ],
    widget: {
      calculatorId: "simple-interest",
      kind: "generic",
    },
  },
  {
    aliases: ["compound interest calculator", "compound interest formula", "future value calculator", "interest compounding calculator"],
    description: "Estimate compound growth using principal, annual rate, time, and compounding frequency.",
    examples: [
      { expression: "$10,000 at 7% for 10 years, monthly", result: "$20,096.61 future value" },
      { expression: "$5,000 at 5% for 5 years, annually", result: "$6,381.41 future value" },
      { expression: "$2,500 at 4.5% for 3 years, quarterly", result: "$2,861.55 future value" },
    ],
    faq: [
      {
        answer: "It uses A = P(1 + r/n)^(nt), where P is principal, r is annual rate, n is compounds per year, and t is time in years.",
        question: "What formula does the compound interest calculator use?",
      },
      {
        answer: "The compounding frequency determines how often interest is added back into the balance. More frequent compounding usually creates slightly more growth.",
        question: "Why does compounding frequency matter?",
      },
      {
        answer: "This page focuses on compound growth from a starting principal. Use the savings calculator when you also want recurring monthly contributions.",
        question: "How is this different from the savings calculator?",
      },
    ],
    keywords: ["compound growth formula", "future value formula", "interest compounding", "investment growth calculator"],
    overview: [
      "Compound interest becomes more intuitive when the formula is tied to a future value and an earned-growth figure instead of just symbols.",
      "This calculator keeps the core variables visible so it is easier to compare how rate, time, and compounding frequency change the outcome.",
    ],
    relatedSlugs: ["simple-interest-calculator", "savings-calculator", "loan-calculator"],
    slug: "compound-interest-calculator",
    supportingNotes: [
      "It is useful for savings estimates, investment illustrations, classroom finance work, and quick side-by-side rate comparisons.",
      "Because the generic calculator registry handles field definitions and output formatting, finance pages like this stay scalable without custom components.",
    ],
    title: "Compound Interest Calculator",
    useCases: [
      "Project future value from a lump-sum starting balance.",
      "Compare annual, quarterly, and monthly compounding effects.",
      "Estimate how much of the ending balance comes from growth alone.",
    ],
    widget: {
      calculatorId: "compound-interest",
      kind: "generic",
    },
  },
  {
    aliases: ["mortgage calculator", "home loan calculator", "monthly mortgage payment", "mortgage payment estimator"],
    description: "Estimate mortgage borrowing, monthly housing cost, and total interest with home price, down payment, tax, and insurance inputs.",
    examples: [
      { expression: "$400,000 home with $80,000 down at 6.5% for 30 years", result: "$2,022.62 principal and interest" },
      { expression: "Add $4,800 tax and $1,800 insurance", result: "$2,572.62 estimated monthly housing cost" },
      { expression: "Lower down payment", note: "larger loan amount", result: "Higher monthly payment and total interest" },
    ],
    faq: [
      {
        answer: "The calculator first estimates the loan amount from home price minus down payment, then applies a fixed-rate mortgage payment formula.",
        question: "How does the mortgage calculator estimate monthly payment?",
      },
      {
        answer: "Yes. The page adds annual property tax and annual insurance into the estimated monthly housing cost so the result is closer to what homeowners budget for.",
        question: "Does the mortgage calculator include taxes and insurance?",
      },
      {
        answer: "The down payment must be smaller than the home price. Otherwise there is no mortgage balance left to finance.",
        question: "Why must the down payment be less than the home price?",
      },
    ],
    keywords: ["home loan estimate", "mortgage payment formula", "monthly mortgage estimator", "housing cost calculator"],
    overview: [
      "Mortgage decisions are easier when the monthly payment is shown alongside the actual loan amount and the broader housing-cost estimate.",
      "This page keeps home price, down payment, rate, term, tax, and insurance together so the result is more practical than a bare principal-and-interest figure alone.",
    ],
    relatedSlugs: ["loan-calculator", "compound-interest-calculator", "savings-calculator"],
    slug: "mortgage-calculator",
    supportingNotes: [
      "It is useful for early home-buying research, lender comparison, and quick budget checks before moving to a full amortization schedule.",
      "The calculator stays intentionally lightweight while still covering the core monthly cost inputs many people want to see together.",
    ],
    title: "Mortgage Calculator",
    useCases: [
      "Estimate housing cost before making an offer or speaking with a lender.",
      "Compare how down payment size changes the loan amount and payment.",
      "Include tax and insurance when sketching a monthly home budget.",
    ],
    widget: {
      calculatorId: "mortgage",
      kind: "generic",
    },
  },
  {
    aliases: ["savings calculator", "savings growth calculator", "future savings calculator", "monthly savings calculator"],
    description: "Project savings growth from an initial deposit, recurring monthly contributions, annual return, and time.",
    examples: [
      { expression: "$5,000 initial plus $300 monthly at 4.5% for 10 years", result: "$53,194.39 estimated balance" },
      { expression: "No monthly contribution", result: "Shows growth from the initial deposit only" },
      { expression: "Higher monthly deposit", result: "Larger ending balance and total contributions" },
    ],
    faq: [
      {
        answer: "It combines growth on the initial deposit with the future value of repeated monthly contributions.",
        question: "What does the savings calculator include?",
      },
      {
        answer: "Yes. The result card separates total contributions from growth earned, which makes it easier to see how much came from saving versus compounding.",
        question: "Can I see contributions and interest separately?",
      },
      {
        answer: "This page is best for savings buildup. Use the compound interest calculator when you want a lump-sum growth estimate without recurring deposits.",
        question: "When should I use this instead of the compound interest calculator?",
      },
    ],
    keywords: ["future savings", "monthly savings growth", "savings projection", "investment contribution calculator"],
    overview: [
      "Savings plans are easier to evaluate when recurring deposits are part of the formula instead of an afterthought.",
      "This calculator makes that practical by showing the estimated balance, the amount you contributed, and the growth earned over time.",
    ],
    relatedSlugs: ["compound-interest-calculator", "simple-interest-calculator", "mortgage-calculator"],
    slug: "savings-calculator",
    supportingNotes: [
      "It is useful for emergency-fund planning, goal tracking, retirement illustrations, and any recurring-save scenario that needs a fast browser estimate.",
      "Keeping contributions and growth separate also makes the result easier to explain in planning conversations or simple dashboards.",
    ],
    title: "Savings Calculator",
    useCases: [
      "Estimate how quickly a savings habit can build over time.",
      "Compare different monthly contribution amounts before committing to a plan.",
      "See how much of a future balance comes from deposits versus growth.",
    ],
    widget: {
      calculatorId: "savings",
      kind: "generic",
    },
  },
  {
    aliases: ["molarity calculator", "molarity formula", "solution molarity calculator", "molarity from moles"],
    description: "Calculate molarity from moles and volume, or from mass, molar mass, and total solution volume.",
    examples: [
      { expression: "0.25 mol in 0.5 L", result: "0.5 M" },
      { expression: "58.44 g NaCl, 58.44 g/mol, 1 L", result: "1 M" },
      { expression: "0.1 M", note: "equivalent", result: "100 mM" },
    ],
    faq: [
      {
        answer: "Molarity is moles of solute divided by liters of total solution, usually written as mol/L or simply M.",
        question: "What is molarity?",
      },
      {
        answer: "Use the moles variant when the amount of solute is already known in moles. Use the mass variant when you need to convert grams into moles first using molar mass.",
        question: "When should I use each molarity mode?",
      },
      {
        answer: "Solution volume must be greater than zero because molarity divides the amount of solute by the total volume.",
        question: "Why does the molarity calculator require a non-zero volume?",
      },
    ],
    keywords: ["solution concentration", "molarity equation", "moles per liter", "molarity from mass"],
    overview: [
      "Molarity is easier to trust when the calculator shows the exact pathway from the inputs to the concentration, whether you start from moles or from mass and molar mass.",
      "This page keeps both common chemistry workflows in one place so you can switch methods without opening a separate tool.",
    ],
    relatedSlugs: ["ph-calculator", "ratio-calculator", "percentage-calculator"],
    slug: "molarity-calculator",
    supportingNotes: [
      "It is useful for classroom chemistry, lab preparation, dilution planning, and quick concentration checks.",
      "The variant-based generic widget also makes it a good example of when a registry calculator fits better than a pair converter or text transform.",
    ],
    title: "Molarity Calculator",
    useCases: [
      "Calculate solution concentration from known moles and volume.",
      "Convert mass into molarity when molar mass is known.",
      "Check M and mM values quickly during chemistry work.",
    ],
    widget: {
      calculatorId: "molarity",
      defaultVariant: "from-moles",
      kind: "generic",
    },
  },
  {
    aliases: ["ph calculator", "ph formula calculator", "calculate ph", "ph from concentration"],
    description: "Calculate pH and pOH from hydrogen-ion or hydroxide-ion concentration with a fast chemistry calculator.",
    examples: [
      { expression: "[H+] = 1e-7 mol/L", result: "pH 7, neutral" },
      { expression: "[H+] = 1e-3 mol/L", result: "pH 3, acidic" },
      { expression: "[OH-] = 1e-2 mol/L", result: "pH 12, basic" },
    ],
    faq: [
      {
        answer: "When hydrogen-ion concentration is known, the calculator uses pH = -log10[H+]. When hydroxide concentration is known, it uses pOH first and then converts to pH.",
        question: "What formulas does the pH calculator use?",
      },
      {
        answer: "The concentration must be greater than zero because the logarithm of zero or a negative number is undefined.",
        question: "Why does the pH calculator require a positive concentration?",
      },
      {
        answer: "The result labels the solution as acidic, neutral, or basic based on the pH value, which helps make the number easier to interpret quickly.",
        question: "Does the calculator explain what the pH value means?",
      },
    ],
    keywords: ["ph equation", "poh calculator", "hydrogen ion concentration", "acidic basic neutral calculator"],
    overview: [
      "pH calculations are compact in theory, but it still helps to see pH, pOH, and solution type together instead of working from the logarithm by hand.",
      "This page supports the two most common starting points, hydrogen concentration and hydroxide concentration, in one chemistry-focused calculator.",
    ],
    relatedSlugs: ["molarity-calculator", "ratio-calculator", "percentage-calculator"],
    slug: "ph-calculator",
    supportingNotes: [
      "It is useful for chemistry homework, quick lab checks, and sanity-checking concentration values against expected acidity or basicity.",
      "Because it needs formula logic, multiple outputs, and mode switching, it is a much better fit for the calculator registry than for text tools or pair converters.",
    ],
    title: "pH Calculator",
    useCases: [
      "Calculate pH from hydrogen-ion concentration.",
      "Calculate pH from hydroxide concentration and see pOH at the same time.",
      "Interpret whether a solution is acidic, neutral, or basic more quickly.",
    ],
    widget: {
      calculatorId: "ph",
      defaultVariant: "from-hydrogen",
      kind: "generic",
    },
  },
  {
    aliases: ["proportion calculator", "solve proportion", "cross multiplication calculator"],
    description: "Solve proportions in the form a:b = c:x with a fast online proportion calculator.",
    examples: [
      { expression: "2 : 5 = 8 : x", result: "20" },
      { expression: "3 : 4 = 12 : x", result: "16" },
      { expression: "7 : 9 = 21 : x", result: "27" },
    ],
    faq: [
      {
        answer: "The calculator uses cross multiplication to solve the missing fourth value in a proportion.",
        question: "What formula does the proportion calculator use?",
      },
      {
        answer: "Yes. The tool can solve proportions for recipe scaling, drawings, maps, and any situation where the same ratio must be preserved.",
        question: "Can I use this for scale conversions?",
      },
      {
        answer: "The first value in the proportion cannot be zero because it appears in the denominator of the solved formula.",
        question: "Why can the first proportion value not be zero?",
      },
    ],
    keywords: ["missing ratio value", "cross multiply calculator", "scale proportion", "solve a proportion"],
    overview: [
      "Proportion problems show up whenever the same ratio needs to stay consistent while the numbers themselves change.",
      "This page focuses on the missing-value workflow so you can go straight into cross multiplication without switching modes manually.",
    ],
    relatedSlugs: ["ratio-calculator", "fraction-calculator", "percentage-calculator"],
    slug: "proportion-calculator",
    supportingNotes: [
      "It is useful for resizing recipes, comparing map or drawing scales, and extending known relationships to a larger or smaller value.",
      "A dedicated page also makes it easier to target direct search intent around solving a missing proportion term.",
    ],
    title: "Proportion Calculator",
    useCases: [
      "Scale recipes while keeping the same ingredient relationship.",
      "Resize artwork, diagrams, or model plans.",
      "Solve missing-value ratio questions in classroom math and exams.",
    ],
    widget: {
      calculatorId: "ratio",
      defaultVariant: "proportion",
      kind: "generic",
    },
  },
  {
    aliases: ["fraction calculator", "simplify fractions", "reduce fraction", "fraction simplifier"],
    description: "Simplify fractions and switch between fraction and decimal forms instantly.",
    examples: [
      { expression: "18 / 24", result: "3 / 4" },
      { expression: "3 / 8", result: "0.375" },
      { expression: "0.75", result: "3 / 4" },
    ],
    faq: [
      {
        answer: "The simplify mode reduces the numerator and denominator by their greatest common divisor.",
        question: "How does the fraction simplifier work?",
      },
      {
        answer: "Yes. The same widget also converts fractions to decimals and decimals back into simplified fractions.",
        question: "Can this page convert between fractions and decimals too?",
      },
      {
        answer: "The denominator cannot be zero because division by zero is undefined.",
        question: "Why is a zero denominator invalid?",
      },
    ],
    keywords: ["reduce fraction", "fraction simplifier", "fraction to decimal", "decimal to fraction"],
    overview: [
      "Fractions show up in schoolwork, measurement, and everyday quantity comparisons, but switching between equivalent forms can still slow things down.",
      "This page brings the three most common fraction tasks into one place: simplify, fraction-to-decimal, and decimal-to-fraction conversion.",
    ],
    relatedSlugs: ["fraction-to-decimal", "decimal-to-fraction", "ratio-calculator"],
    slug: "fraction-calculator",
    supportingNotes: [
      "Having all three modes together is useful when you need both the reduced fraction and its decimal interpretation while checking work.",
      "The page stays static-first and browser-only, so it is fast enough for quick study and reference use.",
    ],
    title: "Fraction Calculator",
    useCases: [
      "Reduce fractions for homework and exam practice.",
      "Translate measurement-style fractions into decimals.",
      "Convert decimals back into simplified fractions for cleaner presentation.",
    ],
    widget: {
      defaultDecimal: "0.75",
      defaultDenominator: 24,
      defaultMode: "simplify",
      defaultNumerator: 18,
      kind: "fraction",
    },
  },
  {
    aliases: ["fraction to decimal", "fraction to decimal calculator", "convert fraction to decimal"],
    description: "Convert fractions to decimals instantly with a dedicated fraction to decimal calculator.",
    examples: [
      { expression: "1 / 2", result: "0.5" },
      { expression: "3 / 8", result: "0.375" },
      { expression: "7 / 4", result: "1.75" },
    ],
    faq: [
      {
        answer: "Divide the numerator by the denominator. The calculator performs that division instantly and also uses the simplified fraction behind the scenes.",
        question: "How do you turn a fraction into a decimal?",
      },
      {
        answer: "Yes. Improper fractions such as 7/4 convert to decimal values greater than 1 just fine.",
        question: "Can I convert improper fractions too?",
      },
      {
        answer: "A decimal result can be easier to compare, average, or use in formulas than the original fraction form.",
        question: "Why would I convert a fraction to a decimal?",
      },
    ],
    keywords: ["fraction as decimal", "convert numerator denominator to decimal", "fraction decimal form"],
    overview: [
      "Fraction-to-decimal conversion is useful when you need a fraction in a format that works better with further calculation or comparison.",
      "This dedicated page opens directly in the correct mode so the user can enter a fraction and read the decimal immediately.",
    ],
    relatedSlugs: ["fraction-calculator", "decimal-to-fraction", "percentage-calculator"],
    slug: "fraction-to-decimal",
    supportingNotes: [
      "The page is helpful for schoolwork, measurement interpretation, and quick checks when a decimal is easier to think about than a fraction.",
      "It also complements the main fraction calculator by serving direct fraction-to-decimal search intent.",
    ],
    title: "Fraction to Decimal Calculator",
    useCases: [
      "Convert recipe or measurement fractions into decimal values.",
      "Check schoolwork involving fraction division.",
      "Move a fraction into a decimal-friendly formula or spreadsheet.",
    ],
    widget: {
      defaultDenominator: 8,
      defaultMode: "fractionToDecimal",
      defaultNumerator: 3,
      kind: "fraction",
    },
  },
  {
    aliases: ["decimal to fraction", "decimal to fraction calculator", "convert decimal to fraction"],
    description: "Convert decimals to simplified fractions instantly with a dedicated calculator.",
    examples: [
      { expression: "0.75", result: "3 / 4" },
      { expression: "2.5", result: "5 / 2" },
      { expression: "0.125", result: "1 / 8" },
    ],
    faq: [
      {
        answer: "The calculator reads the decimal places, writes the value as a numerator over a power of ten, then simplifies the fraction.",
        question: "How do you convert a decimal to a fraction?",
      },
      {
        answer: "Yes. Values larger than 1 are returned as improper fractions, such as 2.5 becoming 5/2.",
        question: "Can the calculator handle decimals greater than 1?",
      },
      {
        answer: "Repeating decimals are not represented exactly by this input model, so the page is best for terminating decimals.",
        question: "Does this page work for repeating decimals?",
      },
    ],
    keywords: ["decimal fraction converter", "decimal as a fraction", "simplified fraction from decimal"],
    overview: [
      "Decimal-to-fraction conversion is helpful when a measurement, design ratio, or classroom answer needs to be expressed as an exact fraction.",
      "This dedicated page opens in decimal-to-fraction mode so the most common workflow is one step faster.",
    ],
    relatedSlugs: ["fraction-calculator", "fraction-to-decimal", "ratio-calculator"],
    slug: "decimal-to-fraction",
    supportingNotes: [
      "It is especially useful for terminating decimals that come from calculators, measurement tools, or quick estimates.",
      "Once converted, the simplified fraction is often easier to compare with other fractional values or write into notes.",
    ],
    title: "Decimal to Fraction Calculator",
    useCases: [
      "Turn calculator output into exact fraction form.",
      "Convert measurement decimals into simplified fractions.",
      "Check homework answers that need to be written as fractions.",
    ],
    widget: {
      defaultDecimal: "0.75",
      defaultDenominator: 4,
      defaultMode: "decimalToFraction",
      defaultNumerator: 3,
      kind: "fraction",
    },
  },
  {
    aliases: ["gcd calculator", "greatest common divisor", "greatest common factor", "gcf calculator"],
    description: "Find the greatest common divisor, or greatest common factor, of two integers.",
    examples: [
      { expression: "84 and 126", result: "42" },
      { expression: "18 and 24", result: "6" },
      { expression: "7 and 13", result: "1" },
    ],
    faq: [
      {
        answer: "GCD is the largest whole number that divides both integers exactly without leaving a remainder.",
        question: "What is a greatest common divisor?",
      },
      {
        answer: "Yes. Greatest common divisor and greatest common factor refer to the same value.",
        question: "Is GCD the same as GCF?",
      },
      {
        answer: "The calculator uses whole-number division logic, so the intended inputs are integers.",
        question: "Why does this calculator expect integers?",
      },
    ],
    keywords: ["gcf calculator", "greatest common factor", "largest shared factor", "common divisor"],
    overview: [
      "Greatest common divisor is a basic number-theory tool that also powers fraction simplification and several ratio workflows.",
      "This page focuses on a simple two-number input so users can check factors quickly without extra steps.",
    ],
    relatedSlugs: ["lcm-calculator", "fraction-calculator", "ratio-calculator"],
    slug: "gcd-calculator",
    supportingNotes: [
      "It is useful in algebra, fraction reduction, modular arithmetic, and general classroom problem-solving.",
      "Because GCD is also part of simplifying other numeric relationships, it works well as a related tool inside a broader math hub.",
    ],
    title: "GCD Calculator",
    useCases: [
      "Reduce fractions and ratios to lowest terms.",
      "Check shared factors while solving algebra problems.",
      "Support classroom exercises involving divisibility and number properties.",
    ],
    widget: {
      defaultLeft: 84,
      defaultMode: "gcd",
      defaultRight: 126,
      kind: "integer-math",
    },
  },
  {
    aliases: ["lcm calculator", "least common multiple", "lowest common multiple"],
    description: "Find the least common multiple of two integers instantly.",
    examples: [
      { expression: "12 and 18", result: "36" },
      { expression: "4 and 10", result: "20" },
      { expression: "7 and 9", result: "63" },
    ],
    faq: [
      {
        answer: "LCM is the smallest positive whole number that both integers divide into evenly.",
        question: "What is a least common multiple?",
      },
      {
        answer: "LCM is useful when adding fractions, coordinating repeated intervals, or finding a shared cycle length.",
        question: "When would I use the LCM?",
      },
      {
        answer: "Yes. The page expects whole numbers because common multiples are defined over integers.",
        question: "Does the LCM calculator require integers?",
      },
    ],
    keywords: ["lowest common multiple", "common multiples", "lcm of two numbers", "shared multiple"],
    overview: [
      "Least common multiple is often paired with greatest common divisor, but it solves a different problem: finding the first shared multiple instead of the largest shared factor.",
      "This page keeps the interaction simple so the result is fast for homework, scheduling, and fraction work.",
    ],
    relatedSlugs: ["gcd-calculator", "fraction-calculator", "ratio-calculator"],
    slug: "lcm-calculator",
    supportingNotes: [
      "LCM is useful for adding fractions with different denominators, syncing recurring events, and solving patterned counting questions.",
      "It is a compact but important calculator to include in a math hub because it supports several other workflows indirectly.",
    ],
    title: "LCM Calculator",
    useCases: [
      "Find common denominators when adding or comparing fractions.",
      "Check repeated intervals in schedules or cycles.",
      "Work through number-theory exercises involving multiples.",
    ],
    widget: {
      defaultLeft: 12,
      defaultMode: "lcm",
      defaultRight: 18,
      kind: "integer-math",
    },
  },
  {
    aliases: [
      "scientific notation calculator",
      "scientific notation converter",
      "decimal to scientific notation",
      "scientific notation to decimal",
    ],
    description:
      "Convert decimals to scientific notation and scientific notation back to decimal form.",
    examples: [
      { expression: "0.00056", result: "5.6 x 10^-4" },
      { expression: "3.2 x 10^5", result: "320000" },
      { expression: "7.89 x 10^-3", result: "0.00789" },
    ],
    faq: [
      {
        answer: "Scientific notation writes a number as a coefficient times a power of ten, which makes very large or very small values easier to read.",
        question: "What is scientific notation used for?",
      },
      {
        answer: "The calculator can move in both directions: decimal to scientific notation and scientific notation back to decimal output.",
        question: "Can I convert in both directions on this page?",
      },
      {
        answer: "The coefficient can be any finite number, while the exponent should be a whole number because it represents a power of ten.",
        question: "Why does the exponent need to be an integer?",
      },
    ],
    keywords: ["power of ten calculator", "large number notation", "small number notation", "scientific format"],
    overview: [
      "Scientific notation is useful whenever raw decimal formatting becomes hard to scan, especially in science, engineering, and data-heavy contexts.",
      "This page offers both directions in one place so users can normalize large or small values quickly and move back to standard decimal form when needed.",
    ],
    relatedSlugs: ["standard-deviation-calculator", "percentage-calculator", "decimal-to-fraction"],
    slug: "scientific-notation-calculator",
    supportingNotes: [
      "The tool is useful for schoolwork, lab-style calculations, and any workflow where values span several orders of magnitude.",
      "A direct converter also serves search intent that would not naturally land on a general-purpose calculator page.",
    ],
    title: "Scientific Notation Calculator",
    useCases: [
      "Rewrite very small or very large values into a readable format.",
      "Translate scientific notation back into plain decimal numbers.",
      "Check homework or lab-style calculations involving powers of ten.",
    ],
    widget: {
      defaultCoefficient: "5.6",
      defaultDecimal: "0.00056",
      defaultExponent: "-4",
      defaultMode: "decimalToScientific",
      kind: "scientific-notation",
    },
  },
];

export const mathToolPages: MathToolPageDefinition[] = mathToolSeeds
  .filter((page) => initialMathToolSlugs.has(page.slug))
  .map((page) => ({
    ...page,
    longDescription: buildMathLongDescription(
      page.title,
      page.overview,
      page.supportingNotes,
      page.useCases,
    ),
    route: `/${page.slug}`,
  }));

const mathToolPageBySlug = new Map(mathToolPages.map((page) => [page.slug, page] as const));

export function getMathToolPage(slug: string) {
  return mathToolPageBySlug.get(slug);
}

export function getMathToolRelatedPages(page: MathToolPageDefinition) {
  return page.relatedSlugs
    .map((slug) => getMathToolPage(slug))
    .filter((entry): entry is MathToolPageDefinition => Boolean(entry));
}

export function getMathSearchEntries(): SearchEntry[] {
  return mathToolPages.map((page) => ({
    category: "math",
    entryType: "page",
    href: page.route,
    keywords: [...new Set([...page.aliases, ...page.keywords, page.title.toLowerCase()])],
    title: page.title,
  }));
}
