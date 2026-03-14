import {
  defineContentSection,
  defineFaq,
  defineFaqs,
  defineNumericPairPage,
  defineStructuredContent,
} from "./registry-helpers";

const kgToLbsLongDescription = defineStructuredContent(
  "About converting kilograms to pounds",
  defineContentSection("Why this conversion comes up so often", [
    "Kilograms and pounds both measure weight, but they show up in different parts of daily life. Kilograms are standard in most countries, while pounds are still the familiar unit in the United States for body weight, gym plates, luggage limits, and many product listings. That makes kg to lbs one of the most common conversion checks on the web. If you are reading a fitness plan written in kilograms, comparing baggage rules before a flight, or trying to understand an imported product label, this is usually the conversion you need first.",
  ]),
  defineContentSection("Conversion formula", [
    "The math is straightforward: multiply kilograms by 2.20462 to get pounds. In practice, that means 1 kg is a little more than 2.2 lb, 5 kg is just over 11 lb, and 10 kg lands around 22 lb. That rough mental shortcut is often enough for quick estimates, but the exact figure matters when you are tracking progress in a workout app, checking a shipping rate threshold, or entering a precise number into a form.",
  ]),
  defineContentSection("Common kg to lbs values", [
    "A few familiar examples help make the relationship feel intuitive. A 2.5 kg dumbbell is about 5.51 lb. A 20 kg barbell plate converts to roughly 44.09 lb. A suitcase weighing 23 kg, which is a common airline limit, is about 50.71 lb. Those are the kinds of numbers people look up repeatedly, especially when they move between metric and imperial references.",
  ]),
  defineContentSection("When this conversion is useful", [
    "This converter is especially practical for fitness tracking, travel, ecommerce, and shipping. Athletes often see workout programs listed in kilograms even if their local gym labels plates in pounds. Travelers use the conversion to avoid overweight baggage fees. Sellers and buyers may need to compare package weights across marketplaces that do not use the same unit system. A quick kg to lbs reference saves time, but a dedicated page with examples and a table makes it easier to avoid small mistakes that can have real consequences.",
  ]),
);

const cmToInchesLongDescription = defineStructuredContent(
  "About converting centimeters to inches",
  defineContentSection("A measurement bridge between metric and imperial", [
    "Centimeters and inches are constantly mixed in product specs, home projects, and personal measurements. A phone screen might be listed in inches, while packaging dimensions are shown in centimeters. Clothing size charts often jump between the two as well. That is why cm to inches is less of a niche conversion and more of an everyday translation between two systems that keep appearing side by side.",
  ]),
  defineContentSection("Conversion formula", [
    "The exact relationship is simple: divide centimeters by 2.54 to get inches. You can also multiply by 0.393701 if that is easier to remember. Since 2.54 centimeters equals exactly 1 inch, this is one of the cleaner length conversions to work with. For a quick estimate, 30 cm is a little under 12 inches, 50 cm is just under 20 inches, and 100 cm is about 39.37 inches.",
  ]),
  defineContentSection("Common cm to inches values", [
    "This conversion shows up in very practical moments. A 25 cm laptop width becomes about 9.84 inches. A 180 cm person is roughly 70.87 inches tall. A 60 cm desk depth works out to about 23.62 inches. These are the kinds of lookups people make while shopping online, measuring furniture, checking monitor sizes, or comparing body measurements across international charts.",
  ]),
  defineContentSection("When this conversion is useful", [
    "Centimeters to inches is especially useful when you buy products from global stores, follow DIY tutorials from another country, or compare screen and print dimensions. Designers and photographers may move between metric print sizes and inch-based display specs. Homeowners use it for furniture fit and room planning. Because the two systems often appear together rather than separately, having a dedicated converter with examples and a quick table is more helpful than relying on a vague mental estimate.",
  ]),
);

const kmToMilesLongDescription = defineStructuredContent(
  "About converting kilometers to miles",
  defineContentSection("Distance numbers are rarely presented in one system", [
    "Kilometers are the standard for road signs and maps in much of the world, while miles remain the default in places like the United States and the United Kingdom for many everyday references. That split makes km to miles a useful conversion for runners, drivers, cyclists, and travelers. You might see a race route in kilometers, a training plan in miles, or a travel itinerary that mixes both depending on the source.",
  ]),
  defineContentSection("Conversion formula", [
    "To convert kilometers to miles, multiply by 0.621371. Another way to think about it is that 1 mile is about 1.609 kilometers, so a kilometer is a bit more than half a mile. That makes rough estimates fairly manageable: 5 km is about 3.11 miles, 10 km is about 6.21 miles, and a half marathon distance of 21.1 km is close to 13.1 miles.",
  ]),
  defineContentSection("Common km to miles values", [
    "These reference points matter because they show up in real life. A 3 km walk is about 1.86 miles. A 42.2 km marathon converts to roughly 26.22 miles. A 100 km cycling route is about 62.14 miles. Those are not abstract figures. They are the actual numbers people use when training, comparing routes, or understanding distances while abroad.",
  ]),
  defineContentSection("When this conversion is useful", [
    "The practical use cases are broad: race planning, fitness apps, map reading, road-trip estimates, and travel preparation. Someone visiting Europe may want to understand distance markers in familiar mile-based terms. A runner might need to compare an international 10 km event to their usual 6-mile training route. In those moments, a clean km to miles converter is more than a calculator. It is a quick way to translate distance into something immediately meaningful.",
  ]),
);

const celsiusToFahrenheitLongDescription = `## About converting Celsius to Fahrenheit

### Temperature is one of the easiest places to get tripped up

Celsius and Fahrenheit both describe temperature, but they do not line up with a single multiplier the way many length or weight units do. Celsius is used in most countries for weather, science, and cooking, while Fahrenheit still dominates everyday temperature references in the United States. That means people regularly need a reliable Celsius to Fahrenheit conversion when reading forecasts, setting ovens, or interpreting technical instructions from another region.

### Conversion formula

The formula is exact: multiply Celsius by 9/5, then add 32. The added 32 matters because the two scales start from different zero points. For example, 0°C becomes 32°F, 20°C becomes 68°F, and 100°C becomes 212°F. Once you know those anchors, the formula becomes easier to understand instead of feeling like a random rule.

### Common Celsius to Fahrenheit values

Some of the most useful reference values come from everyday situations. A comfortable room temperature of 24°C converts to 75.2°F. A hot summer day at 30°C is 86°F. Water freezing at 0°C becomes 32°F, and boiling at 100°C becomes 212°F. These are the numbers people reach for when comparing weather apps, reading recipe temperatures, or checking science and engineering materials.

### When this conversion is useful

This conversion matters in travel, cooking, weather interpretation, and technical work. A traveler may land somewhere that reports temperatures in Celsius and want an immediate sense of whether the day feels cool or hot. A home cook might be following an international recipe with oven settings listed in Celsius. In science classrooms and lab settings, switching between the two scales is routine. A dedicated converter makes those situations faster and reduces mistakes where a few degrees can change the outcome.`;

