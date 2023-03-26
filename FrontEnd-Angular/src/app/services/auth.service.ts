import { Injectable } from '@angular/core';
import { LoginUser } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtResponse } from './token.service';
import { API_URL } from 'src/environments/api-urls-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = API_URL;
  authUrl=`${this.apiUrl}/auth/new-user`;
  loginUrl=`${this.apiUrl}/auth/login`;

  constructor(private httpClient: HttpClient) { }

  public newUser(newUser: LoginUser): Observable<any>{
    return this.httpClient.post<any>(this.authUrl, newUser);
  }

  public loginUser(loginUser: LoginUser):Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>(this.loginUrl, loginUser);
  }

}
