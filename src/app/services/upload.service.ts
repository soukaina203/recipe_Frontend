import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
  protected urlApi: string = environment.apiUrl;// InjectService.injector.get('API_URL');

    http = inject(HttpClient)

    uploadFile(file: File, folderName: string): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('folderName', folderName);

        return this.http.post(`${this.urlApi}/Upload/UploadFile/${folderName}`, formData);
    }


}