const mbToGbLongDescription = `## About converting megabytes to gigabytes

### File sizes rarely stay in one unit for long

Megabytes and gigabytes are both common storage units, but they tend to appear at different stages of the same workflow. A download may be listed in megabytes, while a phone plan, cloud drive, or external disk is described in gigabytes. That is why MB to GB conversion is so common when you are estimating how much space a file really takes up or whether a transfer limit is enough.

### Conversion formula

This page uses the binary storage convention that many operating systems and technical tools still rely on: divide megabytes by 1024 to get gigabytes. So 1024 MB equals 1 GB, 2048 MB equals 2 GB, and 5120 MB equals 5 GB. Some marketing materials use decimal rounding with 1000 instead, which is one reason people get confused. A dedicated converter helps you avoid that mismatch.

### Common MB to GB values

A 128 MB file is 0.125 GB. A 700 MB video is about 0.684 GB. A 4096 MB archive works out to exactly 4 GB. These are practical numbers for uploads, downloads, game assets, media exports, and software installers. Instead of guessing whether a large file is “around a gig,” you can see the exact result immediately.

### When this conversion is useful

MB to GB comes up whenever you compare files to storage quotas. It is useful for checking email attachment sizes, estimating how much room a project folder will need, or deciding whether a dataset fits within a hosting or upload limit. Developers and content teams run into this constantly when compressing media, moving backups, or planning deployment artifacts. A simple converter helps turn raw file numbers into something easier to reason about.`;

const feetToCmLongDescription = `## About converting feet to centimeters

### This is one of the most common cross-system length conversions

Feet are deeply familiar in countries that use imperial measurements for height, room sizes, and construction references. Centimeters are the standard in most metric-based contexts, from medical records to product specs and international clothing charts. Because those worlds overlap so often, feet to centimeters is a conversion people make for both personal and practical reasons.

### Conversion formula

The formula is exact: multiply feet by 30.48 to get centimeters. That works because 1 foot equals 12 inches, and each inch is defined as 2.54 centimeters. Together, those values give 30.48 centimeters per foot. A 5-foot measurement becomes 152.4 cm, and 6 feet converts to 182.88 cm. That exactness is useful when a rounded estimate is not enough.

### Common feet to cm values

The most familiar examples are height-related. Someone who is 5 feet tall is 152.4 cm. A height of 5.5 feet is 167.64 cm. At 6 feet, the value is 182.88 cm. But the same conversion also matters for room plans, furniture sizing, and construction drawings where a metric spec is required even though the original measurement was taken in feet.

### When this conversion is useful

Feet to centimeters shows up in health forms, global ecommerce, interior design, and international project work. A person might need to convert their height for a visa application, school form, or sports roster. A shopper may compare furniture dimensions from a US store with a local space plan measured in centimeters. Builders and designers often move between systems as well. In all of those cases, having a clean converter with examples and a quick table is faster and safer than estimating by memory.`;

const inchesToFeetLongDescription = `## About converting inches to feet

### Smaller measurements often need a cleaner whole-unit view

Inches are useful when you need detail, but feet are often better for describing overall size. That is why inches to feet is a practical conversion for furniture, room layouts, building materials, and screens. A measurement written as 72 inches may be accurate, but 6 feet is easier to picture immediately. The conversion helps turn a detailed number into a more readable one.

### Conversion formula

The math is simple: divide inches by 12 to get feet. Since 12 inches make exactly 1 foot, this is one of the easiest imperial conversions to understand mentally. A 24-inch object is 2 feet long, 48 inches is 4 feet, and 96 inches becomes 8 feet. That straightforward ratio makes the conversion fast, but it is still helpful to have an exact calculator when decimals enter the picture.

### Common inches to feet values

Many everyday measurements fall right into this range. A 30-inch countertop depth converts to 2.5 feet. A 72-inch sofa is 6 feet long. An 84-inch doorway clearance becomes 7 feet. Even television and monitor dimensions are often discussed in inches while the room planning around them happens in feet.

### When this conversion is useful

This converter is especially handy for interior planning, construction, woodworking, and event setup. It helps when you are checking whether furniture fits, comparing lumber lengths, or reading architectural notes that mix inches and feet. People also use it when translating product specs into room dimensions that feel more intuitive. When you need to move quickly from a detailed inch value to a practical feet-based measurement, a dedicated converter removes the friction.`;

const cupsToOzLongDescription = `## About converting cups to fluid ounces

### Kitchen measurements often shift depending on the recipe source

Cups and fluid ounces are both common in US cooking, but recipes, drink labels, and mixing instructions do not always use the same unit. One recipe may call for 2 cups of broth, while a bottle is marked in ounces. Another might list a serving size in fluid ounces even though your measuring tools are cup-based. That is where a cups to oz converter becomes genuinely useful rather than just convenient.

### Conversion formula

For US volume measurements, the rule is direct: multiply cups by 8 to get fluid ounces. One cup equals 8 fluid ounces, half a cup equals 4 fluid ounces, and 2 cups equals 16 fluid ounces. The important detail is that this page refers to fluid ounces, which measure volume, not weight ounces used for solids on a scale.

### Common cups to oz values

A quarter cup converts to 2 fluid ounces. Three quarters of a cup is 6 fluid ounces. Two cups equal 16 fluid ounces, which is a very common reference point for soups, smoothies, and baking ingredients. These are practical numbers that come up when scaling recipes, portioning drinks, or comparing package sizes at the store.

### When this conversion is useful

Cups to fluid ounces is most useful in cooking, meal prep, beverage mixing, and nutrition tracking. It helps when recipes use cups but bottles, cartons, and nutrition labels use ounces. It is also useful when scaling servings up or down without rewriting an entire ingredient list. A dedicated converter with examples and a quick table saves time and helps avoid the classic mistake of confusing fluid ounces with weight ounces.`;

const ozToMlLongDescription = `## About converting fluid ounces to milliliters

### Packaging and recipes frequently cross US and metric volume units

Fluid ounces are common on US drink labels, cosmetics, and recipes, while milliliters are the standard on most international packaging and measuring tools. That makes oz to ml one of the most useful volume conversions for everyday life. Whether you are reading a bottle, following a cocktail recipe, or comparing skincare product sizes from different markets, this conversion helps translate the label into a unit you can use right away.

### Conversion formula

This page uses US fluid ounces. To convert them to milliliters, multiply by 29.5735. That means 1 fluid ounce is about 29.57 ml, 8 fluid ounces is about 236.59 ml, and 16 fluid ounces is roughly 473.18 ml. The word “fluid” matters here because these ounces measure volume, not weight.

### Common oz to ml values

The reference values are very practical. A 2 oz pour is about 59.15 ml. An 8 oz glass is about 236.59 ml. A 12 oz can comes to roughly 354.88 ml. Those are exactly the kinds of measurements people look up for drinks, recipes, and product comparisons.

### When this conversion is useful

Fluid ounces to milliliters is useful for cooking, bar prep, beverage service, cosmetics, and ecommerce. Someone buying a product from another country may want to compare a 100 ml bottle to an ounce-based label they already know. A home cook may need to convert a US recipe into metric measuring cups or a kitchen scale workflow. Because ounces can mean two different things depending on context, a focused converter helps remove ambiguity and gives you the correct volume conversion quickly.`;

