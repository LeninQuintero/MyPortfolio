import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  editIdModal: string="#editSkillModal";
  editTitleTriggerModal: string="Editar skill";
  editClassTriggerModal: string="d-inline-block mt-1";

  addIdModal: string="#addSkillModal";
  addTitleTriggerModal: string="Agregar skill";
  addClassTriggerModal: string="pt-md-2 px-md-4";

  constructor() { }

  ngOnInit(): void {
  }

}
