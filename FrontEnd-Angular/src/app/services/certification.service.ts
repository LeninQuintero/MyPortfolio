import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { API_URL, DEFAULT_CERTIFICATION_IMG_URL, DEFAULT_CERTIFICATION_LOGO_URL } from 'src/environments/api-urls-config';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  private apiUrl = API_URL;
  private defaultLogo = DEFAULT_CERTIFICATION_LOGO_URL;
  private certificateImg = DEFAULT_CERTIFICATION_IMG_URL;
  private urlGetCertification = `${this.apiUrl}/certification-list/`;
  private urlAddCertification = `${this.apiUrl}/new-certification/`;

  private certifications = new Observable<Certification[]>;
  private _certifications$ = new Subject<Certification[]>();

  private certificationsForm: CertificationForm[] = [];
  private _certificationsForm$ = new Subject<Certification[]>();

  constructor(private http: HttpClient) { }

  stringToDate(dateString: string): Date {
    // replacing all '-' characters with ',' to format it
    let date = new Date(dateString.replace(/-/g, ','));
    return date;
  }

  certificationToJsonDate(certification: Certification): CertificationForm {
    let dateEnd = new Date(this.stringToDate(certification.finishDate));
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

  certificationToDateJson(certification: CertificationForm): Certification {
    let finishDate = new Date(certification.endYearDate, certification.endMonthDate, 1).toISOString();
    let cert: Certification = {
      id: 0,
      institute: '',
      title: '',
      urlInstituteLogo: '',
      finishDate: '',
      location: '',
      urlCertificateImg: '',
      urlCertificateValidation: '',
      validationCode: ''
    }
    cert.id = certification.id;
    cert.institute = certification.institute;
    cert.title = certification.title;
    cert.urlInstituteLogo = certification.urlInstituteLogo;
    cert.finishDate = finishDate;
    cert.location = certification.location;
    cert.urlCertificateImg = certification.urlCertificateImg;
    cert.urlCertificateValidation = certification.urlCertificateValidation;
    cert.validationCode = certification.validationCode;
    return cert;
  }


  getCertificationForm(certification: Certification[]): CertificationForm[] {
    certification.map((cert) =>
      this.certificationsForm.push(this.certificationToJsonDate(cert)));
    return this.certificationsForm;
  }

  get getCertificationDefaultLogo() {
    return this.defaultLogo
  }

  get getCertificationDefaultImg() {
    return this.certificateImg
  }

  getCertification(userId: number): Observable<Certification[]> {
    return this.http.get<Certification[]>(this.urlGetCertification + userId);
  }

  get getNewCertification$() {
    return this._certifications$
  }

  addCertification(certification: Certification, userId: number): Observable<Certification> {
    return this.http.post<Certification>(this.urlAddCertification + userId, certification, httpOptions);
  }

  deleteCertification(id: number | undefined) {
    const url = `${this.apiUrl}/delete-certification/${id}`;
    return this.http.delete<Certification>(url, httpOptions);
  }

  editCertification(certification: Certification): Observable<Certification> {
    return this.http.put<Certification>(`${this.apiUrl}/edit-certification`, certification, httpOptions);
  }

}

export interface Certification {
  id?: number;
  institute: string;
  title: string;
  urlInstituteLogo: string;
  finishDate: string;
  location: string;
  urlCertificateImg: string;
  urlCertificateValidation: string;
  validationCode: string;
}

export interface CertificationForm {
  id?: number;
  institute: string;
  title: string;
  urlInstituteLogo: string;
  endMonthDate: number;
  endYearDate: number;
  location: string;
  urlCertificateImg: string;
  urlCertificateValidation: string;
  validationCode: string;
}

export interface PartialCertificationForm extends Partial<CertificationForm> { }
export interface PartialCertification extends Partial<Certification> { }