const gbToTbLongDescription = `## About converting gigabytes to terabytes

### Large storage numbers are easier to evaluate in the right unit

Gigabytes are common for individual files, games, app libraries, and monthly usage totals. Terabytes are more useful when you zoom out to drives, backup systems, media collections, and cloud storage plans. As soon as file counts start piling up, GB to TB becomes the conversion that tells you whether a pile of data is still manageable or already pushing into higher-capacity territory.

### Conversion formula

This converter uses the binary relationship common in technical storage contexts: divide gigabytes by 1024 to get terabytes. So 1024 GB equals 1 TB, 2048 GB equals 2 TB, and 5120 GB comes out to 5 TB. The math is simple once you know the divisor, but it is still easy to make mistakes when jumping between marketing labels, operating system reports, and hosting dashboards.

### Common GB to TB values

A 256 GB drive is 0.25 TB. A 512 GB SSD is 0.5 TB. A 2048 GB storage pool equals 2 TB. These are familiar numbers when you compare laptop storage, external drives, NAS setups, or cloud plans. The conversion helps you see whether smaller gigabyte figures add up to something much larger in practical terms.

### When this conversion is useful

GB to TB is especially helpful for storage planning, backups, media workflows, and server management. Video teams use it to estimate how quickly footage will fill a drive. Developers and IT teams use it when planning snapshots, logs, and deployment artifacts across environments. Home users run into it when comparing disk upgrades or deciding how much cloud storage they actually need. A dedicated converter makes those decisions clearer by translating many smaller gigabyte figures into a terabyte total you can plan around.`;

const kgToLbsStructuredContent = defineStructuredContent(
  "About converting kilograms to pounds",
  defineContentSection("Why this conversion comes up so often", [
    "Kilograms and pounds both measure weight, but they show up in different parts of daily life. Kilograms are standard in most countries, while pounds are still the familiar unit in the United States for body weight, gym plates, luggage limits, and many product listings. That makes kg to lbs one of the most common conversion checks on the web. If you are reading a fitness plan written in kilograms, comparing baggage rules before a flight, or trying to understand an imported product label, this is usually the conversion you need first.",
  ]),
  defineContentSection("Conversion formula", [
    "The math is straightforward: multiply kilograms by 2.20462 to get pounds. In practice, that means 1 kg is a little more than 2.2 lb, 5 kg is just over 11 lb, and 10 kg lands around 22 lb. That rough mental shortcut is often enough for quick estimates, but the exact figure matters when you are tracking progress in a workout app, checking a shipping rate threshold, or entering a precise number into a form.",
  ]),
  defineContentSection("Common kg to lbs values", [
    "A few familiar examples help make the relationship feel intuitive. A 2.5 kg dumbbell is about 5.51 lb. A 20 kg barbell plate converts to roughly 44.09 lb. A suitcase weighing 23 kg, which is a common airline limit, is about 50.71 lb. Those are the kinds of numbers people look up repeatedly, especially when they move between metric and imperial references.",
  ]),
  defineContentSection("When this conversion is useful", [
    "This converter is especially practical for fitness tracking, travel, ecommerce, and shipping. Athletes often see workout programs listed in kilograms even if their local gym labels plates in pounds. Travelers use the conversion to avoid overweight baggage fees. Sellers and buyers may need to compare package weights across marketplaces that do not use the same unit system. A quick kg to lbs reference saves time, but a dedicated page with examples and a table makes it easier to avoid small mistakes that can have real consequences.",
  ]),
);

const cmToInchesStructuredContent = defineStructuredContent(
  "About converting centimeters to inches",
  defineContentSection("A measurement bridge between metric and imperial", [
    "Centimeters and inches are constantly mixed in product specs, home projects, and personal measurements. A phone screen might be listed in inches, while packaging dimensions are shown in centimeters. Clothing size charts often jump between the two as well. That is why cm to inches is less of a niche conversion and more of an everyday translation between two systems that keep appearing side by side.",
  ]),
  defineContentSection("Conversion formula", [
    "The exact relationship is simple: divide centimeters by 2.54 to get inches. You can also multiply by 0.393701 if that is easier to remember. Since 2.54 centimeters equals exactly 1 inch, this is one of the cleaner length conversions to work with. For a quick estimate, 30 cm is a little under 12 inches, 50 cm is just under 20 inches, and 100 cm is about 39.37 inches.",
  ]),
  defineContentSection("Common cm to inches values", [
    "This conversion shows up in very practical moments. A 25 cm laptop width becomes about 9.84 inches. A 180 cm person is roughly 70.87 inches tall. A 60 cm desk depth works out to about 23.62 inches. These are the kinds of lookups people make while shopping online, measuring furniture, checking monitor sizes, or comparing body measurements across international charts.",
  ]),
  defineContentSection("When this conversion is useful", [
    "Centimeters to inches is especially useful when you buy products from global stores, follow DIY tutorials from another country, or compare screen and print dimensions. Designers and photographers may move between metric print sizes and inch-based display specs. Homeowners use it for furniture fit and room planning. Because the two systems often appear together rather than separately, having a dedicated converter with examples and a quick table is more helpful than relying on a vague mental estimate.",
  ]),
);

const kmToMilesStructuredContent = defineStructuredContent(
  "About converting kilometers to miles",
  defineContentSection("Distance numbers are rarely presented in one system", [
    "Kilometers are the standard for road signs and maps in much of the world, while miles remain the default in places like the United States and the United Kingdom for many everyday references. That split makes km to miles a useful conversion for runners, drivers, cyclists, and travelers. You might see a race route in kilometers, a training plan in miles, or a travel itinerary that mixes both depending on the source.",
  ]),
  defineContentSection("Conversion formula", [
    "To convert kilometers to miles, multiply by 0.621371. Another way to think about it is that 1 mile is about 1.609 kilometers, so a kilometer is a bit more than half a mile. That makes rough estimates fairly manageable: 5 km is about 3.11 miles, 10 km is about 6.21 miles, and a half marathon distance of 21.1 km is close to 13.1 miles.",
  ]),
  defineContentSection("Common km to miles values", [
    "These reference points matter because they show up in real life. A 3 km walk is about 1.86 miles. A 42.2 km marathon converts to roughly 26.22 miles. A 100 km cycling route is about 62.14 miles. Those are not abstract figures. They are the actual numbers people use when training, comparing routes, or understanding distances while abroad.",
  ]),
  defineContentSection("When this conversion is useful", [
    "The practical use cases are broad: race planning, fitness apps, map reading, road-trip estimates, and travel preparation. Someone visiting Europe may want to understand distance markers in familiar mile-based terms. A runner might need to compare an international 10 km event to their usual 6-mile training route. In those moments, a clean km to miles converter is more than a calculator. It is a quick way to translate distance into something immediately meaningful.",
  ]),
);

