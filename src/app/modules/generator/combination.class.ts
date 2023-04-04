import {MealCombinationEnum} from 'app/core/enum/meal.combination.enum'

export class Combination {
    getThree(): MealCombinationEnum {
        const combinations = [
            MealCombinationEnum.THREE_MEALS_ONE_SNACK,
            MealCombinationEnum.TWO_MEALS_TWO_SNACKS,
        ]

        return this.randomized(combinations)
    }

    getFour(): MealCombinationEnum {
        const combinations = [
            MealCombinationEnum.FOUR_MEALS,
            MealCombinationEnum.THREE_MEALS_TWO_SNACKS,
        ]

        return this.randomized(combinations)
    }

    getFive(): MealCombinationEnum {
        const combinations = [
            MealCombinationEnum.FIVE_MEALS,
            MealCombinationEnum.FOUR_MEALS_TWO_SNACKS,
        ]

        return this.randomized(combinations)
    }

    getSix(): MealCombinationEnum {
        const combinations = [
            MealCombinationEnum.SIX_MEALS,
            MealCombinationEnum.FIVE_MEALS_TWO_SNACKS,
        ]

        return this.randomized(combinations)
    }

    getSeven(): MealCombinationEnum {
        const combinations = [
            MealCombinationEnum.SEVEN_MEALS,
            MealCombinationEnum.SIX_MEALS_TWO_SNACKS,
        ]

        return this.randomized(combinations)
    }

    randomized(combinations: MealCombinationEnum[]): MealCombinationEnum {
        return combinations[Math.floor(Math.random() * combinations.length)]
    }
}
