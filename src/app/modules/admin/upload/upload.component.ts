import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatModule } from 'app/mat.module';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule,MatModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
    selectedFile: File | null = null;
    previewUrl: any = null;
    imageUrl = ""
    isLoading: boolean = false
    @Output () dataEvent = new EventEmitter<any> ();
    @Input () image :string;
    @Input () folder :string;


    uploaded: boolean = false
    pictureUrl: any
    constructor(private http: HttpClient,
        private cdr: ChangeDetectorRef , // Inject ChangeDetectorRef



    ) {}
    ngOnInit(){
        this.image!==undefined?
        this.uploaded=true : this.uploaded=false
    }

    modifyIMage(){
        this.uploaded=false
  this.image=""
        // Trigger change detection

    }
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
        this.image=""
        console.log("object")
        this.cdr.markForCheck();  // Trigger change detection

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
            this.dataEvent.emit(this.selectedFile)
        };
    }

}
