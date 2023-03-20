import { Component, OnInit } from '@angular/core';
import { Project, ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  private userId=0;
  public editIdModal: string="#editProjModal";
  public editTitleTriggerModal: string="Editar proyecto";
  public editClassTriggerModal: string="";

  public addIdModal: string="#addProjModal";
  public addTitleTriggerModal: string="Agregar proyecto";
  public addClassTriggerModal: string="pt-md-2 px-md-4";
  public projects: Project[] = [];

  constructor(private projectService: ProjectService, private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getUser.subscribe(user => {
      this.userId = user.id;
      this.projectService.getProject(this.userId).subscribe(projects => { 
        this.projects = projects;
      });
    })

    this.projectService.getNewProject$.subscribe(() =>
    this.userService.getUser.subscribe(user => {
      this.userId = user.id;
      this.projectService.getProject(this.userId).subscribe(projects => { 
        this.projects = projects;
      });
    })
    )

    this.userService.getUser$.subscribe(()=> {
      this.userService.getUser.subscribe(user => {
        this.userId = user.id;
        this.projectService.getProject(this.userId).subscribe(projects => { 
          this.projects = projects;
        });
      })
    })

  }
}
