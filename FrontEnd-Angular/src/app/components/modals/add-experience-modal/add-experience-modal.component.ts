import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Experience, ExperienceService } from 'src/app/services/experience.service';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-experience-modal',
  templateUrl: './add-experience-modal.component.html',
  styleUrls: ['./add-experience-modal.component.scss']
})
export class AddExperienceModalComponent implements OnInit {
  public experiences: Experience[] = [];
  public id: number = 0;
  switchValue: boolean = false;
  addExperienceForm: FormGroup;
  alertSubmit: boolean;



  public minLengthPictureName: number = 1;
  public maxLengthPictureName: number = 50;
  public spinnerButton: boolean = false;
  public errorMaxSize: boolean = false;
  private directoryName: any;
  // private imgName = "";
  // private newImageName = "";
  private imgSize: number = 0;
  private maxImageSize: number = 5242880;
  private image: any;
  // private urlCompanyLogo: string = ""



  constructor(
    private experienceService: ExperienceService,
    private userService: UserService,
    private fb: FormBuilder,
    private upFileService: UploadFilesService,
    private route: ActivatedRoute) {
    this.directoryName = this.route.snapshot.paramMap.get('username');

    this.addExperienceForm = this.fb.group({
      position: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      urlCompanyLogo: ['', [Validators.required]],
      currentJob: [''],
      startMonthDate: ['', [Validators.required]],
      startYearDate: ['', [Validators.required]],
      endMonthDate: ['', [Validators.required]],
      endYearDate: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.alertSubmit = false;
  }

  ngOnInit(): void {
    this.userService.getUser.subscribe(user => {
      this.id = user.id;
      this.experienceService.getExperiences(user.id).subscribe(experiences => {
        this.experiences = experiences;
      });
    });

   
  }

  dateToString(date: Date): string {
    let month = date.toLocaleDateString("es-ES", { month: "long" });
    let formattedDate = month[1].toUpperCase() + month.slice(1) + " " + date.getFullYear();
    return formattedDate.toString();
  }

  get startDate(): Date {
    return new Date(this.addExperienceForm.get('startYearDate')?.value, this.addExperienceForm.get('startMonthDate')?.value);
  }

  isValidField(field: string) {
    const fieldName = this.addExperienceForm.get(field);
    return fieldName?.valid && (fieldName?.touched || fieldName?.dirty);
  }

  isInvalidField(field: string) {
    const fieldName = this.addExperienceForm.get(field);
    return fieldName?.invalid && (fieldName?.touched || fieldName?.dirty);
  }

  errorsFeedback(field: string, validator: string) {
    const fieldName = this.addExperienceForm.get(field);
    return fieldName?.hasError(validator);
  }

  requiredType(field: string, validator: string, type: string) {
    const fieldName = this.addExperienceForm.get(field);
    return fieldName?.errors?.[validator]?.[type];
  }

  closeAlertSubmit() {
    this.alertSubmit = false;
  }




  captureFile(event: any) {
    this.image = event.target.files[0];
    this.imgSize = this.image.size;
    if (this.addExperienceForm.valid) {
      if (this.imgSize <= this.maxImageSize) {
        this.errorMaxSize = false;
      }
      if (this.imgSize >= this.maxImageSize) {
        this.errorMaxSize = true;
      }
    }
  }

  submit(event: Event) {

    if (this.addExperienceForm.valid) {
      let list = this.experiences;
      let newExperience: Experience = this.experienceService.expToDateJson(this.addExperienceForm.value);

      this.upFileService.uploadFileFire(this.image, this.directoryName, `experience${list.length+1}_${this.image.name}`)

        .then(resp => {
 
          this.upFileService.getUrlUpFile(resp).then(url => {

            newExperience.urlCompanyLogo = url

          this.experienceService.addExperience(newExperience, this.id).subscribe(experience => {
            list.push(experience);
            this.experienceService.getNewExperiences$.next(list);
          });

          }
          ).catch(error => console.log(error))


        })
        .catch(error => console.log(error))


      this.alertSubmit = true;

      setTimeout(() => this.closeAlertSubmit(), 5 * 1000);

      this.addExperienceForm.reset();

    } else {
      this.addExperienceForm.markAllAsTouched();
    }
  }


}