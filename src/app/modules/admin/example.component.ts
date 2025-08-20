import { Component, ViewEncapsulation } from '@angular/core';
import { User } from 'app/models/User';

@Component({
    selector     : 'example',
    standalone   : true,
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ExampleComponent
{
    user:User
    ngOnInit(){
        this.user = JSON.parse(localStorage.getItem('user'))


    }
}