const celsiusToFahrenheitStructuredContent = defineStructuredContent(
  "About converting Celsius to Fahrenheit",
  defineContentSection("Temperature is one of the easiest places to get tripped up", [
    "Celsius and Fahrenheit both describe temperature, but they do not line up with a single multiplier the way many length or weight units do. Celsius is used in most countries for weather, science, and cooking, while Fahrenheit still dominates everyday temperature references in the United States. That means people regularly need a reliable Celsius to Fahrenheit conversion when reading forecasts, setting ovens, or interpreting technical instructions from another region.",
  ]),
  defineContentSection("Conversion formula", [
    "The formula is exact: multiply Celsius by 9/5, then add 32. The added 32 matters because the two scales start from different zero points. For example, 0°C becomes 32°F, 20°C becomes 68°F, and 100°C becomes 212°F. Once you know those anchors, the formula becomes easier to understand instead of feeling like a random rule.",
  ]),
  defineContentSection("Common Celsius to Fahrenheit values", [
    "Some of the most useful reference values come from everyday situations. A comfortable room temperature of 24°C converts to 75.2°F. A hot summer day at 30°C is 86°F. Water freezing at 0°C becomes 32°F, and boiling at 100°C becomes 212°F. These are the numbers people reach for when comparing weather apps, reading recipe temperatures, or checking science and engineering materials.",
  ]),
  defineContentSection("When this conversion is useful", [
    "This conversion matters in travel, cooking, weather interpretation, and technical work. A traveler may land somewhere that reports temperatures in Celsius and want an immediate sense of whether the day feels cool or hot. A home cook might be following an international recipe with oven settings listed in Celsius. In science classrooms and lab settings, switching between the two scales is routine. A dedicated converter makes those situations faster and reduces mistakes where a few degrees can change the outcome.",
  ]),
);

const mbToGbStructuredContent = defineStructuredContent(
  "About converting megabytes to gigabytes",
  defineContentSection("File sizes rarely stay in one unit for long", [
    "Megabytes and gigabytes are both common storage units, but they tend to appear at different stages of the same workflow. A download may be listed in megabytes, while a phone plan, cloud drive, or external disk is described in gigabytes. That is why MB to GB conversion is so common when you are estimating how much space a file really takes up or whether a transfer limit is enough.",
  ]),
  defineContentSection("Conversion formula", [
    "This page uses the binary storage convention that many operating systems and technical tools still rely on: divide megabytes by 1024 to get gigabytes. So 1024 MB equals 1 GB, 2048 MB equals 2 GB, and 5120 MB equals 5 GB. Some marketing materials use decimal rounding with 1000 instead, which is one reason people get confused. A dedicated converter helps you avoid that mismatch.",
  ]),
  defineContentSection("Common MB to GB values", [
    "A 128 MB file is 0.125 GB. A 700 MB video is about 0.684 GB. A 4096 MB archive works out to exactly 4 GB. These are practical numbers for uploads, downloads, game assets, media exports, and software installers. Instead of guessing whether a large file is around a gig, you can see the exact result immediately.",
  ]),
  defineContentSection("When this conversion is useful", [
    "MB to GB comes up whenever you compare files to storage quotas. It is useful for checking email attachment sizes, estimating how much room a project folder will need, or deciding whether a dataset fits within a hosting or upload limit. Developers and content teams run into this constantly when compressing media, moving backups, or planning deployment artifacts. A simple converter helps turn raw file numbers into something easier to reason about.",
  ]),
);

const feetToCmStructuredContent = defineStructuredContent(
  "About converting feet to centimeters",
  defineContentSection("This is one of the most common cross-system length conversions", [
    "Feet are deeply familiar in countries that use imperial measurements for height, room sizes, and construction references. Centimeters are the standard in most metric-based contexts, from medical records to product specs and international clothing charts. Because those worlds overlap so often, feet to centimeters is a conversion people make for both personal and practical reasons.",
  ]),
  defineContentSection("Conversion formula", [
    "The formula is exact: multiply feet by 30.48 to get centimeters. That works because 1 foot equals 12 inches, and each inch is defined as 2.54 centimeters. Together, those values give 30.48 centimeters per foot. A 5-foot measurement becomes 152.4 cm, and 6 feet converts to 182.88 cm. That exactness is useful when a rounded estimate is not enough.",
  ]),
  defineContentSection("Common feet to cm values", [
    "The most familiar examples are height-related. Someone who is 5 feet tall is 152.4 cm. A height of 5.5 feet is 167.64 cm. At 6 feet, the value is 182.88 cm. But the same conversion also matters for room plans, furniture sizing, and construction drawings where a metric spec is required even though the original measurement was taken in feet.",
  ]),
  defineContentSection("When this conversion is useful", [
    "Feet to centimeters shows up in health forms, global ecommerce, interior design, and international project work. A person might need to convert their height for a visa application, school form, or sports roster. A shopper may compare furniture dimensions from a US store with a local space plan measured in centimeters. Builders and designers often move between systems as well. In all of those cases, having a clean converter with examples and a quick table is faster and safer than estimating by memory.",
  ]),
);

const inchesToFeetStructuredContent = defineStructuredContent(
  "About converting inches to feet",
  defineContentSection("Smaller measurements often need a cleaner whole-unit view", [
    "Inches are useful when you need detail, but feet are often better for describing overall size. That is why inches to feet is a practical conversion for furniture, room layouts, building materials, and screens. A measurement written as 72 inches may be accurate, but 6 feet is easier to picture immediately. The conversion helps turn a detailed number into a more readable one.",
  ]),
  defineContentSection("Conversion formula", [
    "The math is simple: divide inches by 12 to get feet. Since 12 inches make exactly 1 foot, this is one of the easiest imperial conversions to understand mentally. A 24-inch object is 2 feet long, 48 inches is 4 feet, and 96 inches becomes 8 feet. That straightforward ratio makes the conversion fast, but it is still helpful to have an exact calculator when decimals enter the picture.",
  ]),
  defineContentSection("Common inches to feet values", [
    "Many everyday measurements fall right into this range. A 30-inch countertop depth converts to 2.5 feet. A 72-inch sofa is 6 feet long. An 84-inch doorway clearance becomes 7 feet. Even television and monitor dimensions are often discussed in inches while the room planning around them happens in feet.",
  ]),
  defineContentSection("When this conversion is useful", [
    "This converter is especially handy for interior planning, construction, woodworking, and event setup. It helps when you are checking whether furniture fits, comparing lumber lengths, or reading architectural notes that mix inches and feet. People also use it when translating product specs into room dimensions that feel more intuitive. When you need to move quickly from a detailed inch value to a practical feet-based measurement, a dedicated converter removes the friction.",
  ]),
);

const cupsToOzStructuredContent = defineStructuredContent(
  "About converting cups to fluid ounces",
  defineContentSection("Kitchen measurements often shift depending on the recipe source", [
    "Cups and fluid ounces are both common in US cooking, but recipes, drink labels, and mixing instructions do not always use the same unit. One recipe may call for 2 cups of broth, while a bottle is marked in ounces. Another might list a serving size in fluid ounces even though your measuring tools are cup-based. That is where a cups to oz converter becomes genuinely useful rather than just convenient.",
  ]),
  defineContentSection("Conversion formula", [
    "For US volume measurements, the rule is direct: multiply cups by 8 to get fluid ounces. One cup equals 8 fluid ounces, half a cup equals 4 fluid ounces, and 2 cups equals 16 fluid ounces. The important detail is that this page refers to fluid ounces, which measure volume, not weight ounces used for solids on a scale.",
  ]),
  defineContentSection("Common cups to oz values", [
    "A quarter cup converts to 2 fluid ounces. Three quarters of a cup is 6 fluid ounces. Two cups equal 16 fluid ounces, which is a very common reference point for soups, smoothies, and baking ingredients. These are practical numbers that come up when scaling recipes, portioning drinks, or comparing package sizes at the store.",
  ]),
  defineContentSection("When this conversion is useful", [
    "Cups to fluid ounces is most useful in cooking, meal prep, beverage mixing, and nutrition tracking. It helps when recipes use cups but bottles, cartons, and nutrition labels use ounces. It is also useful when scaling servings up or down without rewriting an entire ingredient list. A dedicated converter with examples and a quick table saves time and helps avoid the classic mistake of confusing fluid ounces with weight ounces.",
  ]),
);

