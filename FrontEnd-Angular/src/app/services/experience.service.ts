import { Injectable, OnInit } from '@angular/core';
import { PartialUserProfile, UserProfile, UserService } from './profile.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  
  private user: Observable<UserProfile>;
  private _user$: Subject<UserProfile>;
 
   private apiUrl = 'http://localhost:8080/';
   private urlFind = this.apiUrl + 'find-';
   private urlEdit = this.apiUrl + 'edit-profile';
 
   constructor(private http: HttpClient) {
     this.user = this.http.get<UserProfile>(this.apiUrl);
     this._user$= new Subject<UserProfile>();        
   }
 
  get getUser(): Observable<UserProfile> {
      this.user = this.http.get<UserProfile>(this.urlFind);
     return this.user
   }
 
   get getUser$() {  
     return this._user$
   }
 
   get getApiUrl(){
   return this.apiUrl
   }
 
   editUser(user : UserProfile): Observable<UserProfile>{
     return this.http.put<UserProfile>(this.urlEdit, user);
   }
 
   setUrlFind(username: string | null){
    this.urlFind = this.urlFind+username;
   }
 
   userExist(username: string | null):Observable<boolean>{
   return this.http.get<boolean>(this.apiUrl+'exist-'+username);
   }
 


}
