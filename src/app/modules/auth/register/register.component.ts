import {FormBuilder, Validators} from '@angular/forms'
import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'
import {CollectionEnum} from 'app/core/enum/collection.enum'
import {AngularFirestore} from '@angular/fire/compat/firestore'

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _angularFireStore: AngularFirestore,
    ) {}

    ngOnInit(): void {}

    loading: boolean = false

    form = this._formBuilder.group({
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
    })

    async register() {
        this.loading = true

        if (
            this.form.get('password')?.value !==
            this.form.get('password')?.value
        ) {
            return alert('Password should match')
        }

        if (this.form.invalid) {
            return alert('One or more fields should not be empty')
        }
        try {
            const data = this.form.value

            await this._angularFireStore.collection(CollectionEnum.USER).add({
                ...data,
                createdAt: Date.now(),
                updateAt: Date.now(),
            })

            this._router.navigate(['/auth/personal-data']).then(() => {
                localStorage.setItem('user', JSON.stringify(data))
            })
        } catch (error) {
        } finally {
            this.loading = true
        }
    }
}
