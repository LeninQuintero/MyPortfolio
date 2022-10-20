import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  editIdModal: string="#editEducationModal";
  editTitleTriggerModal: string="Editar educación";
  editClassTriggerModal: string="d-inline-block";

  addIdModal: string="#addEducModal";
  addTitleTriggerModal: string="Agregar Educación";
  addClassTriggerModal: string="";

  constructor() { }

  ngOnInit(): void {
  }

}
