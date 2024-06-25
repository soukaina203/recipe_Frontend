import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    http = inject(HttpClient)

    uploadFile(file: File, folderName: string): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('folderName', folderName);

        return this.http.post(`http://localhost:5228/api/Upload/UploadFile/${folderName}`, formData);
    }


}
