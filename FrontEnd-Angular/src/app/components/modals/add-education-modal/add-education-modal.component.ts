import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/profile.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-education-modal',
  templateUrl: './add-education-modal.component.html',
  styleUrls: ['./add-education-modal.component.scss']
})
export class AddEducationModalComponent implements OnInit {
  addEducation = FormGroup;

  constructor(private fb: FormBuilder) {
 
   }

  ngOnInit(): void {
  }

}
