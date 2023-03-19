import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill, SkillService } from 'src/app/services/skill.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-skill-modal',
  templateUrl: './add-skill-modal.component.html',
  styleUrls: ['./add-skill-modal.component.scss']
})
export class AddSkillModalComponent implements OnInit {
  public addSkillForm: FormGroup;
  public spinnerButton: boolean = false;

  private skills: Skill[] = [];
  private alertSubmit: boolean;
  private userId: number = 0;

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private skillService: SkillService) {

    this.addSkillForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(12)]],
      iconName: ['',],
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
  }

  closeAlertSubmit() {
    this.alertSubmit = false;
  }

  submit(event: Event) {
    
    if (this.addSkillForm.valid) {
      let list = this.skills;
      let newSkill: Skill = this.addSkillForm.value;
      const pattern = /^fa-.*$/;

      let iconValid = pattern.test(this.addSkillForm.get('iconName')?.value);

      if (!iconValid) {
        newSkill.iconName = this.skillService.getSkillDefaultLIcon;
      }

      this.skillService.addSkill(newSkill, this.userId).subscribe(skill => {
        list.push(skill);
        this.skillService.getNewSkill$.next(list);
      });

      this.alertSubmit = true;

      // setTimeout(() => this.closeAlertSubmit(), 5 * 1000);

      this.addSkillForm.reset();

    } else {
      this.addSkillForm.markAllAsTouched();
    }
  }

}