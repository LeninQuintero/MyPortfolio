import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_URL, DEFAULT_SKILL_ICON } from 'src/environments/api-urls-config';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiUrl = API_URL;
  private defaultIcon = DEFAULT_SKILL_ICON;
  private urlGetSkill =`${this.apiUrl}/skill-list/`;
  private urlAddSkill = `${this.apiUrl}/new-skill/`;
  
  private skills = new Observable<Skill[]>;
  private _skills$ = new Subject<Skill[]>();

  constructor(private http: HttpClient) { }

  get getSkillDefaultLIcon(){
    return this.defaultIcon
  }

  getSkill(userId: number): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.urlGetSkill + userId);
  }

  get getNewSkill$() {
    return this._skills$
  }

  addSkill(skill: Skill, userId: number): Observable<Skill> {
    return this.http.post<Skill>(this.urlAddSkill + userId, skill, httpOptions);
  }

  deleteSkill(id: number | undefined) {
    const url = `${this.apiUrl}/delete-skill/${id}`;
    return this.http.delete<Skill>(url, httpOptions);
  }

  editSkill(skill : Skill): Observable<Skill>{
  return this.http.put<Skill>(`${this.apiUrl}/edit-skill`, skill, httpOptions);
  }
}

export interface Skill {
  id?: number;
  title : string;
  iconName : string;
  level : string;
}