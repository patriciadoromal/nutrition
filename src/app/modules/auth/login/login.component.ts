import {Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Router} from '@angular/router'

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    constructor(private _router: Router, private _formBuilder: FormBuilder) {}

    ngOnInit(): void {}

    form = this._formBuilder.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]],
    })

    login() {
        this._router.navigate(['/dashboard'])
    }
}
