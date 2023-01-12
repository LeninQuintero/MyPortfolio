import { Injectable } from '@angular/core';
import { UserService } from './profile.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private experiences: Experience[] = [];
  private _experiences$: Subject<Experience[]>;
  private apiUrl: string;
  private urlGetExperiences: string;

  constructor(private http: HttpClient, private userService: UserService) {
    this.apiUrl = this.userService.getApiUrl;
    this.urlGetExperiences = this.apiUrl + 'experience-list/';
    this._experiences$ = new Subject();
  }

  getExperiences(userId: number): Observable<Experience[]> {
    return this.http.get<Experience[]>(this.urlGetExperiences + userId);
  }

  get getNewExperiences$() {
    return this._experiences$
  }

}
export interface Experience {
  id: number;
  companyName: string;
  urlCompanyLogo: string;
  currentJob: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  userProfile: string;
}

export interface PartialExperience extends Partial<Experience> { }