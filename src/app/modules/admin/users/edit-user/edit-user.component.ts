import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatModule } from 'app/mat.module';
import { UowService } from 'app/services/uow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadImageFaComponent } from '@fuse/upload-file/upload-image-fa.component';
import { User } from 'app/models/User';
import { MatDialog } from '@angular/material/dialog';
import { UploadComponent } from '../../upload/upload.component';

@Component({
    selector: 'app-edit-user',
    standalone: true,
    imports: [CommonModule, FormsModule, UploadComponent,
        ReactiveFormsModule, UploadImageFaComponent, MatModule],
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
    isModify: boolean = false
    id: any = 0;
    myForm: FormGroup;
    user: User = new User(); // Initialize the user object
    isProf: boolean = false;
    modifyPicture() {
        this.isModify ? this.isModify = false : this.isModify = true
    }
    selectedFile: File | null = null;
    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;

    receiveData(data: any) {
        this.selectedFile = data
    }
    constructor(
        private uow: UowService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        private dialog: MatDialog,


    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');

        this.uow.users.getOne(this.id).subscribe((res) => {
            this.user = res;
            this.createForm(); // Create the form after the user data is available

        });
    }

    createForm() {
        this.myForm = this.fb.group({
            id: [this.user.id ?? 0],
            nom: [this.user.nom, Validators.minLength(3)],
            prenom: [this.user.prenom, Validators.minLength(3)],
            email: [this.user.email, Validators.email],
            image: [this.user.image],
            password: [this.user.password],
            isAdmin: [this.user.isAdmin]
        });
    }
    delete() {
        this.uow.categories.delete(this.id).subscribe((e) => {
            e ?
                this.router.navigate(['/admin/users']) : console.error("Error while deleting ")
        })
    }

    toggleEditMode() {
        this.router.navigate(['/admin/users']);
    }
    openEmailExistsPoppup(): void {
        console.log("i am in dialog")
        const dialogRef = this.dialog.open(this.popupTemplate, {
            height: '340px',
            width: '500px'
            // Set width and other configuration options if needed
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log('Dialog closed:', result);
        });
    }
    update() {
        const user = this.myForm.getRawValue() as User;

        if (this.selectedFile) {

            this.uow.uploads.uploadFile(this.selectedFile, "users").subscribe((res) => {
                user.image = res.fileName
                this.uow.users.put(this.id, user).subscribe((res) => {
                    if (res.m === "success") {
                        this.router.navigate(['/admin/users']);
                    }
                    else {
                        this.openEmailExistsPoppup();
                    }
                })


            })

        } else {
            this.uow.users.put(this.id, user).subscribe((res) => {
                if (res.m === "success") {
                    this.router.navigate(['/admin/users']);
                }
                else {
                    this.openEmailExistsPoppup();
                }
            })
        }
    }
}
