import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {WelcomePageComponent} from '../welcome/Welcome//welcome-page.component';

const routes: Routes = [
  {path: '', component: WelcomePageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
