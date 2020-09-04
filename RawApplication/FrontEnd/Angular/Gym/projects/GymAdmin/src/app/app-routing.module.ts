import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/authorization/login/login.component';
import {AuthGuard} from './core/Guards/auth.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'users',
    canLoad: [AuthGuard],
    loadChildren: (): Promise<any> =>
      import('./modules/users/users.module').then(
        (module) => module.UsersModule
      ),
  },
  {
    path: 'clients',
    canLoad: [AuthGuard],
    loadChildren: (): Promise<any> =>
      import('./modules/clients/clients.module').then(
        (module) => module.ClientsModule
      ),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
