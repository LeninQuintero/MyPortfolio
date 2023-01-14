import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Experience, ExperienceForm, ExperienceService } from 'src/app/services/experience.service';
import { PartialUserProfile, UserProfile, UserService } from 'src/app/services/profile.service';

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
  endDateYear: number | undefined;
  // exp: ExperienceForm | undefined;

  constructor(private userService: UserService, private fb: FormBuilder, private expService: ExperienceService){
    
    this.editExpForm = this.fb.group({
      position: [, []],
      companyName: [, []],
      urlCompanyLogo: [, []],
      currentJob: [, []],
      startMonthDate: [, []],
      startYearDate: [, []],
      endMonthDate: [, []],
      endYearDate: [, []],
      location: [, []],
      description: [, []]
    });

  }

  ngOnInit(): void {

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
}


