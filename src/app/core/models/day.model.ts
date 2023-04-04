import {DayEnum} from '../enum/day.enum'
import {Meal} from './meal.model'

export interface Day {
    name: DayEnum
    meals: Meal[]
}
