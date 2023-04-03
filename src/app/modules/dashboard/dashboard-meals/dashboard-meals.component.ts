import {Component, OnInit} from '@angular/core'

@Component({
    selector: 'dashboard-meals',
    templateUrl: './dashboard-meals.component.html',
    styleUrls: ['./dashboard-meals.component.scss'],
})
export class DashboardMealsComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
