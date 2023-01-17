import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Experience, ExperienceForm, ExperienceService } from 'src/app/services/experience.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit {

  // private username;
  // private urlFindUser;

  public userId:number | undefined;
  public editTitleTriggerModal: string = "Editar experiencia";
  public editClassTriggerModal: string = "d-inline-block";
  public addIdModal: string = "#addExperienceModal";
  public addTitleTriggerModal: string = "Agregar experiencia";
  public addClassTriggerModal: string = "";
  public experiences: Experience[] = [];
  public expForm: ExperienceForm[] = [];

  constructor(private experienceService: ExperienceService, private userService: UserService, private route: ActivatedRoute) { 
    console.log("EXPERIENCIAS COMP EN EL CONSTRUCTOR!!!!");

    // this.username = this.route.snapshot.paramMap.get('username');
    // this.urlFindUser = this.userService.getUrlFind+this.username;


    // console.log('URL FIND EN EL EXP COMP CONSTRUCTOR===>>>', this.urlFindUser)
    // console.log('USERNNAME EN EL EXP COMP CONSTRUCTOR===>>>', this.username)



  }

  ngOnInit(): void {
    console.log("EXPERIENCIAS COMP EN EL ON INIT!!!!");
    // this.userService.getUser.subscribe(user => {

    //   this.experienceService.getExperiences(user.id).subscribe(experiences => {
        
    //    experiences.map((exp) =>
    //      this.expForm.push(this.experienceService.expToJsonDate(exp)));
    //       this.experiences = experiences;


    //   });
    // })
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