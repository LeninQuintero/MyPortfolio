import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-banner-modal',
  templateUrl: './edit-banner-modal.component.html',
  styleUrls: ['./edit-banner-modal.component.scss']
})
export class EditBannerModalComponent implements OnInit, OnDestroy {

  public bannerForm: FormGroup;
  public spinnerButton: boolean = false;
  private maxImageSize: number = 5242880;
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

  public minLengthPictureName: number = 1;
  public maxLengthPictureName: number = 50;
  private userSuscription = this.userService.getUser().subscribe(user => {
    this.user = user;
    this.actualBannerSmName = this.uploadFilesService.getUrlsFilename(user.urlBannerSm);
    this.actualBannerLgName = this.uploadFilesService.getUrlsFilename(user.urlBannerLg);
  });

  private actualBannerSmName: string = "";
  private actualBannerLgName: string = "";

  public errorMaxSizeSm: boolean = false;
  public errorMaxSizeLg: boolean = false;

  private bannerSm: any;
  private bannerLg: any;

  private bannerSmSize: number = 0;
  private bannerLgSize: number = 0;

  private bannerSmData = new FormData();
  private bannerLgData = new FormData();

  private urlBannerSm: string = "";
  private urlBannerLg: string = "";

  constructor(private fb: FormBuilder, private userService: UserService, private uploadFilesService: UploadFilesService) {

    const imageValidator = /.(jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP)$/i;
    const minLengthValidator = 17 + this.minLengthPictureName;
    const maxLengthValidator = 17 + this.maxLengthPictureName;

    this.bannerForm = this.fb.group({
      bannerSm: ['', [Validators.required, Validators.minLength(minLengthValidator), Validators.maxLength(maxLengthValidator), Validators.pattern(imageValidator)]],
      bannerLg: ['', [Validators.required, Validators.minLength(minLengthValidator), Validators.maxLength(maxLengthValidator), Validators.pattern(imageValidator)]]
    });
  }

  ngOnDestroy(): void {
    if (this.userSuscription) {
      this.userSuscription.unsubscribe;
    }
  }

  ngOnInit(): void {
    this.userSuscription;
  }

  isValidField(field: string) {
    const fieldName = this.bannerForm.get(field);
    return fieldName?.valid && (fieldName?.touched || fieldName?.dirty);
  }

  isInvalidField(field: string) {
    const fieldName = this.bannerForm.get(field);
    return fieldName?.invalid && (fieldName?.touched || fieldName?.dirty);
  }

  errorsFeedback(field: string, validator: string) {
    const fieldName = this.bannerForm.get(field);
    return fieldName?.hasError(validator);
  }

  captureBannerSm(event: any) {

    if (this.bannerForm.get('bannerSm')?.valid) {

      this.bannerSm = event.target.files[0];
      this.bannerSmSize = this.bannerSm.size;

      if (this.bannerSmSize <= this.maxImageSize) {

        this.urlBannerSm = this.uploadFilesService.uploadRef(this.bannerSm.name);
        this.user.urlBannerSm = this.urlBannerSm;
        this.errorMaxSizeSm = false;
      }

      if (this.bannerSmSize >= this.maxImageSize) {
        this.errorMaxSizeSm = true;
      }
    }
  }

  captureBannerLg(event: any) {

    if (this.bannerForm.get('bannerLg')?.valid) {

      this.bannerLg = event.target.files[0];
      this.bannerLgSize = this.bannerLg.size;

      if (this.bannerLgSize <= this.maxImageSize) {

        this.urlBannerLg = this.uploadFilesService.uploadRef(this.bannerLg.name);
        this.user.urlBannerLg = this.urlBannerLg;
        this.errorMaxSizeLg = false;

      }

      if (this.bannerLgSize >= this.maxImageSize) {
        this.errorMaxSizeLg = true;
      }
    }
  }

  update() {
    let imgValidationSize: boolean = (this.bannerSmSize <= this.maxImageSize) &&
      (this.bannerSmSize <= this.maxImageSize);

    if (this.bannerForm.valid && imgValidationSize) {

      this.spinnerButton = true;

      this.bannerSmData.append("files", this.bannerSm);
      this.bannerLgData.append("files", this.bannerLg);

      this.uploadFilesService.deleteFile(this.actualBannerSmName).subscribe(() => { });
      this.uploadFilesService.deleteFile(this.actualBannerLgName).subscribe(() => { });

      this.uploadFilesService.uploadFile(this.bannerSmData).subscribe(() => { });
      this.uploadFilesService.uploadFile(this.bannerLgData).subscribe(() => { });

      this.userService.editUser(this.user).subscribe(() => {
        setTimeout(() => {
          location.reload();
        }, 1500);
      });
    }
  }
}