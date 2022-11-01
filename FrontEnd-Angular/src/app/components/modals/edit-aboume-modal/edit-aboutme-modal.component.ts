import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-acercade -modal',
  templateUrl: './edit-acercade -modal.component.html',
  styleUrls: ['./edit-acercade -modal.component.scss']
})


export class Editacercade ModalComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
