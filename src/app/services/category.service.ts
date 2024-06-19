import { Injectable } from '@angular/core';
import { Category } from 'app/models/Category';
import { SuperService } from './super.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService  extends SuperService<Category> {
    constructor() {
        super('category');

    }
}
