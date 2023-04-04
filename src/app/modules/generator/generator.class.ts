import {DishSummary} from './../../core/models/dish-summary'
import {Meals} from '../../core/models/meals.model'
import {Injectable} from '@angular/core'
import {MEALS} from 'app/core/constants/meals'
import {GeneratorModeEnum} from 'app/core/enum/generator-mode.enum'
import {MealTypEnum} from 'app/core/enum/meal-type.enum'
import {nearestCalorie} from 'app/core/helpers/generator.helper'
import {Combination} from 'app/core/models/combination.model'
import {Meal} from 'app/core/models/meal.model'
import {has_decimal} from 'app/core/pipes/has-decimal.pipe'

@Injectable({providedIn: 'root'})
export class Generator {
    constructor() {}

    meals = MEALS

    getTotalPossibleCombinations(combination: Combination): number {
        const totalPossibleCombinations =
            this.meals.flatMap((value, index) => this.meals.slice(index + 1))
                .length *
            (combination.meals + combination.snacks)

        return totalPossibleCombinations
    }

    getRandomMeals(dish: MealTypEnum, limit: number): Meal[] {
        let meals: Meal[] = []

        for (let i = 0; i <= limit - 1; i++) {
            const randomMeals = this.getMeals(dish)

            meals.push(
                randomMeals[Math.floor(Math.random() * randomMeals.length)],
            )
        }

        return limit === 0 ? [] : meals
    }

    getMeals(dish: MealTypEnum): Meal[] {
        return this.meals.filter((meal) => meal.type === dish)
    }

    isAlreadyRandomized(parentMeals: Meals[], currentMeals: Meals): boolean {
        return (
            parentMeals.filter((parentMeals) => currentMeals === parentMeals)
                .length !== 0
        )
    }

    sortAndFindOne(data: {calories: number; parentMeals: Meals[]}): Meals {
        const {parentMeals, calories} = data

        const mode = GeneratorModeEnum.CALORIE

        let dishesSummaries =
            this.getDishWithTotalProteinAndCalories(parentMeals)

        return nearestCalorie(parentMeals, dishesSummaries, calories)
    }

    getDishWithTotalProteinAndCalories(parentMeals: Meals[]): DishSummary[] {
        let dishesSummaries = []

        let index = 0

        for (let dishes of parentMeals) {
            let totalCalories = 0

            let totalProteins = 0

            for (let key in dishes) {
                let dishCalories = 0

                let dishProteins = 0

                for (let meal of dishes[key]) {
                    dishCalories += meal.calories

                    dishProteins += meal.protein
                }

                totalCalories += dishCalories

                totalProteins += dishProteins
            }

            dishesSummaries.push({
                totalCalories,
                totalProteins,
                index,
            })

            index++
        }

        return dishesSummaries
    }

    resolveDishCount(
        prioritize: MealTypEnum.BREAKFAST | MealTypEnum.MAIN_DISH,
        count: number,
    ): number {
        if (prioritize !== MealTypEnum.BREAKFAST) {
            return has_decimal(count / 2) ? count / 2 + 0.5 : count / 2
        }

        return has_decimal(count / 2) ? count / 2 - 0.5 : count / 2
    }
}
