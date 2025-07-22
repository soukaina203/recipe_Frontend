import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatModule } from 'app/mat.module';
import { UowService } from 'app/services/uow.service';
import { HttpClient } from '@angular/common/http';
import { UploadImageFaComponent } from '@fuse/upload-file/upload-image-fa.component';
import { Category } from 'app/models/Category';
import { Recipe } from 'app/models/Recipe';
import { UploadComponent } from '../../upload/upload.component';
import { MatDialog } from '@angular/material/dialog';
import { Like } from 'app/models/LIke';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,
     UploadComponent, MatModule, UploadImageFaComponent],
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent {
    id: any = 0;
    userId = 0
    recipe = new Recipe(); // Initialize the user object
    selectedFile: File = null;
    imageUrl = ""
    categories: Category[] = []

    myForm: FormGroup;
    comments:Comment[]=[]
    likes:Like[]=[]

    constructor(
        private uow: UowService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        private dialog: MatDialog,


    ) { }
    receiveData(data: any) {
        this.selectedFile = data
    }
    ngOnInit(): void {
        const localStorage1 = localStorage.getItem('user');

        if (localStorage1) {
            let userStorage = JSON.parse(localStorage1)
            this.userId = userStorage.id
        }
        this.id = this.route.snapshot.paramMap.get('id');

        this.uow.recipes.getOne(this.id).subscribe((res:any) => {
            this.recipe = res;
            console.log("=========")
            console.log(res)
            this.comments=res.comments;
            this.likes=res.likes;
            this.createForm();

        });
        this.uow.categories.getAll().subscribe((res: any) => {
            this.categories = res
        })

    }
    createForm(){
        this.myForm = this.fb.group({
            id: [this.recipe.id ],
            title: [this.recipe.title, Validators.minLength(3)],
            description: [this.recipe.description, Validators.minLength(3)],
            ingredients: [this.recipe.ingredients],
            instructions: [this.recipe.instructions],
            idCategory: [this.recipe.idCategory],
            image: [this.recipe.image],
            idUser: [this.userId]
        });
    }



    delete() {
        this.uow.recipes.delete(this.id).subscribe((e) => {
            e ?
                this.router.navigate(['/admin/recipes']) : console.error("Error while deleting ")
        })
    }
    toggleEditMode() {
        this.router.navigate(['/admin/recipes']);
    }

    submit() {

        const recipe = this.myForm.getRawValue() as Recipe;
        if (this.selectedFile) {

            this.uow.uploads.uploadFile(this.selectedFile, "recipes").subscribe((res) => {

                recipe.image = res.fileName
                this.uow.recipes.put(this.id,recipe).subscribe((res: any) => {
                    if (res.code !== -1) {
                        this.router.navigate(['/admin/recipes']);
                    }

                });
            })

        } else {

                this.uow.recipes.put(this.id,recipe).subscribe((res: any) => {
                    if (res.code !== -1) {
                        this.router.navigate(['/admin/recipes']);
                    }

                });
        }




    }


}
