import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { WelcomePageComponent } from './Welcome/welcome-page.component';


@NgModule({
  declarations: [LoginComponent, WelcomePageComponent],
    imports: [
        CommonModule,
        AuthorizationRoutingModule,
        FormsModule
    ],
  exports: [
    LoginComponent,
    WelcomePageComponent
  ]
})
export class AuthorizationModule { }
