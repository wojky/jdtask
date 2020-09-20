import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BikeStation } from '../stations.service';

@Component({
  selector: 'jd-station-list',
  template: `
    <jd-station-tile 
      *ngFor="let station of stations" 
      class="bg-white shadow p-3 rounded-2 my-2 pointer" 
      [station]="station"
      (click)="openStation(station)"></jd-station-tile>
  `,
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit {
  @Input() stations!: Array<BikeStation>;
  constructor(private readonly _router: Router) { }

  ngOnInit(): void {
    console.log('init');
    console.log(this.stations);
  }

  public openStation(station: BikeStation): void {
    this._router.navigate(['stations', station.id]);
  }
}
