import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationDetailsComponent } from './station-details/station-details.component';

import { StationsComponent } from './stations.component';

const routes: Routes = [
  {
    path: '',
    component: StationsComponent,
  },
  {
    path: ':id',
    component: StationDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationsRoutingModule { }
