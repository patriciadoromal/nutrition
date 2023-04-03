import {MealTypEnum} from '../enum/meal-type.enum'

export interface Meal {
    fat: number
    name: string
    image: string
    carbs: number
    protein: number
    calories: number
    type: MealTypEnum
}
