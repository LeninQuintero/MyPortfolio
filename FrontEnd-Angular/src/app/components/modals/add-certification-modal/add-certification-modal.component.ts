import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Certification, CertificationService } from 'src/app/services/certification.service';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-certification-modal',
  templateUrl: './add-certification-modal.component.html',
  styleUrls: ['./add-certification-modal.component.scss']
})
export class AddCertificationModalComponent implements OnInit {

  alertSubmit: boolean = false;
  public certifications: Certification[] = [];
  public user: UserProfile = {
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

  public id: number = 0;
  public minLengthPictureName: number = 1;
  public maxLengthPictureName: number = 50;
  public spinnerButton: boolean = false;
  public errorMaxSize: boolean = false;
  private directoryName: any;
  private maxImageSize: number = 5242880;

  private certLogoFormat: string | undefined;
  private certLogoSize: number = 0;
  private certLogo: any;

  private certImgFormat: string | undefined;
  private certImgSize: number = 0;
  private certImg: any;

  public addCertificationForm: FormGroup;

  constructor(
    private certificationService: CertificationService,
    private userService: UserService,
    private fb: FormBuilder,
    private upFileService: UploadFilesService,
    private route: ActivatedRoute) {

    this.directoryName = this.route.snapshot.paramMap.get('username');

    this.addCertificationForm = this.fb.group({
      institute: ['', [Validators.required]],
      title: ['', [Validators.required]],
      urlInstituteLogo: [,],
      endMonthDate: ['', [Validators.required]],
      endYearDate: ['', [Validators.required]],
      location: ['', [Validators.required]],
      urlCertificateImg: [,],
      urlCertificateValidation: [, [Validators.required]],
      validationCode: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userService.getUser.subscribe(user => {
      this.id = user.id;
      this.user = user;
      this.certificationService.getCertification(user.id).subscribe(certifications => {
        this.certifications = certifications;
      });
    });

    this.userService.getUser$.subscribe(() => {
      this.userService.getUser.subscribe(user => {
        this.id = user.id;
        this.user = user;
        this.certificationService.getCertification(user.id).subscribe(certifications => {
          this.certifications = certifications;
        });
      });
    })
  }

  dateToString(date: Date): string {
    let month = date.toLocaleDateString("es-ES", { month: "long" });
    let formattedDate = month[1].toUpperCase() + month.slice(1) + " " + date.getFullYear();
    return formattedDate.toString();
  }

  get endDate(): Date {
    return new Date(this.addCertificationForm.get('endYearDate')?.value, this.addCertificationForm.get('endMonthDate')?.value);
  }

  isValidField(field: string) {
    const fieldName = this.addCertificationForm.get(field);
    return fieldName?.valid && (fieldName?.touched || fieldName?.dirty);
  }

  isInvalidField(field: string) {
    const fieldName = this.addCertificationForm.get(field);
    return fieldName?.invalid && (fieldName?.touched || fieldName?.dirty);
  }

  errorsFeedback(field: string, validator: string) {
    const fieldName = this.addCertificationForm.get(field);
    return fieldName?.hasError(validator);
  }

  requiredType(field: string, validator: string, type: string) {
    const fieldName = this.addCertificationForm.get(field);
    return fieldName?.errors?.[validator]?.[type];
  }

  closeAlertSubmit() {
    this.alertSubmit = false;
  }

  captureCertlogo(event: any) {
    this.certLogo = event.target.files[0];
    this.certLogoSize = this.certLogo.size;
    this.certLogoFormat = this.upFileService.getImageFormat(this.certLogo.name);

    if (this.addCertificationForm.valid) {

      if (this.certLogoSize <= this.maxImageSize) {
        this.errorMaxSize = false;
      } else {
        this.errorMaxSize = true;
      }
    }
  }

  captureCertImg(event: any) {
    this.certImg = event.target.files[0];
    this.certImgSize = this.certImg.size;
    this.certImgFormat = this.upFileService.getImageFormat(this.certImg.name);

    if (this.addCertificationForm.valid) {

      if (this.certImgSize <= this.maxImageSize) {
        this.errorMaxSize = false;
      } else {
        this.errorMaxSize = true;
      }
    }
  }

  uploadLogo(newCertification: Certification, list: Certification[]) {
    this.upFileService.uploadFileFire(this.certLogo, this.directoryName, `certification-${newCertification.id}-logo.${this.certLogoFormat}`)
      .then(resp => {
        this.upFileService.getUrlUpFileFire(resp).then(url => {
          newCertification.urlInstituteLogo = url;
          this.saveCertification(newCertification, list);
        });
      }).catch(error => console.log(error));
  }

  saveCertification(newCertification: Certification, list: Certification[]) {
    this.certificationService.editCertification(newCertification).subscribe(certification => {
      list.push(certification);
      this.certificationService.getNewCertification$.next(list);
      this.userService.getUser$.next(this.user);
    });
  }

  submit(event: Event) {
    if (this.addCertificationForm.valid) {
      let list = this.certifications;
      let newCertification: Certification = this.certificationService.certificationToDateJson(this.addCertificationForm.value);
      let imgValid = this.addCertificationForm.get('urlCertificateImg')?.dirty;
      let logoValid = this.addCertificationForm.get('urlInstituteLogo')?.dirty;

      if (!logoValid) {
        newCertification.urlInstituteLogo = this.certificationService.getCertificationDefaultLogo;
      }

      if (!imgValid) {
        newCertification.urlCertificateImg = this.certificationService.getCertificationDefaultImg;
      }

      this.certificationService.addCertification(newCertification, this.user.id).subscribe(certification => {
        newCertification = certification;

        if (imgValid) {
          this.upFileService.uploadFileFire(this.certImg, this.directoryName, `certificationImg-${certification.id}.${this.certImgFormat}`).then(resp => {
            this.upFileService.getUrlUpFileFire(resp).then(url => {
              newCertification.urlCertificateImg = url;

              if (!logoValid) {
                this.saveCertification(newCertification, list);
              } else {
                this.uploadLogo(newCertification, list);
              }
            });
          }).catch(error => console.log(error));
        } else if (logoValid) {
          this.uploadLogo(newCertification, list);
        } else {
          this.saveCertification(newCertification, list);
        }
      });

      this.alertSubmit = true;
      setTimeout(() => this.closeAlertSubmit(), 5 * 1000);
      this.addCertificationForm.reset();
    } else {
      this.addCertificationForm.markAllAsTouched();
    }
  }

}