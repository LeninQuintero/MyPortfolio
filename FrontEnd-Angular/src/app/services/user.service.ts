import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type" : "aplication/json"
  })
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  user: Observable<User>;
  _user$: Subject<User>;

  private apiUrlFindUser = 'http://localhost:3000/users/1';
  private apiUrlEditUser = 'http://localhost:3000/users/1';

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

  editUser(options: PartialUser): Observable<User>{
    
   this.user = this.http.patch<User>(this.apiUrlEditUser, options);
   console.log("PATCH USUARIO: =>", this.user);
 
    return this.user
  }

}

export interface User {
  id: number;
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