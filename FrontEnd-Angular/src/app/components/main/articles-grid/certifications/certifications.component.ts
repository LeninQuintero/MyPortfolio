import { Component, OnInit } from '@angular/core';
import { Certification, CertificationForm, CertificationService } from 'src/app/services/certification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent implements OnInit {

  private userId=0;
  public editIdModal: string="#editCertModal";
  public editTitleTriggerModal: string="Editar certificación";
  public editClassTriggerModal: string="d-inline-block";

  public addIdModal: string="#addCertModal";
  public addTitleTriggerModal: string="Agregar certificación";
  public addClassTriggerModal: string="";

  public idCertificateModal: string="#showCertModal";

  public certifications: Certification[] = [];
  public certificationsForm: CertificationForm[] = [];

  constructor(private certificationService: CertificationService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser.subscribe(user => {
      this.userId = user.id;
      this.certificationService.getCertification(this.userId).subscribe(certifications => { 
        this.certifications = certifications;
        this.certificationsForm = this.certificationService.getCertificationForm(certifications);
      });
    })

    this.certificationService.getNewCertification$.subscribe(() =>
    this.userService.getUser.subscribe(user => {
      this.userId = user.id;
      this.certificationService.getCertification(this.userId).subscribe(certifications => { 
        this.certifications = certifications;
        this.certificationsForm = this.certificationService.getCertificationForm(certifications);
      });
    })
    )

    this.userService.getUser$.subscribe(()=> {
      this.userService.getUser.subscribe(user => {
        this.userId = user.id;
        this.certificationService.getCertification(this.userId).subscribe(certifications => { 
          this.certifications = certifications;
          this.certificationsForm = this.certificationService.getCertificationForm(certifications);
        });
      })
    })

  }

  dateStringToString(dateString: string): string {
    let date = this.certificationService.stringToDate(dateString);
    let m = date.toLocaleString("es-ES", { month: "long" });
    let y = date.toLocaleString("es-ES", { year: "numeric" });
    let formatedDate = m[0].toUpperCase() + m.slice(1) + " " + y;
    return formatedDate;
  }

  certificationToJsonDate(certification: Certification): CertificationForm {
    let dateEnd = new Date(this.certificationService.stringToDate(certification.finishDate));
    let cert: CertificationForm = {
      id: 0,
      institute: '',
      title: '',
      urlInstituteLogo: '',
      endMonthDate: 0,
      endYearDate: 0,
      location: '',
      urlCertificateImg: '',
      urlCertificateValidation: '',
      validationCode: ''
    }
    cert.id = certification.id;
    cert.institute = certification.institute;
    cert.title = certification.title;
    cert.urlInstituteLogo = certification.urlInstituteLogo;
    cert.endMonthDate = dateEnd.getMonth();
    cert.endYearDate = dateEnd.getFullYear();
    cert.location = certification.location;
    cert.urlCertificateImg = certification.urlCertificateImg;
    cert.urlCertificateValidation = certification.urlCertificateValidation;
    cert.validationCode = certification.validationCode;
    return cert;
  }

}