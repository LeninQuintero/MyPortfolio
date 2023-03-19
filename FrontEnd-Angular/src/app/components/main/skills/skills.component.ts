import { Component, OnInit } from '@angular/core';
import { Skill, SkillService } from 'src/app/services/skill.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  private userId=0;
  public editIdModal: string="#editSkillModal";
  public editTitleTriggerModal: string="Editar skill";
  public editClassTriggerModal: string="d-inline-block mt-1";

  public addIdModal: string="#addSkillModal";
  public addTitleTriggerModal: string="Agregar skill";
  public addClassTriggerModal: string="pt-md-2 px-md-4";

  public skills: Skill[] = [];

  constructor(private skillService: SkillService, private userService: UserService) { }

  skillProgress(progress: string): string {
    switch (progress) {
      case "Basico":
        return "progress-25";
        break;
      case "Intermedio":
        return "progress-50";
        break;
      case "Avanzado":
        return "progress-75";
        break;
      case "Experto":
        return "progress-100";
        break;
      default:
        return "progress-0";
        break;
    }
  }

  ngOnInit(): void {

    this.userService.getUser.subscribe(user => {
      this.userId = user.id;
      this.skillService.getSkill(this.userId).subscribe(skills => { 
        this.skills = skills;
      });
    })

    this.skillService.getNewSkill$.subscribe(() =>
    this.userService.getUser.subscribe(user => {
      this.userId = user.id;
      this.skillService.getSkill(this.userId).subscribe(skills => { 
        this.skills = skills;
      });
    })
    )

    this.userService.getUser$.subscribe(()=> {
      this.userService.getUser.subscribe(user => {
        this.userId = user.id;
        this.skillService.getSkill(this.userId).subscribe(skills => { 
          this.skills = skills;
        });
      })
    })

  }

}