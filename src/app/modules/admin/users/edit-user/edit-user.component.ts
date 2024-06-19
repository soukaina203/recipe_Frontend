import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatModule } from 'app/mat.module';
import { UowService } from 'app/services/uow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadImageFaComponent } from '@fuse/upload-file/upload-image-fa.component';
import { User } from 'app/models/User';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,UploadImageFaComponent, MatModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
    isModify:boolean=false
    id: any = 0;
    myForm: FormGroup;
    user: User = new User(); // Initialize the user object
    isProf: boolean = false;
    modifyPicture(){
        this.isModify? this.isModify=false : this.isModify=true
    }
    constructor(
        private uow: UowService,
        private route: ActivatedRoute,
        private fb: FormBuilder
        , private router: Router,

    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');

        this.uow.users.getOne(this.id).subscribe((res) => {
            this.user = res;
            this.createForm(); // Create the form after the user data is available

        });

        console.log("first")
        //   if matiere Input gonna be displayed or not
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

    update(user) {
        this.uow.users.put(this.id, user).subscribe((res) => {
            if (res.m === "success") {
                this.router.navigate(['/admin/users']);

            }
        })
    }
}
