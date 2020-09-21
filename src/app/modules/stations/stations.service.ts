import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export interface BikeStationProps {
    bike_racks: string | number;
    bikes: string | number;
    free_racks: string | number;
    label: string;
    updated: string;
}

export interface BikeStation {
    id: string;
    type: string;
    geometry: { type: string; coordinates: google.maps.LatLng };
    properties: BikeStationProps
}

export interface BikeStationApiModel {
    id: string;
    type: string;
    geometry: { type: string; coordinates: Array<number> };
    properties: BikeStationProps
}

interface GetStationHttpResponse {
    crs: any;
    features: Array<BikeStationApiModel>
}

@Injectable({ providedIn: 'root' })
export class StationsService {
    private readonly URL = 'http://www.poznan.pl/mim/plan/map_service.html?mtype=pub_transport&co=stacje_rowerowe'
    private cache: Array<BikeStation> = []

    constructor(private readonly _http: HttpClient) { }

    public getStations$(): Observable<Array<BikeStation>> {
        return this.cache.length
            ? of(this.cache)
            : this._http.get<GetStationHttpResponse>(this.URL)
                .pipe(
                    map((response: GetStationHttpResponse) => response.features.map(this.parseBikeStationProps)),
                    tap(bikeStations => this.cache = bikeStations)
                );
    }

    private parseBikeStationProps(station: BikeStationApiModel): BikeStation {
        const { properties } = station;
        const [lng, lat] = station.geometry.coordinates;

        return {
            ...station,
            geometry: {
                type: station.geometry.type,
                coordinates: new google.maps.LatLng(lat, lng)
            },
            properties: {
                ...properties,
                bike_racks: +properties.bike_racks,
                bikes: +properties.bikes,
                free_racks: +properties.free_racks,
            }
        }
    }
}