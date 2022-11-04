import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlTree } from '@angular/router';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'content-file': 'application/json'
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private apiUrl = 'http://localhost:3000/assets/images';

  constructor(private http: HttpClient) { }

ref(name: string){
return `${this.apiUrl}/${name}`
}

upload(name: string, file: File){

}

uploadFile (file: File): Observable<File> {
  return this.http.post<File>(this.apiUrl, file);
}


}

export interface Image {
  name: string;
  url: string;
  image: File;
}