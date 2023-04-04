import {MealTypEnum} from '../enum/meal-type.enum'

export interface Meal {
    name: string
    image: string
    fat: number | string
    probability?: number
    carbs: number | string
    protein: number | string
    calories: number | string
    type: MealTypEnum | string
}
