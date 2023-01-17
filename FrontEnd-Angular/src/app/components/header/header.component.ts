import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile, UserService } from 'src/app/services/user.service';
import { API_URL } from 'src/environments/api-urls-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  private apiUrl = API_URL;

  public logoUrl=`${this.apiUrl}/uploads/defaultimages/ArgentinaProgramaLogo.png`;

  // private username;

  // private urlFindUser;

  public user: UserProfile = {
    id: 0,
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

  constructor(private userService: UserService, private route: ActivatedRoute) {
    // console.log("HEADER COMP EN EL CONSTRUCTOR!!!!");
    // this.username = this.route.snapshot.paramMap.get('username');
    // this.urlFindUser = this.userService.getUrlFindUser;
    // console.log('URL FIND EN EL HEADER CONSTRUCTOR===>>>', this.urlFindUser)
 
  }

  ngOnInit(): void {
    console.log("HEADER COMP EN EL ON INIT!!!!");
    // this.userService.getUser.subscribe(user =>{
    //   this.user = user;
    //   console.log('USER EN EL INIT DEL HEADER ====>>>', user.name)
    // });
  }
}