import {RouterModule} from '@angular/router'
import {sharedComponents} from './shared-components'
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {angularMaterialModules} from './material.modules'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'

const components = [...sharedComponents]

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
