import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'app/mat.module';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UowService } from 'app/services/uow.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Recipe } from 'app/models/Recipe';
import { Like } from 'app/models/LIke';

@Component({
    selector: 'app-recipe-detail',
    standalone: true,
    imports: [CommonModule, MatModule, RouterLink],
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent {
    id: any = 0;
    recipe = new Recipe(); // Initialize the user object
    isLiked:boolean=false;
    linkesCount:number
    likeObject:Like=new Like ()
    connectedUser:any
    constructor(
        private uow: UowService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        private dialog: MatDialog,


    ) { }
    ngOnInit(): void {
        const localStorage1 = localStorage.getItem('user');
        if (localStorage1) {
            this.connectedUser = JSON.parse(localStorage1)
        }
        this.id = this.route.snapshot.paramMap.get('id');
        this.uow.recipes.getOne(this.id).subscribe((res) => {
            this.recipe = res;
            console.log(this.recipe)

        });
        // filling the like object
        this.likeObject.idRecipe=this.id
        this.likeObject.idUser=this.connectedUser.id

        this.uow.likes.getLikesOfaRecipe(this.id).subscribe((number:any) => {
            console.log("==========")
            console.log(number)
            this.linkesCount = number;
        });


    }
    LikeARecipe(){
        if (this.isLiked) {
            this.isLiked=false
            this.linkesCount--
            this.uow.likes.deleteLike(this.connectedUser.id, this.id).subscribe((res)=>{
                console.log(res)
            })
        }else{
            this.isLiked=true
            this.linkesCount++

            this.uow.likes.post(this.likeObject).subscribe((res)=>{
                console.log(res)
            })
        }

    }

}
