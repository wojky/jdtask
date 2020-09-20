import { Component, Input, OnInit } from '@angular/core';
import { ComponentBaseState } from '../../base/component-base-state';

@Component({
  selector: 'jd-view-loader',
  template: `
    <ng-container *ngIf="state.isSuccess">
      <ng-content></ng-content>
    </ng-container>
    <ng-container *ngIf="state.isError">
      <div class="d-flex align-items-center justify-content-center h-100">
        Something went wrong... sorry!
      </div>
   </ng-container>
    <ng-container *ngIf="state.isInProgress">
      <div class="d-flex align-items-center justify-content-center h-100">
        <div class="spinner-border"></div>
      </div>
    </ng-container>
  `,
})
export class ViewLoaderComponent<T> implements OnInit {
  @Input() state: ComponentBaseState<T> = new ComponentBaseState();
  constructor() { }

  ngOnInit(): void { }

}
