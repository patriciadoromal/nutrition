import {Meal} from './../../core/models/meal.model'
import {Component, Input, OnInit} from '@angular/core'

@Component({
    selector: 'meal',
    templateUrl: './meal.component.html',
    styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {
    constructor() {}

    @Input()
    meal?: Meal

    @Input()
    percentage = 0

    @Input()
    hasPercentage: boolean = false

    ngOnInit(): void {}
}
