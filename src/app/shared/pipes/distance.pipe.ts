import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'distance'
})

export class DistancePipe implements PipeTransform {
    transform(value: number | null): string {
        if (!value) {
            return '';
        }
        else if (value < 1000) {
            return value.toFixed(0) + ' m';
        }
        else if (value > 1000 && value < 10000) {
            return (value / 1000).toFixed(2) + ' km';
        }
        else {
            return (value / 1000).toFixed(0) + ' km';
        }

    }
}