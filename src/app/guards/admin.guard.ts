import { CanActivateFn } from '@angular/router';
import { User } from 'app/models/User';

export const adminGuard: CanActivateFn = (route, state) => {



    let user: User;
    const localstorage = localStorage.getItem('user');
    if (localstorage) {
        user = JSON.parse(localstorage)
        if (user.isAdmin === 1) {
            return true;
        } else {
            return false
        }
    }

};
