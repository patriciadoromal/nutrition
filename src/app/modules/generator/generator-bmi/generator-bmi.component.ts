import {Component, Input, OnInit} from '@angular/core'
import {User} from 'app/core/models/user.model'
import {Observable} from 'rxjs'

@Component({
    selector: 'generator-bmi',
    templateUrl: './generator-bmi.component.html',
    styleUrls: ['./generator-bmi.component.scss'],
})
export class GeneratorBmiComponent implements OnInit {
    constructor() {}

    @Input()
    user$?: Observable<User>

    ngOnInit(): void {}
}
