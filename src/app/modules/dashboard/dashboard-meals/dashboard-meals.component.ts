import {Component, Input, OnInit} from '@angular/core'
import {Meal} from 'app/core/models/meal.model'

@Component({
    selector: 'dashboard-meals',
    templateUrl: './dashboard-meals.component.html',
    styleUrls: ['./dashboard-meals.component.scss'],
})
export class DashboardMealsComponent implements OnInit {
    constructor() {}

    @Input()
    meals: Meal[]

    ngOnInit(): void {}

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
