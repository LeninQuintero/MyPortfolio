import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/profile.service';

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

 private userSuscription = this.userService.getUser().subscribe(user => {
  this.urlBannerSm = user.urlBannerSm;
  this.urlBannerLg = user.urlBannerLg;

});

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userSuscription;
  }

}