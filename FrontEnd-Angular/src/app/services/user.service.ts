import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { API_URL } from 'src/environments/api-urls-config';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = API_URL;
  private urlFind = `${this.apiUrl}/find-`;
 
  private urlEdit = `${this.apiUrl}/edit-profile`;
  private urlExist = `${this.apiUrl}/exist-`

  private user: Observable<UserProfile>;
  private _user$: Subject<UserProfile>;

  private urlFindUser:string='';

  constructor(private http: HttpClient) {
    this.user = new Observable<UserProfile>;
    this._user$ = new Subject<UserProfile>();
  }

  get getUser(): Observable<UserProfile> {
    return this.user = this.http.get<UserProfile>(this.urlFindUser);
  }

  get getUser$() {
    return this._user$
  }

  get getApiUrl() {
    return this.apiUrl
  }

  editUser(user: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(this.urlEdit, user);
  }

  get getUrlFind(){
    return this.urlFind;
  }

  setUrlFindUser(url: string) {
    this.urlFindUser = url;
  }

  userExist(username: string | null): Observable<boolean> {
    return this.http.get<boolean>(`${this.urlExist}${username}`);
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