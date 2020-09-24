import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewLoaderComponent } from './components/view-loader/view-loader.component';
import { DistancePipe } from './pipes/distance.pipe';

const exportedModules = [
  ViewLoaderComponent,
  DistancePipe
]

@NgModule({
  declarations: [...exportedModules, ViewLoaderComponent],
  imports: [
    CommonModule,

  ],
  exports: [
    ...exportedModules
  ]
})
export class SharedModule { }
