import {WeekEnum} from '../enum/week.enum'
import {Day} from './day.model'

export interface Week {
    name: WeekEnum
    days: Day[]
}
