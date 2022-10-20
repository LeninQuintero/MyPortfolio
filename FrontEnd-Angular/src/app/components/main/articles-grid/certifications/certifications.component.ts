import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent implements OnInit {
  editIdModal: string="#editCertModal";
  editTitleTriggerModal: string="Editar certificación";
  editClassTriggerModal: string="d-inline-block";

  addIdModal: string="#addCertModal";
  addTitleTriggerModal: string="Agregar certificación";
  addClassTriggerModal: string="";

  idCertificateModal: string="#showCertModal";

  constructor() { }

  ngOnInit(): void {
  }

}