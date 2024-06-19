import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-image',
  standalone: true,
  imports: [],
  template: `
  <img [src]="src" [class]="class" [alt]="alt ?? src" onerror="src='assets/images/logo/logo.svg'">
  `,
})
export class MyImageComponent {
  @Input({required: true}) src: string;
  @Input({required: false}) class = 'w-20';
  @Input({required: false}) alt: string;
}
