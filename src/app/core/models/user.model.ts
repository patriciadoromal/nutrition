import {Recommendation} from './recommendation.model'

export interface User {
    id: string
    dob: string
    sex: string
    goal: string
    email: string
    height: string
    weight: string
    password: string
    allergies: string
    activityLevel: string
    recommendation: Recommendation
}
