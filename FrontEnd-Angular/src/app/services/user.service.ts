import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
user: Observable<User>;

  private apiUrl = 'http://localhost:3000/users';


  constructor(private http: HttpClient) {
   this.user= this.http.get<User>(`${this.apiUrl}/${1}`)
   }


  getUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }

}

export interface User {
  id?: number;
  name: string;
  title: string;
  profilePic:string;
  bannerSm: string;
  bannerLg: string;
  aboutMe: string;
}