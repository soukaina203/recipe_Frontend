import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flavors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flavors.component.html',
  styleUrls: ['./flavors.component.scss']
})
export class FlavorsComponent {
     slides = [
        {
          image: 'services/signUp.jpeg',
          title: 'Car Back Light',
          description: '120 kinds of automobile lights',
          buttonText: 'Shop Now'
        },
        {
          image: 'services/login.jpeg',
          title: 'Car Steering Wheel',
          description: '120 kinds of automobile lights',
          buttonText: 'Shop Now'
        },
        {
          image: 'services/login1.jpeg',
          title: 'Car Body & Engine',
          description: '120 kinds of automobile lights',
          buttonText: 'Shop Now'
        },
        {
          image: 'services/login3.jpeg',
          title: 'Car Tire',
          description: '120 kinds of automobile tires',
          buttonText: 'Shop Now'
        },
        {
          image: 'one.jpg',
          title: 'Car Seat Cover',
          description: '120 kinds of automobile seat covers',
          buttonText: 'Shop Now'
        },
        {
          image: 'services/wheel.jpg',
          title: 'Car Mirror',
          description: '120 kinds of automobile mirrors',
          buttonText: 'Shop Now'
        }
      ];
}
