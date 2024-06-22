import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatModule } from 'app/mat.module';
import { Category } from 'app/models/Category';
import { UowService } from 'app/services/uow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadImageFaComponent } from '@fuse/upload-file/upload-image-fa.component';
import { UploadComponent } from '../../upload/upload.component';


@Component({
    selector: 'app-edit-catrgory',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, UploadComponent, UploadImageFaComponent, MatModule],
    templateUrl: './edit-catrgory.component.html',
    styleUrls: ['./edit-catrgory.component.scss']
})
export class EditCatrgoryComponent {
    isModify: boolean = false
    id: any = 0;
    category: Category = new Category(); // Initialize the user object
    selectedFile: File | null = null;

    myForm: FormGroup;




    isProf: boolean = false;
    modifyPicture() {
        this.isModify ? this.isModify = false : this.isModify = true
    }
    constructor(
        private uow: UowService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,

    ) { }

    receiveData(data: any) {
        this.selectedFile = data
    }
    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');

        this.uow.categories.getOne(this.id).subscribe((res) => {
            this.category = res;


            this.createForm(); // Create the form after the user data is available




        });

    }
    createForm() {
        this.myForm = this.fb.group({
            id: [this.category.id ?? 0],
            nom: [this.category.nom, Validators.minLength(3)],
            image: [this.category.image],

        });
    }


    delete() {
        this.uow.categories.delete(this.id).subscribe((e) => {
            e ?
                this.router.navigate(['/admin/categories']) : console.error("Error while deleting ")
        })
    }

    toggleEditMode() {
        this.router.navigate(['/admin/categories']);
    }

    update() {
        const category = this.myForm.getRawValue() as Category;
if (this.selectedFile) {
    this.uow.uploads.uploadFile(this.selectedFile, "categories").subscribe((res) => {
        category.image = res.fileName
        this.uow.categories.put(this.id, category).subscribe((res) => {
            if (res.m === "success") {
                this.router.navigate(['/admin/categories']);
            }

        })


    })

}else{
    this.uow.categories.put(this.id, category).subscribe((res) => {
        if (res.m === "success") {
            this.router.navigate(['/admin/categories']);
        }

    })
}

    }

}
