import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UowService } from 'app/services/uow.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {

    comments$:Observable<Comment[]>;
    private uow =inject(UowService)
    currentIndex = 0;
    isLargeScreen = window.innerWidth >= 1024;
    slides = [
      { image: 'image1.jpg', title: 'Slide 1', description: 'Description 1', buttonText: 'Sign In' },
      { image: 'image2.jpg', title: 'Slide 2', description: 'Description 2', buttonText: 'Sign In' },
      { image: 'image3.jpg', title: 'Slide 3', description: 'Description 3', buttonText: 'Sign In' },
    ];

    constructor(private router: Router) {}

    ngOnInit(): void {
      window.addEventListener('resize', this.handleResize);

      this.comments$=this.uow.comments.getAll()
    }

    ngOnDestroy(): void {
      window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
      this.isLargeScreen = window.innerWidth >= 1024;
    };

    handleNext(): void {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    }

    handlePrev(): void {
      this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    }

    navigateToSignIn(): void {
      this.router.navigate(['/signIn']);
    }
}
