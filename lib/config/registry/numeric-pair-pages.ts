import {
  defineContentSection,
  defineFaq,
  defineFaqs,
  defineNumericPairPage,
  defineStructuredContent,
} from "./registry-helpers";
import {
  fahrenheitToCelsiusFaqs,
  fahrenheitToCelsiusStructuredContent,
  feetToMetersFaqs,
  feetToMetersStructuredContent,
  gbToMbFaqs,
  gbToMbStructuredContent,
  inchesToCmFaqs,
  inchesToCmStructuredContent,
  lbsToKgFaqs,
  lbsToKgStructuredContent,
  metersToFeetFaqs,
  metersToFeetStructuredContent,
  milesToKmFaqs,
  milesToKmStructuredContent,
} from "./priority-numeric-content";

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

const cupsToMlCookingStructuredContent = defineStructuredContent(
  "About converting cups to milliliters",
  defineContentSection("Why this is a common recipe conversion", [
    "Cups are used constantly in US recipes, while milliliters are standard on metric measuring jugs, cartons, and many international kitchen tools. That mismatch is why cups to ml is such a common cooking lookup. A recipe may ask for 1.5 cups of milk or stock, but the measuring jug in your kitchen might only show milliliters. This page gives you a quick translation that keeps recipe prep moving.",
  ]),
  defineContentSection("Kitchen formula", [
    "For US cooking measurements, 1 cup is about 236.588 milliliters. Many cooks round that to 240 ml for everyday use, but the more precise number can be useful when you are scaling a baking recipe, portioning liquids more carefully, or comparing a recipe instruction to the label on a bottle or carton.",
  ]),
  defineContentSection("Where it helps in the kitchen", [
    "This conversion is useful for soups, sauces, baking liquids, smoothies, dressings, and any recipe where a cup measure needs to be read on a metric tool. It is also handy when adapting recipes from US blogs or cookbooks for a kitchen that relies on milliliters instead of cups.",
  ]),
);

const tbspToMlCookingStructuredContent = defineStructuredContent(
  "About converting tablespoons to milliliters",
  defineContentSection("A practical kitchen conversion for small liquids", [
    "Tablespoons are common in recipes for oil, vinegar, vanilla, soy sauce, syrups, dressings, and other ingredients that are used in smaller amounts than a cup. Milliliters are easier to read on metric measuring tools and bottles, so tablespoons to ml is one of the most useful quick kitchen conversions for cooks who move between recipe styles.",
  ]),
  defineContentSection("Kitchen formula", [
    "This page uses the standard US tablespoon value of about 14.7868 milliliters. In a busy home kitchen, many people round that to 15 ml, which is usually good enough for quick prep. When you want a more exact result for scaling a recipe or comparing bottle quantities, the precise figure is helpful.",
  ]),
  defineContentSection("Where it helps in recipes", [
    "It is especially useful for sauces, marinades, glazes, dressings, and baking ingredients like melted butter or extracts. Instead of juggling spoons and metric markings by eye, you can get a clean milliliter reference that works with measuring jugs, squeeze bottles, and prep containers.",
  ]),
);

