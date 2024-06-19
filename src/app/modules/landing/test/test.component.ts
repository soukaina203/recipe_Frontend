import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
    selectedFile: File | null = null;
    previewUrl: any = null;

    constructor(private http: HttpClient) {}

    onFileSelected(event: any): void {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.preview();
      }
    }

    preview(): void {
      // Show preview
      const mimeType = this.selectedFile?.type;
      if (!mimeType?.startsWith('image/')) {
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile!);
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
    }

    onUpload(): void {
      if (!this.selectedFile) {
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post('YOUR_BACKEND_URL_HERE', formData).subscribe(response => {
        console.log('Upload success:', response);
      }, error => {
        console.error('Upload error:', error);
      });
    }
}
