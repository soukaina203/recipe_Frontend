import { Injectable } from '@angular/core';
import { SuperService } from './super.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends SuperService<Comment> {

    constructor() {
        super('comment');

    }
}
