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
  private urlImgName: string = "";
  private actualImgName: string = "";

 private user: User = {
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
    this.actualImgName = this.uploadFilesService.getUrlsFilename(user.urlProfilePic);
    
  });

 private formDataImage = new FormData();

  constructor(private userService: UserService, private uploadFilesService: UploadFilesService) { }

  ngOnInit(): void {
    this.userSuscription;
  }

  ngOnDestroy(): void {
    if (this.userSuscription) {
      this.userSuscription.unsubscribe;
    }
  }

  captureFile(event: any) {
    const image = event.target.files[0];
    this.urlImgName = this.uploadFilesService.uploadRef(image.name);
    this.files.push(image);
    this.user.urlProfilePic = this.urlImgName;
    this.files.forEach((file: string | Blob) => {
      this.formDataImage.append('files', file)
    });
  }

  update() {   
      this.uploadFilesService.uploadFile(this.formDataImage).subscribe();
      this.userService.editUser(this.user).subscribe();
      this.uploadFilesService.deleteFile(this.actualImgName).subscribe();

    setTimeout(() => {
      location.reload();
    }, 1500);

  }
}