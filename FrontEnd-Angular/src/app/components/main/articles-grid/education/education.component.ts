import { Component, OnInit } from '@angular/core';
import { Education, EducationForm, EducationService } from 'src/app/services/education.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  private userId=0;
  public editIdModal: string="#editEducationModal";
  public editTitleTriggerModal: string="Editar educación";
  public editClassTriggerModal: string="d-inline-block";

  public addIdModal: string="#addEducModal";
  public addTitleTriggerModal: string="Agregar Educación";
  public addClassTriggerModal: string="";

  public educations: Education[] = [];
  public educForm: EducationForm[] = [];

  constructor(private educationService: EducationService, private userService: UserService,) { }

  ngOnInit(): void {

    this.userService.getUser.subscribe(user => {
      this.userId = user.id;
      this.educationService.getEducation(this.userId).subscribe(educations => { 
        this.educations = educations;
        this.educForm = this.educationService.getEducationForm(educations);
      });
    })

    this.educationService.getNewEducation$.subscribe(() =>
    this.userService.getUser.subscribe(user => {
      this.userId = user.id;
      this.educationService.getEducation(this.userId).subscribe(educations => { 
        this.educations = educations;
        this.educForm = this.educationService.getEducationForm(educations);
      });
    })
    )

    this.userService.getUser$.subscribe(()=> {
      this.userService.getUser.subscribe(user => {
        this.userId = user.id;
        this.educationService.getEducation(this.userId).subscribe(educations => { 
          this.educations = educations;
          this.educForm = this.educationService.getEducationForm(educations);
        });
      })
    })

  }

  dateStringToString(dateString: string): string {
    let date = this.educationService.stringToDate(dateString);
    let m = date.toLocaleString("es-ES", { month: "long" });
    let y = date.toLocaleString("es-ES", { year: "numeric" });
    let formatedDate = m[0].toUpperCase() + m.slice(1) + " " + y;
    return formatedDate;
  }

  educationToJsonDate(education: Education): EducationForm {
    let dateEnd = new Date(this.educationService.stringToDate(education.finishDate));
    let educ: EducationForm= {
      id: 0,
      institute: '',
      title: '',
      urlInstituteLogo: '',
      currentStudy: false,
      location: '',
      endMonthDate: 0,
      endYearDate: 0
    }
    educ.id=education.id;
    educ.institute=education.institute;
    educ.title=education.title;
    educ.urlInstituteLogo=education.urlInstituteLogo;
    educ.currentStudy=education.currentStudy;
    educ.location=education.location;
    educ.endMonthDate=dateEnd.getMonth();
    educ.endYearDate= dateEnd.getFullYear();
      return  educ;
    }

}
