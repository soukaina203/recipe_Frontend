import { Injectable } from '@angular/core';
import { Recipe } from 'app/models/Recipe';
import { SuperService } from './super.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends SuperService<Recipe> {

    constructor() {
        super('recipe');

    }
}