const tspToMlCookingStructuredContent = defineStructuredContent(
  "About converting teaspoons to milliliters",
  defineContentSection("Small measurements can still matter a lot", [
    "Teaspoons show up in recipes whenever a small amount can have a big effect: vanilla extract, baking powder, lemon juice, syrups, spice blends, and flavor concentrates. Because many kitchen tools outside the US use milliliters instead of teaspoons, tsp to ml is a practical conversion for everyday cooking and baking rather than a niche one.",
  ]),
  defineContentSection("Kitchen formula", [
    "A US teaspoon is about 4.92892 milliliters, which most cooks round to 5 ml. That rounded value is useful for mental estimates, but the exact figure helps when you are scaling several small spoon measurements together or converting a recipe for more precise prep.",
  ]),
  defineContentSection("Where it helps in baking and prep", [
    "This converter is useful for baking ingredients, extracts, syrups, sauces, and drink recipes where small liquid amounts matter. If a recipe calls for 3 teaspoons of vanilla or lemon juice and your measuring tools are marked only in milliliters, this page gives you a quick kitchen-ready answer.",
  ]),
);

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
    "Cups and fluid ounces are both common in US cooking, but recipes, drink labels, and mixing instructions do not always use the same unit. One recipe may call for 2 cups of broth, while a bottle is marked in fluid ounces. Another might list a serving size in fluid ounces even though your measuring tools are cup-based. That is where a cups to fluid ounces converter becomes genuinely useful rather than just convenient.",
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
    "Fluid ounces are common on US drink labels, cosmetics, and recipes, while milliliters are the standard on most international packaging and measuring tools. That makes fluid ounces to milliliters one of the most useful volume conversions for everyday life. Whether you are reading a bottle, following a cocktail recipe, or comparing skincare product sizes from different markets, this conversion helps translate the label into a unit you can use right away.",
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
    customLongDescription: lbsToKgStructuredContent,
    faq: lbsToKgFaqs,
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
  defineNumericPairPage("weight", "kg", "g", 2, [0.25, 0.5, 1, 2, 5, 10], {
    aliases: ["kg to grams", "kilograms to grams", "kilos to grams"],
    faq: defineFaqs(
      defineFaq("How many grams are in 1 kilogram?", "1 kilogram equals 1000 grams."),
      defineFaq(
        "What is the formula to convert kilograms to grams?",
        "Multiply kilograms by 1000 to convert them to grams.",
      ),
      defineFaq(
        "When is kg to grams conversion useful?",
        "It is useful for recipes, nutrition labels, lab work, shipping, and product packaging.",
      ),
    ),
    metaDescription:
      "Convert kilograms to grams quickly for recipes, product weights, lab work, and packaging checks with a simple metric formula.",
  }),
  defineNumericPairPage("weight", "g", "kg", 750, [100, 250, 500, 750, 1000, 2000], {
    aliases: ["grams to kg", "grams to kilograms", "grams into kilograms"],
    faq: defineFaqs(
      defineFaq("How many kilograms are in 1 gram?", "1 gram equals 0.001 kilograms."),
      defineFaq(
        "What is the formula to convert grams to kilograms?",
        "Divide grams by 1000 to convert them to kilograms.",
      ),
      defineFaq(
        "Why would I convert grams to kilograms?",
        "People use it for food prep, shipping totals, science work, and comparing product weights at a larger scale.",
      ),
    ),
    metaDescription:
      "Convert grams to kilograms for food prep, shipping totals, and product specs with a fast metric calculator and reference values.",
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
    customLongDescription: inchesToCmStructuredContent,
    faq: inchesToCmFaqs,
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
    customLongDescription: metersToFeetStructuredContent,
    faq: metersToFeetFaqs,
    metaDescription:
      "Convert meters to feet for building plans, sports distances, and room sizes using a simple calculator with formula notes and lookup values.",
    popular: true,
  }),
  defineNumericPairPage("length", "ft", "m", 25, [1, 5, 10, 25, 50, 100], {
    customLongDescription: feetToMetersStructuredContent,
    faq: feetToMetersFaqs,
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
    customLongDescription: milesToKmStructuredContent,
    faq: milesToKmFaqs,
    metaDescription:
      "Convert miles to kilometers for races, road trips, and route planning using a quick calculator, worked example, and handy lookup table.",
  }),
  defineNumericPairPage("length", "m", "cm", 2, [0.25, 0.5, 1, 2, 5, 10], {
    aliases: ["meters to cm", "meters to centimeters", "m to cm"],
    faq: defineFaqs(
      defineFaq("How many centimeters are in 1 meter?", "1 meter equals 100 centimeters."),
      defineFaq(
        "What is the formula to convert meters to centimeters?",
        "Multiply meters by 100 to convert them to centimeters.",
      ),
      defineFaq(
        "When is meters to centimeters conversion useful?",
        "It is useful for room planning, school work, product dimensions, and construction measurements.",
      ),
    ),
    metaDescription:
      "Convert meters to centimeters for layouts, school work, and product measurements with a fast metric reference table.",
  }),
  defineNumericPairPage("length", "cm", "m", 250, [10, 25, 50, 100, 180, 250], {
    aliases: ["cm to meters", "centimeters to meters", "cm to m"],
    faq: defineFaqs(
      defineFaq("How many meters are in 1 centimeter?", "1 centimeter equals 0.01 meters."),
      defineFaq(
        "What is the formula to convert centimeters to meters?",
        "Divide centimeters by 100 to convert them to meters.",
      ),
      defineFaq(
        "Why convert centimeters to meters?",
        "It helps when small metric measurements need to be compared with room sizes, layouts, or larger plans.",
      ),
    ),
    metaDescription:
      "Convert centimeters to meters for layouts, height checks, and larger metric comparisons with a simple formula and examples.",
  }),
  defineNumericPairPage("length", "km", "m", 2, [0.5, 1, 2, 5, 10, 25], {
    aliases: ["km to meters", "kilometers to meters", "km into meters"],
    faq: defineFaqs(
      defineFaq("How many meters are in 1 kilometer?", "1 kilometer equals 1000 meters."),
      defineFaq(
        "What is the formula to convert kilometers to meters?",
        "Multiply kilometers by 1000 to convert them to meters.",
      ),
      defineFaq(
        "When is km to meters conversion useful?",
        "It is useful for route planning, race distances, mapping, and technical measurements.",
      ),
    ),
    metaDescription:
      "Convert kilometers to meters for routes, races, and mapping work with a quick metric calculator and reference values.",
  }),
  defineNumericPairPage("length", "m", "km", 2500, [100, 250, 500, 1000, 2500, 5000], {
    aliases: ["meters to km", "meters to kilometers", "m to km"],
    faq: defineFaqs(
      defineFaq("How many kilometers are in 1 meter?", "1 meter equals 0.001 kilometers."),
      defineFaq(
        "What is the formula to convert meters to kilometers?",
        "Divide meters by 1000 to convert them to kilometers.",
      ),
      defineFaq(
        "Why would I convert meters to kilometers?",
        "It helps when detailed route or project distances need to be expressed in larger metric units.",
      ),
    ),
    metaDescription:
      "Convert meters to kilometers for route planning, mapping, and distance summaries with fast metric reference values.",
  }),
  defineNumericPairPage("length", "yd", "m", 10, [1, 5, 10, 25, 50, 100], {
    aliases: ["yards to meters", "yard to meters", "yd to meters", "yards to m"],
    faq: defineFaqs(
      defineFaq("How many meters are in 1 yard?", "1 yard equals exactly 0.9144 meters."),
      defineFaq(
        "What is the formula to convert yards to meters?",
        "Multiply yards by 0.9144 to convert them to meters.",
      ),
      defineFaq(
        "When is yards to meters conversion useful?",
        "It is useful for sports fields, fabric lengths, landscaping plans, and distance references that mix imperial and metric units.",
      ),
    ),
    metaDescription:
      "Convert yards to meters for sports distances, fabric measurements, and outdoor planning with a quick calculator and reference values.",
  }),
  defineNumericPairPage("length", "m", "yd", 10, [1, 5, 10, 25, 50, 100], {
    aliases: ["meters to yards", "meter to yards", "m to yards", "meters to yd"],
    faq: defineFaqs(
      defineFaq("How many yards are in 1 meter?", "1 meter equals about 1.09361 yards."),
      defineFaq(
        "What is the formula to convert meters to yards?",
        "Multiply meters by about 1.09361 to convert them to yards.",
      ),
      defineFaq(
        "Why convert meters to yards?",
        "It helps when metric measurements need to be compared with sports, textile, or outdoor references that still use yards.",
      ),
    ),
    metaDescription:
      "Convert meters to yards for field layouts, textiles, and measurement comparisons with a simple formula and quick reference table.",
  }),
] as const;

