import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { Observable } from 'rxjs';
import { commentaire } from 'app/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends SuperService<Comment> {

    constructor() {
        super('commentaire');

    }
    getCommentOfaRecipe(recipeId:number): Observable<any> {
        // Check each parameter and replace with '*' if empty

        return this.http.get(`${this.urlApi}/${this.controller}/getCommentOfaRecipe/${recipeId}`);
    }
    deleteComment(userId:number , recipeId: number): Observable<any> {
        // Check each parameter and replace with '*' if empty

        return this.http.delete(`${this.urlApi}/${this.controller}/deleteLike/${userId}/${recipeId}`);
    }
    postComment(comment:commentaire): Observable<any> {
        // Check each parameter and replace with '*' if empty

        return this.http.post(`${this.urlApi}/${this.controller}/post` , comment);
    }
}
