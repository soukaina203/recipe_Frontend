import { Injectable } from '@angular/core';
import { Like } from 'app/models/LIke';
import { SuperService } from './super.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService extends SuperService<Like>{
    constructor() {
        super('like');

    }
}
