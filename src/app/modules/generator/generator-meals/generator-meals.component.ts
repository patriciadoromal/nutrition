import {Component, OnInit} from '@angular/core'

@Component({
    selector: 'generator-meals',
    templateUrl: './generator-meals.component.html',
    styleUrls: ['./generator-meals.component.scss'],
})
export class GeneratorMealsComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
