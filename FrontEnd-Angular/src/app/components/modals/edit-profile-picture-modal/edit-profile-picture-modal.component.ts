import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-picture-modal',
  templateUrl: './edit-profile-picture-modal.component.html',
  styleUrls: ['./edit-profile-picture-modal.component.scss']
})
export class EditProfilePictureModalComponent  {
  public editForm= new FormControl;
  public files: any =[];
  private urlImg: string="";

  private user: User= {
    id: 0,
    userName: '',
    password: '',
    name: '',
    title: '',
    urlProfilePic: '',
    urlBannerSm: '',
    urlBannerLg: '',
    aboutMe: ''
  };

  constructor(private userService: UserService, private uploadFilesService: UploadFilesService) { 
    this.userService.user.subscribe(user => {     
      this.user = user;
    });

  }
  
  captureFile(event: any){
    const image = event.target.files[0];
    this.urlImg = this.uploadFilesService.ref(image.name);
    this.files.push(image);
  }

  update(): any {
    try {
      const formData = new FormData();
      this.files.forEach((file: string | Blob) => {
        formData.append('files', file)
      })
      this.uploadFilesService.uploadFile(formData).subscribe(res => {
        console.log(res)
      })

      this.user.urlProfilePic = this.urlImg;

      this.userService.editUser(this.user).subscribe( user => 
        this.userService._user$.next(user));
     
    } catch (error) {
      console.log(error);
    }
    this.files = [];
    this.editForm.reset();
  }
}