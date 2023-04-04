import {Observable} from 'rxjs'
import {Component, Input, OnInit} from '@angular/core'
import {User} from 'app/core/models/user.model'

@Component({
    selector: 'generator-meals',
    templateUrl: './generator-meals.component.html',
    styleUrls: ['./generator-meals.component.scss'],
})
export class GeneratorMealsComponent implements OnInit {
    constructor() {}

    @Input()
    user$?: Observable<User>

    ngOnInit(): void {}

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
