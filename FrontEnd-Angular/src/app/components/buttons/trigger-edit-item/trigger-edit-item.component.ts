import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/services/experience.service';

@Component({
  selector: 'app-trigger-edit-item',
  templateUrl: './trigger-edit-item.component.html',
  styleUrls: ['./trigger-edit-item.component.scss']
})
export class TriggerEditItemComponent implements OnInit {
  @Input() editIdModal: string = "";
  @Input() editTitleTriggerModal: string = "";
  @Input() editClassTriggerModal: string = "";


  
  @Input() idExperience: number | undefined;

  public idModal: string | undefined;

  constructor() {}

  ngOnInit(): void {
    this.idModal = '#editExpeModal' + this.idExperience;
    console.log("ID MODAL EN TRIGGER====>>>", this.idModal);

  }

}