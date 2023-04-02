import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMealsComponent } from './dashboard-meals/dashboard-meals.component';
import { PredictionComponent } from './prediction/prediction.component';



@NgModule({
  declarations: [
    DashboardMealsComponent,
    PredictionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
