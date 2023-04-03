import {Router} from '@angular/router'
import {Component} from '@angular/core'

@Component({
    selector: 'generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent {
    constructor(private _router: Router) {}

    save() {
        this._router.navigate(['/dashboard'])
    }
}
