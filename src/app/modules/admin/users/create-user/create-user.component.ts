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

@Component({
    selector: 'app-create-user',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatModule,UploadImageFaComponent],
    templateUrl: './create-user.component.html',
    // styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

    id: any = 0;
    isProf: boolean = false;
    user = new User(); // Initialize the user object
    selectedFile: File = null;
    imageUrl=""

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
        private http: HttpClient

    ) { }


    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        this.uow.uploads.uploadFile(this.selectedFile,"users").subscribe((res)=>{
            this.imageUrl=res.filePath
            console.log(this.imageUrl)
        })
    }

    choosenRole(id: number) {
        // const selectedRoleId = this.myForm.get('idRole').value;
        id === 1 ?
            this.isProf = true :
            this.isProf = false;

        console.log('Selected role ID:', id, this.isProf);

        // Further actions with the selectedRoleId
    }

    delete() {
        this.userService.delete(this.id).subscribe((e) => {

            e ?
                this.router.navigate(['/admin/profs']) : console.error("Error while deleting ")
        })
    }
    toggleEditMode() {
        this.router.navigate(['/admin/users']);
    }

    submit() {
        const user = this.myForm.getRawValue() as User;
        user.image = (user.image as any).at(0).path;

        this.uow.users.post(user).subscribe((res: any) => {
            console.log(res)
            if (res.id !== 0) {
                this.router.navigate(['/admin/users']);
            }
        });
    }



}
