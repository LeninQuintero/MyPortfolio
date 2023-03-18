import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Certification, CertificationForm, CertificationService } from 'src/app/services/certification.service';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-certification-modal',
  templateUrl: './edit-certification-modal.component.html',
  styleUrls: ['./edit-certification-modal.component.scss']
})
export class EditCertificationModalComponent implements OnInit {
  @Input()
  idModal: string | undefined;

  @Input()
  certForm: CertificationForm = {
    id: 0,
    institute: '',
    title: '',
    urlInstituteLogo: '',
    endMonthDate: 0,
    endYearDate: 0,
    location: '',
    urlCertificateImg: '',
    urlCertificateValidation: '',
    validationCode: ''
  }

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

  public editCertForm: FormGroup;
  public spinnerButton: boolean = false;
  public errorMaxSize: boolean = false;
  private directoryName: any;
  private maxImageSize: number = 5242880;
  private certifications: Certification[] = [];
  private alertSubmit: boolean;

  private certLogoFormat: string | undefined;
  private certLogoSize: number = 0;
  private certLogo: any;

  private certImgFormat: string | undefined;
  private certImgSize: number = 0;
  private certImg: any;


  constructor(private userService: UserService,
    private fb: FormBuilder,
    private certificationService: CertificationService,
    private upFilesService: UploadFilesService,
    private route: ActivatedRoute) {

    this.directoryName = this.route.snapshot.paramMap.get('username');

    this.editCertForm = this.fb.group({
      id: [, [Validators.required]],
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

    this.alertSubmit = false;
  }

  ngOnInit(): void {
    this.userService.getUser.subscribe(user => {
      this.user = user;
      this.certificationService.getCertification(user.id).subscribe(certifications => {
        this.certifications = certifications;
      });
    });

    this.editCertForm.controls['id'].setValue(this.certForm?.id);
    this.editCertForm.controls['institute'].setValue(this.certForm?.institute);
    this.editCertForm.controls['title'].setValue(this.certForm?.title);

    this.editCertForm.controls['endMonthDate'].setValue(this.certForm?.endMonthDate);
    this.editCertForm.controls['endYearDate'].setValue(this.certForm?.endYearDate);
    this.editCertForm.controls['location'].setValue(this.certForm?.location);

    this.editCertForm.controls['urlCertificateValidation'].setValue(this.certForm?.urlCertificateValidation);
    this.editCertForm.controls['validationCode'].setValue(this.certForm?.validationCode);
  }

  closeAlertSubmit() {
    this.alertSubmit = false;
  }

  captureCertlogo(event: any) {
    this.certLogo = event.target.files[0];
    this.certLogoSize = this.certLogo.size;
    this.certLogoFormat = this.upFilesService.getImageFormat(this.certLogo.name);

    if (this.editCertForm.valid) {

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
    this.certImgFormat = this.upFilesService.getImageFormat(this.certImg.name);

    if (this.editCertForm.valid) {

      if (this.certImgSize <= this.maxImageSize) {
        this.errorMaxSize = false;
      } else {
        this.errorMaxSize = true;
      }
    }
  }

  certDelete(event: Event) {
    this.certificationService.deleteCertification(this.certForm.id).subscribe(() => {
      let list = this.certifications;

      const fileName = this.upFilesService.getFileNameFromUrl(this.certForm.urlInstituteLogo);
      const fileExt = this.upFilesService.getFileExtFromUrl(fileName);
      const fileUrl = `certification-${this.certForm.id}-logo.${fileExt}`;
      if (this.certForm.urlInstituteLogo != this.certificationService.getCertificationDefaultLogo) {
        this.upFilesService.deleteFileFire(this.directoryName, fileUrl);
      }

      const fileCert = this.upFilesService.getFileNameFromUrl(this.certForm.urlCertificateImg);
      const fileExtCert = this.upFilesService.getFileExtFromUrl(fileCert);
      const fileUrlCert = `certificationImg-${this.certForm.id}.${fileExtCert}`;
      if (this.certForm.urlCertificateImg != this.certificationService.getCertificationDefaultImg) {
        this.upFilesService.deleteFileFire(this.directoryName, fileUrlCert);
      }

      list.filter(cert => { return cert.id !== this.certForm.id });
      this.certificationService.getNewCertification$.next(list);
    });
  }

  uploadLogo(newCertification: Certification, list: Certification[]) {
    this.upFilesService.uploadFileFire(this.certLogo, this.directoryName, `certification-${newCertification.id}-logo.${this.certLogoFormat}`)
      .then(resp => {
        this.upFilesService.getUrlUpFileFire(resp).then(url => {
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

    if (this.editCertForm.valid) {
      let list = this.certifications;
      let newCertification: Certification = this.certificationService.certificationToDateJson(this.editCertForm.value);
      let imgValid = this.editCertForm.get('urlCertificateImg')?.dirty;
      let logoValid = this.editCertForm.get('urlInstituteLogo')?.dirty;

      if (!logoValid) {
        newCertification.urlInstituteLogo = this.certForm.urlInstituteLogo;
      }

      if (!imgValid) {
        newCertification.urlCertificateImg = this.certForm.urlCertificateImg;
      }

      this.certificationService.addCertification(newCertification, this.user.id).subscribe(certification => {
        newCertification = certification;

        if (imgValid) {
          this.upFilesService.uploadFileFire(this.certImg, this.directoryName, `certificationImg-${certification.id}.${this.certImgFormat}`).then(resp => {
            this.upFilesService.getUrlUpFileFire(resp).then(url => {
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
      this.editCertForm.reset();
    } else {
      this.editCertForm.markAllAsTouched();
    }
  }
}