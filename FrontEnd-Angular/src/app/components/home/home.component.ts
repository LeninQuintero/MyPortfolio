import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UserProfile, UserService } from 'src/app/services/user.service';
import { DEFAULT_LOGO_HEADER } from 'src/environments/api-urls-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public logoUrl= DEFAULT_LOGO_HEADER;
  users: UserProfile[] = [];
  public isLogged = false;
  constructor(private userService: UserService, private tokenService: TokenService) { }
  
  ngOnInit(): void {
    this.userService.getUserList.subscribe(users => {
      this.users = users;
    });

    this.userService.getUser$.subscribe(() => {
      this.userService.getUserList.subscribe(users => {
        this.users = users;
      });
    });

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
    
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }


}
