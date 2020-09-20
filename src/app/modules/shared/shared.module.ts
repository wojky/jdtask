import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { ViewLoaderComponent } from './components/view-loader/view-loader.component';

const exportedModules = [
  MapComponent,
  ViewLoaderComponent,
]

@NgModule({
  declarations: [...exportedModules, ViewLoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ...exportedModules
  ]
})
export class SharedModule { }
