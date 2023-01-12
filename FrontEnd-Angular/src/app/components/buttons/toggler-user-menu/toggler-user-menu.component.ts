import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-toggler-user-menu',
  templateUrl: './toggler-user-menu.component.html',
  styleUrls: ['./toggler-user-menu.component.scss']
})
export class TogglerUserMenuComponent implements OnInit {
 public urlProfilePic: string = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser.subscribe(user => {
      this.urlProfilePic = user.urlProfilePic;
    });
  }
}