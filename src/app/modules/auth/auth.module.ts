import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PersonalDataComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
