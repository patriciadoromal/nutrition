import {Observable} from 'rxjs'
import {Router} from '@angular/router'
import {Component} from '@angular/core'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {empty} from 'app/core/pipes/is-empty.pipe'
import {User} from 'app/core/models/user.model'
import {CollectionEnum} from 'app/core/enum/collection.enum'

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
            .valueChanges() as Observable<User>
    }

    save() {
        this._router.navigate(['/dashboard'])
    }
}
