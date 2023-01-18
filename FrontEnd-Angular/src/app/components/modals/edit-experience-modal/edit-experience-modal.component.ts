import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience, ExperienceForm, ExperienceService } from 'src/app/services/experience.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-experience-modal',
  templateUrl: './edit-experience-modal.component.html',
  styleUrls: ['./edit-experience-modal.component.scss']
})
export class EditExperienceModalComponent implements OnInit, OnDestroy{

  @Input()
  experience: Experience={
    companyName: '',
    urlCompanyLogo: '',
    currentJob: false,
    position: '',
    startDate: '',
    endDate: '',
    location: '',
    description: ''
  };

  @Input() idModal: string | undefined;

  @Input()
  expForm: ExperienceForm={
    id:0,
    position: '',
    companyName: '',
    urlCompanyLogo: '',
    currentJob: false,
    startMonthDate: 0,
    startYearDate: 0,
    endMonthDate: 0,
    endYearDate: 0,
    location: '',
    description: ''
  }
  
  editExpForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private expService: ExperienceService){
    console.log("EXPERIENCESFORM EN  EL CONSTRUCTOR===>>>", JSON.stringify(this.expForm));
    this.editExpForm = this.fb.group({
      id: [, [Validators.required]],
      position: [, [Validators.required]],
      companyName: [, [Validators.required]],
      urlCompanyLogo: [, [Validators.required]],
      currentJob: [, [Validators.required]],
      startMonthDate: [, [Validators.required]],
      startYearDate: [, [Validators.required]],
      endMonthDate: [, [Validators.required]],
      endYearDate: [, [Validators.required]],
      location: [, [Validators.required]],
      description: [, [Validators.required]]
    });
  }


  ngOnDestroy(): void {
  console.log("MODAL DESTROYYYY!!!!!")
  }

  ngOnInit(): void {  
   

    this.editExpForm.controls['id'].patchValue(this.expForm.id);
    this.editExpForm.controls['position'].patchValue(this.expForm.position);
    this.editExpForm.controls['companyName'].patchValue(this.expForm.companyName);
    this.editExpForm.controls['startMonthDate'].patchValue(this.expForm.startMonthDate);
    this.editExpForm.controls['startYearDate'].patchValue(this.expForm.startYearDate);
    this.editExpForm.controls['endMonthDate'].patchValue(this.expForm.endMonthDate);
    this.editExpForm.controls['endYearDate'].patchValue(this.expForm.endYearDate);
    this.editExpForm.controls['location'].patchValue(this.expForm.location);
    this.editExpForm.controls['description'].patchValue(this.expForm.description);
    this.editExpForm.controls['currentJob'].patchValue(this.expForm.currentJob);

 

  }

  submit(event: Event) {

    if (this.editExpForm.valid){
      this.expService.editExperience(this.expService.expToDateJson(this.editExpForm.value)).subscribe( experience => {

        });   
  }
}

}


