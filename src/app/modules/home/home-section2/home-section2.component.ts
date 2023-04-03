import {Component, OnInit} from '@angular/core'

@Component({
    selector: 'home-section2',
    templateUrl: './home-section2.component.html',
    styleUrls: ['./home-section2.component.scss'],
})
export class HomeSection2Component implements OnInit {
    constructor() {}

    features: string[] = [
        'Tailored nutrition for your unique needs: Get personalized recommendations based on your goals and health status.',
        'Nutrition that works for you: Discover personalized meal plans and dietary advice based on your preferences and health status.',
        'Customized nutrition for optimal health: Our experts create personalized recommendations based on your unique needs and goals  .',
    ]

    ngOnInit(): void {}

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
