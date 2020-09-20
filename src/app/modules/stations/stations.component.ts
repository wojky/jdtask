
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponentBaseState } from '../shared/base/component-base-state';
import { BikeStation, StationsService } from './stations.service';

interface StationsComponentState {
  listView: boolean;
}

@Component({
  selector: 'jd-stations',
  template: `
    <jd-view-loader [state]="state">
      <ng-container>
        <router-outlet></router-outlet>
        <ng-container *ngIf="state.props.listView">
          <jd-station-list class="d-block px-3 py-1" [stations]="stations"></jd-station-list>
        </ng-container>
      </ng-container>
    </jd-view-loader>

  `,
  styles: [
  ]
})
export class StationsComponent implements OnInit {
  public stations: Array<BikeStation> = [];

  public state = new ComponentBaseState<StationsComponentState>({ listView: true });

  constructor(private readonly _stationsService: StationsService,
    private _route: Router,
    private _ar: ActivatedRoute,) { }

  public ngOnInit(): void {
    this.setProperListViewValue();

    this._route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setProperListViewValue();
      }
    })

    this.getStations$().subscribe(stations => {
      this.stations = stations;
      console.log(this.stations)
      this.state.setSuccess();
    });;

  }

  private getStations$(): Observable<Array<BikeStation>> {
    return this._stationsService.getStations$();
  }

  private setProperListViewValue() {
    this.state.props.listView = this._route.url.endsWith('stations');
  }
}
