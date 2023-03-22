import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-toggler-user-menu',
  templateUrl: './toggler-user-menu.component.html',
  styleUrls: ['./toggler-user-menu.component.scss']
})
export class TogglerUserMenuComponent implements OnInit {
 public urlProfilePic: string | undefined;
 public username;
 public messagesUri;

  constructor(private userService: UserService, private route: ActivatedRoute) { 
  this.username = this.route.snapshot.paramMap.get('username')?.toLowerCase();
  this.messagesUri = `/${this.username}/mensajes`;
  }

  ngOnInit(): void {
    this.userService.getUser.subscribe(user => {
      this.urlProfilePic = user.urlProfilePic;
    });

    this.userService.getUser$.subscribe(() => {
      this.userService.getUser.subscribe(user => {
        this.urlProfilePic = user.urlProfilePic;
      });
    });
  }
}