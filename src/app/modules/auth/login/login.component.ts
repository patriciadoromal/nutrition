import {AngularFirestore} from '@angular/fire/compat/firestore'
import {Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {CollectionEnum} from 'app/core/enum/collection.enum'
import {User} from 'app/core/models/user.model'
import {empty} from 'app/core/pipes/is-empty.pipe'

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _angularFireStore: AngularFirestore,
    ) {}

    ngOnInit(): void {}

    form = this._formBuilder.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]],
    })

    loading: boolean = false

    async login() {
        if (this.form.invalid) {
            return alert('One or more fields should not be empty')
        }

        const {email, password} = this.form.value

        try {
            this.loading = true

            const querySnapshot = await this._angularFireStore
                .collection(CollectionEnum.USER)
                .ref.where('email', '==', email)
                .where('password', '==', password)
                .get()

            if (querySnapshot) {
                let users: User[] = []

                querySnapshot.forEach((user) => {
                    const data = user.data() as any

                    users.push({...data, id: user.id})
                })

                if (users.length === 0) {
                    alert('Invalid Credentials')
                    return
                }

                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        ...users[0],
                    }),
                )

                setTimeout(() => {
                    this.redirect(users[0])
                }, 1000)

                return
            }
        } catch (error) {
        } finally {
            this.loading = false
        }
    }

    redirect(user: User) {
        if (empty(user.height)) {
            this._router.navigate(['/auth/personal-data'])
            return
        }

        if (empty(user.recommendation)) {
            this._router.navigate(['/generator'])
            return
        }

        this._router.navigate(['/dashboard'])
    }
}
