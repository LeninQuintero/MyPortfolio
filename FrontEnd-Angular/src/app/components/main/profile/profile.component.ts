import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/services/user.service';

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
  name = '';
  title = '';
 

  constructor(private userService: UserService) {  
    

    this.getUserData();
    
    
  }

  ngOnInit(): void {

  }

  getUserData() {   


    const getUser = this.userService.getUser(this.userId);

    


    getUser.subscribe(user => console.log(user));


    getUser.subscribe(user => this.name = `${user.name}`);
    getUser.subscribe(user => this.title = `${user.title}`);
  }

}