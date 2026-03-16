export interface CookingIngredient {
    id: string;
    name: string;
    gramsPerCup: number;
    /**
     * A note explaining that this is an approximation and why.
     * To be displayed in the UI.
     */
    approximationNote: string;
}

export const cookingIngredients: Record<string, CookingIngredient> = {
    water: {
        id: "water",
        name: "Water",
        gramsPerCup: 236.6,
        approximationNote: "Based on water density at 4°C. Weight can vary slightly with temperature.",
    },
    flour: {
        id: "flour",
        name: "Flour (All-Purpose)",
        gramsPerCup: 120,
        approximationNote: "Weight can vary based on how flour is packed. This is based on a spooned & leveled cup.",
    },
    sugar: {
        id: "sugar",
        name: "Sugar (Granulated)",
        gramsPerCup: 200,
        approximationNote: "Based on standard granulated white sugar. Other types like brown sugar have different densities.",
    },
    butter: {
        id: "butter",
        name: "Butter",
        gramsPerCup: 227,
        approximationNote: "Based on a standard US stick of butter (1/2 cup) weighing 113.5g.",
    },
};