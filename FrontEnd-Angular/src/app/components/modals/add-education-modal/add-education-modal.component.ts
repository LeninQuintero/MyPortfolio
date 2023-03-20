import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EducationService, Education } from 'src/app/services/education.service';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-education-modal',
  templateUrl: './add-education-modal.component.html',
  styleUrls: ['./add-education-modal.component.scss']
})
export class AddEducationModalComponent implements OnInit {

  alertSubmit: boolean = false;
  public educations: Education[] = [];
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
  private switchValue: boolean = false;
  private imgFormat: string | undefined;

  public minLengthPictureName: number = 1;
  public maxLengthPictureName: number = 50;
  public spinnerButton: boolean = false;
  public errorMaxSize: boolean = false;
  private directoryName: any;

  private imgSize: number = 0;
  private maxImageSize: number = 5242880;
  private image: any;

  addEducationForm: FormGroup;

  constructor(
    private educationService: EducationService,
    private userService: UserService,
    private fb: FormBuilder,
    private upFileService: UploadFilesService,
    private route: ActivatedRoute) {
    this.directoryName = this.route.snapshot.paramMap.get('username')?.toLowerCase();

    this.addEducationForm = this.fb.group({

      institute: ['', [Validators.required]],
      title: ['', [Validators.required]],
      urlInstituteLogo: [,],
      currentStudy: [false,],
      location: ['', [Validators.required]],
      endMonthDate: ['', [Validators.required]],
      endYearDate: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.userService.getUser.subscribe(user => {
      this.id = user.id;
      this.user = user;
      this.educationService.getEducation(user.id).subscribe(educations => {
        this.educations = educations;
      });
    });

    this.addEducationForm.get('currentStudy')?.valueChanges.subscribe(val => {
      this.switchValue = val;

      if (val) {
        this.addEducationForm.controls['endYearDate'].setValue(2023);
        this.addEducationForm.controls['endMonthDate'].setValue(0);
      }
    });

    this.userService.getUser$.subscribe(() => {
      this.userService.getUser.subscribe(user => {
        this.id = user.id;
        this.user = user;
        this.educationService.getEducation(user.id).subscribe(educations => {
          this.educations = educations;
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
    return new Date(this.addEducationForm.get('endYearDate')?.value, this.addEducationForm.get('endMonthDate')?.value);
  }
  get getCurrentStudy(): boolean {
    return this.switchValue
  }

  isValidField(field: string) {
    const fieldName = this.addEducationForm.get(field);
    return fieldName?.valid && (fieldName?.touched || fieldName?.dirty);
  }

  isInvalidField(field: string) {
    const fieldName = this.addEducationForm.get(field);
    return fieldName?.invalid && (fieldName?.touched || fieldName?.dirty);
  }

  errorsFeedback(field: string, validator: string) {
    const fieldName = this.addEducationForm.get(field);
    return fieldName?.hasError(validator);
  }

  requiredType(field: string, validator: string, type: string) {
    const fieldName = this.addEducationForm.get(field);
    return fieldName?.errors?.[validator]?.[type];
  }

  closeAlertSubmit() {
    this.alertSubmit = false;
  }

  captureFile(event: any) {
    this.image = event.target.files[0];
    this.imgSize = this.image.size;
    this.imgFormat = this.upFileService.getImageFormat(this.image.name);

    if (this.addEducationForm.valid) {

      if (this.imgSize <= this.maxImageSize) {
        this.errorMaxSize = false;
      } else {
        this.errorMaxSize = true;
      }
    }
  }

  submit(event: Event) {

    if (this.addEducationForm.valid) {
      let list = this.educations;
      let newEducation: Education = this.educationService.educationToDateJson(this.addEducationForm.value);
      let logoValid = this.addEducationForm.get('urlInstituteLogo')?.dirty;

      newEducation.urlInstituteLogo = this.educationService.getEducationDefaultLogo;

      this.educationService.addEducation(newEducation, this.user.id).subscribe( education => {
        newEducation = education;

        if (logoValid) {
          this.upFileService.uploadFileFire(this.image, this.directoryName, `education-${education.id}-logo.${this.imgFormat}`)
            .then(resp => {
              this.upFileService.getUrlUpFileFire(resp).then(url => {
                newEducation.urlInstituteLogo = url;
                this.educationService.editEducation(newEducation).subscribe(education => {
                  list.push(education);
                  this.educationService.getNewEducation$.next(list);
                  this.userService.getUser$.next(this.user);
                })
              })
                .catch(error => {
                  console.log(error);
                })
            })
            .catch(error => {
              console.log(error);
            })

        } else {
          list.push(education);
          this.educationService.getNewEducation$.next(list);
          this.userService.getUser$.next(this.user);
        }
      });

      this.alertSubmit = true;
      setTimeout(() => this.closeAlertSubmit(), 5 * 1000);
      this.addEducationForm.reset();

    } else {
      this.addEducationForm.markAllAsTouched();
    }
    this.addEducationForm.controls['currentStudy'].setValue(false);
  }
}
