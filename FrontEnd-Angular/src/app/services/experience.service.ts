import { Injectable } from '@angular/core';
import { UserService } from './profile.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  experiences: Experience[] = [];
  _experiences$: Subject<Experience[]>;
  private apiUrl: string;
  private urlGetExperiences: string;
  private urlAddExperiences: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.apiUrl = this.userService.getApiUrl;
    this.urlGetExperiences = this.apiUrl + 'experience-list/';
    this.urlAddExperiences = this.apiUrl + 'new-experience/';
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