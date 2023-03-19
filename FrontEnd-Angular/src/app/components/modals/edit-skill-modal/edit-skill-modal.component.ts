import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill, SkillService } from 'src/app/services/skill.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-skill-modal',
  templateUrl: './edit-skill-modal.component.html',
  styleUrls: ['./edit-skill-modal.component.scss']
})
export class EditSkillModalComponent implements OnInit {
  @Input()
  idModal: string | undefined;

  @Input()
  skill: Skill = {
    id: 0,
    title: '',
    iconName: '',
    level: ''
  }

  public editSkillForm: FormGroup;
  public spinnerButton: boolean = false;

  private skills: Skill[] = [];
  private alertSubmit: boolean;
  private userId: number = 0;

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private skillService: SkillService) {

    this.editSkillForm = this.fb.group({
      id: [, [Validators.required]],
      title: ['', [Validators.required]],
      iconName: ['', [Validators.required]],
      level: ['', [Validators.required]]
    });

    this.alertSubmit = false;
  }

  ngOnInit(): void {
    this.userService.getUser.subscribe(user => {
      this.userId = user.id;
      this.skillService.getSkill(user.id).subscribe(skills => {
        this.skills = skills;
      });
    });

    this.editSkillForm.controls['id'].setValue(this.skill.id);
    this.editSkillForm.controls['title'].setValue(this.skill.title);
    this.editSkillForm.controls['iconName'].setValue(this.skill.iconName);
    this.editSkillForm.controls['level'].setValue(this.skill.level);
  }

  closeAlertSubmit() {
    this.alertSubmit = false;
  }

  skillDelete(event: Event) {
    this.skillService.deleteSkill(this.skill.id).subscribe(() => {
      let list = this.skills;

      list.filter(educ => { return educ.id !== this.skill.id });
      this.skillService.getNewSkill$.next(list);
    });
  }

  submit(event: Event) {
    if (this.editSkillForm.valid) {
      let list = this.skills;
      let newSkill: Skill = this.editSkillForm.value;

      this.skillService.editSkill(newSkill).subscribe(skill => {
        list.push(skill);
        this.skillService.getNewSkill$.next(list);
      });

      this.alertSubmit = true;

      setTimeout(() => this.closeAlertSubmit(), 5 * 1000);

      this.editSkillForm.reset();

    } else {
      this.editSkillForm.markAllAsTouched();
    }
  }

}