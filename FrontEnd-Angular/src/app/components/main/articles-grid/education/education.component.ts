import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  private userId=0;
  public editIdModal: string="#editEducationModal";
  public editTitleTriggerModal: string="Editar educación";
  public editClassTriggerModal: string="d-inline-block";

  public addIdModal: string="#addEducModal";
  public addTitleTriggerModal: string="Agregar Educación";
  public addClassTriggerModal: string="";

  constructor() { }

  ngOnInit(): void {
  }

}
