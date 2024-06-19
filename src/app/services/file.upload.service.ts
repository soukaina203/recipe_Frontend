import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'environments/environment';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
    readonly http = inject(HttpClient);

    uploadFiles(folder: string, file: FormData) {
        return this.http.post<{ code: number, msg: string }>(`${environment.apiUrl}/files/uploadFiles/${folder}`, file);
    }

    deleteFile(folder: string, filename: string) {
        if (filename.length === 0) {
            return of(null);
        }
        return this.http.post<{ code: number, msg: string }>(`${environment.apiUrl}/files/deleteFile/${folder}/${filename}`, {});
    }

    downloadFile(folder: string, filename: string) {
        return this.http.post(`${environment.apiUrl}/files/downloadFile/${folder.replace(/\//g, '_')}/${filename}`, {}, { responseType: 'blob' });
    }

}
