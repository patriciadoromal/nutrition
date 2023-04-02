import {Route} from '@angular/router'

export const MAIN_ROUTING: Route[] = [
    {
        path: '',
        loadChildren: () =>
            import('app/modules/home/home.module').then(
                (module) => module.HomeModule,
            ),
    },

    {
        path: 'auth',
        loadChildren: () =>
            import('app/modules/auth/auth.module').then(
                (module) => module.AuthModule,
            ),
    },

    {
        path: 'dashboard',
        loadChildren: () =>
            import('app/modules/dashboard/dashboard.module').then(
                (module) => module.DashboardModule,
            ),
    },

    {
        path: 'generator',
        loadChildren: () =>
            import('app/modules/generator/generator.module').then(
                (module) => module.GeneratorModule,
            ),
    },
]
