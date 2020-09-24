import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { GeolocationService } from './core/geolocation.service';

@Component({
  selector: 'jd-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  constructor(private readonly _geolocationService: GeolocationService) { }

  ngOnInit(): void {
    this._geolocationService.init()
  }
}
