import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-acercade-modal',
  templateUrl: './edit-acercade-modal.component.html',
  styleUrls: ['./edit-acercade-modal.component.scss']
})
export class EditAcercadeModalComponent implements OnInit{

  aboutMeForm: FormGroup;

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

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.aboutMeForm = this.fb.group({
      aboutMe: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(600)]]
    });

 
  }
  ngOnInit(): void {
    this.userService.getUser.subscribe( user => {
      this.aboutMeForm.controls['aboutMe'].setValue(user.aboutMe);
      this.user = user;      
    }); 

    this.userService.getUser$.subscribe(()=> {
      this.userService.getUser.subscribe( user => {
        this.aboutMeForm.controls['aboutMe'].setValue(user.aboutMe);
        this.user = user;      
      });
    })


  }

  isValidField(field: string) {
    const fieldName = this.aboutMeForm.get(field);
    return fieldName?.valid && (fieldName?.touched || fieldName?.dirty);
  }

  isInvalidField(field: string) {
    const fieldName = this.aboutMeForm.get(field);
    return fieldName?.invalid && (fieldName?.touched || fieldName?.dirty);
  }

  errorsFeedback(field: string, validator: string) {
    const fieldName = this.aboutMeForm.get(field);
    return fieldName?.hasError(validator);
  }

  requiredType(field: string, validator: string, type: string) {
    const fieldName = this.aboutMeForm.get(field);
    return fieldName?.errors?.[validator]?.[type];
  }  

  submit(event: Event) {

    if (this.aboutMeForm.valid) {
      this.user.aboutMe = this.aboutMeForm.value.aboutMe;
      this.userService.editUser(this.user).subscribe( user => {
        this.userService.getUser$.next(user);
      })
    }
  }
}