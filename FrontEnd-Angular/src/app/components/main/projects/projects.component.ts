import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  editIdModal: string="#editProjModal";
  editTitleTriggerModal: string="Editar proyecto";
  editClassTriggerModal: string="";

  addIdModal: string="#addProjModal";
  addTitleTriggerModal: string="Agregar proyecto";
  addClassTriggerModal: string="pt-md-2 px-md-4";

  constructor() { }

  ngOnInit(): void {
  }

}