const ozToMlStructuredContent = defineStructuredContent(
  "About converting fluid ounces to milliliters",
  defineContentSection("Packaging and recipes frequently cross US and metric volume units", [
    "Fluid ounces are common on US drink labels, cosmetics, and recipes, while milliliters are the standard on most international packaging and measuring tools. That makes oz to ml one of the most useful volume conversions for everyday life. Whether you are reading a bottle, following a cocktail recipe, or comparing skincare product sizes from different markets, this conversion helps translate the label into a unit you can use right away.",
  ]),
  defineContentSection("Conversion formula", [
    "This page uses US fluid ounces. To convert them to milliliters, multiply by 29.5735. That means 1 fluid ounce is about 29.57 ml, 8 fluid ounces is about 236.59 ml, and 16 fluid ounces is roughly 473.18 ml. The word fluid matters here because these ounces measure volume, not weight.",
  ]),
  defineContentSection("Common oz to ml values", [
    "The reference values are very practical. A 2 oz pour is about 59.15 ml. An 8 oz glass is about 236.59 ml. A 12 oz can comes to roughly 354.88 ml. Those are exactly the kinds of measurements people look up for drinks, recipes, and product comparisons.",
  ]),
  defineContentSection("When this conversion is useful", [
    "Fluid ounces to milliliters is useful for cooking, bar prep, beverage service, cosmetics, and ecommerce. Someone buying a product from another country may want to compare a 100 ml bottle to an ounce-based label they already know. A home cook may need to convert a US recipe into metric measuring cups or a kitchen scale workflow. Because ounces can mean two different things depending on context, a focused converter helps remove ambiguity and gives you the correct volume conversion quickly.",
  ]),
);

const gbToTbStructuredContent = defineStructuredContent(
  "About converting gigabytes to terabytes",
  defineContentSection("Large storage numbers are easier to evaluate in the right unit", [
    "Gigabytes are common for individual files, games, app libraries, and monthly usage totals. Terabytes are more useful when you zoom out to drives, backup systems, media collections, and cloud storage plans. As soon as file counts start piling up, GB to TB becomes the conversion that tells you whether a pile of data is still manageable or already pushing into higher-capacity territory.",
  ]),
  defineContentSection("Conversion formula", [
    "This converter uses the binary relationship common in technical storage contexts: divide gigabytes by 1024 to get terabytes. So 1024 GB equals 1 TB, 2048 GB equals 2 TB, and 5120 GB comes out to 5 TB. The math is simple once you know the divisor, but it is still easy to make mistakes when jumping between marketing labels, operating system reports, and hosting dashboards.",
  ]),
  defineContentSection("Common GB to TB values", [
    "A 256 GB drive is 0.25 TB. A 512 GB SSD is 0.5 TB. A 2048 GB storage pool equals 2 TB. These are familiar numbers when you compare laptop storage, external drives, NAS setups, or cloud plans. The conversion helps you see whether smaller gigabyte figures add up to something much larger in practical terms.",
  ]),
  defineContentSection("When this conversion is useful", [
    "GB to TB is especially helpful for storage planning, backups, media workflows, and server management. Video teams use it to estimate how quickly footage will fill a drive. Developers and IT teams use it when planning snapshots, logs, and deployment artifacts across environments. Home users run into it when comparing disk upgrades or deciding how much cloud storage they actually need. A dedicated converter makes those decisions clearer by translating many smaller gigabyte figures into a terabyte total you can plan around.",
  ]),
);

export const numericLongDescriptionDrafts = [
  kgToLbsLongDescription,
  cmToInchesLongDescription,
  kmToMilesLongDescription,
  celsiusToFahrenheitLongDescription,
  mbToGbLongDescription,
  feetToCmLongDescription,
  inchesToFeetLongDescription,
  cupsToOzLongDescription,
  ozToMlLongDescription,
  gbToTbLongDescription,
] as const;

export const weightPairPages = [
  defineNumericPairPage("weight", "kg", "lb", 75, [1, 5, 10, 25, 50, 100], {
    customLongDescription: kgToLbsStructuredContent,
    faq: defineFaqs(
      defineFaq("How many pounds are in 1 kilogram?", "1 kilogram equals 2.20462 pounds."),
      defineFaq(
        "What is the formula to convert kg to lbs?",
        "Multiply kilograms by 2.20462 to get pounds.",
      ),
      defineFaq(
        "Why do kilograms convert to 2.20462 pounds?",
        "Kilograms and pounds are different mass units, and 1 kilogram is defined as 2.20462 pounds.",
      ),
    ),
    featured: true,
    metaDescription:
      "How many pounds are in a kilogram? Convert kg to lbs fast with a free calculator, practical examples, and a quick reference formula.",
    popular: true,
  }),
  defineNumericPairPage("weight", "lb", "kg", 165, [1, 5, 10, 25, 50, 100], {
    faq: defineFaqs(
      defineFaq("How many kilograms are in 1 pound?", "1 pound equals 0.453592 kilograms."),
      defineFaq(
        "What is the formula to convert lbs to kg?",
        "Multiply pounds by 0.45359237 to convert them to kilograms.",
      ),
      defineFaq(
        "When do people use lbs to kg conversions?",
        "This conversion is common for body weight, gym tracking, shipping, and international product specs.",
      ),
    ),
    metaDescription:
      "Need pounds in kilograms? Use this lbs to kg converter for body weight, shipping, and training numbers with formula help and reference values.",
    popular: true,
  }),
  defineNumericPairPage("weight", "g", "oz", 500, [50, 100, 250, 500, 1000, 2000], {
    faq: defineFaqs(
      defineFaq("How many ounces are in 1 gram?", "1 gram equals about 0.035274 ounces."),
      defineFaq(
        "What is the formula to convert grams to ounces?",
        "Multiply grams by 0.035274 to convert them to ounces.",
      ),
      defineFaq(
        "When is grams to ounces conversion useful?",
        "It is helpful for recipes, nutrition labels, postage, and small product weights.",
      ),
    ),
    metaDescription:
      "Switch grams to ounces in seconds. Handy for recipes, product labels, and small package weights, with examples and a quick lookup table.",
    popular: true,
  }),
  defineNumericPairPage("weight", "oz", "g", 16, [1, 4, 8, 12, 16, 32], {
    faq: defineFaqs(
      defineFaq("How many grams are in 1 ounce?", "1 ounce equals 28.3495 grams."),
      defineFaq(
        "What is the formula to convert ounces to grams?",
        "Multiply ounces by 28.3495 to convert them to grams.",
      ),
      defineFaq(
        "Why would I convert ounces to grams?",
        "People often switch ounces to grams for recipes, food packaging, science work, and shipping details.",
      ),
    ),
    metaDescription:
      "See how many grams are in an ounce with a simple oz to grams calculator, conversion formula, and common values for food and shipping use.",
  }),
] as const;

