import {Pipe, PipeTransform} from '@angular/core'
import * as dayjs from 'dayjs'

@Pipe({
    name: 'age',
})
export class AgePipe implements PipeTransform {
    transform(value: Date): number {
        return to_age(value)
    }
}

export function to_age(value: Date): number {
    const today = dayjs()

    const birthDate = dayjs(value)

    const years = today.diff(birthDate, 'years')

    return years
}
