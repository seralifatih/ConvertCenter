import { convertCookingUnit } from './conversions';
import { cookingIngredients } from './ingredients';

describe('convertCookingUnit', () => {
    it('should return the same value if units are identical', () => {
        const result = convertCookingUnit({
            value: 1,
            from: 'cup',
            to: 'cup',
            ingredient: cookingIngredients.flour,
        });
        expect(result).toBe(1);
    });

    // Flour
    it('converts 1 cup of flour to 120 grams', () => {
        const result = convertCookingUnit({
            value: 1,
            from: 'cup',
            to: 'gram',
            ingredient: cookingIngredients.flour,
        });
        expect(result).toBe(120);
    });

    it('converts 240 grams of flour to 2 cups', () => {
        const result = convertCookingUnit({
            value: 240,
            from: 'gram',
            to: 'cup',
            ingredient: cookingIngredients.flour,
        });
        expect(result).toBe(2);
    });

    // Sugar
    it('converts 0.5 cups of sugar to 100 grams', () => {
        const result = convertCookingUnit({
            value: 0.5,
            from: 'cup',
            to: 'gram',
            ingredient: cookingIngredients.sugar,
        });
        expect(result).toBe(100);
    });

    it('converts 200 grams of sugar to 1 cup', () => {
        const result = convertCookingUnit({
            value: 200,
            from: 'gram',
            to: 'cup',
            ingredient: cookingIngredients.sugar,
        });
        expect(result).toBe(1);
    });

    // Butter
    it('converts 1 cup of butter to 227 grams', () => {
        const result = convertCookingUnit({
            value: 1,
            from: 'cup',
            to: 'gram',
            ingredient: cookingIngredients.butter,
        });
        expect(result).toBe(227);
    });

    it('converts 113.5 grams of butter to 0.5 cups', () => {
        const result = convertCookingUnit({
            value: 113.5,
            from: 'gram',
            to: 'cup',
            ingredient: cookingIngredients.butter,
        });
        expect(result).toBe(0.5);
    });

    // Water
    it('converts 2 cups of water to 473.2 grams', () => {
        const result = convertCookingUnit({
            value: 2,
            from: 'cup',
            to: 'gram',
            ingredient: cookingIngredients.water,
        });
        expect(result).toBe(473.2);
    });

    it('converts 236.6 grams of water to 1 cup', () => {
        const result = convertCookingUnit({
            value: 236.6,
            from: 'gram',
            to: 'cup',
            ingredient: cookingIngredients.water,
        });
        expect(result).toBe(1);
    });
});