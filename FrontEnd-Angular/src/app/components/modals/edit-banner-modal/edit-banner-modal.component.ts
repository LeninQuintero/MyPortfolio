import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { PartialUser, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-banner-modal',
  templateUrl: './edit-banner-modal.component.html',
  styleUrls: ['./edit-banner-modal.component.scss']
})
export class EditBannerModalComponent implements OnInit, OnDestroy {

  public bannerForm: FormGroup;
  private maxImageSize: number = 5242880;
  private user: PartialUser = {};
  private files: any = [];
  private minLengthPictureName: number = 1;
  private maxLengthPictureName: number = 50;
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

  captureBannerSm(event: any) {
    this.files[0] = "",
      this.bannerSm = event.target.files[0];
    this.bannerSmSize = this.bannerSm.size;

    if (this.bannerForm.get('bannerSm')?.valid) {

      if (this.bannerSmSize <= this.maxImageSize) {
        this.errorMaxSizeSm = false;

        this.urlBannerSm = this.uploadFilesService.uploadRef(this.bannerSm.name);

        this.user.urlBannerSm = this.urlBannerSm;

        this.files.forEach((file: string | Blob) => {
          this.bannerSmData.append('files', file)
        });

      }

      if (this.bannerSmSize >= this.maxImageSize) {
        this.errorMaxSizeSm = true;
      }
    }
    console.log("BANNER SM NAME ==>>", this.bannerSm.name);
    console.log("BANNER SM SIZE ==>>", this.bannerSm.size);
    console.log("BANNER SM ==>>", this.bannerSm)
  }

  captureBannerLg(event: any) {
    this.bannerLg = event.target.files[0];
    this.bannerLgSize = this.bannerLg.size;

    if (this.bannerForm.get('bannerLg')?.valid) {

      if (this.bannerLgSize <= this.maxImageSize) {
        this.errorMaxSizeLg = false;

        this.urlBannerLg = this.uploadFilesService.uploadRef(this.bannerLg.name);

        this.user.urlBannerLg = this.urlBannerLg;

        this.files.forEach((file: string | Blob) => {
          this.bannerLgData.append('files', file)
        });

      }

      if (this.bannerLgSize >= this.maxImageSize) {
        this.errorMaxSizeLg = true;
      }
    }
    console.log("BANNER LG NAME ==>>", this.bannerLg.name);
    console.log("BANNER LG SIZE ==>>", this.bannerLg.size);
    console.log("BANNER LG ==>>", this.bannerLg)
  }




  

}