import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/services/experience.service';

@Component({
  selector: 'app-edit-experience-modal',
  templateUrl: './edit-experience-modal.component.html',
  styleUrls: ['./edit-experience-modal.component.scss']
})
export class EditExperienceModalComponent implements OnInit {
  @Input() experience: Experience | undefined;

  public idModal: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.idModal = 'editExpeModal' + this.experience?.id;
  }
}
