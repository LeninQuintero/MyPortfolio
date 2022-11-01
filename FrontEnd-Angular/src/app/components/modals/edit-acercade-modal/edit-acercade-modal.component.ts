import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-acercade-modal',
  templateUrl: './edit-acercade-modal.component.html',
  styleUrls: ['./edit-acercade-modal.component.scss']
})
export class EditAcercadeModalComponent implements OnInit {

  aboutMeForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {

    this.aboutMeForm = this.fb.group({
      aboutMe: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(400)]]
    });

    this.userService.user.subscribe( user =>
      this.aboutMeForm.controls['aboutMe'].setValue(user.aboutMe));
      
  }

  ngOnInit(): void { }

  submit(event: Event) {

    if (this.aboutMeForm.valid) {

      this.userService.editUser(this.aboutMeForm.value).subscribe( user =>
        this.userService._user$.next(user));
    }
  }
}