export const lengthPairPages = [
  defineNumericPairPage("length", "cm", "inch", 30, [1, 5, 10, 25, 50, 100], {
    customLongDescription: cmToInchesStructuredContent,
    faq: defineFaqs(
      defineFaq("How many inches are in 1 centimeter?", "1 centimeter equals 0.393701 inches."),
      defineFaq(
        "What is the formula to convert cm to inches?",
        "Divide centimeters by 2.54, or multiply by 0.393701.",
      ),
      defineFaq(
        "When do people convert centimeters to inches?",
        "This is common for product dimensions, clothing sizes, screen measurements, and DIY planning.",
      ),
    ),
    featured: true,
    metaDescription:
      "Convert centimeters to inches instantly. Includes the formula, practical examples, and a quick conversion table for everyday measurements.",
    popular: true,
  }),
  defineNumericPairPage("length", "inch", "cm", 12, [1, 5, 10, 25, 50, 100], {
    faq: defineFaqs(
      defineFaq("How many centimeters are in 1 inch?", "1 inch equals 2.54 centimeters."),
      defineFaq(
        "What is the formula to convert inches to cm?",
        "Multiply inches by 2.54 to convert them to centimeters.",
      ),
      defineFaq(
        "Why is 2.54 used in the inches to cm conversion?",
        "The inch is internationally defined as exactly 2.54 centimeters.",
      ),
    ),
    metaDescription:
      "Use this inches to cm converter for screens, product sizes, and DIY measurements, with the exact formula and common inch-to-centimeter values.",
  }),
  defineNumericPairPage("length", "ft", "cm", 6, [1, 2, 3, 5, 6, 10], {
    customLongDescription: feetToCmStructuredContent,
    faq: defineFaqs(
      defineFaq("How many centimeters are in 1 foot?", "1 foot equals 30.48 centimeters."),
      defineFaq(
        "What is the formula to convert feet to cm?",
        "Multiply feet by 30.48 to get centimeters.",
      ),
      defineFaq(
        "Where is feet to cm conversion commonly used?",
        "It is often used for height, room dimensions, furniture sizing, and construction plans.",
      ),
    ),
    metaDescription:
      "Need feet in centimeters? This ft to cm converter is useful for height, room planning, and specs, with instant results and quick references.",
    popular: true,
  }),
  defineNumericPairPage("length", "cm", "ft", 180, [10, 30, 50, 100, 180, 200], {
    faq: defineFaqs(
      defineFaq("How many feet are in 1 centimeter?", "1 centimeter equals 0.0328084 feet."),
      defineFaq(
        "What is the formula to convert cm to feet?",
        "Divide centimeters by 30.48 to convert them to feet.",
      ),
      defineFaq(
        "Is cm to feet useful for height conversions?",
        "Yes. It is a common way to compare height and dimensions across metric and imperial systems.",
      ),
    ),
    metaDescription:
      "Find out how many feet are in a centimeter with a fast cm to feet calculator, formula walkthrough, and common reference conversions.",
  }),
  defineNumericPairPage("length", "m", "ft", 10, [1, 2, 5, 10, 25, 50], {
    faq: defineFaqs(
      defineFaq("How many feet are in 1 meter?", "1 meter equals about 3.28084 feet."),
      defineFaq(
        "What is the formula to convert meters to feet?",
        "Multiply meters by 3.28084 to convert them to feet.",
      ),
      defineFaq(
        "Why use meters to feet conversion?",
        "It helps compare room sizes, travel distances, and sports measurements across different systems.",
      ),
    ),
    metaDescription:
      "Convert meters to feet for building plans, sports distances, and room sizes using a simple calculator with formula notes and lookup values.",
    popular: true,
  }),
  defineNumericPairPage("length", "ft", "m", 25, [1, 5, 10, 25, 50, 100], {
    faq: defineFaqs(
      defineFaq("How many meters are in 1 foot?", "1 foot equals 0.3048 meters."),
      defineFaq(
        "What is the formula to convert feet to meters?",
        "Multiply feet by 0.3048 to convert them to meters.",
      ),
      defineFaq(
        "Why is 0.3048 the feet to meters factor?",
        "The international foot is defined as exactly 0.3048 meters.",
      ),
    ),
    metaDescription:
      "Use this feet to meters converter for travel, architecture, and training distances, with exact math, examples, and a quick reference table.",
  }),
  defineNumericPairPage("length", "inch", "ft", 72, [12, 24, 36, 48, 72, 96], {
    customLongDescription: inchesToFeetStructuredContent,
    faq: defineFaqs(
      defineFaq("How many feet are in 1 inch?", "1 inch equals 0.0833333 feet."),
      defineFaq(
        "What is the formula to convert inches to feet?",
        "Divide inches by 12 to convert them to feet.",
      ),
      defineFaq(
        "When should I use inches to feet conversion?",
        "It is useful for room layouts, furniture sizes, lumber measurements, and screen dimensions.",
      ),
    ),
    metaDescription:
      "Change inches into feet quickly for furniture sizing, screen dimensions, and construction work, with examples and a clean reference table.",
  }),
  defineNumericPairPage("length", "ft", "inch", 6, [1, 2, 3, 5, 6, 10], {
    faq: defineFaqs(
      defineFaq("How many inches are in 1 foot?", "1 foot equals exactly 12 inches."),
      defineFaq(
        "What is the formula to convert feet to inches?",
        "Multiply feet by 12 to convert them to inches.",
      ),
      defineFaq(
        "Why is feet to inches conversion so common?",
        "It is often used in construction, home projects, and measuring height or room dimensions.",
      ),
    ),
    metaDescription:
      "See how many inches are in a foot with this ft to inches converter, useful for plans, woodworking, and everyday measurement checks.",
  }),
  defineNumericPairPage("length", "km", "mile", 5, [1, 5, 10, 21.1, 42.2, 100], {
    customLongDescription: kmToMilesStructuredContent,
    faq: defineFaqs(
      defineFaq("How many miles are in 1 kilometer?", "1 kilometer equals about 0.621371 miles."),
      defineFaq(
        "What is the formula to convert km to miles?",
        "Multiply kilometers by 0.621371 to convert them to miles.",
      ),
      defineFaq(
        "Who usually needs a km to miles converter?",
        "Runners, travelers, drivers, and cyclists often convert kilometers to miles.",
      ),
    ),
    metaDescription:
      "Fast km to miles converter for distance calculations, travel planning, and running pace tracking, with formula help and reference values.",
    popular: true,
  }),
  defineNumericPairPage("length", "mile", "km", 3.1, [1, 3, 5, 10, 26.2, 50], {
    faq: defineFaqs(
      defineFaq("How many kilometers are in 1 mile?", "1 mile equals 1.60934 kilometers."),
      defineFaq(
        "What is the formula to convert miles to km?",
        "Multiply miles by 1.60934 to convert them to kilometers.",
      ),
      defineFaq(
        "Why convert miles to kilometers?",
        "It helps with race distances, road trips, maps, and international travel planning.",
      ),
    ),
    metaDescription:
      "Convert miles to kilometers for races, road trips, and route planning using a quick calculator, worked example, and handy lookup table.",
  }),
] as const;

