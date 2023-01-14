import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience, ExperienceForm, ExperienceService } from 'src/app/services/experience.service';
import { UserService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-add-experience-modal',
  templateUrl: './add-experience-modal.component.html',
  styleUrls: ['./add-experience-modal.component.scss']
})
export class AddExperienceModalComponent implements OnInit {
  public experiences: Experience[] = [];
  public id: number=0;
  switchValue: boolean = false;
  addExperienceForm: FormGroup;
  alertSubmit: boolean;


  constructor(private experienceService: ExperienceService, private userService: UserService, private fb: FormBuilder) {
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
    this.alertSubmit= false;
   }

   ngOnInit(): void {
    this.userService.getUser.subscribe(user => {
      this.id = user.id;
      this.experienceService.getExperiences(user.id).subscribe(experiences => {
        this.experiences = experiences;
      });
    });
  }

// expToDateJson(experienceForm: ExperienceForm): Experience{
// let exp: Experience= {
//   companyName: '',
//   urlCompanyLogo: '',
//   currentJob: false,
//   position: '',
//   startDate: '',
//   endDate: '',
//   location: '',
//   description: ''
// }
// exp.companyName=experienceForm.companyName;
// exp.currentJob=experienceForm.currentJob;
// exp.description=experienceForm.description;
// exp.location=experienceForm.location;
// exp.position=experienceForm.position;
// exp.urlCompanyLogo=experienceForm.urlCompanyLogo;
// let dateStart = new Date(experienceForm.startYearDate, experienceForm.startMonthDate+1, 1).toISOString().slice(0,10);
// exp.startDate=dateStart;
// let dateEnd = new Date(experienceForm.endYearDate, experienceForm.endMonthDate+1, 1).toISOString().slice(0,10);
// exp.endDate= dateEnd;
//   return exp;
// }

expToDateJson(experienceForm: ExperienceForm): Experience {
  let exp: Experience= {
    companyName: '',
    urlCompanyLogo: '',
    currentJob: false,
    position: '',
    startDate: '',
    endDate: '',
    location: '',
    description: ''
  }
  exp.companyName=experienceForm.companyName;
  exp.currentJob=experienceForm.currentJob;
  exp.description=experienceForm.description;
  exp.location=experienceForm.location;
  exp.position=experienceForm.position;
  exp.urlCompanyLogo=experienceForm.urlCompanyLogo;
  let dateStart = new Date(experienceForm.startYearDate, experienceForm.startMonthDate, 1).toISOString();
  exp.startDate=dateStart;
  let dateEnd = new Date(experienceForm.endYearDate, experienceForm.endMonthDate, 1).toISOString();
  exp.endDate= dateEnd;
    return  exp;
  }

dateToString(date: Date):string{
  let month = date.toLocaleDateString("es-ES", { month: "long"});
  let formattedDate = month[1].toUpperCase()+month.slice(1) + " " + date.getFullYear();
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


  submit(event: Event) {

    if (this.addExperienceForm.valid) {    
      const newExperience = this.expToDateJson(this.addExperienceForm.value);
      let list = this.experienceService.experiences;

      this.experienceService.addExperience(newExperience, this.id).subscribe( experience => {
       list.push(experience);        
        this.experienceService._experiences$.next(list);    
      });
             
      this.alertSubmit = true;

      setTimeout(() => this.closeAlertSubmit(), 5 * 1000);

      this.addExperienceForm.reset();
      
    } else {
      this.addExperienceForm.markAllAsTouched();
    } 
  }


}
