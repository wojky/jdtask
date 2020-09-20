import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ComponentBaseState } from '../../shared/base/component-base-state';
import { BikeStation, StationsService } from '../stations.service';

@Component({
  selector: 'jd-station-details',
  host: { class: 'd-flex flex-column h-100' },
  templateUrl: './station-details.component.html',
  styles: [
    `
      .bg-dark {
        height: 50px;
      }
    `
  ]
})
export class StationDetailsComponent implements OnInit {
  public station!: BikeStation;
  public state = new ComponentBaseState();
  private bikeStationDiv!: HTMLDivElement;
  private counterDiv!: HTMLDivElement;

  @ViewChild('map') map!: ElementRef;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _stationsService: StationsService,
    private readonly _elRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this._route.params
      .pipe(
        switchMap(params => this._stationsService.getStations$()
          .pipe(
            map(stations => stations.find(station => station.id === params.id) as BikeStation)
          )
        )
      )
      .subscribe(station => {
        console.log('details', this._route, station);
        this.station = station;
        this.state.setSuccess();
        this.initMap();

      });
  }
  public goBack(): void {
    this._router.navigate(['stations'])
  }


  private initMap(): void {
    const bikeStationCoords = this.station.geometry.coordinates;
    const map = new google.maps.Map(document.getElementById('map') as HTMLDivElement, {
      zoom: 17,
      center: bikeStationCoords,
      disableDefaultUI: true,
      gestureHandling: 'none',
      zoomControl: false
    });

    const bikeSymbol = new google.maps.OverlayView();
    const counterSymbol = new google.maps.OverlayView();

    bikeSymbol.draw = () => {
      if (!this.bikeStationDiv) {
        this.bikeStationDiv = document.createElement('div');
        this.bikeStationDiv.className = 'marker';
        this.bikeStationDiv.style.cssText = `width: 35px; height: 35px; text-align: center; line-height: 35px; position: absolute; cursor: pointer; border-radius: 50%; color: #fff; background: #fff`;
        this.bikeStationDiv.innerHTML = `<img src="assets/icons/bike.png">`;
        const panes = bikeSymbol.getPanes();
        panes.overlayLayer.appendChild(this.bikeStationDiv);
      }
    }

    counterSymbol.draw = () => {
      const { bikes } = this.station.properties;
      if (!this.counterDiv) {
        this.counterDiv = document.createElement('div');
        this.counterDiv.className = `text-${bikes === 0 ? 'danger' : 'success'}`;
        this.counterDiv.style.cssText = `text-align: center; position: absolute;`;
        this.counterDiv.innerHTML = `<h4 class="m-0 font-weight-bold">${bikes}</h4>`;
        const panes = counterSymbol.getPanes();
        panes.overlayLayer.appendChild(this.counterDiv);
      }
      const point = counterSymbol.getProjection().fromLatLngToDivPixel(bikeStationCoords);
      console.log(point);
      console.log(this.counterDiv.style.left)
      if (point) {
        this.counterDiv.style.left = (point.x + 40) + 'px';
        this.counterDiv.style.top = (point.y + 5) + 'px';
      }
    }

    bikeSymbol.setMap(map)
    counterSymbol.setMap(map);
  }
}
