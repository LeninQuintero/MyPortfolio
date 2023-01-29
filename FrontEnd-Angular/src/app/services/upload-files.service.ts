import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/environments/api-urls-config';
import { Storage, UploadResult, getDownloadURL, ref, uploadBytes, deleteObject } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

export class UploadFilesService {
  
  private apiUrl=API_URL;
  private apiUrlUpload =`${this.apiUrl}/uploads`;
  private apiUrlDelete = `${this.apiUrl}/delete`;

  constructor(private http: HttpClient, private storage: Storage) { }

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

uploadFileFire(file: Blob, directory: string, name:string): Promise<UploadResult> {
const fileRef = ref(this.storage, `${directory}/${name}`);
return uploadBytes(fileRef, file)
}

getUrlUpFileFire(upResult: UploadResult): Promise<string> {
 return getDownloadURL(upResult.ref)
}

getFilePathFromUrl(url: string): any{
  const splitUrl = url.split('/');
  splitUrl.pop();
  const filePath = splitUrl.join('/');
  return filePath
}

getFileNameFromUrl(url: string): any{
  const splitUrl = url.split('/');
  const fileName = splitUrl[splitUrl.length - 1];
  splitUrl.pop();
  return fileName
}

getFileExtFromUrl(url: string): string {
  const extensionRegex = /(?<=\.)[^.]*(?=\?)/;
  const extension = url.match(extensionRegex);
  return extension ? extension[0] : '';
}

deleteFileFire(directory: string, name:string) {
  const storageRef= ref(this.storage, `${directory}/${name}`);
  deleteObject(storageRef).then(() => {
  }).catch((error) => {
    console.log(error)
  }); 
}

getImageFormat(fileName: any){
  const extension = fileName.match(/\.([^.]+)$/)[1];
return extension
}

}