import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-trigger-add-item',
  templateUrl: './trigger-add-item.component.html',
  styleUrls: ['./trigger-add-item.component.scss']
})
export class TriggerAddItemComponent implements OnInit {
  @Input() addIdModal: string = "";
  @Input() addTitleTriggerModal: string = "";
  @Input() addClassTriggerModal: string = "";

  constructor(private tokenService: TokenService) { }
  public isLogged = false;
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

}
