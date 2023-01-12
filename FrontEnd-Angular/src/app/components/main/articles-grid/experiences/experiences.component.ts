import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent {
  editIdModal: string="#editExperienceModal";
  editTitleTriggerModal: string="Editar experiencia";
  editClassTriggerModal: string="d-inline-block";

  addIdModal: string="#addExperienceModal";
  addTitleTriggerModal: string="Agregar experiencia";
  addClassTriggerModal: string="";

  constructor() { }


}
