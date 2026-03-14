import { defineFaq, defineFaqs, defineNumericPairPage } from "./registry-helpers";

export const weightPairPages = [
  defineNumericPairPage("weight", "kg", "lb", 75, [1, 5, 10, 25, 50, 100], {
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
    faq: defineFaqs(
      defineFaq(
        "How many milliliters are in 1 fluid ounce?",
        "1 US fluid ounce equals 29.5735 milliliters.",
      ),
      defineFaq(
        "What is the formula to convert oz to ml?",
        "Multiply fluid ounces by 29.5735 to convert them to milliliters.",
      ),
      defineFaq(
        "Is this ounce conversion for volume or weight?",
        "This page uses US fluid ounces, which measure volume rather than weight.",
      ),
    ),
    metaDescription:
      "Change fluid ounces to milliliters in seconds. Great for drink recipes, nutrition labels, and bottle sizes, with formula and lookup values.",
    popular: true,
  }),
  defineNumericPairPage("volume", "ml", "floz", 500, [30, 50, 100, 250, 500, 1000], {
    faq: defineFaqs(
      defineFaq(
        "How many fluid ounces are in 1 milliliter?",
        "1 milliliter equals about 0.033814 fluid ounces.",
      ),
      defineFaq(
        "What is the formula to convert ml to oz?",
        "Multiply milliliters by 0.033814, or divide by 29.5735.",
      ),
      defineFaq(
        "Why use ml to oz conversion?",
        "It is handy for drinks, cosmetics, bottle sizes, and recipes that switch between metric and US measurements.",
      ),
    ),
    metaDescription:
      "Find fluid ounces from milliliters with a quick ml to oz converter for cooking, packaging, and beverage prep, plus formula and examples.",
  }),
  defineNumericPairPage("volume", "cup", "floz", 2, [0.25, 0.5, 1, 2, 3, 4], {
    faq: defineFaqs(
      defineFaq("How many ounces are in 1 cup?", "1 US cup equals 8 fluid ounces."),
      defineFaq(
        "What is the formula to convert cups to oz?",
        "Multiply cups by 8 to convert them to fluid ounces.",
      ),
      defineFaq(
        "Are cups to ounces and cups to grams the same?",
        "No. Cups to ounces measures volume here, while grams would depend on the ingredient weight.",
      ),
    ),
    metaDescription:
      "Convert cups to ounces for recipe prep and kitchen measurements with an easy calculator, quick formula, and common cup-to-oz references.",
  }),
  defineNumericPairPage("volume", "floz", "cup", 8, [1, 2, 4, 8, 12, 16], {
    faq: defineFaqs(
      defineFaq("How many cups are in 1 fluid ounce?", "1 fluid ounce equals 0.125 cups."),
      defineFaq(
        "What is the formula to convert oz to cups?",
        "Divide fluid ounces by 8 to convert them to cups.",
      ),
      defineFaq(
        "Why would I convert ounces to cups?",
        "It helps with recipe scaling, serving sizes, and comparing bottle or drink volumes.",
      ),
    ),
    metaDescription:
      "See how many cups are in a fluid ounce using this oz to cups converter, useful for recipes, serving sizes, and portion calculations.",
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
