import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `<p>About</p><br><a [routerLink]="['/home'] | localize">Go to home</a>`,
})
export class AboutComponent {}
