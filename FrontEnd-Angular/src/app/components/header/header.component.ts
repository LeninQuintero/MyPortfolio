import { Component, OnInit } from '@angular/core';
import { UserProfile, UserService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit  {

  user: UserProfile = {
    name: '',
    title: '',
    urlProfilePic: '',
    urlBannerSm: '',
    urlBannerLg: '',
    aboutMe: '',
    urlGithub: '',
    urlTwitter: '',
    urlLinkedin: '',
    urlProfile: ''
  };

  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.userService.user.subscribe( user =>{
      this.user = user;      
    });  
  }

  

}
