import { Component, OnInit } from '@angular/core';
import { PartialUser, UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  user: PartialUser = {};
  altPic: string = '';

  // Btn-edit values
  editIdModalPic: string = "#editProfilePicModal";
  editTitleTriggerModalPic: string = "Actualizar imagen de perfil";
  editClassTriggerModalPic: string = "edit-profile-pic text-center pb-3 pb-md-0 d-block";
  editIdModalTitle: string = "#editProfileTitleModal";
  editTitleTriggerModalTitle: string = "Actualizar nombre y titulo";
  editClassTriggerModalTitle: string = "btn-profile-title d-inline-block";
  
  refreshUser() {
    const getUser = this.userService.getUser();

    getUser.subscribe(user => {
      this.user.name = user.name;
      this.user.title = user.title;
      this.user.profilePic = user.profilePic;
      this.user.bannerSm = user.bannerSm;
      this.user.bannerLg = user.bannerLg;
      this.user.aboutMe = user.aboutMe;
      this.altPic = `${user.name}'s picture.`;
    });
   }

  constructor(private userService: UserService) {
    this.refreshUser();   
  }

  ngOnInit(): void {
    this.userService.getUser$.subscribe(() => 
    this.refreshUser()
    );
  }
}