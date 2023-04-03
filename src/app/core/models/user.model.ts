import {Macro} from './macro.model'
import {Recommendation} from './recommendation.model'

export interface User {
    id: string
    dob: string
    sex: string
    macro: Macro
    goal: string
    email: string
    height: number
    weight: number
    password: string
    allergies: string
    activityLevel: string
    recommendation: Recommendation
}
