import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
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

@Component({
    selector: 'app-create-user',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule, UploadImageFaComponent],
    templateUrl: './create-user.component.html',
    // styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

    id: any = 0;
    isProf: boolean = false;
    user = new User(); // Initialize the user object
    selectedFile: File = null;
    imageUrl = ""
    isLoading: boolean = false

    uploaded: boolean = false
    previewUrl: any = null;
    pictureUrl: any

    readonly myForm = this.fb.group({
        id: [this.user.id ?? 0],
        nom: [this.user.nom, Validators.minLength(3)],
        prenom: [this.user.prenom, Validators.minLength(3)],
        email: [this.user.email, Validators.email],
        image: [this.user.image],
        password: '',
        isAdmin: 0
    });

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,
        private uow: UowService,
        private http: HttpClient,
        private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef


    ) { }



    openInput(o/*: HTMLInputElement*/) {
        o.click();
    }
    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.isLoading = true
            this.selectedFile = file;
            this.preview();
        }
    }
    remove() {
        this.uploaded = false
        this.previewUrl = ""
    }
    preview(): void {

        // Show preview
        const mimeType = this.selectedFile?.type;
        if (!mimeType?.startsWith('image/')) {
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile!);
        this.uploaded = true
        reader.onload = () => {

            this.previewUrl = reader.result;
            this.isLoading = false
            this.cdr.markForCheck();  // Trigger change detection

        };
    }



    toggleEditMode() {
        this.router.navigate(['/admin/users']);
    }
    uploadFile() {

    }

    submit() {
        this.uow.uploads.uploadFile(this.selectedFile, "users").subscribe((res) => {

            const user = this.myForm.getRawValue() as User;
            user.image = res.fileName
            this.uow.auth.signUp(user).subscribe((res: any) => {
                if (res.id !== 0) {
                    this.router.navigate(['/admin/users']);
                }
            });
        })

    }



}
