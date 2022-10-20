import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editIdModalPic: string="#editProfilePicModal";
  editTitleTriggerModalPic: string="Actualizar imagen de perfil";
  editClassTriggerModalPic: string="edit-profile-pic text-center pb-3 pb-md-0 d-block";

  editIdModalTitle: string="#editProfileTitleModal";
  editTitleTriggerModalTitle: string="Actualizar nombre y titulo";
  editClassTriggerModalTitle: string="btn-profile-title d-inline-block";
  
  constructor() { }

  ngOnInit(): void {
  }

}
