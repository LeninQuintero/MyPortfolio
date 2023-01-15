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
  

  constructor(private http: HttpClient) {
    this.user = this.http.get<UserProfile>(this.apiUrl);
    this._user$ = new Subject<UserProfile>();
  }

  get getUser(): Observable<UserProfile> {
    this.user = this.http.get<UserProfile>(this.urlFind);
    return this.user
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

  setUrlFind(username: string | null) {
    this.urlFind =`${this.urlFind}${username}`;
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