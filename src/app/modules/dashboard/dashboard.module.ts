import {RouterModule} from '@angular/router'
import {SharedModule} from './../../shared/shared.module'
import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DashboardMealsComponent} from './dashboard-meals/dashboard-meals.component'
import {PredictionComponent} from './prediction/prediction.component'
import {DashboardComponent} from './dashboard.component'
import {DASHBOARD_ROUTING} from 'app/core/routes/dashboard.routing'

@NgModule({
    declarations: [
        DashboardMealsComponent,
        PredictionComponent,
        DashboardComponent,
    ],
    imports: [SharedModule, RouterModule.forChild(DASHBOARD_ROUTING)],
})
export class DashboardModule {}
