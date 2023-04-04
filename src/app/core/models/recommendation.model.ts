import {Combination} from './combination.model'
import {Week} from './week.model'

export interface Recommendation {
    weeks: Week[]
    combination: Combination
    dateStarted: Date
}
