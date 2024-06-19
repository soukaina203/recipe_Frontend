import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'app/models/User';
import { UowService } from 'app/services/uow.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatModule } from 'app/mat.module';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadImageFaComponent } from '@fuse/upload-file/upload-image-fa.component';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule,UploadImageFaComponent],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    userStorage: User;
    myForm: FormGroup;
    user:User
    selectedFile: File = null;
    imageUrl=""
    constructor(
        private uow: UowService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,

      ) {}
    ngOnInit(): void {
        const localStorage1 = localStorage.getItem('user');

        if (localStorage1) {
            this.userStorage = JSON.parse(localStorage1)
        }
        this.uow.users.getOne(this.userStorage.id).subscribe((res)=>{
            console.log(res)
            this.user=res
            this.createForm()
        })


    }
    createForm() {
        this.myForm = this.fb.group({
            id: [this.user.id],
            nom: [this.user.nom, Validators.minLength(3)],
            image: [this.user.image, Validators.minLength(3)],
            prenom: [this.user.prenom, Validators.minLength(3)],
            email: [this.user.email, Validators.email],
            password: '',
            isAdmin: [this.user.isAdmin],
        });
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        this.uow.uploads.uploadFile(this.selectedFile,"users").subscribe((res)=>{
            this.imageUrl=res.filePath
            console.log(this.imageUrl)
        })
    }

    delete() {
        this.uow.users.delete(this.user.id).subscribe((e) => {
            e ?
                this.router.navigate(['/admin/users']) : console.error("Error while deleting ")
        })
    }

    toggleEditMode() {
        this.router.navigate(['/admin/users']);
    }

    update() {
        const user = this.myForm.getRawValue() as User;
        user.image = (user.image as any).at(0).path;

        this.uow.users.put(this.user.id, user).subscribe((res) => {
            if (res.m === "success") {
                this.router.navigate(['/admin']);

            }
        })


    }
}
