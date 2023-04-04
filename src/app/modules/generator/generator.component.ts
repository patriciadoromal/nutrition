import {Observable, take} from 'rxjs'
import {Router} from '@angular/router'
import {Component} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {empty} from 'app/core/pipes/is-empty.pipe'
import {User} from 'app/core/models/user.model'
import {CollectionEnum} from 'app/core/enum/collection.enum'
import {WeekEnum} from 'app/core/enum/week.enum'
import {DayEnum} from 'app/core/enum/day.enum'
import {Meal} from 'app/core/models/meal.model'

@Component({
    selector: 'generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent {
    constructor(
        private _router: Router,
        private _angularFireStore: AngularFirestore,
    ) {}

    user$?: Observable<User>

    day: DayEnum = DayEnum.MONDAY
    week: WeekEnum = WeekEnum.FIRST_WEEK

    meals: Meal[] = []

    ngOnInit(): void {
        const user = JSON.parse(localStorage.getItem('user')) as User

        if (!empty(user)) {
            this.getUser(user)
        }

        this.changeWeek(this.week)
        this.changeDay(this.day)
    }

    getUser(user: User) {
        this.user$ = this._angularFireStore
            .collection(CollectionEnum.USER)
            .doc(user.id)
            .valueChanges() as Observable<User>
    }

    changeWeek(week: WeekEnum) {
        this.user$.pipe(take(1)).subscribe((user) => {
            this.week = week

            if (!user.recommendation) {
                return
            }

            this.meals = user.recommendation.weeks
                .find((w) => w.name === week)
                .days.find((d) => d.name === this.day).meals
        })
    }

    changeDay(day: DayEnum) {
        this.user$.pipe(take(1)).subscribe((user) => {
            this.day = day

            if (!user.recommendation) {
                return
            }

            this.meals = user.recommendation.weeks
                .find((w) => w.name === this.week)
                .days.find((d) => d.name === day).meals
        })
    }

    save() {
        this._router.navigate(['/dashboard'])
    }
}
