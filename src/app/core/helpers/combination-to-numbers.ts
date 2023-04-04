import {MealCombinationEnum} from '../enum/meal.combination.enum'
import {Combination} from '../models/combination.model'

export function combinationToNumbers(): Combination[] {
    let priceLists = []

    const titles: MealCombinationEnum[] = Object.values(MealCombinationEnum)

    let titleIndex = -2

    for (let i = 2; i <= 10; i++) {
        priceLists.push({
            title: titles[i + titleIndex],
            meals: i,
            snacks: 0,
        })
    }
    titleIndex += 9

    for (let i = 2; i <= 6; i++) {
        priceLists.push({
            title: titles[i + titleIndex],
            meals: i,
            snacks: 1,
        })
    }
    titleIndex += 9

    for (let i = 2; i <= 6; i++) {
        priceLists.push({
            title: titles[i + titleIndex],
            meals: i,
            snacks: 2,
        })
    }

    return [...new Set(priceLists)]
}
