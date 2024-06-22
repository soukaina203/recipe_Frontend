import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'app/models/User';
import { UowService } from 'app/services/uow.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatModule } from 'app/mat.module';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadComponent } from '../upload/upload.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule, UploadComponent],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    userStorage: User;
    myForm: FormGroup;
    user: User
    selectedFile: File | null = null;
    imageUrl = ""
    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;
    @ViewChild('DeletePoppup') DeletePoppup!: TemplateRef<any>;

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
            this.userStorage = JSON.parse(localStorage1)
        }
        this.uow.users.getOne(this.userStorage.id).subscribe((res) => {
            this.user = res
            this.createForm()
        })
    }
    receiveData(data: any) {
        this.selectedFile = data
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
    delete() {
        this.uow.users.delete(this.user.id).subscribe((e) => {
            e ?
                this.router.navigate(['/']) : console.error("Error while deleting ")
        })
    }
    toggleEditMode() {
        this.router.navigate(['/admin/users']);
    }
    update() {
        const user = this.myForm.getRawValue() as User;
        if (this.selectedFile) {
            this.uow.uploads.uploadFile(this.selectedFile, "users").subscribe((res) => {
                user.image = res.fileName
                this.uow.users.put(this.user.id, user).subscribe((res) => {
                    if (res.m === "success") {
                        this.ProfileEditedPoppup()
                    }
                })
            })
        } else {
            this.uow.users.put(this.user.id, user).subscribe((res) => {
                if (res.m === "success") {
                    this.ProfileEditedPoppup()
                }
            })
        }
    }
    ProfileDeletePoppup(): void {
        console.log("i am in dialog")
        const dialogRef = this.dialog.open(this.DeletePoppup, {
            height: '320px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }
    ProfileEditedPoppup(): void {
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '200px',
            width: '500px'
        });
        dialogRef.afterClosed().subscribe((result) => {
        });
    }
}
