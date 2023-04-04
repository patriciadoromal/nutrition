import {Component, Input, OnInit} from '@angular/core'
import {Meal} from 'app/core/models/meal.model'

@Component({
    selector: 'generator-nutrition-facts',
    templateUrl: './generator-nutrition-facts.component.html',
    styleUrls: ['./generator-nutrition-facts.component.scss'],
})
export class GeneratorNutritionFactsComponent implements OnInit {
    constructor() {}

    @Input()
    meals: Meal[]

    ngOnInit(): void {}
}
