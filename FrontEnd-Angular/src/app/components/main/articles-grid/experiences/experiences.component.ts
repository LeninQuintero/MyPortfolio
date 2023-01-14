import { Component, OnInit } from '@angular/core';
import { Experience, ExperienceService } from 'src/app/services/experience.service';
import { UserService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit {

  userId: number = 0;

  public editIdModal: string = "#editExperienceModal45";

  public editTitleTriggerModal: string = "Editar experiencia";
  public editClassTriggerModal: string = "d-inline-block";
  public addIdModal: string = "#addExperienceModal";
  public addTitleTriggerModal: string = "Agregar experiencia";
  public addClassTriggerModal: string = "";
  public experiences: Experience[] = [];

  constructor(private experienceService: ExperienceService, private userService: UserService) { }

  ngOnInit(): void {
    this.refreshExperiences();
    this.experienceService.getNewExperiences$.subscribe(() =>
      this.refreshExperiences());
  }

  refreshExperiences() {
    this.userService.getUser.subscribe(user => {
      this.userId = user.id;
      this.experienceService.getExperiences(user.id).subscribe(experiences => {
        this.experiences = experiences;
      });
    });
  }

  onDeleteExperience(experience: Experience) {
    this.experienceService.deleteExperience(experience).subscribe(() => {
      let list = this.experienceService.experiences;
      list.filter(exp => { return exp.id !== experience.id });
      this.experienceService._experiences$.next(list);
    });
  }
  stringToData(dateJson: string): string {
    // replacing all '-' characters with ',' to format it
    let date = new Date(dateJson.replace(/-/g, ','));

    let month = date.toLocaleString("es-ES", { month: "long" });
    let year = date.toLocaleString("es-ES", { year: "numeric" });
    let formattedDate = month[0].toUpperCase() + month.slice(1) + " " + year;
    return formattedDate;
  }

}