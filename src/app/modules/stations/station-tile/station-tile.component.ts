import { Component, Input } from '@angular/core';
import { BikeStation } from '../stations.service';

@Component({
  selector: 'jd-station-tile',
  template: `
    <div>
      <h5 class="m-0 font-weight-bold">{{ station.properties.label }}</h5>
      <span class="font-weight-bold mr-2 small">-distance-m</span> <span class="small">-address-</span>
    </div>
    <div class="d-flex justify-content-around mt-2">
      <div class="d-flex flex-column align-items-center">
      <img src="assets/icons/bike.png">
        <span class="small">Available bikes</span>
        <h2 class="text-success font-weight-bold"
            [class.text-danger]="station.properties.bikes === 0">{{ station.properties.bikes }}</h2>
      </div>
      <div class="d-flex flex-column align-items-center">
        <img src="assets/icons/padlock.png">
        <span class="small">Available places</span>
        <h2 class="font-weight-bold" [class.text-danger]="station.properties.free_racks === 0">{{ station.properties.free_racks }}</h2>
      </div>
    </div>
  `,
  styleUrls: ['./station-tile.component.scss']
})
export class StationTileComponent {
  @Input() station!: BikeStation;

}