export const volumePairPages = [
  defineNumericPairPage("volume", "ml", "cup", 500, [50, 100, 250, 500, 750, 1000], {
    aliases: ["ml to cups", "milliliters to cups", "milliliter to cup"],
    faq: defineFaqs(
      defineFaq(
        "How many cups are in 1 milliliter for cooking?",
        "1 milliliter equals about 0.00422675 US cups, which is handy when reading metric liquid amounts in a cup-based recipe workflow.",
      ),
      defineFaq(
        "When would I use ml to cups in a recipe?",
        "It is useful when a bottle, carton, or measuring jug shows milliliters but the recipe instructions are easier to think about in cups.",
      ),
      defineFaq(
        "Is ml to cups useful for baking and sauces?",
        "Yes. It helps with milk, water, cream, stock, and other liquids used in baking, soups, sauces, and drink recipes.",
      ),
    ),
    relatedSlugs: ["cups-to-ml", "tbsp-to-ml", "ml-to-tsp", "tsp-to-ml", "ml-to-tbsp"],
    featured: true,
    customLongDescription: defineStructuredContent(
      "About converting milliliters to cups",
      defineContentSection("Why this matters in recipe prep", [
        "Milliliters are common on measuring jugs, cartons, bottles, and recipes from metric kitchens, while cups remain familiar in many US cooking instructions. That means ml to cups is a very practical kitchen conversion whenever a liquid ingredient is listed in metric form but you want to think about it in cup-based terms. Instead of approximating by eye, this page gives you a quick answer for recipe prep, baking, and drink mixing.",
      ]),
      defineContentSection("Kitchen formula", [
        "To convert milliliters to US cups, divide by 236.588. In rough kitchen shorthand, 240 ml is often treated as about 1 cup, but the exact figure is still useful when you are scaling a recipe or comparing a package size to an ingredient list.",
      ]),
      defineContentSection("Where it helps in the kitchen", [
        "This conversion is useful for milk, water, broth, cream, juice, and other liquids used in baking and everyday cooking. It is especially handy when a recipe uses metric packaging sizes but your measuring cups are the easiest tools within reach.",
      ]),
    ),
    metaDescription:
      "Convert ml to cups for recipes, baking liquids, soups, and kitchen prep with a quick metric-to-cup cooking reference.",
    popular: true,
  }),
  defineNumericPairPage("volume", "cup", "ml", 2, [0.25, 0.5, 1, 2, 3, 4], {
    aliases: ["cups to ml", "cup to ml", "cups to milliliters"],
    crossLinks: ["cooking-converter", "cups-to-grams-flour", "cups-to-grams-sugar"],
    faq: defineFaqs(
      defineFaq(
        "How many milliliters are in 1 cup for cooking?",
        "1 US cup equals about 236.588 milliliters, and many kitchens round that to 240 ml for quick measuring.",
      ),
      defineFaq(
        "Why do recipes often need cups to ml conversion?",
        "It helps when a recipe uses cups but your measuring jug, carton label, or kitchen tools are marked in milliliters.",
      ),
      defineFaq(
        "Is cups to ml mostly for liquids?",
        "Yes. It is most often used for milk, water, cream, broth, oil, and other liquid ingredients in recipes and baking.",
      ),
    ),
    relatedSlugs: ["ml-to-cups", "tbsp-to-ml", "tsp-to-ml", "ml-to-tsp", "ml-to-tbsp"],
    customLongDescription: cupsToMlCookingStructuredContent,
    metaDescription:
      "Convert cups to ml for recipes, baking liquids, sauces, and everyday kitchen prep with a fast US cup to milliliter guide.",
  }),
  defineNumericPairPage("volume", "floz", "ml", 8, [1, 2, 4, 8, 12, 16], {
    aliases: ["fluid ounces to milliliters", "fl oz to ml", "floz to ml", "oz to ml"],
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
      "Convert fluid ounces to milliliters for drink recipes, bottle sizes, nutrition labels, and clear volume comparisons.",
    popular: true,
  }),
  defineNumericPairPage("volume", "ml", "floz", 500, [30, 50, 100, 250, 500, 1000], {
    aliases: ["milliliters to fluid ounces", "ml to fl oz", "ml to floz", "ml to oz"],
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
      "Convert milliliters to fluid ounces for cooking, bottle sizing, packaging, and beverage prep with formula and examples.",
  }),
  defineNumericPairPage("volume", "cup", "floz", 2, [0.25, 0.5, 1, 2, 3, 4], {
    aliases: ["cups to fluid ounces", "cups to fl oz", "cups to floz", "cups to oz"],
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
      "Convert cups to fluid ounces for recipe prep and kitchen measurements with a clear calculator, quick formula, and common references.",
  }),
  defineNumericPairPage("volume", "floz", "cup", 8, [1, 2, 4, 8, 12, 16], {
    aliases: ["fluid ounces to cups", "fl oz to cups", "floz to cups", "oz to cups"],
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
      "See how many cups are in a fluid ounce using this fluid ounces to cups converter, useful for recipes, serving sizes, and portion calculations.",
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
  defineNumericPairPage("volume", "tbsp", "ml", 2, [0.5, 1, 2, 4, 8, 16], {
    aliases: ["tbsp to ml", "tablespoons to ml", "tablespoon to milliliters"],
    crossLinks: ["cooking-converter", "cups-to-grams-flour", "tsp-to-grams-sugar", "tbsp-to-grams-sugar"],
    faq: defineFaqs(
      defineFaq(
        "How many milliliters are in 1 tablespoon for cooking?",
        "1 US tablespoon equals about 14.7868 milliliters, which many cooks round to 15 ml for everyday recipe work.",
      ),
      defineFaq(
        "When would I use tbsp to ml in a recipe?",
        "It is useful for oils, sauces, dressings, extracts, and other liquid ingredients when your kitchen tools are marked in milliliters.",
      ),
      defineFaq(
        "Is tbsp to ml helpful for baking too?",
        "Yes. It is handy for ingredients like melted butter, vanilla, syrups, and other smaller baking measurements.",
      ),
    ),
    relatedSlugs: ["ml-to-tbsp", "tsp-to-ml", "ml-to-tsp", "cups-to-ml", "ml-to-cups"],
    customLongDescription: tbspToMlCookingStructuredContent,
    metaDescription:
      "Convert tablespoons to ml for recipes, sauces, dressings, and baking ingredients with an easy kitchen-friendly reference.",
    popular: true,
  }),
  defineNumericPairPage("volume", "ml", "tbsp", 30, [5, 10, 15, 30, 45, 60], {
    aliases: ["ml to tbsp", "milliliters to tablespoons", "milliliter to tablespoon"],
    faq: defineFaqs(
      defineFaq(
        "How many tablespoons are in 1 milliliter?",
        "1 milliliter equals about 0.067628 tablespoons.",
      ),
      defineFaq(
        "What is the formula to convert ml to tbsp?",
        "Divide milliliters by 14.7868 to convert them to US tablespoons.",
      ),
      defineFaq(
        "When would I use ml to tbsp conversion?",
        "It is useful for recipes, sauces, dressings, and liquid ingredients measured with spoons.",
      ),
    ),
    relatedSlugs: ["tbsp-to-ml", "ml-to-tsp", "tsp-to-ml", "cups-to-ml", "ml-to-cups"],
    metaDescription:
      "Convert ml to tablespoons for recipes, sauces, and kitchen prep with a quick calculator, formula, and common cooking values.",
  }),
  defineNumericPairPage("volume", "tsp", "ml", 3, [0.5, 1, 2, 3, 4, 6], {
    aliases: ["tsp to ml", "teaspoons to ml", "teaspoon to milliliters"],
    crossLinks: ["cooking-converter", "tsp-to-grams-sugar", "cups-to-grams-sugar"],
    faq: defineFaqs(
      defineFaq(
        "How many milliliters are in 1 teaspoon for cooking?",
        "1 US teaspoon equals about 4.92892 milliliters, usually rounded to 5 ml in everyday recipe prep.",
      ),
      defineFaq(
        "Why do people search tsp to ml for baking?",
        "It is common when recipes use teaspoons for extracts, baking ingredients, or syrups but your tools show only milliliters.",
      ),
      defineFaq(
        "Is tsp to ml useful for measuring ingredients accurately?",
        "Yes. It helps with small liquid amounts where guessing by eye can throw off flavor or texture in baking and cooking.",
      ),
    ),
    relatedSlugs: ["ml-to-tsp", "tbsp-to-ml", "ml-to-tbsp", "cups-to-ml", "ml-to-cups"],
    customLongDescription: tspToMlCookingStructuredContent,
    metaDescription:
      "Convert teaspoons to ml for baking, extracts, syrups, and small recipe measurements with a quick kitchen reference.",
  }),
  defineNumericPairPage("volume", "ml", "tsp", 30, [1, 5, 10, 15, 30, 60], {
    aliases: ["ml to tsp", "milliliters to teaspoons", "milliliter to teaspoon"],
    faq: defineFaqs(
      defineFaq(
        "How many teaspoons are in 1 milliliter?",
        "1 milliliter equals about 0.202884 teaspoons.",
      ),
      defineFaq(
        "What is the formula to convert ml to tsp?",
        "Divide milliliters by 4.92892 to convert them to US teaspoons.",
      ),
      defineFaq(
        "When would I use ml to tsp conversion?",
        "It is useful for recipes, supplements, syrups, and small liquid measurements in the kitchen.",
      ),
    ),
    relatedSlugs: ["tsp-to-ml", "ml-to-tbsp", "tbsp-to-ml", "cups-to-ml", "ml-to-cups"],
    metaDescription:
      "Convert ml to tsp quickly for recipe prep, syrups, and kitchen measurements with a simple formula and common reference values.",
  }),
  defineNumericPairPage("volume", "l", "ml", 2, [0.25, 0.5, 1, 2, 5, 10], {
    aliases: ["liters to ml", "liters to milliliters", "l to ml"],
    faq: defineFaqs(
      defineFaq("How many milliliters are in 1 liter?", "1 liter equals 1000 milliliters."),
      defineFaq(
        "What is the formula to convert liters to milliliters?",
        "Multiply liters by 1000 to convert them to milliliters.",
      ),
      defineFaq(
        "When is liters to ml conversion useful?",
        "It is useful for recipes, drink prep, packaging labels, and liquid measurements.",
      ),
    ),
    metaDescription:
      "Convert liters to milliliters for bottles, recipes, and packaging with a quick metric volume calculator and reference table.",
  }),
  defineNumericPairPage("volume", "ml", "l", 750, [100, 250, 500, 750, 1000, 2000], {
    aliases: ["ml to liters", "milliliters to liters", "ml to l", "ml to liter", "ml in liter", "ml to liters conversion"],
    customLongDescription: defineStructuredContent(
      "About converting milliliters to liters",
      defineContentSection("Why ml to liters is such a common lookup", [
        "Milliliters and liters are both metric volume units, but they appear at very different scales. Bottles, cartons, and measuring tools often display milliliters, while recipes, nutrition tables, and daily intake guidelines use liters. That is why ml to liters is one of the most searched volume conversions — the same liquid can be described in either unit depending on whether you are reading a label or following a guideline.",
      ]),
      defineContentSection("Conversion formula", [
        "The relationship is simple: divide milliliters by 1000 to get liters. So 1 ml equals 0.001 liters, 500 ml equals 0.5 liters, and 1000 ml equals exactly 1 liter. That fixed ratio makes the math predictable once you know the base rule.",
      ]),
      defineContentSection("Common ml to liter values", [
        "A 250 ml glass is 0.25 liters. A standard 500 ml water bottle is 0.5 liters. A 750 ml wine bottle is 0.75 liters. A 1000 ml carton equals exactly 1 liter. These are the everyday reference points people use when comparing drinks, reading nutrition facts, or checking recipe liquid totals.",
      ]),
      defineContentSection("When this conversion is useful", [
        "Ml to liters is useful in cooking, fitness tracking, product comparisons, and hydration goals. A recipe may call for 0.5 liters of stock while you only have a 750 ml bottle. A nutrition label might show 330 ml per serving while a daily target is stated in liters. A clean converter helps translate between the two without mental arithmetic.",
      ]),
    ),
    faq: defineFaqs(
      defineFaq("How many liters are in 1 milliliter?", "1 milliliter equals 0.001 liters."),
      defineFaq(
        "What is the formula to convert milliliters to liters?",
        "Divide milliliters by 1000 to convert them to liters.",
      ),
      defineFaq(
        "How many ml is 1 liter?",
        "1 liter equals exactly 1000 milliliters.",
      ),
      defineFaq(
        "How many liters is 500 ml?",
        "500 ml equals 0.5 liters.",
      ),
      defineFaq(
        "How many liters is 750 ml?",
        "750 ml equals 0.75 liters.",
      ),
      defineFaq(
        "How many liters is 250 ml?",
        "250 ml equals 0.25 liters.",
      ),
      defineFaq(
        "Why convert milliliters to liters?",
        "It helps compare smaller liquid amounts with bottle sizes, storage containers, recipe totals, and daily hydration targets.",
      ),
    ),
    metaDescription:
      "Convert ml to liters instantly — 1000 ml = 1 L, 500 ml = 0.5 L, 750 ml = 0.75 L. Simple milliliters to liters calculator with formula and common values.",
  }),
  defineNumericPairPage("volume", "cup", "tbsp", 1, [0.25, 0.5, 1, 2, 3, 4], {
    aliases: ["cups to tbsp", "cups to tablespoons", "cup to tablespoons"],
    faq: defineFaqs(
      defineFaq("How many tablespoons are in 1 cup?", "1 US cup equals 16 tablespoons."),
      defineFaq(
        "What is the formula to convert cups to tablespoons?",
        "Multiply cups by 16 to convert them to tablespoons.",
      ),
      defineFaq(
        "When is cups to tablespoons conversion useful?",
        "It is useful for scaling recipes, mixing dressings, and measuring ingredients when you do not want to use cups.",
      ),
    ),
    metaDescription:
      "Convert cups to tablespoons for recipe scaling, baking, and kitchen prep with a quick US cooking conversion table.",
  }),
  defineNumericPairPage("volume", "tbsp", "cup", 8, [1, 2, 4, 8, 12, 16], {
    aliases: ["tbsp to cups", "tablespoons to cups", "tablespoon to cup"],
    faq: defineFaqs(
      defineFaq("How many cups are in 1 tablespoon?", "1 tablespoon equals 0.0625 cups."),
      defineFaq(
        "What is the formula to convert tablespoons to cups?",
        "Divide tablespoons by 16 to convert them to cups.",
      ),
      defineFaq(
        "Why convert tablespoons to cups?",
        "It helps combine smaller recipe measurements into larger cup-based totals during baking and meal prep.",
      ),
    ),
    metaDescription:
      "Convert tablespoons to cups for baking, meal prep, and recipe scaling with a simple kitchen conversion reference.",
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
    customLongDescription: fahrenheitToCelsiusStructuredContent,
    faq: fahrenheitToCelsiusFaqs,
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
  defineNumericPairPage("temperature", "c", "k", 25, [0, 10, 20, 25, 37, 100], {
    aliases: ["celsius to kelvin", "c to kelvin", "degrees celsius to kelvin"],
    faq: defineFaqs(
      defineFaq("How many Kelvin are in 1 degree Celsius?", "1 degree Celsius equals 274.15 Kelvin."),
      defineFaq(
        "What is the formula to convert Celsius to Kelvin?",
        "Add 273.15 to Celsius to convert it to Kelvin.",
      ),
      defineFaq(
        "When is Celsius to Kelvin conversion useful?",
        "It is useful for science, lab work, engineering references, and temperature calculations that require an absolute scale.",
      ),
    ),
    formulaLabel: "K = °C + 273.15",
    metaDescription:
      "Convert Celsius to Kelvin for science, engineering, and lab work with the exact formula, examples, and common reference values.",
  }),
  defineNumericPairPage("temperature", "k", "c", 298.15, [250, 273.15, 298.15, 310.15, 373.15], {
    aliases: ["kelvin to celsius", "k to celsius", "kelvin into celsius"],
    faq: defineFaqs(
      defineFaq("How many Celsius is 1 Kelvin?", "1 Kelvin equals -272.15 degrees Celsius."),
      defineFaq(
        "What is the formula to convert Kelvin to Celsius?",
        "Subtract 273.15 from Kelvin to convert it to Celsius.",
      ),
      defineFaq(
        "Why use Kelvin to Celsius conversion?",
        "It helps translate scientific and technical temperatures into a more familiar everyday scale.",
      ),
    ),
    formulaLabel: "°C = K - 273.15",
    metaDescription:
      "Convert Kelvin to Celsius quickly for lab work, science classes, and technical references with the exact formula and examples.",
  }),
] as const;

export const windPairPages = [
  defineNumericPairPage("wind", "mph", "kmh", 60, [30, 60, 65, 80, 100, 110], {
    aliases: ["mph to kmh", "mph to km/h", "miles per hour to kmh", "miles per hour to km/h"],
    customLongDescription: defineStructuredContent(
      "About converting mph to kmh",
      defineContentSection("Why mph to km/h comes up so often", [
        "Miles per hour is the standard speed unit in the United States and the United Kingdom for road signs, weather forecasts, and vehicle speedometers. Kilometers per hour is used in most other countries for the same purposes. That means mph to kmh is one of the most common speed conversions for travel, driving abroad, and reading international weather or sport reports.",
      ]),
      defineContentSection("Conversion formula", [
        "To convert miles per hour to kilometers per hour, multiply by 1.609344. So 60 mph becomes about 96.56 km/h, 80 mph is about 128.75 km/h, and 110 mph is about 177.03 km/h. Because the factor is just above 1.6, a rough estimate is to multiply by 1.6 and add a small amount.",
      ]),
      defineContentSection("Common mph to kmh values", [
        "A 30 mph town speed limit is about 48.28 km/h. A 65 mph highway speed is about 104.61 km/h. An 80 mph motorway cruise is about 128.75 km/h. A 110 mph speed is about 177.03 km/h. These are reference points that come up constantly for drivers, cyclists, pilots, and weather readers who work across both systems.",
      ]),
      defineContentSection("When this conversion is useful", [
        "Use this converter for road travel abroad, weather report interpretation, vehicle speedometer reading, aviation, and comparing race or sport speeds. It is especially useful when a US or UK speed reference needs to be understood in a metric context, or when international speed limits need to be checked quickly.",
      ]),
    ),
    faq: defineFaqs(
      defineFaq("How many kilometers per hour are in 1 mph?", "1 mph equals exactly 1.609344 km/h."),
      defineFaq(
        "What is the formula to convert mph to kmh?",
        "Multiply miles per hour by 1.609344 to convert them to kilometers per hour.",
      ),
      defineFaq(
        "How many km/h is 60 mph?",
        "60 mph equals about 96.56 km/h.",
      ),
      defineFaq(
        "How many km/h is 65 mph?",
        "65 mph equals about 104.61 km/h.",
      ),
      defineFaq(
        "How many km/h is 80 mph?",
        "80 mph equals about 128.75 km/h.",
      ),
      defineFaq(
        "How many km/h is 110 mph?",
        "110 mph equals about 177.03 km/h.",
      ),
      defineFaq(
        "When is mph to kmh conversion useful?",
        "It is useful for travel abroad, forecasts, road speeds, and comparing speed references across countries.",
      ),
    ),
    featured: true,
    metaDescription:
      "Convert mph to km/h instantly — 60 mph = 96.56 km/h, 65 mph = 104.61 km/h, 110 mph = 177.03 km/h. Fast miles per hour to kilometers per hour calculator.",
    popular: true,
  }),
  defineNumericPairPage("wind", "kmh", "mph", 100, [10, 20, 40, 60, 100, 120], {
    aliases: ["kmh to mph", "km/h to mph", "kilometers per hour to mph", "kmh into mph"],
    faq: defineFaqs(
      defineFaq("How many mph are in 1 km/h?", "1 km/h equals about 0.621371 mph."),
      defineFaq(
        "What is the formula to convert kmh to mph?",
        "Multiply kilometers per hour by 0.621371 to convert them to miles per hour.",
      ),
      defineFaq(
        "Why convert kmh to mph?",
        "It helps compare speed limits, storm reports, and travel references when one source uses metric speed and another uses imperial speed.",
      ),
    ),
    metaDescription:
      "Convert kmh to mph for speed limits, forecasts, and route planning with a quick calculator and common values table.",
  }),
  defineNumericPairPage("wind", "knot", "kmh", 20, [5, 10, 20, 30, 50, 100], {
    aliases: ["knots to kmh", "knot to kmh", "knots to km/h", "nautical miles per hour to kmh"],
    faq: defineFaqs(
      defineFaq("How many kilometers per hour are in 1 knot?", "1 knot equals exactly 1.852 km/h."),
      defineFaq(
        "What is the formula to convert knots to kmh?",
        "Multiply knots by 1.852 to convert them to kilometers per hour.",
      ),
      defineFaq(
        "Where is knots to kmh conversion used?",
        "It is common in marine weather, sailing, aviation, and forecast discussions that switch between nautical and metric speed references.",
      ),
    ),
    metaDescription:
      "Convert knots to kmh for marine weather, sailing, and aviation references with a fast calculator and exact rate.",
    popular: true,
  }),
  defineNumericPairPage("wind", "kmh", "knot", 100, [10, 20, 40, 60, 100, 120], {
    aliases: ["kmh to knots", "km/h to knots", "kilometers per hour to knots", "kmh into knots"],
    faq: defineFaqs(
      defineFaq("How many knots are in 1 km/h?", "1 km/h equals about 0.539957 knots."),
      defineFaq(
        "What is the formula to convert kmh to knots?",
        "Divide kilometers per hour by 1.852, or multiply by about 0.539957.",
      ),
      defineFaq(
        "When should I convert kmh to knots?",
        "It is useful when weather data or travel speeds need to be interpreted in marine or aviation contexts that prefer knots.",
      ),
    ),
    metaDescription:
      "Convert kmh to knots for forecast interpretation, sailing, and aviation planning with the formula and common speed examples.",
  }),
] as const;

export const pressurePairPages = [
  defineNumericPairPage("pressure", "hpa", "mmhg", 1013.25, [980, 1000, 1013.25, 1020, 1030, 1050], {
    aliases: ["hpa to mmhg", "hPa to mmHg", "hectopascals to mmhg", "hectopascal to millimeters of mercury"],
    faq: defineFaqs(
      defineFaq("How many mmHg are in 1 hPa?", "1 hPa equals about 0.750062 mmHg."),
      defineFaq(
        "What is the formula to convert hpa to mmhg?",
        "Multiply hectopascals by about 0.750062 to convert them to millimeters of mercury.",
      ),
      defineFaq(
        "When is hpa to mmhg conversion useful?",
        "It is useful for aviation references, weather maps, and comparing pressure readings that switch between metric and mercury-based units.",
      ),
    ),
    featured: true,
    metaDescription:
      "Convert hpa to mmhg for aviation, weather charts, and pressure readings with a precise calculator and common examples.",
    popular: true,
  }),
  defineNumericPairPage("pressure", "mmhg", "hpa", 760, [720, 740, 760, 780, 800, 820], {
    aliases: ["mmhg to hpa", "mmHg to hPa", "millimeters of mercury to hpa", "mmhg into hectopascals"],
    faq: defineFaqs(
      defineFaq("How many hPa are in 1 mmHg?", "1 mmHg equals about 1.33322 hPa."),
      defineFaq(
        "What is the formula to convert mmhg to hpa?",
        "Multiply millimeters of mercury by about 1.33322 to convert them to hectopascals.",
      ),
      defineFaq(
        "Why convert mmhg to hpa?",
        "It helps compare medical, laboratory, or pressure-gauge values with weather and aviation references that use hectopascals.",
      ),
    ),
    metaDescription:
      "Convert mmHg to hPa instantly — 760 mmHg = 1013.25 hPa, 1 mmHg = 1.33322 hPa. Fast millimeters of mercury to hectopascals calculator for weather and lab use.",
  }),
  defineNumericPairPage("pressure", "bar", "psi", 1, [0.5, 1, 2, 5, 10, 20], {
    aliases: ["bar to psi", "bars to psi", "bar into psi", "bar pressure to psi"],
    faq: defineFaqs(
      defineFaq("How many psi are in 1 bar?", "1 bar equals about 14.5038 psi."),
      defineFaq(
        "What is the formula to convert bar to psi?",
        "Multiply bar by about 14.5038 to convert it to pounds per square inch.",
      ),
      defineFaq(
        "Where is bar to psi conversion common?",
        "It is common for tire pressure, compressors, workshop tools, and industrial gauge readings that move between metric and imperial systems.",
      ),
    ),
    metaDescription:
      "Convert bar to psi for tire pressure, compressors, and gauge checks with an exact calculator and common values table.",
    popular: true,
  }),
  defineNumericPairPage("pressure", "psi", "bar", 30, [5, 10, 14.5, 30, 50, 100], {
    aliases: ["psi to bar", "psi into bar", "pounds per square inch to bar", "psi pressure to bar"],
    faq: defineFaqs(
      defineFaq("How many bar are in 1 psi?", "1 psi equals about 0.0689476 bar."),
      defineFaq(
        "What is the formula to convert psi to bar?",
        "Multiply psi by about 0.0689476 to convert it to bar.",
      ),
      defineFaq(
        "When should I convert psi to bar?",
        "It is useful for tire inflation guides, pressure regulators, and equipment manuals that use metric gauge values.",
      ),
    ),
    metaDescription:
      "Convert psi to bar for tire guides, pressure regulators, and gauge comparisons with a quick calculator and reference values.",
  }),
] as const;

export const rainfallPairPages = [
  defineNumericPairPage("rainfall", "rainmm", "raininch", 25.4, [1, 5, 10, 25.4, 50, 100], {
    aliases: ["mm to inches rain", "mm to inches of rain", "millimeters to inches rain", "rain mm to inches"],
    customLongDescription: defineStructuredContent(
      "About converting millimeters of rain to inches of rain",
      defineContentSection("Why rainfall totals are often compared in two systems", [
        "Rainfall reports, forecast models, and local weather summaries do not always use the same measurement system. Millimeters are common in many countries and in technical weather products, while inches remain familiar in the United States for storm totals and local forecasts. That is why mm to inches rain is a frequent lookup during storms, travel planning, and climate comparisons.",
      ]),
      defineContentSection("Rainfall conversion formula", [
        "The conversion is straightforward: divide millimeters of rain by 25.4 to get inches of rain. A rainfall total of 25.4 mm equals exactly 1 inch, 50 mm is about 1.97 inches, and 100 mm is about 3.94 inches. Those reference points make it easier to understand whether a forecast suggests light rain, a soaking event, or a more serious storm total.",
      ]),
      defineContentSection("When this rainfall conversion is useful", [
        "This conversion is useful for weather briefings, hydrology notes, forecast comparisons, and translating storm totals into the scale that feels most familiar locally. Instead of estimating or switching tools mid-report, a dedicated mm to inches rain page keeps the conversion fast and easy to check.",
      ]),
    ),
    faq: defineFaqs(
      defineFaq("How many inches of rain are in 1 mm?", "1 millimeter of rain equals about 0.0393701 inches of rain."),
      defineFaq(
        "What is the formula to convert mm to inches rain?",
        "Divide millimeters of rain by 25.4 to convert them to inches of rain.",
      ),
      defineFaq(
        "When is mm to inches rain conversion useful?",
        "It is useful for forecast comparisons, storm reports, and translating rainfall totals between metric and US weather references.",
      ),
    ),
    featured: true,
    metaDescription:
      "Convert mm to inches of rain instantly — 25.4 mm = 1 inch, 50 mm = 1.97 in, 100 mm = 3.94 in. Rainfall mm to inches calculator for forecasts and storm totals.",
    popular: true,
  }),
  defineNumericPairPage("rainfall", "raininch", "rainmm", 1, [0.1, 0.25, 0.5, 1, 2, 4], {
    aliases: ["inches to mm rain", "inches of rain to mm", "rain inches to mm", "inches rain to mm"],
    customLongDescription: defineStructuredContent(
      "About converting inches of rain to millimeters of rain",
      defineContentSection("Why this weather conversion comes up often", [
        "US weather reports often describe rainfall in inches, while many forecast models, international services, and hydrology references use millimeters. That makes inches to mm rain a practical conversion whenever you want to compare local storm totals with international or technical weather sources.",
      ]),
      defineContentSection("Rainfall conversion formula", [
        "To convert inches of rain to millimeters, multiply by 25.4. That means 1 inch of rain equals 25.4 mm, half an inch is 12.7 mm, and 2 inches equals 50.8 mm. Those benchmarks make it easier to compare rainfall totals across different forecast systems.",
      ]),
      defineContentSection("Where this conversion helps", [
        "The conversion is useful for storm tracking, flood guidance, agricultural planning, and comparing rainfall totals from multiple sources. A dedicated inches to mm rain converter helps translate weather data quickly without leaving the forecast workflow.",
      ]),
    ),
    faq: defineFaqs(
      defineFaq("How many millimeters of rain are in 1 inch?", "1 inch of rain equals exactly 25.4 millimeters of rain."),
      defineFaq(
        "What is the formula to convert inches to mm rain?",
        "Multiply inches of rain by 25.4 to convert them to millimeters of rain.",
      ),
      defineFaq(
        "Why convert inches of rain to millimeters?",
        "It helps compare storm totals with international forecasts, hydrology products, and weather datasets that use metric rainfall units.",
      ),
    ),
    metaDescription:
      "Convert inches to mm rain for storm tracking, hydrology references, and forecast comparisons with a fast rainfall calculator.",
  }),
] as const;

export const dataPairPages = [
  defineNumericPairPage("data", "byte", "mb", 1048576, [1024, 4096, 65536, 1048576, 5242880], {
    aliases: ["bytes to mb", "bytes to megabytes", "byte to mb"],
    faq: defineFaqs(
      defineFaq(
        "How many megabytes are in 1 byte?",
        "1 byte equals about 0.0000009537 megabytes in binary conversion.",
      ),
      defineFaq(
        "What is the formula to convert bytes to MB?",
        "Divide bytes by 1,048,576 to convert them to megabytes using binary units.",
      ),
      defineFaq(
        "Why does bytes to MB use 1,048,576?",
        "Because 1 MB equals 1024 KB and each KB equals 1024 bytes, so 1024 x 1024 bytes make 1 MB.",
      ),
    ),
    formulaLabel: "MB = bytes / 1,048,576",
    metaDescription:
      "Convert bytes to MB with binary data sizing for files, payloads, exports, and storage estimates, including examples and a quick formula.",
  }),
  defineNumericPairPage("data", "mb", "byte", 5, [0.25, 0.5, 1, 5, 10, 25], {
    aliases: ["mb to bytes", "megabytes to bytes", "mb into bytes"],
    faq: defineFaqs(
      defineFaq(
        "How many bytes are in 1 megabyte?",
        "1 megabyte equals 1,048,576 bytes in binary conversion.",
      ),
      defineFaq(
        "What is the formula to convert MB to bytes?",
        "Multiply megabytes by 1,048,576 to convert them to bytes.",
      ),
      defineFaq(
        "When is MB to bytes conversion useful?",
        "It is useful when checking raw file sizes, API limits, exports, and storage calculations that require exact byte counts.",
      ),
    ),
    metaDescription:
      "Convert MB to bytes for exact file sizes, API payload checks, and binary storage calculations with formula, examples, and reference values.",
  }),
  defineNumericPairPage("data", "mb", "gb", 12288, [1024, 2048, 6144, 12288, 51200, 102400], {
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
      defineFaq(
        "How many GB is 6144 MB?",
        "6144 MB equals exactly 6 GB (6144 ÷ 1024 = 6).",
      ),
      defineFaq(
        "How many GB is 12288 MB?",
        "12288 MB equals exactly 12 GB (12288 ÷ 1024 = 12).",
      ),
      defineFaq(
        "How many GB is 51200 MB?",
        "51200 MB equals exactly 50 GB (51200 ÷ 1024 = 50).",
      ),
      defineFaq(
        "How many GB is 102400 MB?",
        "102400 MB equals exactly 100 GB (102400 ÷ 1024 = 100).",
      ),
      defineFaq(
        "How many GB is 20480 MB?",
        "20480 MB equals exactly 20 GB (20480 ÷ 1024 = 20).",
      ),
    ),
    featured: true,
    formulaLabel: "GB = MB / 1024",
    metaDescription:
      "Convert MB to GB instantly — 6144 MB = 6 GB, 12288 MB = 12 GB, 51200 MB = 50 GB. Binary MB to GB calculator with formula and common storage values.",
    popular: true,
  }),
  defineNumericPairPage("data", "gb", "mb", 5, [0.5, 1, 2, 5, 10, 25], {
    customLongDescription: gbToMbStructuredContent,
    faq: gbToMbFaqs,
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
    formulaLabel: "KB = MB x 1024",
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
    formulaLabel: "MB = KB / 1024",
    metaDescription:
      "Need kilobytes in megabytes? This KB to MB converter helps with small files, attachment limits, and binary size calculations.",
    popular: true,
  }),
  defineNumericPairPage("data", "kb", "byte", 64, [1, 64, 128, 512, 1024, 4096], {
    aliases: ["kb to bytes", "kilobytes to bytes", "kilobyte to bytes"],
    faq: defineFaqs(
      defineFaq(
        "How many bytes are in 1 kilobyte?",
        "1 kilobyte equals 1024 bytes in binary conversion.",
      ),
      defineFaq(
        "What is the formula to convert KB to bytes?",
        "Multiply kilobytes by 1024 to convert them to bytes.",
      ),
      defineFaq(
        "Why is KB to bytes useful?",
        "It helps when checking exact attachment sizes, image exports, and technical file limits that are shown in raw bytes.",
      ),
    ),
    formulaLabel: "bytes = KB x 1024",
    metaDescription:
      "Convert KB to bytes instantly for exact file-size checks, attachments, and binary storage math with formula and example values.",
  }),
  defineNumericPairPage("data", "byte", "kb", 4096, [128, 512, 1024, 4096, 16384, 65536], {
    aliases: ["bytes to kb", "bytes to kilobytes", "byte to kb"],
    faq: defineFaqs(
      defineFaq(
        "How many kilobytes are in 1 byte?",
        "1 byte equals 0.000976563 kilobytes in binary conversion.",
      ),
      defineFaq(
        "What is the formula to convert bytes to KB?",
        "Divide bytes by 1024 to convert them to kilobytes.",
      ),
      defineFaq(
        "When would I convert bytes to KB?",
        "This is useful for making raw byte counts easier to read when reviewing downloads, logs, exports, or file metadata.",
      ),
    ),
    formulaLabel: "KB = bytes / 1024",
    metaDescription:
      "Convert bytes to KB for easier file-size reading, storage estimates, and technical data checks with binary formulas and examples.",
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
    formulaLabel: "TB = GB / 1024",
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
    formulaLabel: "GB = TB x 1024",
    metaDescription:
      "Use this TB to GB converter to estimate drives, backups, and cloud usage with straightforward binary conversions and common values.",
  }),
] as const;
