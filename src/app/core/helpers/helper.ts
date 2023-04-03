interface DailyMacroNeeds {
    protein: number
    carbs: number
    fat: number
    totalCalories: number
}

type Sex = 'male' | 'female'

type ActivityLevel =
    | 'sedentary'
    | 'lightlyActive'
    | 'moderatelyActive'
    | 'veryActive'
    | 'extraActive'

type Goal = 'loseWeight' | 'maintainWeight' | 'gainWeight'

function calculateDailyMacroNeeds(data: {
    age: number
    sex: Sex
    height: number
    weight: number
    activityLevel: ActivityLevel
    goal: Goal
}): DailyMacroNeeds {
    const {age, sex, height, weight, activityLevel, goal} = data

    let bmr: number
    let tdee: number

    // Calculate basal metabolic rate (BMR) using Mifflin-St Jeor formula
    if (sex === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    // Calculate total daily energy expenditure (TDEE) based on activity level
    switch (activityLevel) {
        case 'sedentary':
            tdee = bmr * 1.2
            break
        case 'lightlyActive':
            tdee = bmr * 1.375
            break
        case 'moderatelyActive':
            tdee = bmr * 1.55
            break
        case 'veryActive':
            tdee = bmr * 1.725
            break
        case 'extraActive':
            tdee = bmr * 1.9
            break
        default:
            throw new Error('Invalid activity level')
    }

    // Adjust TDEE based on goal
    switch (goal) {
        case 'loseWeight':
            tdee = tdee * 0.8
            break
        case 'maintainWeight':
            // No adjustment needed
            break
        case 'gainWeight':
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
