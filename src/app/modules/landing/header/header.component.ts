import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'app/mat.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,MatModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
