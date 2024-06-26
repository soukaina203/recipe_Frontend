import { Injectable } from '@angular/core';
import { SuperService } from './super.service';
import { User } from 'app/models/User';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends SuperService<User> {

    constructor() {
        super('user');

    }
    user$= new BehaviorSubject<User | null>(null);



    post1(user:FormData): Observable<any> {
        // Check each parameter and replace with '*' if empty

        return this.http.post(`${this.urlApi}/${this.controller}/post`,user);
    }
}
