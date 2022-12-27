import { Component, OnInit } from '@angular/core';
import { PartialUser, User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-toggler-user-menu',
  templateUrl: './toggler-user-menu.component.html',
  styleUrls: ['./toggler-user-menu.component.scss']
})
export class TogglerUserMenuComponent implements OnInit {
  urlProfilePic: string = "";

  user: PartialUser = {};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.urlProfilePic = user.urlProfilePic;
    });
  }

}
