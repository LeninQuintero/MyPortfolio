import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-picture-modal',
  templateUrl: './edit-profile-picture-modal.component.html',
  styleUrls: ['./edit-profile-picture-modal.component.scss']
})

export class EditProfilePictureModalComponent implements OnInit, OnDestroy {

  public editForm: FormGroup;
  public files: any = [];
  public minLengthPictureName: number = 1;
  public maxLengthPictureName: number = 50;
  public spinnerButton: boolean = false;
  private urlImgName: string = "";
  private actualImgName: string = "";
  private image: any;  
  private formDataImage = new FormData();
  private userSuscription = this.userService.getUser().subscribe(user => {
    this.user = user;
    this.actualImgName = this.uploadFilesService.getUrlsFilename(user.urlProfilePic);
  });
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

  constructor(private fb: FormBuilder, private userService: UserService, private uploadFilesService: UploadFilesService) {

    const imageValidator = /.(jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP)$/i;
    const minLengthValidator = 17 + this.minLengthPictureName;
    const maxLengthValidator = 17 + this.maxLengthPictureName;

    this.editForm = this.fb.group({

      image: ['', [ Validators.required,
                    Validators.minLength(minLengthValidator),
                    Validators.maxLength(maxLengthValidator),
                    Validators.pattern(imageValidator)]]
                });
  }

  ngOnInit(): void {
    this.userSuscription;
  }

  ngOnDestroy(): void {
    if (this.userSuscription) {
      this.userSuscription.unsubscribe;
    }
  }

  isValidField(field: string) {
    const fieldName = this.editForm.get(field);
    return fieldName?.valid && (fieldName?.touched || fieldName?.dirty);
  }

  isInvalidField(field: string) {
    const fieldName = this.editForm.get(field);
    return fieldName?.invalid && (fieldName?.touched || fieldName?.dirty);
  }


  errorsFeedback(field: string, validator: string) {
    const fieldName = this.editForm.get(field);
    return fieldName?.hasError(validator);
  }

  requiredType(field: string, validator: string, type: string) {
    const fieldName = this.editForm.get(field);
    return fieldName?.errors?.[validator]?.[type];
  }

  captureFile(event: any) {

    if (this.editForm.valid) {
      this.image = event.target.files[0];

      this.urlImgName = this.uploadFilesService.uploadRef(this.image.name);

      this.files.push(this.image);

      this.user.urlProfilePic = this.urlImgName;

      this.files.forEach((file: string | Blob) => {
        this.formDataImage.append('files', file)
      });
    }
  }

  update() {

    if (this.editForm.valid) {
      this.uploadFilesService.deleteFile(this.actualImgName).subscribe(() => {
        
        this.spinnerButton = true;

        this.uploadFilesService.uploadFile(this.formDataImage).subscribe(() => {
          this.userService.editUser(this.user).subscribe(() => {

            setTimeout(() => {
              location.reload();
              // this.userService._user$.next(this.user);
            }, 2000);
          });
        });
      });
    }
  }
}