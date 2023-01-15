import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/environments/api-urls-config';

@Injectable({
  providedIn: 'root'
})

export class UploadFilesService {
  
  private apiUrl=API_URL;
  private apiUrlUpload =`${this.apiUrl}/uploads`;
  private apiUrlDelete = `${this.apiUrl}/delete`;

  constructor(private http: HttpClient) { }

  uploadRef(directoryName: string, name: string) {
    return `${this.apiUrlUpload}/${directoryName}/${name}`
  }

 uploadFile(directoryName: string, file: FormData): Observable<string> {
    return this.http.post<string>(`${this.apiUrlUpload}/${directoryName}`, file, { responseType: 'string' as 'json' });
  }

  deleteFile(directoryName: string, filename: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrlDelete}/${directoryName}/${filename}`, { responseType: 'string' as 'json' });
  }

  getUrlsName(url: string): any {
    let match = url.match(/\/([^\/]+)$/);
    if (match) {
      let file = match[1];
      return file
    }
  }
}