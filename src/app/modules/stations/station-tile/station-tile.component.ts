import { OnInit } from '@angular/core';
import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeolocationService } from 'src/app/core/geolocation.service';
import { BikeStation } from '../stations.service';

@Component({
  selector: 'jd-station-tile',
  template: `
    <div>
      <h5 class="m-0 font-weight-bold">{{ station.properties.label }}</h5>
      <span *ngIf="station.distance" class="font-weight-bold mr-2 small">{{ station.distance | distance}}</span>
      <span *ngIf="station.distance && station.address" class="mr-2">-</span>
      <span *ngIf="station.address" class="small">{{ station.address }}</span>
    </div>
    <div class="d-flex justify-content-around mt-4">
      <div class="d-flex flex-column align-items-center">
        <img src="assets/icons/bike.png">
        <span class="small mt-1">Available bikes</span>
        <h2 class="text-success font-weight-bold"
            [class.text-danger]="station.properties.bikes === 0">{{ station.properties.bikes }}</h2>
      </div>
      <div class="d-flex flex-column align-items-center">
        <img src="assets/icons/padlock.png">
        <span class="small mt-1">Available places</span>
        <h2 class="font-weight-bold" [class.text-danger]="station.properties.free_racks === 0">{{ station.properties.free_racks }}</h2>
      </div>
    </div>
  `,
  styleUrls: ['./station-tile.component.scss']
})
export class StationTileComponent implements OnInit, OnDestroy {
  @Input() station!: BikeStation;

  public distanceToStationSubscription!: Subscription

  constructor(private readonly _geolocationService: GeolocationService) { }

  public ngOnInit(): void {
    this.distanceToStationSubscription = this._geolocationService.getDistanceToStation$(this.station).subscribe((distance) => {
      this.station.distance = distance;
    });

    if (!this.station.address) {
      this.setStationAddres();
    }
  }

  public ngOnDestroy(): void {
    this.distanceToStationSubscription.unsubscribe();
  }

  private setStationAddres() {
    this._geolocationService.geocoder.geocode({ location: this.station.geometry.coordinates }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
        alert(`${google.maps.GeocoderStatus.OVER_QUERY_LIMIT} 😥 - scrolluj wolniej`);
      }
      if (!results) {
        return;
      }

      const address = results.find(address => address.types.includes('street_address'));

      if (address) {
        const [streetNumber, streetName, _, city] = address.address_components;

        this.station.address = `${streetNumber.short_name} ${streetName.short_name}, ${city.short_name}`;
      }
    })
  }
}
