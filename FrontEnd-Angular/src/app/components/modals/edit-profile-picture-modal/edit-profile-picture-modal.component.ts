import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-picture-modal',
  templateUrl: './edit-profile-picture-modal.component.html',
  styleUrls: ['./edit-profile-picture-modal.component.scss']
})
export class EditProfilePictureModalComponent  {
public files: any =[];
  constructor(private userService: UserService) { 


  }

  captureFile(event: any){
    const file = event.target.files[0];
    this.files.push(file);
  }

}
