import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BikeStation } from '../stations.service';

@Component({
  selector: 'jd-station-list',
  template: `
    <jd-station-tile 
      *ngFor="let station of stations" 
      class="bg-white shadow p-3 rounded-2 my-2 pointer" 
      [station]="station"
      (click)="openStationDetails(station.id)"></jd-station-tile>
  `,
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent {
  @Input() stations!: Array<BikeStation>;
  constructor(private readonly _router: Router) { }

  public openStationDetails(id: string): void {
    this._router.navigate(['stations', id]);
  }
}
