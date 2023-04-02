import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'
import {PersonalDataComponent} from './personal-data/personal-data.component'
import {SharedModule} from 'app/shared/shared.module'
import {RouterModule} from '@angular/router'
import {AUTH_ROUTING} from 'app/core/routes/auth.routing'

@NgModule({
    declarations: [LoginComponent, RegisterComponent, PersonalDataComponent],
    imports: [SharedModule, RouterModule.forChild(AUTH_ROUTING)],
})
export class AuthModule {}
