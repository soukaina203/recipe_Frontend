import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'app/mat.module';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule,MatModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
     advantages = [
        {
            id: 1,
            props: [
                "Quick Service Times",
                "Free Trade Appraisal",
                "Genuine spare parts",
                "Unbeatable savings!"
            ]
        },
        {
            id: 2,
            props: [
                "Low Price Guarantee",
                "Trained Technicians",
                "Life-Time Warranty",
                "Automated testing lanes"
            ]
        }
    ];

}
