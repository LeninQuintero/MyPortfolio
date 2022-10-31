import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: PartialUser={
    id: 0,
    name: '',
    title: '',
    profilePic: '',
    bannerSm: '',
    bannerLg: '',
    aboutMe: ''
  };
 
  // user$= new Observable<User>();

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
    
  }

  getUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }

  editUser(id: number, options: PartialUser): Observable<User>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<User>(url, options);
  }

}

export interface User {
  id: number;
  name: string;
  title: string;
  profilePic: string;
  bannerSm: string;
  bannerLg: string;
  aboutMe: string;
}

export interface PartialUser extends Partial<User> { }