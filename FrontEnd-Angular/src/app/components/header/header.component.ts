import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartialUserProfile, UserService } from 'src/app/services/user.service';
import { DEFAULT_LOGO_HEADER } from 'src/environments/api-urls-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  public logoUrl= DEFAULT_LOGO_HEADER;
  public user: PartialUserProfile = {}
  public username;
  private urlFindUser;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.username = this.route.snapshot.paramMap.get('username')?.toLowerCase();
    this.urlFindUser = this.userService.getUrlFind+this.username;
    this.userService.setUrlFindUser(this.urlFindUser);
  }

  ngOnInit(): void {
    this.userService.getUser.subscribe(user =>{
      this.user = user;
    });
  }
}