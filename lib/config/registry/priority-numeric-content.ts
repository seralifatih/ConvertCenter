import {
  defineContentSection,
  defineFaq,
  defineFaqs,
  defineStructuredContent,
} from "./registry-helpers";

export const topPriorityNumericSlugs = [
  "kg-to-lbs",
  "lbs-to-kg",
  "cm-to-inches",
  "inches-to-cm",
  "meters-to-feet",
  "feet-to-meters",
  "km-to-miles",
  "miles-to-km",
  "celsius-to-fahrenheit",
  "fahrenheit-to-celsius",
  "mb-to-gb",
  "gb-to-mb",
  "tbsp-to-ml",
  "tsp-to-ml",
  "cups-to-ml",
] as const;

export const lbsToKgStructuredContent = defineStructuredContent(
  "About converting pounds to kilograms",
  defineContentSection("Why this reverse conversion matters", [
    "Pounds are still the everyday weight unit for many people in the United States, but kilograms are the default almost everywhere else. That means lbs to kg is the version people need when a familiar pound value has to be translated into a metric form for travel, fitness, shipping, or official paperwork. It often comes up when someone knows their weight in pounds but a form, app, or label expects kilograms instead.",
  ]),
  defineContentSection("Conversion formula", [
    "To convert pounds to kilograms, multiply by 0.45359237. In simpler terms, one pound is a little less than half a kilogram. That makes quick estimates possible: 100 lb is about 45.36 kg, 150 lb is about 68.04 kg, and 200 lb is about 90.72 kg. The estimate is helpful, but the exact value matters when the number is being recorded or compared precisely.",
  ]),
  defineContentSection("Common lbs to kg values", [
    "This conversion appears in practical places. A 45 lb plate is about 20.41 kg. A 180 lb body weight converts to around 81.65 kg. A 50 lb checked-bag limit comes to roughly 22.68 kg. Those are real reference points people use at the gym, at the airport, and when comparing product weights across regions.",
  ]),
  defineContentSection("When it is useful", [
    "A pounds to kilograms converter is especially useful when imperial measurements need to become metric without guesswork. Athletes use it to compare training logs, travelers use it to read baggage limits, and shoppers use it to understand international product specs. A focused page with examples and a table is more reliable than doing rough head math when the number actually needs to be right.",
  ]),
);

export const lbsToKgFaqs = defineFaqs(
  defineFaq("How many kilograms are in 1 pound?", "1 pound equals 0.453592 kilograms."),
  defineFaq(
    "What is the formula to convert pounds to kilograms?",
    "Multiply pounds by 0.45359237 to convert them to kilograms.",
  ),
  defineFaq(
    "Is 100 pounds about 45 kilograms?",
    "Yes. 100 pounds converts to about 45.36 kilograms, so 45 kg is a reasonable quick estimate.",
  ),
  defineFaq(
    "When do people usually need lbs to kg conversion?",
    "It is common for body weight, shipping, travel forms, and product labels that switch from imperial to metric units.",
  ),
);

export const inchesToCmStructuredContent = defineStructuredContent(
  "About converting inches to centimeters",
  defineContentSection("A common format switch in product sizing", [
    "Inches are widely used for screens, furniture, tools, and personal measurements, while centimeters are more common in international sizing charts and product specifications. That makes inches to cm one of the most practical length conversions online. It helps when the source measurement is written in inches but the destination system, room plan, or order form uses metric values.",
  ]),
  defineContentSection("Conversion formula", [
    "The relationship is exact: multiply inches by 2.54 to get centimeters. Because one inch is defined as exactly 2.54 cm, this is a stable conversion rather than an estimate. A 10-inch measurement becomes 25.4 cm, 24 inches becomes 60.96 cm, and 72 inches becomes 182.88 cm. That exactness is especially useful for layouts and fit checks.",
  ]),
  defineContentSection("Common inches to cm values", [
    "Many everyday examples sit right in this range. A 13-inch laptop screen is 33.02 cm. A 30-inch countertop depth is 76.2 cm. A 75-inch television translates to 190.5 cm. These are the types of values that come up when comparing global product listings or translating measurements for home and office planning.",
  ]),
  defineContentSection("When it is useful", [
    "This converter is handy for ecommerce, interior planning, DIY work, and print or display sizing. Instead of mentally approximating, you can move directly from a familiar inch-based number to a metric measurement that is easier to compare with local tools and specifications. That saves time and reduces the chance of ordering or measuring against the wrong unit system.",
  ]),
);

