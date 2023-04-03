import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'

@Component({
    selector: 'personal-data',
    templateUrl: './personal-data.component.html',
    styleUrls: ['./personal-data.component.scss'],
})
export class PersonalDataComponent implements OnInit {
    constructor(private _router: Router) {}

    ngOnInit(): void {}

    next() {
        this._router.navigate(['/generator'])
    }
}
