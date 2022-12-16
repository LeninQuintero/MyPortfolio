import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-picture-modal',
  templateUrl: './edit-profile-picture-modal.component.html',
  styleUrls: ['./edit-profile-picture-modal.component.scss']
})

export class EditProfilePictureModalComponent implements OnInit, OnDestroy {

  public editForm = new FormControl;
  public files: any = [];
  private urlImg: string = "";

  user: User = {
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

  private userSuscription = this.userService.getUser().subscribe(user => {
    this.user = user;
  });

  constructor(private userService: UserService, private uploadFilesService: UploadFilesService) { }

  ngOnInit(): void {
    this.userSuscription;
  }

  captureFile(event: any) {
    const image = event.target.files[0];
    this.urlImg = this.uploadFilesService.ref(image.name);
    this.files.push(image);
    this.user.urlProfilePic = this.urlImg;
  }

   update() {
    try {
      const formData = new FormData();
       this.files.forEach((file: string | Blob) => {
        formData.append('files', file)
      });
       this.uploadFilesService.uploadFile(formData).subscribe( res => {

         console.log(res);

      });

       this.userService.editUser(this.user).subscribe();



       this.editForm.reset();

      //  this.userService.setUserUrlprofilePic(this.urlImg);
      

    } catch (error) {
      console.log(error);
      this.editForm.reset();
    }


    setTimeout(() => {
      location.reload();
    }, 1000);
  
  
  }





  ngOnDestroy(): void {
    if (this.userSuscription) {
      this.userSuscription.unsubscribe;
    }
  }

}