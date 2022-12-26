import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: Observable<User>;
  _user$: Subject<User>;

  private apiUrlFindUser = 'http://localhost:8080/find-user/1';
  private apiUrlEditUser = 'http://localhost:8080/edit-user';

  constructor(private http: HttpClient) {

    this.user = this.http.get<User>(this.apiUrlFindUser);
    this._user$= new Subject<User>();        
  }

  getUser(): Observable<User> {
     this.user = this.http.get<User>(this.apiUrlFindUser);
    return this.user
  }

  get getUser$() {  
    return this._user$
  }

  editUser(user : User): Observable<User>{
    return this.http.put<User>(this.apiUrlEditUser, user);
  }

}

export interface User {
  id?: number;
  userName: string;
  password: string;

  name: string;
  title: string;
  urlProfilePic: string;
  urlBannerSm: string;
  urlBannerLg: string;
  aboutMe: string;
}

export interface PartialUser extends Partial<User> { }