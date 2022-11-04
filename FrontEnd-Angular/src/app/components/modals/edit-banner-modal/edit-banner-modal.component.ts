import { Component, OnInit } from '@angular/core';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-banner-modal',
  templateUrl: './edit-banner-modal.component.html',
  styleUrls: ['./edit-banner-modal.component.scss']
})
export class EditBannerModalComponent implements OnInit {

  constructor(private uploadFilesService: UploadFilesService) { }

  ngOnInit(): void {}

upBannerMobile(event: any) {
const image = event.target.files[0];
const name = event.target.files[0].name;
const ref = this.uploadFilesService.ref(name);
const task = this.uploadFilesService.uploadFile(image);






// task.pipe(
//   finalize( () => {
// ref.
//   })
// )




}

}
