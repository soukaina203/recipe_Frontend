import { Injectable } from '@angular/core';
import { Like } from 'app/models/LIke';
import { SuperService } from './super.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService extends SuperService<Like>{
    constructor() {
        super('like');

    }
    getTopRecipe(recipeId:number): Observable<any> {
        return this.http.get(`${this.urlApi}/${this.controller}/getTopRecipe`);

    }
    getLikesOfaRecipe(recipeId:number): Observable<any> {
        // Check each parameter and replace with '*' if empty

        return this.http.get(`${this.urlApi}/${this.controller}/getLikesOfaRecipe/${recipeId}`);
    }
    deleteLike(userId:number , recipeId: number): Observable<any> {
        // Check each parameter and replace with '*' if empty

        return this.http.delete(`${this.urlApi}/${this.controller}/deleteLike/${userId}/${recipeId}`);
    }
    GetLikedRecipes(userId:number ): Observable<any> {
        // Check each parameter and replace with '*' if empty

        return this.http.get(`${this.urlApi}/${this.controller}/GetLikedRecipes/${userId}`);
    }
}
