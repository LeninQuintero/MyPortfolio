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
  private image: any;


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
    console.log("ngOnInit")
    this.userSuscription;
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy")
    if (this.userSuscription) {
      this.userSuscription.unsubscribe;
    }
  }

  captureFile(event: any) {
    this.image = event.target.files[0];
    console.log("ESTA ES LA IMAGEN CARGADA==> ",this.image);

    this.urlImgName = this.uploadFilesService.uploadRef(this.image.name);
    console.log("ESTE ES EL NIOMBRE DE LA IMAGEN==> ", this.image.name);

    this.files.push(this.image);

    this.user.urlProfilePic = this.urlImgName;

    this.files.forEach((file: string | Blob) => {
      this.formDataImage.append('files', file)
    });
  }

 async update() {  
   await this.uploadFilesService.uploadFile(this.formDataImage).subscribe(async res => {
    
      console.log("actual usuario UPLOAD==>", this.user.urlProfilePic);
       console.log("ASYNC 1 UPLOAD FILE ==>", res);
       
       await  this.userService.editUser(this.user).subscribe(async res => {
        console.log("actual usuario EDIT==>", this.user.urlProfilePic)
        console.log("ASYNC 2 EDIT USER ==>", res);
        


        await  this.uploadFilesService.deleteFile(this.actualImgName).subscribe(async res => {
          await console.log("actual usuario DELETE==>", this.user.urlProfilePic)
          await console.log("ASYNC 3 DELETE FILE ==>", res);  
          
          await setTimeout(() => {
            console.log("TEMPORIZADOR********")
            
            location.reload();
            this.userService._user$.next(this.user);
          }, 1000);

        });




      });

      

      
    });

 


}

}