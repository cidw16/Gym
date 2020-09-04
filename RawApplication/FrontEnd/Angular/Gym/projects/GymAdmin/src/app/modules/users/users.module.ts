import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import {MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorStateMatcher, MatOptionModule, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [UserListComponent, UserDialogComponent, DeleteDialogComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class UsersModule { }
