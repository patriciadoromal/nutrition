import {Component, OnInit} from '@angular/core'

@Component({
    selector: 'prediction',
    templateUrl: './prediction.component.html',
    styleUrls: ['./prediction.component.scss'],
})
export class PredictionComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
