import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acercade .component.html',
  styleUrls: ['./acercade .component.scss']
})
export class acercade Component implements OnInit {
  editIdModal: string="#editSectiomacercade Modal";
  editTitleTriggerModal: string="Actualizar sección";
  editClassTriggerModal: string="d-inline-block";
  
  constructor() { }

  ngOnInit(): void {
  }

}
