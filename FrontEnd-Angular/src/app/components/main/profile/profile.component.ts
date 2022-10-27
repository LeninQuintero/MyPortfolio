import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // Btn-edit values
  editIdModalPic: string = "#editProfilePicModal";
  editTitleTriggerModalPic: string = "Actualizar imagen de perfil";
  editClassTriggerModalPic: string = "edit-profile-pic text-center pb-3 pb-md-0 d-block";
  editIdModalTitle: string = "#editProfileTitleModal";
  editTitleTriggerModalTitle: string = "Actualizar nombre y titulo";
  editClassTriggerModalTitle: string = "btn-profile-title d-inline-block";

  // User values
  userId = 1;
  name: string= '';
  title: string= '';
  profilePic: string= '';
  altPic: string= '';

  constructor(private userService: UserService) {  
    const getUser = this.userService.getUser(this.userId);

    getUser.subscribe(user => this.name = user.name );
    getUser.subscribe(user => this.title = user.title );
    getUser.subscribe(user => this.profilePic = user.profilePic );
    getUser.subscribe(user => this.altPic = `${user.name}'s picture.`);
    
  }

  ngOnInit(): void {}

}