import {Component} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {CollectionEnum} from 'app/core/enum/collection.enum'
import {Meal} from 'app/core/models/meal.model'
import {User} from 'app/core/models/user.model'
import {empty} from 'app/core/pipes/is-empty.pipe'
import dayjs from 'dayjs'
import {Observable, tap} from 'rxjs'

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
    constructor(private _angularFireStore: AngularFirestore) {}

    user$?: Observable<User>

    today = new Date()

    ngOnInit(): void {
        const user = JSON.parse(localStorage.getItem('user')) as User

        if (!empty(user)) {
            this.getUser(user)
        }
    }

    getUser(user: User) {
        this.user$ = this._angularFireStore
            .collection(CollectionEnum.USER)
            .doc(user.id)
            .valueChanges() as any
    }

    getMeals(user: User) {
        return user.recommendation.weeks
            .find((w) => {
                const c = dayjs(w.date)
                    .startOf('week')
                    .isSame(dayjs(this.today).startOf('week'))

                return c
            })
            .days.find((d) =>
                dayjs(d.date)
                    .startOf('day')
                    .isSame(dayjs(this.today).startOf('day')),
            ).meals
    }
}
