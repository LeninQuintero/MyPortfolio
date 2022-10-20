import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trigger-add-item',
  templateUrl: './trigger-add-item.component.html',
  styleUrls: ['./trigger-add-item.component.scss']
})
export class TriggerAddItemComponent implements OnInit {
  @Input() addIdModal: string="";
  @Input() addTitleTriggerModal: string="";
  @Input() addClassTriggerModal: string="";

  constructor() { }

  ngOnInit(): void {
  }

}
