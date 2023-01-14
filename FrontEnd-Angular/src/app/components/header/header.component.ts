import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartialUserProfile, UserService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  public logoUrl: string | undefined;

  private username;

  public user: PartialUserProfile = {};

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.logoUrl = this.userService.getApiUrl+"uploads/defaultimages/ArgentinaProgramaLogo.png";
    this.username = this.route.snapshot.paramMap.get('username');
    this.userService.setUrlFind(this.username);
 
  }

  ngOnInit(): void {
    this.userService.getUser.subscribe(user =>
      this.user = user);
  }
}