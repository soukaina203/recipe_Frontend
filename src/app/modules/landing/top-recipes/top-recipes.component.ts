import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Recipe } from 'app/models/Recipe';
import { UowService } from 'app/services/uow.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-top-recipes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-recipes.component.html',
  styleUrls: ['./top-recipes.component.scss']
})
export class TopRecipesComponent {
    private uow =inject(UowService)
    recipes$ : Observable<Recipe[]>
    recipePicture=environment.url
    ngOnInit(): void {
        this.recipes$ = this.uow.recipes.getAll();


    }

}