export const volumePairPages = [
  defineNumericPairPage("volume", "ml", "cup", 500, [50, 100, 250, 500, 750, 1000], {
    faq: defineFaqs(
      defineFaq("How many cups are in 1 milliliter?", "1 milliliter equals about 0.00422675 cups."),
      defineFaq(
        "What is the formula to convert ml to cups?",
        "Divide milliliters by 236.588 to convert them to US cups.",
      ),
      defineFaq(
        "When do people use ml to cups conversion?",
        "It is useful for recipes, beverage prep, and reading packaging across metric and US measurements.",
      ),
    ),
    featured: true,
    metaDescription:
      "Convert milliliters to cups for cooking, baking, and packaging checks with a simple ml to cups calculator, formula, and common values.",
    popular: true,
  }),
  defineNumericPairPage("volume", "cup", "ml", 2, [0.25, 0.5, 1, 2, 3, 4], {
    faq: defineFaqs(
      defineFaq("How many milliliters are in 1 cup?", "1 US cup equals 236.588 milliliters."),
      defineFaq(
        "What is the formula to convert cups to ml?",
        "Multiply cups by 236.588 to convert them to milliliters.",
      ),
      defineFaq(
        "Why convert cups to milliliters?",
        "This helps when recipes, bottles, or product labels mix US and metric volume units.",
      ),
    ),
    metaDescription:
      "How many milliliters are in a cup? Use this cups to ml converter for recipes and product sizes, with examples and a quick reference chart.",
  }),
  defineNumericPairPage("volume", "floz", "ml", 8, [1, 2, 4, 8, 12, 16], {
    aliases: ["fl oz to ml", "floz to ml", "oz to ml", "fluid ounces to milliliters"],
    customLongDescription: ozToMlStructuredContent,
    faq: defineFaqs(
      defineFaq(
        "How many milliliters are in 1 fluid ounce?",
        "1 US fluid ounce equals 29.5735 milliliters.",
      ),
      defineFaq(
        "What is the formula to convert fl oz to ml?",
        "Multiply fluid ounces by 29.5735 to convert them to milliliters.",
      ),
      defineFaq(
        "Is this ounce conversion for volume or weight?",
        "This page uses US fluid ounces, which measure volume rather than weight.",
      ),
    ),
    metaDescription:
      "Change fl oz to ml in seconds. Great for drink recipes, nutrition labels, and bottle sizes, with formula and lookup values.",
    popular: true,
  }),
  defineNumericPairPage("volume", "ml", "floz", 500, [30, 50, 100, 250, 500, 1000], {
    aliases: ["ml to fl oz", "ml to floz", "ml to oz", "milliliters to fluid ounces"],
    faq: defineFaqs(
      defineFaq(
        "How many fluid ounces are in 1 milliliter?",
        "1 milliliter equals about 0.033814 fluid ounces.",
      ),
      defineFaq(
        "What is the formula to convert ml to fl oz?",
        "Multiply milliliters by 0.033814, or divide by 29.5735.",
      ),
      defineFaq(
        "Why use ml to oz conversion?",
        "It is handy for drinks, cosmetics, bottle sizes, and recipes that switch between metric and US measurements.",
      ),
    ),
    metaDescription:
      "Find fluid ounces from milliliters with a quick ml to fl oz converter for cooking, packaging, and beverage prep, plus formula and examples.",
  }),
  defineNumericPairPage("volume", "cup", "floz", 2, [0.25, 0.5, 1, 2, 3, 4], {
    aliases: ["cups to fl oz", "cups to floz", "cups to oz", "cups to fluid ounces"],
    customLongDescription: cupsToOzStructuredContent,
    faq: defineFaqs(
      defineFaq("How many ounces are in 1 cup?", "1 US cup equals 8 fluid ounces."),
      defineFaq(
        "What is the formula to convert cups to fl oz?",
        "Multiply cups by 8 to convert them to fluid ounces.",
      ),
      defineFaq(
        "Are cups to ounces and cups to grams the same?",
        "No. Cups to ounces measures volume here, while grams would depend on the ingredient weight.",
      ),
    ),
    metaDescription:
      "Convert cups to fl oz for recipe prep and kitchen measurements with an easy calculator, quick formula, and common cup-to-fluid-ounce references.",
  }),
  defineNumericPairPage("volume", "floz", "cup", 8, [1, 2, 4, 8, 12, 16], {
    aliases: ["fl oz to cups", "floz to cups", "oz to cups", "fluid ounces to cups"],
    faq: defineFaqs(
      defineFaq("How many cups are in 1 fluid ounce?", "1 fluid ounce equals 0.125 cups."),
      defineFaq(
        "What is the formula to convert fl oz to cups?",
        "Divide fluid ounces by 8 to convert them to cups.",
      ),
      defineFaq(
        "Why would I convert ounces to cups?",
        "It helps with recipe scaling, serving sizes, and comparing bottle or drink volumes.",
      ),
    ),
    metaDescription:
      "See how many cups are in a fluid ounce using this fl oz to cups converter, useful for recipes, serving sizes, and portion calculations.",
  }),
  defineNumericPairPage("volume", "l", "gal", 3, [0.5, 1, 2, 3, 5, 10], {
    faq: defineFaqs(
      defineFaq("How many gallons are in 1 liter?", "1 liter equals about 0.264172 US gallons."),
      defineFaq(
        "What is the formula to convert liters to gallons?",
        "Multiply liters by 0.264172 to convert them to US gallons.",
      ),
      defineFaq(
        "When is liters to gallons conversion useful?",
        "It is useful for fuel comparisons, drinks, tanks, and large liquid containers.",
      ),
    ),
    metaDescription:
      "Use this liters to gallons converter for fuel, beverages, and storage planning, with quick results, examples, and a handy formula.",
    popular: true,
  }),
  defineNumericPairPage("volume", "gal", "l", 1, [0.5, 1, 2, 5, 10, 20], {
    faq: defineFaqs(
      defineFaq("How many liters are in 1 gallon?", "1 US gallon equals 3.78541 liters."),
      defineFaq(
        "What is the formula to convert gallons to liters?",
        "Multiply gallons by 3.78541 to convert them to liters.",
      ),
      defineFaq(
        "Why convert gallons to liters?",
        "People use this conversion for fuel economy, liquid storage, and comparing US and metric container sizes.",
      ),
    ),
    metaDescription:
      "Convert gallons to liters for fuel use, liquids, and container sizes with a straightforward calculator and reference conversion table.",
  }),
] as const;

