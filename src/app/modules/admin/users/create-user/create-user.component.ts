import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { FuseAlertComponent } from '@fuse/components/alert';
import { UploadComponent } from '../../upload/upload.component';

@Component({
    selector: 'app-create-user',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule, ReactiveFormsModule,UploadComponent,
         MatModule,FuseAlertComponent],
    templateUrl: './create-user.component.html',
    // styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

    id: any = 0;
    isProf: boolean = false;
    user = new User(); // Initialize the user object
    selectedFile: File | null = null;

    @ViewChild('popupTemplate') popupTemplate!: TemplateRef<any>;

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
        private cdr: ChangeDetectorRef , // Inject ChangeDetectorRef
        private dialog: MatDialog,


    ) { }



 receiveData(data:any){
this.selectedFile=data
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
    submit() {
        this.uow.uploads.uploadFile(this.selectedFile, "users").subscribe((res) => {

            const user = this.myForm.getRawValue() as User;
            user.image = res.fileName
            this.uow.auth.signUp(user).subscribe((res: any) => {
                if (res.code !== -1) {
                    this.router.navigate(['/admin/users']);
                }
                else{
                    this.openEmailExistsPoppup();
                }
            });
        })

    }



}
