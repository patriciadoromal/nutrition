import {AngularFirestore} from '@angular/fire/compat/firestore'
import {Component, Input, OnInit} from '@angular/core'
import {calculateDailyMacroNeeds} from 'app/core/helpers/helper'
import {User} from 'app/core/models/user.model'
import {empty} from 'app/core/pipes/is-empty.pipe'
import {CollectionEnum} from 'app/core/enum/collection.enum'
import {Observable, map, tap} from 'rxjs'

@Component({
    selector: 'generator-macros',
    templateUrl: './generator-macros.component.html',
    styleUrls: ['./generator-macros.component.scss'],
})
export class GeneratorMacrosComponent implements OnInit {
    constructor(private _angularFireStore: AngularFirestore) {}

    @Input()
    user$?: Observable<User>

    ngOnInit(): void {
        const user = JSON.parse(localStorage.getItem('user')) as User

        if (empty(user.macro)) {
            this.addMacros(user)
        }
    }

    async addMacros(user: User) {
        const macros = calculateDailyMacroNeeds(user)

        try {
            await this._angularFireStore
                .collection(CollectionEnum.USER)
                .doc(user.id)
                .update({
                    ...user,
                    macro: macros,
                    updateAt: Date.now(),
                })

            localStorage.setItem(
                'user',
                JSON.stringify({...user, macro: macros}),
            )
        } catch (error) {
        } finally {
        }
    }
}
