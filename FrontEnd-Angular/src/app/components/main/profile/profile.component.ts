import { Component, OnInit } from '@angular/core';
import { PartialUser, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // User values
  userId = 2;

  user: PartialUser = {
    name: '',
    title: '',
    profilePic: '',
    bannerSm: '',
    bannerLg: '',
    aboutMe: ''
  };

  altPic: string = '';

  // Btn-edit values
  editIdModalPic: string = "#editProfilePicModal";
  editTitleTriggerModalPic: string = "Actualizar imagen de perfil";
  editClassTriggerModalPic: string = "edit-profile-pic text-center pb-3 pb-md-0 d-block";
  editIdModalTitle: string = "#editProfileTitleModal";
  editTitleTriggerModalTitle: string = "Actualizar nombre y titulo";
  editClassTriggerModalTitle: string = "btn-profile-title d-inline-block";

  constructor(private userService: UserService) {
    const getUser = this.userService.getUser(this.userId);

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

  ngOnInit(): void {}

}