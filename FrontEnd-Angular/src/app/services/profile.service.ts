import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  user: Observable<UserProfile>;
  _user$: Subject<UserProfile>;

  private uri = 'http://localhost:8080/';
  private uriBase = 'http://localhost:8080/find-';
  private apiUrlFindProfile = 'http://localhost:8080/find-profile/1';
  private apiUrlEditProfile = 'http://localhost:8080/edit-profile';

  constructor(private http: HttpClient) {

    this.user = this.http.get<UserProfile>(this.uriBase);
    this._user$= new Subject<UserProfile>();        
  }

  getUser(): Observable<UserProfile> {
     this.user = this.http.get<UserProfile>(this.uriBase);
    return this.user
  }

  get getUser$() {  
    return this._user$
  }

  editUser(user : UserProfile): Observable<UserProfile>{
    return this.http.put<UserProfile>(this.apiUrlEditProfile, user);
  }

  setUrl(username: string | null){
   this.uriBase = this.uriBase+username;
  }

  userExist(username: string | null):Observable<boolean>{
  return this.http.get<boolean>(this.uri+'exist-'+username);
  }

}
export interface UserProfile {
  id: number;
  name: string;
  title: string;
  urlProfilePic: string;
  urlBannerSm: string;
  urlBannerLg: string;
  aboutMe: string;
  urlGithub: string;
  urlTwitter: string;
  urlLinkedin: string;
  urlProfile: string;
}

export interface PartialUserProfile extends Partial<UserProfile> { }