import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [LoginComponent],
    imports: [
        CommonModule,
        AuthorizationRoutingModule,
        FormsModule
    ],
  exports: [
    LoginComponent
  ]
})
export class AuthorizationModule { }
