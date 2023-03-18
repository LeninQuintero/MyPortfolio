import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-certificate-modal',
  templateUrl: './show-certificate-modal.component.html',
  styleUrls: ['./show-certificate-modal.component.scss']
})
export class ShowCertificateModalComponent  {
@Input()
idModal: string | undefined;

@Input()
urlCertificateImg: string | undefined;

@Input()
urlCertificateValidation: string | undefined;

@Input()
validationCode: string | undefined;

}