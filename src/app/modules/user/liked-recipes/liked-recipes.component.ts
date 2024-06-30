import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Recipe } from 'app/models/Recipe';
import { UowService } from 'app/services/uow.service';
import { RouterLink } from '@angular/router';
import { User } from 'app/models/User';

@Component({
    selector: 'app-liked-recipes',
    standalone: true,
    imports: [CommonModule,RouterLink,AsyncPipe],
    templateUrl: './liked-recipes.component.html',
    styleUrls: ['./liked-recipes.component.scss']
})
export class LikedRecipesComponent {

    private uow = inject(UowService)
    recipes$: Observable<Recipe[]>;

    ngOnInit(): void {

        const localStorage1 = localStorage.getItem('user');
        let user:User;
        if (localStorage1) {
            user = JSON.parse(localStorage1)
        }
        this.recipes$ = this.uow.likes.GetLikedRecipes(user.id)
    }



}
