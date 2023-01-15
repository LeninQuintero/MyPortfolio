import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-title-modal',
  templateUrl: './edit-profile-title-modal.component.html',
  styleUrls: ['./edit-profile-title-modal.component.scss']
})

export class EditProfileTitleModalComponent implements OnInit{

  titleForm: FormGroup;

  private user: UserProfile= {
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
    this.titleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      title: ['', [Validators.maxLength(40)]]
    });

  }
  ngOnInit(): void {
    this.userService.getUser.subscribe(user => {   
      this.user = user;  
      this.titleForm.controls['name'].setValue(user.name);
      this.titleForm.controls['title'].setValue(user.title);
    });
  }

  isValidField(field: string) {
    const fieldName = this.titleForm.get(field);
    return fieldName?.valid && (fieldName?.touched || fieldName?.dirty);
  }

  isInvalidField(field: string) {
    const fieldName = this.titleForm.get(field);
    return fieldName?.invalid && (fieldName?.touched || fieldName?.dirty);
  }

  errorsFeedback(field: string, validator: string) {
    const fieldName = this.titleForm.get(field);
    return fieldName?.hasError(validator);
  }

  submit(event: Event) {

    if (this.titleForm.valid){
      this.user.name = this.titleForm.value.name;
      this.user.title = this.titleForm.value.title;
      this.userService.editUser(this.user).subscribe( user => 
        this.userService.getUser$.next(user));            
  }};
}