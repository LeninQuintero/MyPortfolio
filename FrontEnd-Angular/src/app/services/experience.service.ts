import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/environments/api-urls-config';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private apiUrl=API_URL;
  private urlGetExperiences=`${this.apiUrl}/experience-list/`;
  private urlAddExperiences= `${this.apiUrl}/new-experience/`;


  experiences: Experience[] = [];
  _experiences$: Subject<Experience[]>;

  constructor(private http: HttpClient) {
    this._experiences$ = new Subject();
  }

  getExperiences(userId: number): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.urlGetExperiences + userId);
  }

  get getNewExperiences$() {
    return this._experiences$
  }

  addExperience(experience: Experience, userId: number): Observable<Experience> {
    return this.http.post<Experience>(this.urlAddExperiences + userId, experience, httpOptions);
  }

  deleteExperience(experience: Experience): Observable<Experience> {
    const url = `${this.apiUrl}delete-experience/${experience.id}`;
    return this.http.delete<Experience>(url);
  }

  editExperience(experience : Experience): Observable<Experience>{
return this.http.put<Experience>(this.apiUrl+"edit-experience", experience, httpOptions);
  }

  stringToDate(dateString: string): Date {
    // replacing all '-' characters with ',' to format it
    let date = new Date(dateString.replace(/-/g, ','));
    return date;
  }

  expToDateJson(experienceForm: ExperienceForm): Experience {
    let dateStart = new Date(experienceForm.startYearDate, experienceForm.startMonthDate, 1).toISOString();
    let dateEnd = new Date(experienceForm.endYearDate, experienceForm.endMonthDate, 1).toISOString();
    let exp: Experience= {
      id:0,
      companyName: '',
      urlCompanyLogo: '',
      currentJob: false,
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      description: ''
    }
    exp.id=experienceForm.id;
    exp.companyName=experienceForm.companyName;
    exp.currentJob=experienceForm.currentJob;
    exp.description=experienceForm.description;
    exp.location=experienceForm.location;
    exp.position=experienceForm.position;
    exp.urlCompanyLogo=experienceForm.urlCompanyLogo;
    exp.startDate=dateStart;
    exp.endDate= dateEnd;
      return  exp;
    }

    expToJsonDate(experience: Experience): ExperienceForm {
      let dateStart = new Date(this.stringToDate(experience.startDate));
      let dateEnd = new Date(this.stringToDate(experience.endDate));
      let exp: ExperienceForm= {
        id:0,
        position: '',
        companyName: '',
        urlCompanyLogo: '',
        currentJob: false,
        startMonthDate: 0,
        startYearDate: 0,
        endMonthDate: 0,
        endYearDate: 0,
        location: '',
        description: ''
      }
      exp.id=experience.id;
      exp.companyName=experience.companyName;
      exp.currentJob=experience.currentJob;
      exp.description=experience.description;
      exp.location=experience.location;
      exp.position=experience.position;
      exp.urlCompanyLogo=experience.urlCompanyLogo;
      exp.startMonthDate=dateStart.getMonth();
      exp.startYearDate= dateStart.getFullYear();
      exp.endMonthDate=dateEnd.getMonth();
      exp.endYearDate= dateEnd.getFullYear();
        return  exp;
      }

}
export interface Experience {
  id?: number;
  companyName: string;
  urlCompanyLogo: string;
  currentJob: boolean;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export interface ExperienceForm {
  id?: number;
  position: string;
  companyName: string;
  urlCompanyLogo: string;
  currentJob: boolean;
  startMonthDate: number;
  startYearDate: number;
  endMonthDate: number;
  endYearDate: number;
  location: string;
  description: string; 
}

export interface PartialExperienceForm extends Partial<ExperienceForm> { }
export interface PartialExperience extends Partial<Experience> { }