import {ToBMIPipe} from './../core/pipes/calculate.bmi.pipe'
import {RouterModule} from '@angular/router'
import {sharedComponents} from './shared-components'
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {angularMaterialModules} from './material.modules'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {IsEmptyPipe} from 'app/core/pipes/is-empty.pipe'
import {AgePipe} from 'app/core/pipes/age.pipe'
import {ShortenPipe} from 'app/core/pipes/shortened.pipe'
import {HasDecimalPipe} from 'app/core/pipes/has-decimal.pipe'

const components = [
    ...sharedComponents,
    IsEmptyPipe,
    AgePipe,
    ToBMIPipe,
    ShortenPipe,
    HasDecimalPipe,
]

const modules = [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ...angularMaterialModules,
]

@NgModule({
    imports: [...modules],
    declarations: [...components],
    exports: [...modules, components],
})
export class SharedModule {}
