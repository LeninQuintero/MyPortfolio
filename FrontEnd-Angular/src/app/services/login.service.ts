import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor() { }

}

export class LoginUser {
  userName:string;
  password:string;

  constructor(userName: string, password: string){
      this.userName=userName;
      this.password=password;
  }
}