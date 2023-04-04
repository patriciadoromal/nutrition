import {MealCombinationEnum} from '../enum/meal.combination.enum'

export interface Combination {
    title: MealCombinationEnum
    meals: number
    snacks: number
}
