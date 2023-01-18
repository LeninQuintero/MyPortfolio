import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience, ExperienceForm, ExperienceService } from 'src/app/services/experience.service';
import { UserService } from 'src/app/services/user.service';
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
    console.log("SUBMIT USER MODAL USER====>>>", this.id);
    if (this.addExperienceForm.valid) {    
      const newExperience = this.experienceService.expToDateJson(this.addExperienceForm.value);
      let list = this.experiences;

      this.experienceService.addExperience(newExperience, this.id).subscribe( experience => {
       list.push(experience);        
        this.experienceService.getNewExperiences$.next(list);
      });
             
      this.alertSubmit = true;

      setTimeout(() => this.closeAlertSubmit(), 5 * 1000);

      this.addExperienceForm.reset();
      
    } else {
      this.addExperienceForm.markAllAsTouched();
    } 
  }


}