import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  user: Observable<User>;
  _user$: Subject<User>;

  private apiUrl = 'http://localhost:3000/users/1';

  constructor(private http: HttpClient) {

    this.user = this.http.get<User>(this.apiUrl);
    this._user$= new Subject<User>();        
  }

  getUser(): Observable<User> {
     this.user = this.http.get<User>(this.apiUrl);
    return this.user
  }

  get getUser$() {  
    return this._user$
  }

  editUser(options: PartialUser): Observable<User>{
   this.user = this.http.patch<User>(this.apiUrl, options);
    return this.user
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