import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BikeStation } from '../stations.service';

@Component({
  selector: 'jd-station-list',
  template: `
  <virtual-scroller #scroll [items]="stations">
    <jd-station-tile
      *ngFor="let item of scroll.viewPortItems"
      class="bg-white shadow p-3 rounded-2 my-2 pointer"
      [station]="item"
      (click)="openStationDetails(item.id)"></jd-station-tile>
  </virtual-scroller>
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
