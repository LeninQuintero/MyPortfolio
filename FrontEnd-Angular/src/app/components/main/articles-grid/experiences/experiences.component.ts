import { Component, OnInit } from '@angular/core';
import { Experience, ExperienceForm, ExperienceService } from 'src/app/services/experience.service';
import { UserService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit {

  private userId: number | undefined;
  public editTitleTriggerModal: string = "Editar experiencia";
  public editClassTriggerModal: string = "d-inline-block";
  public addIdModal: string = "#addExperienceModal";
  public addTitleTriggerModal: string = "Agregar experiencia";
  public addClassTriggerModal: string = "";
  public experiences: Experience[] = [];
  public expForm: ExperienceForm[] = [];

  constructor(private experienceService: ExperienceService, private userService: UserService) { }

  ngOnInit(): void {
    this.refreshExperiences();
    this.experienceService.getNewExperiences$.subscribe(() =>
      this.refreshExperiences());
    console.log("USER EN EL MODAL EXPCOMPONENT==>>", this.userId)
  }

  refreshExperiences() {
    this.userService.getUser.subscribe(user => {
      this.userId = user.id;
      this.experienceService.getExperiences(user.id).subscribe(experiences => {
        this.experiences = experiences;
        this.expForm = this.experiences.map(exp =>
          this.experienceService.expToJsonDate(exp));
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

  stringToDate(month: number, year: number) {
    let date = new Date(year, month)
    let m = date.toLocaleString("es-ES", { month: "long" });
    let y = date.toLocaleString("es-ES", { year: "numeric" });
    let formattedDate = m[0].toUpperCase() + m.slice(1) + " " + y;
    return formattedDate;
  }
}