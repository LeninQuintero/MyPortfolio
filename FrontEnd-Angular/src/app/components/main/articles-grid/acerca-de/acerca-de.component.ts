import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.scss']
})

export class AcercaDeComponent implements OnInit {

  aboutMe: string = "";

  // Btn-edit values
  editIdModal: string = "#editSectiomAcercaDeModal";
  editTitleTriggerModal: string = "Actualizar sección";
  editClassTriggerModal: string = "d-inline-block";

  
  refreshText() {
    this.userService.getUser.subscribe(user =>
      this.aboutMe = user.aboutMe);
  }

  constructor(private userService: UserService) {
    this.refreshText();
  }

  ngOnInit(): void {
    this.userService.getUser$.subscribe(() =>
      this.refreshText()
    );
  }
}