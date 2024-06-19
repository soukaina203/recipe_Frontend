import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from 'app/models/User';
import { MatModule } from 'app/mat.module';
import { UowService } from 'app/services/uow.service';
import { HttpClient } from '@angular/common/http';
import { UploadFileComponent } from '@fuse/upload-file/upload-file.component';
import { UploadImageFaComponent } from '@fuse/upload-file/upload-image-fa.component';
import { Category } from 'app/models/Category';
import { Recipe } from 'app/models/Recipe';

@Component({
    selector: 'app-create-recipe',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule, UploadImageFaComponent],
    templateUrl: './create-recipe.component.html',
    styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent {
    id: any = 0;
    userId = 0
    recipe = new Recipe(); // Initialize the user object
    selectedFile: File = null;
    imageUrl = ""
    categories: Category[] = []

    readonly myForm = this.fb.group({
        id: [this.recipe.id ?? 0],
        title: [this.recipe.title, Validators.minLength(3)],
        description: [this.recipe.description, Validators.minLength(3)],
        ingredients: [this.recipe.ingredients, Validators.required],
        instructions: [this.recipe.instructions, Validators.required],
        idCategory: [this.recipe.idCategory, Validators.required],
        image: [this.recipe.image],
        idUser: [this.recipe.idUser]
    });

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        private uow: UowService,
        private http: HttpClient

    ) { }

    ngOnInit(): void {

        const localStorage1 = localStorage.getItem('user');

        if (localStorage1) {
            let userStorage = JSON.parse(localStorage1)
            this.userId = userStorage.id
        }
        this.uow.categories.getAll().subscribe((res: any) => {
            this.categories = res
        })

    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        this.uow.uploads.uploadFile(this.selectedFile, "recipes").subscribe((res) => {
            this.imageUrl = res.filePath
            console.log(this.imageUrl)
        })
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
        recipe.image = (recipe.image as any).at(0).path;

        this.uow.recipes.post(recipe).subscribe((res: any) => {
            console.log(res)
            if (res.id !== 0) {
                this.router.navigate(['/admin/recipes']);
            }
        });
    }
}
