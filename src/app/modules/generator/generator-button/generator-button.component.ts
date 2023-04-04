import {MealCombinationEnum} from 'app/core/enum/meal.combination.enum'
import {GeneratorService} from './../generator.service'
import {Component, Input, OnInit} from '@angular/core'
import {getSuggestion} from 'app/core/helpers/helper'
import {User} from 'app/core/models/user.model'
import {Observable, take} from 'rxjs'
import {combinationToNumbers} from 'app/core/helpers/combination-to-numbers'
import {GenerationService} from '../generation.service'
import {Recommendation} from 'app/core/models/recommendation.model'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {CollectionEnum} from 'app/core/enum/collection.enum'

@Component({
    selector: 'generator-button',
    templateUrl: './generator-button.component.html',
    styleUrls: ['./generator-button.component.scss'],
})
export class GeneratorButtonComponent implements OnInit {
    constructor(
        private _angularFireStore: AngularFirestore,
        private _generationService: GenerationService,
    ) {}

    @Input()
    user$?: Observable<User>

    loading: boolean = false

    ngOnInit(): void {}

    getSuggestion(user: User): MealCombinationEnum {
        if (user.macro) {
            return getSuggestion(user.macro.totalCalories)
        }

        return undefined
    }

    beginCalculating() {
        this.loading = true
        this.user$.pipe(take(1)).subscribe(async (user) => {
            console.log(user)

            const mealCombination = this.getSuggestion(user)

            const recommendation = await this._generationService.generate({
                user: user,
                mealCombination: mealCombination,
                combination: combinationToNumbers().find(
                    (combination) => combination.title === mealCombination,
                ),
            })

            this.saveRecommendations(recommendation)
        })
    }

    saveRecommendations(recommendation: Recommendation) {
        this.user$.pipe(take(1)).subscribe(async (user) => {
            try {
                const data = {recommendation: recommendation}

                const user = JSON.parse(localStorage.getItem('user')) as User

                await this._angularFireStore
                    .collection(CollectionEnum.USER)
                    .doc(user.id)
                    .update({
                        ...user,
                        ...data,
                        updateAt: Date.now(),
                    })
            } catch (error) {
            } finally {
                this.loading = false
            }
        })
    }
}
