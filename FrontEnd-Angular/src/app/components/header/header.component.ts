import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile, UserService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  private username;

  public user: UserProfile = {
    name: '',
    title: '',
    urlProfilePic: '',
    urlBannerSm: '',
    urlBannerLg: '',
    aboutMe: '',
    urlGithub: '',
    urlTwitter: '',
    urlLinkedin: '',
    urlProfile: '',
    id: 0
  };

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.username = this.route.snapshot.paramMap.get('username');
    this.userService.setUrl(this.username)
  }

  ngOnInit(): void {
    this.userService.user.subscribe(user =>
      this.user = user)
  }
}