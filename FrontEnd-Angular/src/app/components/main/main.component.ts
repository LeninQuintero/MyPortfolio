import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import {  UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent { 

  constructor(private userService: UserService, private route: ActivatedRoute) { 
    let username = this.route.snapshot.paramMap.get('username');
    let urlFindUser = this.userService.getUrlFind+username;
    this.userService.setUrlFindUser(urlFindUser);

  }

}
 