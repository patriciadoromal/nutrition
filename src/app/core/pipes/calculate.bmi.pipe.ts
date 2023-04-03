import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name: 'to_bmi'})
export class ToBMIPipe implements PipeTransform {
    transform(weight: number, height: number) {
        return calculateBMI(weight, height)
    }
}

export function calculateBMI(weight: number, height: number) {
    const heightInMeters = height / 100
    const bmi = weight / (heightInMeters * heightInMeters)
    return bmi.toFixed(2)
}
