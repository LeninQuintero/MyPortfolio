import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-picture-modal',
  templateUrl: './edit-profile-picture-modal.component.html',
  styleUrls: ['./edit-profile-picture-modal.component.scss']
})

export class EditProfilePictureModalComponent implements OnInit, OnDestroy {
  public editForm: FormGroup;
  public minLengthPictureName: number = 1;
  public maxLengthPictureName: number = 50;
  public spinnerButton: boolean = false;
  public errorMaxSize: boolean = false;
  private urlImgName: string = "";
  private actualImgName: string = "";
  private imgSize: number = 0;
  private maxImageSize: number = 5242880;
  private image: any;
  private formDataImage = new FormData();

  private userSuscription = this.userService.getUser().subscribe(user => {
    this.user = user;
    this.actualImgName = this.uploadFilesService.getUrlsFilename(user.urlProfilePic);
  });
  
  private user: UserProfile = {
    name: '',
    title: '',
    urlProfilePic: '',
    urlBannerSm: '',
    urlBannerLg: '',
    aboutMe: '',
    urlGithub: '',
    urlTwitter: '',
    urlLinkedin: ''
  };

  constructor(private fb: FormBuilder, private userService: UserService, private uploadFilesService: UploadFilesService) {

    const imageValidator = /.(jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP)$/i;
    const minLengthValidator = 17 + this.minLengthPictureName;
    const maxLengthValidator = 17 + this.maxLengthPictureName;

    this.editForm = this.fb.group({

      image: ['', [Validators.required,
      Validators.minLength(minLengthValidator),
      Validators.maxLength(maxLengthValidator),
      Validators.pattern(imageValidator)
      ]]
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

  captureFile(event: any) {
    this.image = event.target.files[0];
    this.imgSize = this.image.size;

    if (this.editForm.valid) {
            
      if (this.imgSize <= this.maxImageSize){
        this.errorMaxSize= false;
      
      this.urlImgName = this.uploadFilesService.uploadRef(this.image.name);
      this.user.urlProfilePic = this.urlImgName;
      }

      if (this.imgSize >= this.maxImageSize){
        this.errorMaxSize= true;
      }
    } 
  }

  update() {

    if (this.editForm.valid && (this.imgSize <= this.maxImageSize)) {
      this.spinnerButton = true;

      this.formDataImage.append('files', this.image);

      this.uploadFilesService.deleteFile(this.actualImgName).subscribe(() => {

        this.uploadFilesService.uploadFile(this.formDataImage).subscribe(() => {
          this.userService.editUser(this.user).subscribe(() => {

            setTimeout(() => {
              location.reload();
              // this.userService._user$.next(this.user);
            }, 1500);
          });
        });
      });

    } 
  }
}