export const inchesToCmFaqs = defineFaqs(
  defineFaq("How many centimeters are in 1 inch?", "1 inch equals exactly 2.54 centimeters."),
  defineFaq(
    "What is the formula to convert inches to centimeters?",
    "Multiply inches by 2.54 to convert them to centimeters.",
  ),
  defineFaq(
    "Why is inches to cm conversion exact?",
    "Because the inch is officially defined as exactly 2.54 centimeters.",
  ),
  defineFaq(
    "When is inches to cm conversion most useful?",
    "It is useful for product dimensions, furniture fit, screen sizes, clothing charts, and home measurements.",
  ),
);

export const metersToFeetStructuredContent = defineStructuredContent(
  "About converting meters to feet",
  defineContentSection("Why this is a high-frequency length conversion", [
    "Meters are a standard part of metric measurements for rooms, distances, and technical specs, while feet remain common in property, construction, and personal reference points in imperial contexts. That makes meters to feet a frequent conversion whenever plans, measurements, or sports distances move between the two systems. People often know one version instantly but need the other to make the number feel usable.",
  ]),
  defineContentSection("Conversion formula", [
    "To convert meters to feet, multiply by 3.28084. That means 1 meter equals about 3.28 feet, 2 meters is about 6.56 feet, and 10 meters is just over 32.8 feet. The rough feel is easy enough to remember, but the exact number is still helpful when you are checking fit, comparing clearances, or working from plans.",
  ]),
  defineContentSection("Common meters to feet values", [
    "A 2.4-meter ceiling converts to roughly 7.87 feet. A 100-meter sprint is about 328.08 feet. A 5-meter wall width is around 16.4 feet. These are practical examples that show up in architecture, sport, and real estate, which is why this conversion is more common than it first sounds.",
  ]),
  defineContentSection("When it is useful", [
    "Use meters to feet conversion for room measurements, event layouts, construction drawings, and athletic distances. It is especially helpful when a specification is written in metric but the people reading it think in feet. A dedicated converter gives a quick answer and also makes repeated reference checks easier than redoing the math every time.",
  ]),
);

export const metersToFeetFaqs = defineFaqs(
  defineFaq("How many feet are in 1 meter?", "1 meter equals about 3.28084 feet."),
  defineFaq(
    "What is the formula to convert meters to feet?",
    "Multiply meters by 3.28084 to convert them to feet.",
  ),
  defineFaq(
    "Is 2 meters about 6.5 feet?",
    "Yes. 2 meters converts to about 6.56 feet, so 6.5 feet is a reasonable quick estimate.",
  ),
  defineFaq(
    "When do people use meters to feet conversion?",
    "It is common in room measurements, building plans, event layouts, and sports distances.",
  ),
);

