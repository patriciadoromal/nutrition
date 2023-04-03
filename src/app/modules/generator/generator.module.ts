import {GeneratorBmiComponent} from './generator-bmi/generator-bmi.component'
import {RouterModule} from '@angular/router'
import {GENERATOR_ROUTING} from './../../core/routes/generator.routing'
import {SharedModule} from './../../shared/shared.module'
import {GeneratorMealsComponent} from './generator-meals/generator-meals.component'
import {GeneratorMacrosComponent} from './generator-macros/generator-macros.component'
import {GeneratorButtonComponent} from './generator-button/generator-button.component'
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {GeneratorComponent} from './generator.component'
import {GeneratorNutritionFactsComponent} from './generator-nutrition-facts/generator-nutrition-facts.component'
import {GeneratorTargetsTableComponent} from './generator-targets-table/generator-targets-table.component'
import {GeneratorWeekAndDayComponent} from './generator-week-and-day/generator-week-and-day.component'

@NgModule({
    declarations: [
        GeneratorComponent,
        GeneratorBmiComponent,
        GeneratorButtonComponent,
        GeneratorMacrosComponent,
        GeneratorMealsComponent,
        GeneratorNutritionFactsComponent,
        GeneratorTargetsTableComponent,
        GeneratorWeekAndDayComponent,
    ],
    imports: [SharedModule, RouterModule.forChild(GENERATOR_ROUTING)],
})
export class GeneratorModule {}
