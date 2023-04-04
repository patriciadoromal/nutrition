import {DishSummary} from '../models/dish-summary'
import {Meals} from '../models/meals.model'
import {ProteinCalorie} from '../models/protein-calorie.model'

export function nearestProtein(
    parentMeals: Meals[],
    dishesSummaries: DishSummary[],
    proteins: number,
): Meals {
    const totalProteins = findClosest(
        dishesSummaries,
        proteins,
        'totalProteins',
    )
    const index = dishesSummaries.findIndex(
        (dish) => dish.totalProteins === totalProteins,
    )
    return parentMeals[dishesSummaries[index].index]
}

export function nearestCalorie(
    parentMeals: Meals[],
    dishesSummaries: DishSummary[],
    calorie: number,
): Meals {
    const totalCalories = findClosest(dishesSummaries, calorie, 'totalCalories')
    const index = dishesSummaries.findIndex(
        (dish) => dish.totalCalories === totalCalories,
    )
    return parentMeals[dishesSummaries[index].index]
}

export function margins(recommended: ProteinCalorie, mealItem: ProteinCalorie) {
    const toRadius = (value: number) => {
        return (value * Math.PI) / 180
    }

    const protein = mealItem.protein - recommended.protein
    const proteinDifference = toRadius(protein)

    const calorie = mealItem.calorie - recommended.calorie
    const calorieDifference = toRadius(calorie)

    const a =
        Math.sin(proteinDifference / 2) * Math.sin(proteinDifference / 2) +
        Math.cos(toRadius(recommended.protein)) *
            Math.cos(toRadius(mealItem.protein)) *
            Math.sin(calorieDifference / 2) *
            Math.sin(calorieDifference / 2)

    return {
        margin: 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)),
        dishSummary: mealItem,
    }
}

export function findClosest(
    dishesSummaries: DishSummary[],
    value: number,
    mode: 'totalCalories' | 'totalProteins',
) {
    let closest = dishesSummaries[0][mode]

    for (const dishSummary of dishesSummaries) {
        if (Math.abs(dishSummary[mode] - value) < Math.abs(closest - value)) {
            closest = dishSummary[mode]
        }
    }

    return closest
}
