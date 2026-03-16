import type { NumericPageSeed } from "@/lib/config/conversion-registry";

function buildLongDescription(action: 'upload' | 'download', fileSize: string) {
    const verb = action === 'upload' ? 'uploading' : 'downloading';
    const timeToAction = action === 'upload' ? 'to upload' : 'to download';

    return {
        title: `Understanding ${fileSize} ${action} times`,
        sections: [
            {
                heading: `How long does it take ${timeToAction} a ${fileSize} file?`,
                paragraphs: [
                    `The time it takes ${timeToAction} a ${fileSize} file depends entirely on your internet speed. For example, on a common 100 Mbps connection, ${verb} ${fileSize} takes about 13 minutes and 20 seconds, assuming ideal conditions.`,
                    `Our calculator below provides instant results for any speed. It also includes an 'Efficiency' setting to account for real-world factors like network overhead and protocol (TCP) slowdowns, which typically reduce your effective speed by 5-15%.`
                ]
            },
            {
                heading: `Practical Examples for a ${fileSize} File`,
                listItems: [
                    `**For Content Creators:** ${verb.charAt(0).toUpperCase() + verb.slice(1)} a ${fileSize} video file to YouTube or Vimeo can take anywhere from a few minutes on a fiber connection to over two hours on a slower DSL line.`,
                    `**For Gamers:** ${verb.charAt(0).toUpperCase() + verb.slice(1)} a large game update or saved game data of ${fileSize} is quick on modern broadband but can be a significant wait on mobile or rural connections.`,
                    `**For Remote Work:** Backing up ${fileSize} of project files to the cloud is a common task. Use the calculator to estimate how long this will take, especially if you're on a connection with slow upload speeds.`
                ]
            }
        ]
    };
}

export const fileSizeIntentSeeds: readonly NumericPageSeed[] = [
    {
        slug: "how-long-to-upload-10gb",
        title: "How Long to Upload 10GB? | File Transfer Time",
        description: "Calculate the upload time for a 10GB file at different internet speeds. See results for common connections like 10 Mbps, 100 Mbps, and 1 Gbps.",
        metaDescription: "Find out exactly how long it takes to upload a 10GB file with our calculator. Get instant results for various upload speeds and real-world scenarios.",
        isIntentPage: true,
        canonicalSlug: "upload-time-calculator",
        widget: {
            kind: "generic",
            calculatorId: "file-transfer-time",
            defaultValues: { fileSize: 10, fileSizeUnit: "GB" },
        },
        longDescription: buildLongDescription('upload', '10GB'),
        examples: [
            { expression: "10GB at 10 Mbps", result: "2 hours, 14 minutes" },
            { expression: "10GB at 100 Mbps", result: "13 minutes, 20 seconds" },
        ],
        faq: [
            { question: "Why are upload speeds slower than download speeds?", answer: "Most residential internet plans are 'asymmetric,' prioritizing download bandwidth over upload bandwidth because users typically consume more data than they send." }
        ],
        relatedSlugs: ["upload-time-calculator", "download-time-calculator", "internet-speed-converter"],
    },
    {
        slug: "how-long-to-download-100gb",
        title: "How Long to Download 100GB? | File Download Time",
        description: "Calculate the download time for a 100GB file (like a large game) at various internet speeds.",
        metaDescription: "Estimate how long it will take to download a 100GB file. Get instant results for speeds like 50 Mbps, 250 Mbps, and 1 Gbps for game or software downloads.",
        isIntentPage: true,
        canonicalSlug: "download-time-calculator",
        widget: {
            kind: "generic",
            calculatorId: "file-transfer-time",
            defaultValues: { fileSize: 100, fileSizeUnit: "GB" },
        },
        longDescription: buildLongDescription('download', '100GB'),
        examples: [
            { expression: "100GB at 50 Mbps", result: "4 hours, 26 minutes" },
            { expression: "100GB at 500 Mbps", result: "26 minutes, 40 seconds" },
        ],
        faq: [
            { question: "Why is my actual download slower than the estimate?", answer: "Advertised speeds are maximums. Real-world performance is affected by network congestion, server capacity, and Wi-Fi signal strength. Our 'Efficiency' setting helps model this." }
        ],
        relatedSlugs: ["download-time-calculator", "upload-time-calculator", "internet-speed-converter"],
    }
];