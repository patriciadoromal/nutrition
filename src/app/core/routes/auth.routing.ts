import {RegisterComponent} from './../../modules/auth/register/register.component'
import {PersonalDataComponent} from './../../modules/auth/personal-data/personal-data.component'
import {LoginComponent} from './../../modules/auth/login/login.component'
import {Route} from '@angular/router'

export const AUTH_ROUTING: Route[] = [
    {
        path: 'login',
        component: LoginComponent,
    },

    {
        path: 'personal-data',
        component: PersonalDataComponent,
    },

    {
        path: 'register',
        component: RegisterComponent,
    },
]