export const temperaturePairPages = [
  defineNumericPairPage("temperature", "c", "f", 24, [0, 10, 20, 30, 40, 100], {
    customLongDescription: celsiusToFahrenheitStructuredContent,
    faq: defineFaqs(
      defineFaq("How many Fahrenheit is 1 Celsius?", "1 degree Celsius equals 33.8 degrees Fahrenheit."),
      defineFaq(
        "What is the formula to convert Celsius to Fahrenheit?",
        "Multiply Celsius by 9/5, then add 32.",
      ),
      defineFaq(
        "Why do Celsius and Fahrenheit not use a single conversion factor?",
        "They have different zero points and step sizes, so the conversion needs multiplication and an offset.",
      ),
    ),
    featured: true,
    formulaLabel: "\u00b0F = (\u00b0C x 9/5) + 32",
    metaDescription:
      "Convert Celsius to Fahrenheit for weather, cooking, and science with the exact formula, worked examples, and quick reference values.",
  }),
  defineNumericPairPage("temperature", "f", "c", 72, [32, 50, 68, 72, 86, 104], {
    faq: defineFaqs(
      defineFaq(
        "How many Celsius is 1 Fahrenheit?",
        "1 degree Fahrenheit equals about -17.2222 degrees Celsius.",
      ),
      defineFaq(
        "What is the formula to convert Fahrenheit to Celsius?",
        "Subtract 32 from Fahrenheit, then multiply by 5/9.",
      ),
      defineFaq(
        "Why does Fahrenheit to Celsius include subtracting 32?",
        "Because Fahrenheit and Celsius start from different zero points on their scales.",
      ),
    ),
    formulaLabel: "\u00b0C = (\u00b0F - 32) x 5/9",
    metaDescription:
      "Need Fahrenheit in Celsius? Use this quick converter for forecasts, ovens, and lab work, with the formula and common temperature values.",
  }),
  defineNumericPairPage("temperature", "f", "k", 72, [32, 50, 68, 72, 86, 104], {
    faq: defineFaqs(
      defineFaq("How many Kelvin is 1 Fahrenheit?", "1 degree Fahrenheit equals about 255.928 Kelvin."),
      defineFaq(
        "What is the formula to convert Fahrenheit to Kelvin?",
        "Subtract 32, multiply by 5/9, then add 273.15.",
      ),
      defineFaq(
        "Why add 273.15 in the Fahrenheit to Kelvin formula?",
        "Kelvin starts at absolute zero, so the Celsius-based result must be shifted upward by 273.15.",
      ),
    ),
    formulaLabel: "K = ((\u00b0F - 32) x 5/9) + 273.15",
    metaDescription:
      "Convert Fahrenheit to Kelvin with the exact temperature formula, plus examples and quick reference values for science and lab calculations.",
    popular: true,
  }),
  defineNumericPairPage("temperature", "k", "f", 295.15, [250, 273.15, 295.15, 310.15, 373.15], {
    faq: defineFaqs(
      defineFaq("How many Fahrenheit is 1 Kelvin?", "1 Kelvin equals about -457.87 degrees Fahrenheit."),
      defineFaq(
        "What is the formula to convert Kelvin to Fahrenheit?",
        "Subtract 273.15 from Kelvin, multiply by 9/5, then add 32.",
      ),
      defineFaq(
        "Why does Kelvin to Fahrenheit use both subtraction and addition?",
        "The conversion has to shift from Kelvin to Celsius first, then from Celsius to the Fahrenheit scale.",
      ),
    ),
    formulaLabel: "\u00b0F = ((K - 273.15) x 9/5) + 32",
    metaDescription:
      "Use this Kelvin to Fahrenheit converter for lab work and technical calculations, with the full formula, examples, and common values.",
  }),
] as const;

export const dataPairPages = [
  defineNumericPairPage("data", "mb", "gb", 5120, [16, 64, 128, 256, 1024, 5120], {
    customLongDescription: mbToGbStructuredContent,
    faq: defineFaqs(
      defineFaq(
        "How many gigabytes are in 1 megabyte?",
        "1 megabyte equals 0.000976563 gigabytes in binary conversion.",
      ),
      defineFaq(
        "What is the formula to convert MB to GB?",
        "Divide megabytes by 1024 to convert them to gigabytes.",
      ),
      defineFaq(
        "Why does MB to GB use 1024 instead of 1000?",
        "This converter follows binary storage units, where 1 GB equals 1024 MB.",
      ),
    ),
    featured: true,
    metaDescription:
      "Convert megabytes to gigabytes for file sizes, uploads, and storage planning with a quick MB to GB calculator and reference table.",
    popular: true,
  }),
  defineNumericPairPage("data", "gb", "mb", 5, [0.5, 1, 2, 5, 10, 25], {
    faq: defineFaqs(
      defineFaq(
        "How many megabytes are in 1 gigabyte?",
        "1 gigabyte equals 1024 megabytes in binary conversion.",
      ),
      defineFaq(
        "What is the formula to convert GB to MB?",
        "Multiply gigabytes by 1024 to convert them to megabytes.",
      ),
      defineFaq(
        "When is GB to MB conversion helpful?",
        "It is useful for upload limits, storage planning, and comparing download or file sizes.",
      ),
    ),
    metaDescription:
      "See how many megabytes are in a gigabyte with this GB to MB converter, ideal for downloads, storage limits, and transfer planning.",
  }),
  defineNumericPairPage("data", "mb", "kb", 2, [0.25, 0.5, 1, 2, 5, 10], {
    faq: defineFaqs(
      defineFaq(
        "How many kilobytes are in 1 megabyte?",
        "1 megabyte equals 1024 kilobytes in binary conversion.",
      ),
      defineFaq(
        "What is the formula to convert MB to KB?",
        "Multiply megabytes by 1024 to convert them to kilobytes.",
      ),
      defineFaq(
        "Why would I convert MB to KB?",
        "This helps when checking small file sizes, export settings, and attachment limits.",
      ),
    ),
    metaDescription:
      "Convert MB to KB quickly for file sizing, exports, and upload checks, with binary conversion math, examples, and reference values.",
  }),
  defineNumericPairPage("data", "kb", "mb", 2048, [128, 256, 512, 1024, 2048, 4096], {
    faq: defineFaqs(
      defineFaq(
        "How many megabytes are in 1 kilobyte?",
        "1 kilobyte equals 0.000976563 megabytes in binary conversion.",
      ),
      defineFaq(
        "What is the formula to convert KB to MB?",
        "Divide kilobytes by 1024 to convert them to megabytes.",
      ),
      defineFaq(
        "Is KB to MB conversion useful for small files?",
        "Yes. It is often used for attachments, images, exports, and lightweight downloads.",
      ),
    ),
    metaDescription:
      "Need kilobytes in megabytes? This KB to MB converter helps with small files, attachment limits, and binary size calculations.",
    popular: true,
  }),
  defineNumericPairPage("data", "gb", "tb", 2048, [256, 512, 1024, 2048, 5120, 10240], {
    customLongDescription: gbToTbStructuredContent,
    faq: defineFaqs(
      defineFaq(
        "How many terabytes are in 1 gigabyte?",
        "1 gigabyte equals 0.000976563 terabytes in binary conversion.",
      ),
      defineFaq(
        "What is the formula to convert GB to TB?",
        "Divide gigabytes by 1024 to convert them to terabytes.",
      ),
      defineFaq(
        "When do I need GB to TB conversion?",
        "It is helpful for backup estimates, cloud storage planning, and comparing large drive capacities.",
      ),
    ),
    metaDescription:
      "Convert gigabytes to terabytes for storage planning, backups, and cloud estimates with quick math, examples, and a handy reference table.",
  }),
  defineNumericPairPage("data", "tb", "gb", 2, [0.25, 0.5, 1, 2, 5, 10], {
    faq: defineFaqs(
      defineFaq(
        "How many gigabytes are in 1 terabyte?",
        "1 terabyte equals 1024 gigabytes in binary conversion.",
      ),
      defineFaq(
        "What is the formula to convert TB to GB?",
        "Multiply terabytes by 1024 to convert them to gigabytes.",
      ),
      defineFaq(
        "Why is TB to GB conversion common?",
        "People use it for drive sizes, backup plans, hosting limits, and cloud storage estimates.",
      ),
    ),
    metaDescription:
      "Use this TB to GB converter to estimate drives, backups, and cloud usage with straightforward binary conversions and common values.",
  }),
] as const;
