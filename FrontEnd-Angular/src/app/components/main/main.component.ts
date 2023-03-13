import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit { 
  username;
  urlFindUser;

  constructor(private userService: UserService, private route: ActivatedRoute) { 
    this.username = this.route.snapshot.paramMap.get('username');
    this.urlFindUser = this.userService.getUrlFind+this.username;
    this.userService.setUrlFindUser(this.urlFindUser);
  }


  ngOnInit(): void {  
    this.userService.getUser.subscribe(()  => {
      this.username = this.route.snapshot.paramMap.get('username');
      this.urlFindUser = this.userService.getUrlFind+this.username;
      this.userService.setUrlFindUser(this.urlFindUser);

    });
  }
}
 