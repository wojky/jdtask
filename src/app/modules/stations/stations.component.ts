
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ComponentBaseState } from 'src/app/shared/base/component-base-state';
import { BikeStation, StationsService } from './stations.service';

@Component({
  selector: 'jd-stations',
  template: `
    <jd-view-loader [state]="state">
      <jd-station-list class="d-block px-3 py-1" [stations]="stations"></jd-station-list>
    </jd-view-loader>
  `,
  styles: [
  ]
})
export class StationsComponent implements OnInit {
  public stations: Array<BikeStation> = [];

  public state = new ComponentBaseState();

  constructor(private readonly _stationsService: StationsService) { }

  public ngOnInit(): void {
    this.getStations$().subscribe(stations => {
      this.stations = stations;
      console.log(this.stations)
      this.state.setSuccess();
    });;
  }

  private getStations$(): Observable<Array<BikeStation>> {
    return this._stationsService.getStations$();
  }
}
