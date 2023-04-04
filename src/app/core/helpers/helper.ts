import {Combination} from 'app/modules/generator/combination.class'
import {ActivityLevelEnum} from '../enum/activity-level.enum'
import {GoalEnum} from '../enum/goal.enum'
import {MealCombinationEnum} from '../enum/meal.combination.enum'
import {SexEnum} from '../enum/sex.enum'
import {DailyMacroNeeds} from '../models/daily-macro-need.model'
import {User} from '../models/user.model'
import {to_age} from '../pipes/age.pipe'
import * as dayjs from 'dayjs'

export function calculateDailyMacroNeeds(user: User): DailyMacroNeeds {
    const {sex, height, weight, activityLevel, goal, dob} = user

    const age = to_age(dayjs(dob).toDate())

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

export function checkIfStringsAreEqual(str1, str2) {
    const sanitizedStr1 = str1.replace(/[\s&]/g, '') // remove all spaces and ampersands from the first string
    const sanitizedStr2 = str2.replace(/[\s&]/g, '') // remove all spaces and ampersands from the second string
    return sanitizedStr1.toLowerCase() === sanitizedStr2.toLowerCase()
}

export function getSuggestion(calorie: number): MealCombinationEnum {
    const combination = new Combination()

    if (calorie < 1500) {
        return MealCombinationEnum.TWO_MEALS_ONE_SNACK
    }
    if (between(calorie, 1500, 1700)) {
        return MealCombinationEnum.TWO_MEALS_ONE_SNACK
    }
    if (between(calorie, 1700, 1900)) {
        return MealCombinationEnum.TWO_MEALS_ONE_SNACK
    }
    if (between(calorie, 1900, 2200)) {
        return combination.getThree()
    }
    if (between(calorie, 2200, 2400)) {
        return MealCombinationEnum.THREE_MEALS_ONE_SNACK
    }
    if (between(calorie, 2400, 2600)) {
        return combination.getFour()
    }
    if (between(calorie, 2600, 2800)) {
        return MealCombinationEnum.FOUR_MEALS_ONE_SNACK
    }
    if (between(calorie, 2800, 3100)) {
        return combination.getFive()
    }
    if (between(calorie, 3100, 3400)) {
        return MealCombinationEnum.FIVE_MEALS_ONE_SNACK
    }
    if (between(calorie, 3400, 3900)) {
        return combination.getSix()
    }

    if (between(calorie, 3900, 4400)) {
        return MealCombinationEnum.SIX_MEALS_ONE_SNACK
    }

    if (between(calorie, 4400, 3900)) {
        return combination.getSeven()
    }

    if (between(calorie, 4600, 5100)) {
        return MealCombinationEnum.EIGHT_MEALS
    }

    return MealCombinationEnum.NINE_MEALS
}

function between(num, min, max) {
    return num >= min && num <= max
}
