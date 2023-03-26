import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginUser } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';
import { ProfileComponent } from '../../main/profile/profile.component';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  isLogged = false;
  isLogginFail = false;
  loginUser!: LoginUser;
  userName: string="";
  password: string="";
  roles: string[] = [];
  errMsj!: string;

  redirectUrl!: string;


  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();

    }
  }

  onLogin(): void {

    this.loginUser = new LoginUser(this.userName, this.password);    
    this.authService.loginUser(this.loginUser).subscribe(
      data => {
        // Login successful
        this.isLogged = true;
        this.isLogginFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.userName);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        window.location.reload();
      }, err => {
        // Login failed
        this.isLogged = false;
        this.isLogginFail = true;
        this.errMsj = err.error.mensaje;
      }
    )
  }

  newUser(): void {
    this.loginUser = new LoginUser(this.userName, this.password);

    this.authService.newUser(this.loginUser).subscribe( profile => { 
     this.redirectUrl = profile.urlProfile;
      
     this.authService.loginUser(this.loginUser).subscribe(
      data => {
        // Login successful
        this.isLogged = true;
        this.isLogginFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.userName);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        window.location.reload();
      }, err => {
        // Login failed
        this.isLogged = false;
        this.isLogginFail = true;
        this.errMsj = err.error.mensaje;
      });
    });
    this.router.navigate([this.redirectUrl]);
  }

}