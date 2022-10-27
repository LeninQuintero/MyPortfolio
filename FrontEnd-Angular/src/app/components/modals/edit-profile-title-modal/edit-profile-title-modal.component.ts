import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PartialUser, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-title-modal',
  templateUrl: './edit-profile-title-modal.component.html',
  styleUrls: ['./edit-profile-title-modal.component.scss']
})


export class EditProfileTitleModalComponent implements OnInit {

  userId = 1;
  titleForm: FormGroup;
  
  constructor(private fb: FormBuilder, private userService: UserService) {    
    
    const getUser = this.userService.getUser(this.userId);

    getUser.subscribe(user => this.titleForm.controls['name'].setValue(user.name));
    getUser.subscribe(user => this.titleForm.controls['title'].setValue(user.title));

    this.titleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      title: ['', [Validators.maxLength(40)]]
    });

  }

  ngOnInit(): void {}

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

    const body: PartialUser = this.titleForm.value;
    this.userService.editUser(this.userId, body).subscribe();

    location.reload();
        
  }};
}