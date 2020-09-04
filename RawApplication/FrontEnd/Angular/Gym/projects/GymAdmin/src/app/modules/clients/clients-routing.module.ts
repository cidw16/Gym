import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientListComponent} from './client-list/client-list.component';
import {ClientDetailsComponent} from './client-details/client-details.component';
import {ClientChartComponent} from './client-chart/client-chart.component';

const routes: Routes = [
  {path: '', component: ClientListComponent},
  {path: 'clientDetails', component: ClientDetailsComponent},
  {path: 'clientCharts', component: ClientChartComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
