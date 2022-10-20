import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.scss']
})
export class AcercaDeComponent implements OnInit {
  editIdModal: string="#editSectiomAcercaDeModal";
  editTitleTriggerModal: string="Actualizar sección";
  editClassTriggerModal: string="d-inline-block";
  
  constructor() { }

  ngOnInit(): void {
  }

}
