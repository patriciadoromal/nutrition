import {Pipe, PipeTransform} from '@angular/core'
import {Meal} from '../models/meal.model'

@Pipe({name: 'calculate_daily_summary', pure: true})
export class CalculateDailySummaryPipe implements PipeTransform {
    transform(
        meals: Meal[],
        category: 'protein' | 'fat' | 'calories' | 'carbs',
    ): number {
        return calculate_daily_summary(meals, category)
    }
}

export function calculate_daily_summary(
    meals: Meal[],
    category: 'protein' | 'fat' | 'calories' | 'carbs',
): number {
    let total = 0

    for (const meal of meals) {
        total += parseInt(meal[category] as any)
    }

    return total
}
