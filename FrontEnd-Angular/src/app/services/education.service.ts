import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_URL, DEFAULT_EDUCATION_LOGO_URL } from 'src/environments/api-urls-config';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private apiUrl = API_URL;
  private defaultLogo = DEFAULT_EDUCATION_LOGO_URL;
  private urlGetEducation =`${this.apiUrl}/education-list/`;
  private urlAddEducation = `${this.apiUrl}/new-education/`;
  
  private educations = new Observable<Education[]>;
  private _educations$ = new Subject<Education[]>();

  private educationsForm: EducationForm[]=[];
  private _educationsForm$ = new Subject<Education[]>();


  constructor(private http: HttpClient) { }

  stringToDate(dateString: string): Date {
    // replacing all '-' characters with ',' to format it
    let date = new Date(dateString.replace(/-/g, ','));
    return date;
  }

  educationToJsonDate(education: Education): EducationForm {
    let dateEnd = new Date(this.stringToDate(education.finishDate));
    let educ: EducationForm= {
      id: 0,
      institute: '',
      title: '',
      urlInstituteLogo: '',
      currentStudy: false,
      location: '',
      endMonthDate: 0,
      endYearDate: 0
    }
    educ.id=education.id;
    educ.institute=education.institute;
    educ.title=education.title;
    educ.urlInstituteLogo=education.urlInstituteLogo;
    educ.currentStudy=education.currentStudy;
    educ.location=education.location;
    educ.endMonthDate=dateEnd.getMonth();
    educ.endYearDate= dateEnd.getFullYear();
      return  educ;
    }

    educationToDateJson(education: EducationForm): Education {
      let finishDate = new Date(education.endYearDate, education.endMonthDate, 1).toISOString();
      let educ: Education= {
        id: 0,
        institute: '',
        title: '',
        urlInstituteLogo: '',
        currentStudy: false,
        finishDate: '',
        location: ''
      }
      
      educ.id =education.id;
      educ.institute = education.institute;
      educ.title = education.title;
      educ.urlInstituteLogo = education.urlInstituteLogo;
      educ.currentStudy = education.currentStudy;
      educ.location = education.location;
      educ.finishDate = finishDate;
        return  educ;
      }


  getEducationForm(education: Education[]): EducationForm[] {
    education.map( (educ) =>
    this.educationsForm.push(this.educationToJsonDate(educ)));
    return this.educationsForm;
  }

  get getEducationDefaultLogo(){
    return this.defaultLogo
  }

  getEducation(userId: number): Observable<Education[]> {
    return this.http.get<Education[]>(this.urlGetEducation + userId);
  }

  get getNewEducation$() {
    return this._educations$
  }

  addEducation(education: Education, userId: number): Observable<Education> {
    return this.http.post<Education>(this.urlAddEducation + userId, education, httpOptions);
  }

  deleteEducation(id: number | undefined) {
    const url = `${this.apiUrl}/delete-education/${id}`;
    return this.http.delete<Education>(url, httpOptions);
  }

  editEducation(education : Education): Observable<Education>{
  return this.http.put<Education>(`${this.apiUrl}/edit-education`, education, httpOptions);
  }
}

export interface Education {
  id?: number;
  institute: string;
  title: string;
  urlInstituteLogo: string;
  currentStudy: boolean;
  finishDate: string;                   
  location: string;
}

export interface EducationForm {
  id?: number;
  institute: string;
  title: string;
  urlInstituteLogo: string;
  currentStudy: boolean;                 
  location: string;
  endMonthDate: number;
  endYearDate: number;
}

export interface PartialEducationForm extends Partial<EducationForm> { }
export interface PartialEducation extends Partial<Education> { }