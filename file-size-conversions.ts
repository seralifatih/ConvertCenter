import type {
    NumericPageSeed,
    Unit,
    UnitCategory,
} from "@/lib/config/conversion-registry";

export const dataSizeUnits: Record<string, Unit> = {
    byte: { id: "byte", name: "Byte", pluralName: "Bytes", abbreviation: "B" },
    kilobyte: { id: "kilobyte", name: "Kilobyte", pluralName: "Kilobytes", abbreviation: "KB" },
    megabyte: { id: "megabyte", name: "Megabyte", pluralName: "Megabytes", abbreviation: "MB" },
    gigabyte: { id: "gigabyte", name: "Gigabyte", pluralName: "Gigabytes", abbreviation: "GB" },
    terabyte: { id: "terabyte", name: "Terabyte", pluralName: "Terabytes", abbreviation: "TB" },
};

export const dataRateUnits: Record<string, Unit> = {
    bps: { id: "bps", name: "Bit per second", pluralName: "Bits per second", abbreviation: "bps" },
    kbps: { id: "kbps", name: "Kilobit per second", pluralName: "Kilobits per second", abbreviation: "Kbps" },
    mbps: { id: "mbps", name: "Megabit per second", pluralName: "Megabits per second", abbreviation: "Mbps" },
    gbps: { id: "gbps", name: "Gigabit per second", pluralName: "Gigabits per second", abbreviation: "Gbps" },
    Bps: { id: "Bps", name: "Byte per second", pluralName: "Bytes per second", abbreviation: "B/s" },
    KBps: { id: "KBps", name: "Kilobyte per second", pluralName: "Kilobytes per second", abbreviation: "KB/s" },
    MBps: { id: "MBps", name: "Megabyte per second", pluralName: "Megabytes per second", abbreviation: "MB/s" },
    GBps: { id: "GBps", name: "Gigabyte per second", pluralName: "Gigabytes per second", abbreviation: "GB/s" },
};

export const fileSizeUnitCategories: Record<string, UnitCategory> = {
    dataSize: {
        id: "dataSize",
        baseUnit: "byte",
        units: {
            byte: { ...dataSizeUnits.byte, toBase: 1 },
            kilobyte: { ...dataSizeUnits.kilobyte, toBase: 1000 },
            megabyte: { ...dataSizeUnits.megabyte, toBase: 1_000_000 },
            gigabyte: { ...dataSizeUnits.gigabyte, toBase: 1_000_000_000 },
            terabyte: { ...dataSizeUnits.terabyte, toBase: 1_000_000_000_000 },
        },
    },
    dataRate: {
        id: "dataRate",
        baseUnit: "bps",
        units: {
            bps: { ...dataRateUnits.bps, toBase: 1 },
            kbps: { ...dataRateUnits.kbps, toBase: 1000 },
            mbps: { ...dataRateUnits.mbps, toBase: 1_000_000 },
            gbps: { ...dataRateUnits.gbps, toBase: 1_000_000_000 },
            Bps: { ...dataRateUnits.Bps, toBase: 8 },
            KBps: { ...dataRateUnits.KBps, toBase: 8 * 1000 },
            MBps: { ...dataRateUnits.MBps, toBase: 8 * 1_000_000 },
            GBps: { ...dataRateUnits.GBps, toBase: 8 * 1_000_000_000 },
        },
    },
};

