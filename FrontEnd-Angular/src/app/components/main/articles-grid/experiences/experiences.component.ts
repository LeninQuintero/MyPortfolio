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

  public userId=0;
  public editTitleTriggerModal: string = "Editar experiencia";
  public editClassTriggerModal: string = "d-inline-block";
  public addIdModal: string = "#addExperienceModal";
  public addTitleTriggerModal: string = "Agregar experiencia";
  public addClassTriggerModal: string = "";
  public experiences: Experience[] = [];
  public expForm: ExperienceForm[] = [];

  constructor(private expService: ExperienceService, private userService: UserService, private route: ActivatedRoute) { 


    // this.username = this.route.snapshot.paramMap.get('username');
    // this.urlFindUser = this.userService.getUrlFind+this.username;


    // console.log('URL FIND EN EL EXP COMP CONSTRUCTOR===>>>', this.urlFindUser)
    // console.log('USERNNAME EN EL EXP COMP CONSTRUCTOR===>>>', this.username)



  }

  ngOnInit(): void {

    this.userService.getUser.subscribe(user => {
        this.userId = user.id;
        this.expService.getExperiences(this.userId).subscribe(experiences => { 
          this.experiences = experiences;
          this.expForm=this.expService.getExpForm(experiences); 
        });
    })

    this.expService.getNewExperiences$.subscribe(() =>
    this.userService.getUser.subscribe(user => {
      this.userId = user.id;
      this.expService.getExperiences(this.userId).subscribe(experiences => { 
        this.experiences = experiences;
        this.expForm=this.expService.getExpForm(experiences); 
      });
  })




    )

  }
  

  expToJsonDate(experience: Experience): ExperienceForm {
    let dateStart = new Date(this.expService.stringToDate(experience.startDate));
    let dateEnd = new Date(this.expService.stringToDate(experience.endDate));
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


  onDeleteExperience(experience: Experience) {
    this.expService.deleteExperience(experience.id).subscribe(() => {
      let list = this.experiences;
      list.filter(exp => { return exp.id !== experience.id });
      this.expService.getNewExperiences$.next(list);
    });
  }


  dateStringToString(dateString: string): string {
    let date = this.expService.stringToDate(dateString);
    let m = date.toLocaleString("es-ES", { month: "long" });
    let y = date.toLocaleString("es-ES", { year: "numeric" });
    let formatedDate = m[0].toUpperCase() + m.slice(1) + " " + y;
    return formatedDate;
  }






  }



