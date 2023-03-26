import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
@Component({
  selector: 'app-trigger-edit-item',
  templateUrl: './trigger-edit-item.component.html',
  styleUrls: ['./trigger-edit-item.component.scss']
})
export class TriggerEditItemComponent implements OnInit {
  @Input() editIdModal: string = "";
  @Input() editTitleTriggerModal: string = "";
  @Input() editClassTriggerModal: string = "";
public isLogged = false;
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }
}