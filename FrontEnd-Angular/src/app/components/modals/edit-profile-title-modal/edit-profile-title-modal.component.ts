import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-title-modal',
  templateUrl: './edit-profile-title-modal.component.html',
  styleUrls: ['./edit-profile-title-modal.component.scss']
})

export class EditProfileTitleModalComponent implements OnInit {

  titleForm: FormGroup;




  constructor(private fb: FormBuilder, private userService: UserService) {
    

    this.titleForm = this.fb.group({
      name: ['', []],
      title: ['', []]
    });


  }

  ngOnInit(): void {

    

  }

  submit(event: Event) {

  }

}