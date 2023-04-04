import {Injectable} from '@angular/core'
import {Generator} from './generator.class'
import {Combination} from 'app/core/models/combination.model'
import {User} from 'app/core/models/user.model'
import {MealTypEnum} from 'app/core/enum/meal-type.enum'
import {Meals} from 'app/core/models/meals.model'

@Injectable({providedIn: 'root'})
export class GeneratorService extends Generator {
    generate(data: {user: User; combination: Combination}): Meals {
        const {user, combination} = data

        let parentMeals: Meals[] = []

        for (
            let index = 0;
            index <= this.getTotalPossibleCombinations(combination);
            index++
        ) {
            let currentMeals: Meals = {
                breakFasts: this.getRandomMeals(
                    MealTypEnum.BREAKFAST,
                    this.resolveDishCount(
                        MealTypEnum.BREAKFAST,
                        combination.meals,
                    ),
                ),
                mainDishes: this.getRandomMeals(
                    MealTypEnum.MAIN_DISH,
                    this.resolveDishCount(
                        MealTypEnum.MAIN_DISH,
                        combination.meals,
                    ),
                ),
                snacks: this.getRandomMeals(
                    MealTypEnum.SNACK,
                    combination.snacks,
                ),
            }

            if (!this.isAlreadyRandomized(parentMeals, currentMeals)) {
                parentMeals.push(currentMeals)
            } else {
                index--
            }
        }

        const combinations = this.sortAndFindOne({
            calories: user.macro.totalCalories,
            parentMeals: parentMeals,
        })

        return combinations
    }
}
