import {Week} from './week.model'

export interface User {
    dob: string
    sex: string
    goal: string
    email: string
    height: string
    weight: string
    password: string
    allergies: string
    activityLevel: string
    recommendations: Week[]
}
