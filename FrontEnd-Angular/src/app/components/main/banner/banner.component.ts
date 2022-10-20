import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  editIdModal: string="#editBannerModal";
  editTitleTriggerModal: string="Actualizar portada";
  editClassTriggerModal: string="edit-banner-pic text-end pb-4 mx-4 d-block";
  

  constructor() { }

  ngOnInit(): void {
  }

}