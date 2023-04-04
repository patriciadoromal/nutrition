import {Component, EventEmitter, OnInit, Output} from '@angular/core'
import {DayEnum} from 'app/core/enum/day.enum'
import {WeekEnum} from 'app/core/enum/week.enum'
import {BehaviorSubject} from 'rxjs'

@Component({
    selector: 'generator-week-and-day',
    templateUrl: './generator-week-and-day.component.html',
    styleUrls: ['./generator-week-and-day.component.scss'],
})
export class GeneratorWeekAndDayComponent implements OnInit {
    constructor() {}

    @Output()
    onChangeDay = new EventEmitter<DayEnum>()

    @Output()
    onChangeWeek = new EventEmitter<WeekEnum>()

    readonly WEEKS = Object.values(WeekEnum)
    readonly DAYS = Object.values(DayEnum)

    activeWeek$ = new BehaviorSubject<WeekEnum>(this.WEEKS[0] as WeekEnum)

    activeDay$ = new BehaviorSubject<DayEnum>(this.DAYS[0] as DayEnum)

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    changeWeek(week: WeekEnum) {}

    changeDay(day: DayEnum) {}

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
