import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trigger-show-certificate',
  templateUrl: './trigger-show-certificate.component.html',
  styleUrls: ['./trigger-show-certificate.component.scss']
})
export class TriggerShowCertificateComponent implements OnInit {

  @Input() idCertificateModal: string="";


  constructor() { }

  ngOnInit(): void {
  }

}