export const fileSizeConversionSeeds: readonly NumericPageSeed[] = [
    {
        slug: "download-time-calculator",
        title: "Download Time Calculator",
        description: "Estimate how long a file will take to download with your internet speed.",
        metaDescription: "Calculate file download time based on file size (MB, GB, TB) and internet speed (Mbps, Gbps). See examples for games, movies, and backups.",
        relatedSlugs: ["upload-time-calculator", "internet-speed-converter", "how-long-to-download-100gb", "file-transfer-time-calculator"],
        widget: {
            kind: "generic",
            calculatorId: "file-transfer-time",
            defaultValues: { fileSize: 50, fileSizeUnit: "GB", transferSpeed: 100, transferSpeedUnit: "Mbps" },
        },
        examples: [
            { expression: "100 GB game at 50 Mbps", result: "4 hours, 26 minutes" },
            { expression: "5 GB movie at 25 Mbps", result: "26 minutes, 40 seconds" },
            { expression: "1 TB backup at 100 Mbps", result: "22 hours, 13 minutes" },
        ],
        faq: [
            {
                question: "How is download time calculated?",
                answer: "Download time is calculated by dividing the total file size (in bits) by the effective transfer speed (in bits per second). This calculator includes factors like protocol overhead to provide a more realistic estimate.",
            },
            {
                question: "Why is my actual download time longer?",
                answer: "Advertised speeds are maximums under ideal conditions. Real-world speeds are affected by network congestion, server load, Wi-Fi quality, and protocol overhead (like TCP/IP). Use the 'Efficiency' setting to account for some of this overhead.",
            },
        ],
    },
    {
        slug: "upload-time-calculator",
        title: "Upload Time Calculator",
        description: "Estimate how long a file will take to upload with your internet speed.",
        metaDescription: "Calculate file upload time based on file size (MB, GB, TB) and internet speed (Mbps, Gbps). See examples for videos, photos, and backups.",
        relatedSlugs: ["download-time-calculator", "internet-speed-converter", "how-long-to-upload-10gb", "file-transfer-time-calculator"],
        widget: {
            kind: "generic",
            calculatorId: "file-transfer-time",
            defaultValues: { fileSize: 1, fileSizeUnit: "GB", transferSpeed: 10, transferSpeedUnit: "Mbps" },
        },
        examples: [
            { expression: "5 GB video to YouTube at 10 Mbps", result: "1 hour, 7 minutes" },
            { expression: "500 MB of photos at 5 Mbps", result: "13 minutes, 20 seconds" },
        ],
        faq: [
            {
                question: "Why is upload speed often slower than download speed?",
                answer: "Most consumer internet plans are 'asymmetrical,' meaning they provide much higher download speeds than upload speeds. This is because typical users download (stream, browse) far more data than they upload.",
            },
        ],
    },
    {
        slug: "file-transfer-time-calculator",
        title: "File Transfer Time Calculator",
        description: "Estimate how long it will take to transfer a file based on size and speed.",
        metaDescription: "A generic file transfer time calculator for any scenario. Enter file size and transfer rate to get an estimated duration.",
        relatedSlugs: ["download-time-calculator", "upload-time-calculator", "internet-speed-converter"],
        widget: {
            kind: "generic",
            calculatorId: "file-transfer-time",
            defaultValues: { fileSize: 25, fileSizeUnit: "GB", transferSpeed: 1, transferSpeedUnit: "Gbps" },
        },
        examples: [
            { expression: "25 GB over a 1 Gbps local network", result: "3 minutes, 20 seconds" },
            { expression: "1 TB over a 10 Gbps connection", result: "13 minutes, 20 seconds" },
        ],
        faq: [],
    },
    {
        slug: "internet-speed-converter",
        title: "Internet Speed Converter",
        description: "Convert between different data rate units like Mbps, MB/s, Kbps, and Gbps.",
        metaDescription: "Quickly convert internet and data transfer speeds between bits-per-second and bytes-per-second units (e.g., Mbps to MB/s).",
        relatedSlugs: ["download-time-calculator", "upload-time-calculator", "mbps-to-mb-s-calculator"],
        widget: {
            kind: "numeric-pair",
            category: "dataRate",
            fromUnit: "mbps",
            toUnit: "MBps",
        },
        examples: [
            { expression: "100 Mbps", result: "12.5 MB/s" },
            { expression: "1 Gbps", result: "1,000 Mbps" },
            { expression: "25 MB/s", result: "200 Mbps" },
        ],
        faq: [
            {
                question: "What's the difference between Mbps and MB/s?",
                answer: "Mbps stands for megabits per second, while MB/s is megabytes per second. Since there are 8 bits in a byte, 1 MB/s is equal to 8 Mbps.",
            },
        ],
    },
    {
        slug: "mbps-to-mb-s-calculator",
        title: "Mbps to MB/s Calculator",
        description: "Convert megabits per second (Mbps) to megabytes per second (MB/s).",
        metaDescription: "A quick calculator to convert internet speed from Mbps (megabits per second) to MB/s (megabytes per second).",
        relatedSlugs: ["internet-speed-converter", "download-time-calculator"],
        widget: {
            kind: "numeric-pair",
            category: "dataRate",
            fromUnit: "mbps",
            toUnit: "MBps",
        },
        examples: [
            { expression: "100 Mbps", result: "12.5 MB/s" },
            { expression: "1000 Mbps (1 Gbps)", result: "125 MB/s" },
        ],
        faq: [
            {
                question: "How do you convert Mbps to MB/s?",
                answer: "To convert from megabits per second (Mbps) to megabytes per second (MB/s), you divide the value by 8.",
            },
        ],
    },
];