export const feetToMetersStructuredContent = defineStructuredContent(
  "About converting feet to meters",
  defineContentSection("A common metric translation for familiar imperial measurements", [
    "Feet are often the natural way people describe height, room dimensions, and clearance, but meters are the required format in many technical, international, and official contexts. That makes feet to meters a practical conversion whenever an imperial measurement has to become a metric one. It shows up in travel, architecture, sports, and product planning more often than people expect.",
  ]),
  defineContentSection("Conversion formula", [
    "The exact conversion is simple: multiply feet by 0.3048. Since the international foot is defined as exactly 0.3048 meters, the math is stable and precise. A 6-foot height becomes 1.8288 meters, 10 feet becomes 3.048 meters, and 25 feet becomes 7.62 meters. Those are the kinds of values people need for accurate comparisons, not just estimates.",
  ]),
  defineContentSection("Common feet to meters values", [
    "A 5-foot person is about 1.524 meters tall. An 8-foot ceiling is roughly 2.438 meters. A 50-foot distance works out to 15.24 meters. These are real reference points for interior measurements, landscaping, event setups, and travel planning where meters may be the required unit for the final answer.",
  ]),
  defineContentSection("When it is useful", [
    "Feet to meters is useful when a familiar imperial number needs to fit a metric workflow. That includes architectural drawings, global shipping details, sports measurements, and height conversions for forms or product specs. A dedicated page is easier than relying on memory, especially when the difference between a rough guess and an exact value matters.",
  ]),
);

export const feetToMetersFaqs = defineFaqs(
  defineFaq("How many meters are in 1 foot?", "1 foot equals exactly 0.3048 meters."),
  defineFaq(
    "What is the formula to convert feet to meters?",
    "Multiply feet by 0.3048 to convert them to meters.",
  ),
  defineFaq(
    "Why is the feet to meters conversion exact?",
    "Because the international foot is officially defined as exactly 0.3048 meters.",
  ),
  defineFaq(
    "Where is feet to meters conversion most useful?",
    "It is useful for architecture, room planning, travel forms, sports distances, and international product specs.",
  ),
);

export const milesToKmStructuredContent = defineStructuredContent(
  "About converting miles to kilometers",
  defineContentSection("Distance is often reported in whichever system the source prefers", [
    "Miles are familiar for roads, running routes, and vehicle travel in some countries, while kilometers dominate maps and distance references in much of the rest of the world. That makes miles to km a common translation rather than a niche calculation. People use it when race distances, road signs, or travel plans need to be understood in a metric frame.",
  ]),
  defineContentSection("Conversion formula", [
    "To convert miles to kilometers, multiply by 1.60934. One mile is a little more than one and a half kilometers, which makes quick estimation possible even before you check the exact result. A 5-mile run becomes about 8.05 km, a 10-mile drive is 16.09 km, and a marathon distance of 26.2 miles converts to roughly 42.16 km.",
  ]),
  defineContentSection("Common miles to km values", [
    "A 1-mile walk is 1.609 km. A 3-mile route becomes about 4.83 km. A 50-mile road trip is around 80.47 km. Those examples matter because they line up with the exact types of distances people compare while running, driving, cycling, or planning international travel.",
  ]),
  defineContentSection("When it is useful", [
    "This conversion is especially useful for fitness apps, race planning, route comparisons, and travel preparation. Someone used to mile-based distances may need to interpret kilometer markers abroad, while a runner may want to compare training sessions written in different systems. A dedicated converter keeps that translation fast and reduces the friction of switching contexts.",
  ]),
);

export const milesToKmFaqs = defineFaqs(
  defineFaq("How many kilometers are in 1 mile?", "1 mile equals 1.60934 kilometers."),
  defineFaq(
    "What is the formula to convert miles to kilometers?",
    "Multiply miles by 1.60934 to convert them to kilometers.",
  ),
  defineFaq(
    "Is a 5-mile run about 8 kilometers?",
    "Yes. 5 miles converts to about 8.05 kilometers.",
  ),
  defineFaq(
    "When is miles to km conversion most useful?",
    "It is useful for race distances, road trips, route planning, maps, and international travel.",
  ),
);

