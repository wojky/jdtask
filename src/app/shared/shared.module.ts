import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewLoaderComponent } from './components/view-loader/view-loader.component';

const exportedModules = [
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
