import { Component, OnInit } from '@angular/core';
import { UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: UserProfile[] = [];
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.userService.getUserList.subscribe(users => {
      this.users = users;
    });

    this.userService.getUser$.subscribe(() => {
      this.userService.getUserList.subscribe(users => {
        this.users = users;
      });
    });
  }

}
