import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: Observable<UserProfile>;
  _user$: Subject<UserProfile>;

  private apiUrlFindProfile = 'http://localhost:8080/find-profile/1';
  private apiUrlEditProfile = 'http://localhost:8080/edit-profile';

  constructor(private http: HttpClient) {

    this.user = this.http.get<UserProfile>(this.apiUrlFindProfile);
    this._user$= new Subject<UserProfile>();        
  }

  getUser(): Observable<UserProfile> {
     this.user = this.http.get<UserProfile>(this.apiUrlFindProfile);
    return this.user
  }

  get getUser$() {  
    return this._user$
  }

  editUser(user : UserProfile): Observable<UserProfile>{
    return this.http.put<UserProfile>(this.apiUrlEditProfile, user);
  }

}

export interface UserProfile {
  id?: number;
  name: string;
  title: string;
  urlProfilePic: string;
  urlBannerSm: string;
  urlBannerLg: string;
  aboutMe: string;
  urlGithub: string;
  urlTwitter: string;
  urlLinkedin: string;
}

export interface PartialUserProfile extends Partial<UserProfile> { }