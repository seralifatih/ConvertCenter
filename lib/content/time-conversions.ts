import type {
    NumericPageSeed,
    Unit,
    UnitCategory,
} from "@/lib/config/conversion-registry";

export const timeUnits: Record<string, Unit> = {
    millisecond: { id: "millisecond", name: "Millisecond", pluralName: "Milliseconds", abbreviation: "ms" },
    second: { id: "second", name: "Second", pluralName: "Seconds", abbreviation: "s" },
    minute: { id: "minute", name: "Minute", pluralName: "Minutes", abbreviation: "min" },
    hour: { id: "hour", name: "Hour", pluralName: "Hours", abbreviation: "hr" },
    day: { id: "day", name: "Day", pluralName: "Days", abbreviation: "d" },
};

export const timeUnitCategories: Record<string, UnitCategory> = {
    time: {
        id: "time",
        baseUnit: "second",
        units: {
            millisecond: { ...timeUnits.millisecond, toBase: 0.001 },
            second: { ...timeUnits.second, toBase: 1 },
            minute: { ...timeUnits.minute, toBase: 60 },
            hour: { ...timeUnits.hour, toBase: 3600 },
            day: { ...timeUnits.day, toBase: 86400 },
        },
    },
};

export const timeConversionSeeds: readonly NumericPageSeed[] = [
    {
        slug: "minutes-to-seconds",
        title: "Minutes to Seconds Converter",
        description: "Convert minutes to seconds instantly.",
        metaDescription: "A fast and accurate converter for minutes to seconds. Includes a quick-reference conversion table and examples.",
        relatedSlugs: ["seconds-to-ms", "hours-to-minutes"],
        widget: {
            kind: "numeric-pair",
            category: "time",
            fromUnit: "minute",
            toUnit: "second",
        },
        examples: [
            { expression: "1 minute", result: "60 seconds" },
            { expression: "5 minutes", result: "300 seconds" },
        ],
        faq: [{ question: "How many seconds are in a minute?", answer: "There are 60 seconds in one minute." }],
    },
    {
        slug: "seconds-to-ms",
        title: "Seconds to Milliseconds Converter",
        description: "Convert seconds to milliseconds (ms).",
        metaDescription: "A fast and accurate converter for seconds to milliseconds (ms). Includes a quick-reference conversion table.",
        relatedSlugs: ["minutes-to-seconds", "unix-timestamp-converter"],
        widget: {
            kind: "numeric-pair",
            category: "time",
            fromUnit: "second",
            toUnit: "millisecond",
        },
        examples: [
            { expression: "1 second", result: "1,000 ms" },
            { expression: "0.5 seconds", result: "500 ms" },
        ],
        faq: [{ question: "How many milliseconds are in a second?", answer: "There are 1,000 milliseconds in one second." }],
    },
    {
        slug: "hours-to-minutes",
        title: "Hours to Minutes Converter",
        description: "Convert hours to minutes.",
        metaDescription: "A fast and accurate converter for hours to minutes. Includes a quick-reference conversion table for common durations.",
        relatedSlugs: ["days-to-hours", "minutes-to-seconds"],
        widget: {
            kind: "numeric-pair",
            category: "time",
            fromUnit: "hour",
            toUnit: "minute",
        },
        examples: [
            { expression: "1 hour", result: "60 minutes" },
            { expression: "2.5 hours", result: "150 minutes" },
        ],
        faq: [{ question: "How many minutes are in an hour?", answer: "There are 60 minutes in one hour." }],
    },
    {
        slug: "days-to-hours",
        title: "Days to Hours Converter",
        description: "Convert days to hours.",
        metaDescription: "A fast and accurate converter for days to hours. Includes a quick-reference conversion table.",
        relatedSlugs: ["hours-to-minutes", "minutes-to-seconds"],
        widget: {
            kind: "numeric-pair",
            category: "time",
            fromUnit: "day",
            toUnit: "hour",
        },
        examples: [
            { expression: "1 day", result: "24 hours" },
            { expression: "7 days", result: "168 hours" },
        ],
        faq: [{ question: "How many hours are in a day?", answer: "There are 24 hours in one day." }],
    },
    {
        slug: "unix-timestamp-converter",
        title: "Unix Timestamp Converter",
        description: "Convert Unix timestamps to human-readable dates and vice-versa.",
        metaDescription: "A powerful tool to convert Unix timestamps to UTC/local dates and convert dates back to timestamps. Supports seconds and milliseconds.",
        relatedSlugs: ["download-time-calculator", "seconds-to-ms"],
        widget: {
            kind: "generic",
            calculatorId: "unix-timestamp",
            defaultVariant: "timestamp-to-date",
        },
        examples: [
            { expression: "Timestamp 1672531200", result: "Sun, 01 Jan 2023 00:00:00 GMT" },
            { expression: "Date: 2023-10-26 10:00:00", result: "Timestamp 1698314400" },
        ],
        faq: [
            { question: "What is a Unix timestamp?", answer: "A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (UTC), not counting leap seconds." },
            { question: "Does this handle milliseconds?", answer: "Yes, the calculator automatically detects if a timestamp is in seconds or milliseconds and provides the correct conversion." },
        ],
    },
];
