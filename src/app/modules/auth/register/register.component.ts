import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    constructor(private _router: Router) {}

    ngOnInit(): void {}

    register() {
        this._router.navigate(['/auth/personal-data'])
    }
}
