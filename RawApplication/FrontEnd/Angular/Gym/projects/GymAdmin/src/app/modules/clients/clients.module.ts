import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import {ClientListComponent, MY_FORMATS} from './client-list/client-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import { ClientDeleteDialogComponent } from './client-delete-dialog/client-delete-dialog.component';
import { ClientEditDialogComponent } from './client-edit-dialog/client-edit-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ClientDetailsComponent } from './client-details/client-details.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { DetailsDeleteDialogComponent } from './details-delete-dialog/details-delete-dialog.component';
import { DetailsEditDialogComponent } from './details-edit-dialog/details-edit-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ClientChartComponent } from './client-chart/client-chart.component';
import {GoogleChartsModule} from 'angular-google-charts';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    ClientListComponent,
    ClientDeleteDialogComponent,
    ClientEditDialogComponent,
    ClientDetailsComponent,
    DetailsDeleteDialogComponent,
    DetailsEditDialogComponent,
    ClientChartComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    MatDatepickerModule,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ClientsModule { }
