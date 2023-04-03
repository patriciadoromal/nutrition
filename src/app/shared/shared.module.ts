import {RouterModule} from '@angular/router'
import {sharedComponents} from './shared-components'
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {angularMaterialModules} from './material.modules'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import {IsEmptyPipe} from 'app/core/pipes/is-empty.pipe'

const components = [...sharedComponents, IsEmptyPipe]

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
