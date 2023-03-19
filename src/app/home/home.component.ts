import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<p>Home</p><br><a [routerLink]="['/about'] | localize">Go to about</a>`,
})
export class HomeComponent {}
