import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private apiUrl = 'http://localhost:8080/files/uploads';

  constructor(private http: HttpClient) { }

ref(name: string){
return `${this.apiUrl}/${name}`
}

upload(name: string, file: File){

}

uploadFile (file: FormData): Observable<Blob> {
  return this.http.post<Blob>(this.apiUrl, file, {responseType: 'string' as 'json'});
}
}