import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { BikeStation } from '../modules/stations/stations.service';

@Injectable({ providedIn: 'root' })
export class GeolocationService {
    private isGeolocationAvailable = false;
    private coords$ = new BehaviorSubject<google.maps.LatLng>({} as google.maps.LatLng);

    public geocoder = new google.maps.Geocoder();

    public init(): void {
        if ('geolocation' in navigator) {
            this.isGeolocationAvailable = true;
            navigator.geolocation.watchPosition((position) => {
                this.coords$.next(new google.maps.LatLng(position.coords.latitude, position.coords.longitude))
            });
        }
    }

    public getCurrentUserPosition$(): Observable<google.maps.LatLng> {
        return this.coords$.asObservable();
    }

    public getDistanceToStation$(station: BikeStation): Observable<number> {
        return this.coords$.pipe(
            switchMap(userLocation => of(this.calculateDistance(userLocation, station.geometry.coordinates)))
        )
    }

    //SO solution
    private calculateDistance(userLocation: google.maps.LatLng, stationLocation: google.maps.LatLng) {
        const R = 6378137; // Earth’s mean radius in meter
        const dLat = this.rad(stationLocation.lat() - userLocation.lat());
        const dLong = this.rad(stationLocation.lng() - userLocation.lng());
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.rad(userLocation.lat())) * Math.cos(this.rad(stationLocation.lat())) *
            Math.sin(dLong / 2) * Math.sin(dLong / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    }

    private rad(x: number) {
        return x * Math.PI / 180;
    }
}
