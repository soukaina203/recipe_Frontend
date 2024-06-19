import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatModule } from 'app/mat.module';
import { Category } from 'app/models/Category';
import { UowService } from 'app/services/uow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadImageFaComponent } from '@fuse/upload-file/upload-image-fa.component';


@Component({
    selector: 'app-edit-catrgory',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, UploadImageFaComponent, MatModule],
    templateUrl: './edit-catrgory.component.html',
    styleUrls: ['./edit-catrgory.component.scss']
})
export class EditCatrgoryComponent {
    isModify: boolean = false
    id: any = 0;
    category: Category = new Category(); // Initialize the user object

     myForm = this.fb.group({
        id: [this.category.id ?? 0],
        nom: [this.category.nom, Validators.minLength(3)],
        image: null,

    });



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

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');

        this.uow.categories.getOne(this.id).subscribe((res) => {
        //    this.category = res;
            // console.log(this.category)
            // console.warn([{image: res.image}] )

            const images = [{image:
                "categories/Screenshot from 2024-06-16 22-19-49.png"}]
            this.category = {...res, image: images as any}

            console.warn(this.category)
    this.myForm.patchValue({...this.category});

    this.myForm.controls.image.setValue(images)



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

        category.image = (category.image as any as {image: string}[]).map(e => e.image).at(0)
        console.log(category)

        //   this.uow.categories.put(this.id,category).subscribe((res) => {
        //       if (res.m === "success") {
        //           this.router.navigate(['/admin/categories']);

        //       }
        //   })
    }

}
