import {Component, Input, OnInit} from '@angular/core'
import {Meal} from 'app/core/models/meal.model'

@Component({
    selector: 'generator-targets-table',
    templateUrl: './generator-targets-table.component.html',
    styleUrls: ['./generator-targets-table.component.scss'],
})
export class GeneratorTargetsTableComponent implements OnInit {
    constructor() {}

    @Input()
    meals: Meal[]

    ngOnInit(): void {}

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
