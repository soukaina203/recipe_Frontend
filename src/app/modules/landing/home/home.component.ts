import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector     : 'app-home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [MatButtonModule,CommonModule ,RouterLink, MatIconModule],
})
export class HomeComponent
{
     props = [
        { title: 'Free Delivery', desc: 'Home delivery, free shipping!', img: 'one' },
        { title: 'Moneyback Guarantee', desc: 'Always make sure your money!', img: 'two' },
        { title: '24/7 Online Support', desc: 'We always listen to your questions!', img: 'three' },
      ];

    /**
     * Constructor
     */
    constructor()
    {
    }
}
