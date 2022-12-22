import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UploadFilesService {

  private apiUrlUpload = 'http://localhost:8080/uploads';
  private apiUrlDelete = 'http://localhost:8080/delete';

  constructor(private http: HttpClient) { }

  uploadRef(name: string) {
    return `${this.apiUrlUpload}/${name}`
  }

 uploadFile(file: FormData): Observable<string> {
    return this.http.post<string>(this.apiUrlUpload, file, { responseType: 'string' as 'json' });
  }

  deleteFile(filename: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrlDelete}/${filename}`, { responseType: 'string' as 'json' });
  }

  getUrlsFilename(url: string): any {
    let match = url.match(/\/([^\/]+)$/);
    if (match) {
      let file = match[1];
      return file
    }
  }

}

export interface Image {
  name: string;
  lastModified: number; 
  webkitRelativePath: string; 
  size: number; 
  type: string;
}