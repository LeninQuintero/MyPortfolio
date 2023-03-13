import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-banner-modal',
  templateUrl: './edit-banner-modal.component.html',
  styleUrls: ['./edit-banner-modal.component.scss']
})
export class EditBannerModalComponent implements OnInit, OnDestroy {
  private directoryName: any;
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
    urlLinkedin: '',
    urlProfile: '',
    id: 0
  };

  public minLengthPictureName: number = 1;
  public maxLengthPictureName: number = 50;
  private userSuscription = this.userService.getUser.subscribe(user => {
    this.user = user;
    this.actualBannerSmName = this.uploadFilesService.getUrlsName(user.urlBannerSm);
    this.actualBannerLgName = this.uploadFilesService.getUrlsName(user.urlBannerLg);
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

  private imgFormatSm: string | undefined;
  private imgFormatLg: string | undefined;

  constructor(private fb: FormBuilder, 
              private userService: UserService, 
              private uploadFilesService: UploadFilesService,
              private route: ActivatedRoute) {

    const imageValidator = /.(jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP)$/i;
    const minLengthValidator = 17 + this.minLengthPictureName;
    const maxLengthValidator = 17 + this.maxLengthPictureName;

    this.bannerForm = this.fb.group({
      bannerSm: ['', [Validators.required, Validators.minLength(minLengthValidator), Validators.maxLength(maxLengthValidator), Validators.pattern(imageValidator)]],
      bannerLg: ['', [Validators.required, Validators.minLength(minLengthValidator), Validators.maxLength(maxLengthValidator), Validators.pattern(imageValidator)]]
    });

    this.directoryName = this.route.snapshot.paramMap.get('username');
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
      this.bannerSm = event.target.files[0];
      this.bannerSmSize = this.bannerSm.size;
      this.imgFormatSm = this.uploadFilesService.getImageFormat(this.bannerSm.name);

      if (this.bannerForm.get('bannerSm')?.valid) {

        if (this.bannerSmSize <= this.maxImageSize) {
          this.errorMaxSizeSm = false;
        } else {
          this.errorMaxSizeSm = true;
        }
    }
  }

  captureBannerLg(event: any) {
    this.bannerLg = event.target.files[0];
    this.bannerLgSize = this.bannerLg.size;
    this.imgFormatLg = this.uploadFilesService.getImageFormat(this.bannerLg.name);

    if (this.bannerForm.get('bannerLg')?.valid) {

      if (this.bannerLgSize <= this.maxImageSize) {
        this.errorMaxSizeLg = false;
      } else {
        this.errorMaxSizeLg = true;
      }
  }
  }

  update() {
    let imgValidationSize: boolean = (this.bannerSmSize <= this.maxImageSize) &&
      (this.bannerSmSize <= this.maxImageSize);

    if (this.bannerForm.valid && imgValidationSize) {
      this.spinnerButton = true;

      this.uploadFilesService.uploadFileFire(this.bannerSm, this.directoryName, `bannerSm-${this.user.id}.${this.imgFormatSm}`)
      .then(resp => {
        this.uploadFilesService.getUrlUpFileFire(resp).then(url => {
          this.user.urlBannerSm = url;
          this.userService.editUser(this.user).subscribe(user => {
            this.userService.getUser$.next(user);
            this.spinnerButton = false;
          })
        })
        .catch(error => console.log(error))
      })
      .catch(error => console.log(error))

////////////////////////////////////

this.uploadFilesService.uploadFileFire(this.bannerLg, this.directoryName, `bannerLg-${this.user.id}.${this.imgFormatLg}`)
.then(resp => {
  this.uploadFilesService.getUrlUpFileFire(resp).then(url => {
    this.user.urlBannerLg = url;
    this.userService.editUser(this.user).subscribe(user => {
      this.userService.getUser$.next(user);
      this.spinnerButton = false;
    })
  })
  .catch(error => console.log(error))
})
.catch(error => console.log(error))

    }
    this.bannerForm.reset();
  }
}