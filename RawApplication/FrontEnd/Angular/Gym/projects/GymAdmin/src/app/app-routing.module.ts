import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/authorization/login/login.component';
import {AuthGuard} from './core/guards/auth.guard';
import {LoggedGuard} from './core/guards/logged.guard';

const routes: Routes = [
  { path: '',
    canActivate: [LoggedGuard],
    loadChildren: (): Promise<any> =>
      import('./modules/authorization/authorization.module').then(
        (module) => module.AuthorizationModule
      )
  },
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
