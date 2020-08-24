import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {RouterModule} from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { UsersModule} from '../modules/users/users.module';
import { MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@NgModule({
  declarations: [MainNavComponent, FooterComponent],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    UsersModule,
    MatDialogModule,
    FormsModule
  ],
  exports: [
    MainNavComponent,
    FooterComponent,
    UsersModule
  ]
})
export class CoreModule { }
