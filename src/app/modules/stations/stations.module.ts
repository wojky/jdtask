import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationsRoutingModule } from './stations-routing.module';
import { StationsComponent } from './stations.component';
import { StationTileComponent } from './station-tile/station-tile.component';
import { StationListComponent } from './station-list/station-list.component';
import { SharedModule } from '../shared/shared.module';
import { StationDetailsComponent } from './station-details/station-details.component';


@NgModule({
  declarations: [StationsComponent, StationTileComponent, StationListComponent, StationDetailsComponent],
  imports: [
    CommonModule,
    StationsRoutingModule,
    SharedModule,
  ],
})
export class StationsModule { }
