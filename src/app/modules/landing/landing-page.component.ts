import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { TopRecipesComponent } from './top-recipes/top-recipes.component';
import { FlavorsComponent } from './flavors/flavors.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule,HeaderComponent,HomeComponent,AboutComponent,TopRecipesComponent,FlavorsComponent,TestimonialsComponent],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {

}
