import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from 'app/mat.module';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UowService } from 'app/services/uow.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Recipe } from 'app/models/Recipe';
import { Like } from 'app/models/LIke';
import { commentaire } from 'app/models/Comment';

@Component({
    selector: 'app-recipe-detail',
    standalone: true,
    imports: [CommonModule, MatModule, RouterLink, FormsModule],
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent {
    id: any = 0;
    recipe = new Recipe(); // Initialize the user object
    isLiked: boolean = false;
    linkesCount: number
    commentCount: number
    likeObject: Like = new Like()
    connectedUser: any
    comment = new commentaire();
    commentContent: string = ''
    openComment: boolean = false
    comments: commentaire[] = []
    readonly myForm = this.fb.group({
        id: [this.comment.id ?? 0],
        content: [this.comment.content],
        createdAt: [this.comment.createdAt],
        idUser: [this.comment.idUser],
        idRecipe: [this.comment.idRecipe],

    });

    openCommentSection() {
        this.openComment ? this.openComment = false : this.openComment = true
    }
    constructor(
        private uow: UowService,
        private route: ActivatedRoute,
        private fb: FormBuilder



    ) { }
    ngOnInit(): void {
        const localStorage1 = localStorage.getItem('user');
        if (localStorage1) {
            this.connectedUser = JSON.parse(localStorage1)
        }

        this.id = this.route.snapshot.paramMap.get('id');
        this.uow.recipes.getOne(this.id).subscribe((res) => {
            this.recipe = res;

        });

        this.likeObject.idRecipe = this.id
        this.likeObject.idUser = this.connectedUser.id


        this.comment.idRecipe = parseInt(this.id)
        this.comment.idUser = this.connectedUser.id


        this.uow.likes.getLikesOfaRecipe(this.id).subscribe((res: any) => {

            this.linkesCount = res.count;
            let ifExists = res.likes.some(like => like.idUser === this.connectedUser.id);
            ifExists ? this.isLiked = true : this.isLiked = false


        });
        this.getCommentsOfRecipe()


    }

    getCommentsOfRecipe() {
        this.uow.comments.getCommentOfaRecipe(this.id).subscribe((res: any) => {
            this.commentCount = res.count
            this.comments = res.comments


        });
    }

    sendComment() {

        this.comment.createdAt = new Date();
        this.comment.content = this.commentContent;
        this.uow.comments.postComment(this.comment).subscribe((res) => {
            if (res.m === "success") {
                this.getCommentsOfRecipe()
                this.commentContent=""
            }
        })
    }
    LikeARecipe() {
        if (this.isLiked) {
            this.isLiked = false
            this.linkesCount--
            this.uow.likes.deleteLike(this.connectedUser.id, this.id).subscribe((res) => {
            })
        } else {
            this.isLiked = true
            this.linkesCount++

            this.uow.likes.post(this.likeObject).subscribe((res) => {
            })
        }

    }

}
