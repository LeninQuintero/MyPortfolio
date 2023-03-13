import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartialUserProfile, UserService } from 'src/app/services/user.service';
import { API_URL, DEFAULT_LOGO_HEADER } from 'src/environments/api-urls-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  private apiUrl = API_URL;
  public logoUrl= DEFAULT_LOGO_HEADER;
  public user: PartialUserProfile = {}
  public username;

  constructor(private userService: UserService,private route: ActivatedRoute) {
    this.username = this.route.snapshot.paramMap.get('username');
  }

  ngOnInit(): void {
    this.userService.getUser.subscribe(user =>{
      this.user = user;
    });
  }
}