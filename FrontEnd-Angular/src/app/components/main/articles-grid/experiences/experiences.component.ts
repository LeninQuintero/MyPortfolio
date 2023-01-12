import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Experience, ExperienceService } from 'src/app/services/experience.service';
import { PartialUserProfile, UserProfile, UserService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit {
  private userId: number = 0;

  public editIdModal: string = "#editExperienceModal";
  public editTitleTriggerModal: string = "Editar experiencia";
  public editClassTriggerModal: string = "d-inline-block";

  public addIdModal: string = "#addExperienceModal";
  public addTitleTriggerModal: string = "Agregar experiencia";
  public addClassTriggerModal: string = "";

  public experiences: Experience[] = [];

  constructor(private experienceService: ExperienceService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getUser.subscribe(user => {
      this.userId = user.id;
      this.experienceService.getExperiences(user.id).subscribe(experiences => {
        this.experiences = experiences;
      });
    });
  }

}
