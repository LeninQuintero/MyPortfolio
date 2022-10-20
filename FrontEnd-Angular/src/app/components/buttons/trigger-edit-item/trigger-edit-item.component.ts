import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trigger-edit-item',
  templateUrl: './trigger-edit-item.component.html',
  styleUrls: ['./trigger-edit-item.component.scss']
})
export class TriggerEditItemComponent implements OnInit {
  @Input() editIdModal: string="";
  @Input() editTitleTriggerModal: string="";
  @Input() editClassTriggerModal: string="";

  constructor() { }

  ngOnInit(): void {
  }

}