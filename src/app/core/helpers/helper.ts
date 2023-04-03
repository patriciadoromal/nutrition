import {ActivityLevelEnum} from '../enum/activity-level.enum'
import {GoalEnum} from '../enum/goal.enum'
import {SexEnum} from '../enum/sex.enum'

export function calculateDailyMacroNeeds(data: {
    age: number
    sex: SexEnum
    height: number
    weight: number
    goal: GoalEnum
    activityLevel: ActivityLevelEnum
}): DailyMacroNeeds {
    const {age, sex, height, weight, activityLevel, goal} = data

    let bmr: number
    let tdee: number

    // Calculate basal metabolic rate (BMR) using Mifflin-St Jeor formula
    if (sex === SexEnum.MALE) {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    // Calculate total daily energy expenditure (TDEE) based on activity level
    switch (activityLevel) {
        case ActivityLevelEnum.SEDENTARY:
            tdee = bmr * 1.2
            break
        case ActivityLevelEnum.LIGHTLY_ACTIVE:
            tdee = bmr * 1.375
            break
        case ActivityLevelEnum.MODERATELY_ACTIVE:
            tdee = bmr * 1.55
            break
        case ActivityLevelEnum.VERY_ACTIVE:
            tdee = bmr * 1.725
            break
        case ActivityLevelEnum.EXTRA_ACTIVE:
            tdee = bmr * 1.9
            break
        default:
            throw new Error('Invalid activity level')
    }

    // Adjust TDEE based on goal
    switch (goal) {
        case GoalEnum.LOSE_WEIGHT:
            tdee = tdee * 0.8
            break
        case GoalEnum.MAINTAIN_WEIGHT:
            // No adjustment needed
            break
        case GoalEnum.GAIN_WEIGHT:
            tdee = tdee * 1.2
            break
        default:
            throw new Error('Invalid goal')
    }

    // Calculate macronutrient needs
    const protein = weight * 2.2 // 1 gram of protein per pound of bodyweight
    const fat = (tdee * 0.25) / 9 // 25% of calories from fat, assuming 9 calories per gram of fat
    const carbs = (tdee - (protein * 4 + fat * 9)) / 4 // Remaining calories from carbs, assuming 4 calories per gram of carbs

    return {
        protein,
        carbs,
        fat,
        totalCalories: tdee,
    }
}
