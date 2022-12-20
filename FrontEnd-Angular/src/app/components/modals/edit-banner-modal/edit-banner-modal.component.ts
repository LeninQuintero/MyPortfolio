import { Component } from '@angular/core';
import { UploadFilesService } from 'src/app/services/upload-files.service';

@Component({
  selector: 'app-edit-banner-modal',
  templateUrl: './edit-banner-modal.component.html',
  styleUrls: ['./edit-banner-modal.component.scss']
})
export class EditBannerModalComponent {

  constructor(private uploadFilesService: UploadFilesService) { }



upBannerMobile(event: any) {
const image = event.target.files[0];
const name = event.target.files[0].name;
const ref = this.uploadFilesService.uploadRef(name);
const task = this.uploadFilesService.uploadFile(image);
}

}
