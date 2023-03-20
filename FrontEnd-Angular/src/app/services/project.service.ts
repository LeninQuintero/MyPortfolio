import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_URL } from 'src/environments/api-urls-config';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private apiUrl = API_URL;
  
  private urlGetProject =`${this.apiUrl}/project-list/`;
  private urlAddProject = `${this.apiUrl}/new-project/`;
  
  private projects = new Observable<Project[]>;
  private _projects$ = new Subject<Project[]>();


constructor(private http: HttpClient) { }

getProject(userId: number): Observable<Project[]> {
  return this.http.get<Project[]>(this.urlGetProject + userId);
}

get getNewProject$() {
  return this._projects$
}

addProject(project: Project, userId: number): Observable<Project> {
  return this.http.post<Project>(this.urlAddProject + userId, project, httpOptions);
}

deleteProject(id: number | undefined) {
  const url = `${this.apiUrl}/delete-project/${id}`;
  return this.http.delete<Project>(url, httpOptions);
}

editProject(project : Project): Observable<Project>{
return this.http.put<Project>(`${this.apiUrl}/edit-project`, project, httpOptions);
}

}

export interface Project {
  id?: number;
  title: string;
  urlProjectImg: string;
  urlProject: string;
  description: string;
}
