import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/environments/api-urls-config';
import { Storage, StorageReference, UploadResult, getDownloadURL, ref, uploadBytes, deleteObject, getStorage } from '@angular/fire/storage';


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
const fileData = file;
const fileRef = ref(this.storage, `${directory}/${name}`);
return uploadBytes(fileRef, fileData)
}

getUrlUpFileFire(upResult: UploadResult): Promise<string> {
 return getDownloadURL(upResult.ref)
}

// deleteFileFire(url: string) {
//   const storage = getStorage();
//   // Create a reference to the file to delete
//   const desertRef = ref(storage, url);
//   // Delete the file
//   deleteObject(desertRef).then(() => {
//     console.log("File deleted successfully")
//   }).catch((error) => {
//     console.log("Uh-oh, an error occurred!")
//   });
// }

getFilePathFromUrl(url: string): any{
  const splitUrl = url.split('/');
  const fileName = splitUrl[splitUrl.length - 1];
  splitUrl.pop();
  const filePath = splitUrl.join('/');
  return filePath
}

deleteFileFire(url: string) {
  const splitUrl = url.split('/');
  const fileName: any = splitUrl[splitUrl.length - 1];

console.log("A BORRAR===>>>", fileName)
  fileName.delete();
}

getImageFormat(fileName: any){
  const extension = fileName.match(/\.([^.]+)$/)[1];
return extension
}

}