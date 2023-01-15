import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience, ExperienceForm, ExperienceService } from 'src/app/services/experience.service';
import { PartialUserProfile, UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-experience-modal',
  templateUrl: './edit-experience-modal.component.html',
  styleUrls: ['./edit-experience-modal.component.scss']
})
export class EditExperienceModalComponent implements OnInit{

  @Input()
  experience: ExperienceForm | undefined;
  @Input() idModal: string | undefined;
  userId: number | undefined;
  editExpForm: FormGroup;


  constructor(private userService: UserService, private fb: FormBuilder, private expService: ExperienceService){
    
    this.editExpForm = this.fb.group({
      id: [this.experience?.id, []],
      position: [this.experience?.position, []],
      companyName: [this.experience?.companyName, []],
      urlCompanyLogo: [this.experience?.urlCompanyLogo, []],
      currentJob: [this.experience?.currentJob, []],
      startMonthDate: [this.experience?.startMonthDate, []],
      startYearDate: [this.experience?.startYearDate, []],
      endMonthDate: [this.experience?.endMonthDate, []],
      endYearDate: [this.experience?.endYearDate, []],
      location: [this.experience?.location, []],
      description: [this.experience?.description, []]
    });

 

  }

  ngOnInit(): void {
    this.editExpForm.controls['id'].setValue(this.experience?.id);
    this.editExpForm.controls['position'].setValue(this.experience?.position);
    this.editExpForm.controls['position'].setValue(this.experience?.position);
    this.editExpForm.controls['companyName'].setValue(this.experience?.companyName);
    this.editExpForm.controls['urlCompanyLogo'].setValue(this.experience?.urlCompanyLogo);
    this.editExpForm.controls['startMonthDate'].setValue(this.experience?.startMonthDate);
    this.editExpForm.controls['startYearDate'].setValue(this.experience?.startYearDate);
    this.editExpForm.controls['endMonthDate'].setValue(this.experience?.endMonthDate);
    this.editExpForm.controls['endYearDate'].setValue(this.experience?.endYearDate);
    this.editExpForm.controls['location'].setValue(this.experience?.location);
    this.editExpForm.controls['description'].setValue(this.experience?.description);
    this.editExpForm.controls['currentJob'].setValue(this.experience?.currentJob);





    this.userService.getUser.subscribe(user => {   
      this.userId = user.id; 
    });

  }

  submit(event: Event) {

    if (this.editExpForm.valid){
      this.expService.editExperience(this.expService.expToDateJson(this.editExpForm.value)).subscribe( experience => 

        console.log("EXPERINCIA EDITADA=====>>>", experience)
        );   
  }};

}


