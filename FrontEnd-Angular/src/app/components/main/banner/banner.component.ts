import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
 public editIdModal: string="#editBannerModal";
 public editTitleTriggerModal: string="Actualizar portada";
 public editClassTriggerModal: string="edit-banner-pic text-end pb-4 mx-4 d-block";
 public urlBannerSm: string="";
 public urlBannerLg: string="";

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.userService.getUser.subscribe(user => {
      this.urlBannerSm = user.urlBannerSm;
      this.urlBannerLg = user.urlBannerLg;
    });

    this.userService.getUser$.subscribe(() => {
      this.userService.getUser.subscribe(user => {
        this.urlBannerSm = user.urlBannerSm;
        this.urlBannerLg = user.urlBannerLg;
      });
    });
  }

}