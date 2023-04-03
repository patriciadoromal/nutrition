import {Component, Input, OnInit} from '@angular/core'
import {getSuggestion} from 'app/core/helpers/helper'
import {User} from 'app/core/models/user.model'
import {Observable} from 'rxjs'

@Component({
    selector: 'generator-button',
    templateUrl: './generator-button.component.html',
    styleUrls: ['./generator-button.component.scss'],
})
export class GeneratorButtonComponent implements OnInit {
    constructor() {}

    @Input()
    user$?: Observable<User>

    ngOnInit(): void {}

    getSuggestion(user: User) {
        if (user.macro) {
            return getSuggestion(user.macro.totalCalories)
        }

        return getSuggestion(0)
    }

    beginCalculating() {}
}