export const fahrenheitToCelsiusStructuredContent = defineStructuredContent(
  "About converting Fahrenheit to Celsius",
  defineContentSection("Why this temperature conversion matters so often", [
    "Fahrenheit is still the default for many everyday temperature references in the United States, while Celsius is standard in most other countries and in many scientific contexts. That means Fahrenheit to Celsius is a practical translation for weather, cooking, travel, and technical reading. People use it whenever a familiar Fahrenheit number needs to become a metric temperature without guesswork.",
  ]),
  defineContentSection("Conversion formula", [
    "The exact formula is to subtract 32 from Fahrenheit, then multiply by 5/9. The subtraction matters because the two scales do not begin at the same zero point. A 32°F reading becomes 0°C, 68°F becomes 20°C, and 212°F becomes 100°C. Once you know those anchor values, the scale starts to feel more intuitive.",
  ]),
  defineContentSection("Common Fahrenheit to Celsius values", [
    "A mild day at 50°F is 10°C. A comfortable room around 72°F is about 22.2°C. A hot 86°F afternoon converts to 30°C. These are exactly the kinds of comparisons people make when reading forecasts, setting ovens, or translating household instructions into a format they recognize immediately.",
  ]),
  defineContentSection("When it is useful", [
    "This converter is useful for travel, weather interpretation, cooking, and technical reference work. It helps when a Fahrenheit number appears in an app, appliance, or document but the rest of your tools and instincts are based on Celsius. A focused page keeps the formula, examples, and reference values in one place so the temperature is easier to interpret accurately.",
  ]),
);

export const fahrenheitToCelsiusFaqs = defineFaqs(
  defineFaq("How many Celsius is 1 Fahrenheit?", "1 degree Fahrenheit equals about -17.2222 degrees Celsius."),
  defineFaq(
    "What is the formula to convert Fahrenheit to Celsius?",
    "Subtract 32 from Fahrenheit, then multiply the result by 5/9.",
  ),
  defineFaq(
    "Why does Fahrenheit to Celsius need subtracting 32 first?",
    "Because Fahrenheit and Celsius use different zero points, so the value has to be shifted before scaling.",
  ),
  defineFaq(
    "Where is Fahrenheit to Celsius conversion most useful?",
    "It is useful for forecasts, ovens, travel, science references, and appliance settings.",
  ),
);

export const gbToMbStructuredContent = defineStructuredContent(
  "About converting gigabytes to megabytes",
  defineContentSection("Why this file-size conversion is so common", [
    "Gigabytes and megabytes often describe different levels of the same storage question. A drive or plan may be listed in gigabytes, while a file export, attachment limit, or download is shown in megabytes. That makes GB to MB a common conversion whenever a large storage unit needs to be translated into a more detailed file-size view. It is especially useful when you are checking whether one big allowance can handle many smaller files.",
  ]),
  defineContentSection("Conversion formula", [
    "This page uses the binary relationship common in technical storage reporting: multiply gigabytes by 1024 to get megabytes. That means 1 GB equals 1024 MB, 2 GB equals 2048 MB, and 5 GB equals 5120 MB. The binary approach matches how many operating systems and file tools describe storage, which helps keep the math consistent with what you see elsewhere.",
  ]),
  defineContentSection("Common GB to MB values", [
    "A 0.5 GB file is 512 MB. A 4 GB archive converts to 4096 MB. A 10 GB transfer budget becomes 10,240 MB. These are practical examples for uploads, backups, installers, media exports, and storage planning where MB gives a more concrete sense of how much room a file or quota represents.",
  ]),
  defineContentSection("When it is useful", [
    "Use GB to MB conversion when you need to compare storage allowances, upload caps, or project sizes at a more detailed level. It helps teams estimate how many files fit under a limit, compare download sizes, and understand cloud or hosting quotas. A dedicated converter makes those checks faster and clearer than doing binary math manually every time.",
  ]),
);

export const gbToMbFaqs = defineFaqs(
  defineFaq("How many megabytes are in 1 gigabyte?", "1 gigabyte equals 1024 megabytes in binary conversion."),
  defineFaq(
    "What is the formula to convert GB to MB?",
    "Multiply gigabytes by 1024 to convert them to megabytes.",
  ),
  defineFaq(
    "Why does GB to MB use 1024?",
    "This converter follows binary storage units, where 1 GB equals 1024 MB.",
  ),
  defineFaq(
    "When do people use GB to MB conversion?",
    "It is useful for upload limits, file-size comparisons, media exports, backups, and storage planning.",
  ),
);
