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
import { UploadComponent } from '../../upload/upload.component';

@Component({
  selector: 'app-create-catrgory',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,UploadComponent, MatModule,UploadImageFaComponent],
  templateUrl: './create-catrgory.component.html',
  styleUrls: ['./create-catrgory.component.scss']
})
export class CreateCatrgoryComponent {
    id: any = 0;
    isProf: boolean = false;
    category = new Category(); // Initialize the category object
    selectedFile: File = null;
    imageUrl=""

    readonly myForm = this.fb.group({
        id: [this.category.id ?? 0],
        nom: [this.category.nom, Validators.minLength(3)],
        image: [this.category.image],

    });
    receiveData(data:any){
        this.selectedFile=data
         }
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        private uow: UowService,
        private http: HttpClient

    ) { }




    delete() {
        this.userService.delete(this.id).subscribe((e) => {

            e ?
                this.router.navigate(['/admin/categories']) : console.error("Error while deleting ")
        })
    }
    toggleEditMode() {
        this.router.navigate(['/admin/categories']);
    }

    submit() {

        this.uow.uploads.uploadFile(this.selectedFile, "categories").subscribe((res) => {
            const category = this.myForm.getRawValue() as Category;
            category.image = res.fileName
            this.uow.categories.post(category).subscribe((res: any) => {
                if (res.m == 'success') {
                    this.router.navigate(['/admin/categories']);
                }

            });
        })

    }

}
