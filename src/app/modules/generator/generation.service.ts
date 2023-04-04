import {Injectable} from '@angular/core'
import {DayEnum} from 'app/core/enum/day.enum'
import {MealCombinationEnum} from 'app/core/enum/meal.combination.enum'
import {WeekEnum} from 'app/core/enum/week.enum'
import {combinationToNumbers} from 'app/core/helpers/combination-to-numbers'
import {Combination} from 'app/core/models/combination.model'
import {Recommendation} from 'app/core/models/recommendation.model'
import {User} from 'app/core/models/user.model'
import {GeneratorService} from './generator.service'
import {Week} from 'app/core/models/week.model'
import dayjs from 'dayjs'

@Injectable({providedIn: 'root'})
export class GenerationService {
    constructor(private _generatorService: GeneratorService) {}

    async generate(data: {
        user: User
        combination: Combination
        mealCombination: MealCombinationEnum
    }): Promise<Recommendation> {
        const {user, combination, mealCombination} = data

        return new Promise<Recommendation>((resolve) => {
            const data = {
                dateStarted: Date.now(),
                combination: combination,
                weeks: Object.values(WeekEnum).map((week, w) => {
                    return {
                        name: week,
                        date: dayjs().add(w, 'weeks').toJSON(),
                        days: Object.values(DayEnum).map((day, d) => {
                            return {
                                name: day,
                                date: dayjs()
                                    .add(w, 'weeks')
                                    .add(d, 'days')
                                    .toJSON(),
                                meals: [1].map(() => {
                                    const recommendations =
                                        this._generatorService.generate({
                                            user: user,
                                            combination:
                                                combinationToNumbers().find(
                                                    (combination) =>
                                                        combination.title ===
                                                        mealCombination,
                                                ),
                                        })

                                    return [
                                        ...recommendations.breakFasts,
                                        ...recommendations.mainDishes,
                                        ...recommendations.snacks,
                                    ]
                                })[0],
                            }
                        }),
                    }
                }) as Week[],
            }

            resolve(data as any)
        })
    }
}
