import {AngularFirestore} from '@angular/fire/compat/firestore'
import {GoalEnum} from './../../../core/enum/goal.enum'
import {Component, OnInit} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {ActivityLevelEnum} from 'app/core/enum/activity-level.enum'
import {SexEnum} from 'app/core/enum/sex.enum'
import {CollectionEnum} from 'app/core/enum/collection.enum'
import {User} from 'app/core/models/user.model'

@Component({
    selector: 'personal-data',
    templateUrl: './personal-data.component.html',
    styleUrls: ['./personal-data.component.scss'],
})
export class PersonalDataComponent implements OnInit {
    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _angularFireStore: AngularFirestore,
    ) {}

    readonly SEX = Object.values(SexEnum)
    readonly GOALS = Object.values(GoalEnum)
    readonly ACTIVITY = Object.values(ActivityLevelEnum)

    ngOnInit(): void {}

    form = this._formBuilder.group({
        dob: ['', [Validators.required]],
        height: ['', [Validators.required]],
        weight: ['', [Validators.required]],
        allergies: [''],
        sex: [SexEnum.FEMALE, [Validators.required]],
        goal: [GoalEnum.MAINTAIN_WEIGHT, [Validators.required]],
        activityLevel: [ActivityLevelEnum.SEDENTARY, [Validators.required]],
    })

    loading: boolean = false

    async next() {
        if (this.form.invalid) {
            return alert('One or more fields should not be empty')
        }

        this.loading = true

        try {
            const data = this.form.value

            const user = JSON.parse(localStorage.getItem('user')) as User

            console.log(user)

            await this._angularFireStore
                .collection(CollectionEnum.USER)
                .doc(user.id)
                .update({
                    ...user,
                    ...data,
                    updateAt: Date.now(),
                })

            this._router.navigate(['/generator']).then(() => {
                localStorage.setItem('user', JSON.stringify({...user, ...data}))
            })
        } catch (error) {
        } finally {
            this.loading = false
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
