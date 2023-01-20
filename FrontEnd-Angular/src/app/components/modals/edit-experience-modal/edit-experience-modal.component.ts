import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExperienceForm, ExperienceService } from 'src/app/services/experience.service';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-experience-modal',
  templateUrl: './edit-experience-modal.component.html',
  styleUrls: ['./edit-experience-modal.component.scss']
})
export class EditExperienceModalComponent implements OnInit {
  @Input() 
  idModal: string | undefined;

  @Input()
  expForm: ExperienceForm | undefined;
  
  public editExpForm: FormGroup;


  public minLengthPictureName: number = 1;
  public maxLengthPictureName: number = 50;
  public spinnerButton: boolean = false;
  public errorMaxSize: boolean = false;
  private directoryName: string = "";
  private urlImgName: string = "";
  private actualImgName: string = "";
  private imgSize: number = 0;
  private maxImageSize: number = 5242880;
  private image: any;
  private formDataImage = new FormData();


  constructor(
    private userService: UserService, 
    private fb: FormBuilder, 
    private expService: ExperienceService, 
    private upFilesService: UploadFilesService){

    this.editExpForm = this.fb.group({
      id: [, [Validators.required]],
      position: [, [Validators.required]],
      companyName: [, [Validators.required]],
      urlCompanyLogo: [, [Validators.required]],
      currentJob: [, [Validators.required]],
      startMonthDate: [, [Validators.required]],
      startYearDate: [, [Validators.required]],
      endMonthDate: [, [Validators.required]],
      endYearDate: [, [Validators.required]],
      location: [, [Validators.required]],
      description: [, [Validators.required]]
    });
  }

  ngOnInit(): void {  

    this.editExpForm.controls['id'].setValue(this.expForm?.id);
    this.editExpForm.controls['position'].setValue(this.expForm?.position);
    this.editExpForm.controls['companyName'].setValue(this.expForm?.companyName);
    this.editExpForm.controls['startMonthDate'].setValue(this.expForm?.startMonthDate);
    this.editExpForm.controls['startYearDate'].setValue(this.expForm?.startYearDate);
    this.editExpForm.controls['endMonthDate'].setValue(this.expForm?.endMonthDate);
    this.editExpForm.controls['endYearDate'].setValue(this.expForm?.endYearDate);
    this.editExpForm.controls['location'].setValue(this.expForm?.location);
    this.editExpForm.controls['description'].setValue(this.expForm?.description);
    this.editExpForm.controls['currentJob'].setValue(this.expForm?.currentJob);

  }

  captureFile(event: any) {
    this.image = event.target.files[0];
    this.imgSize = this.image.size;

    if (this.editExpForm.valid) {
            
      if (this.imgSize <= this.maxImageSize){
        this.errorMaxSize= false;
      



      }




      if (this.imgSize >= this.maxImageSize){
        this.errorMaxSize= true;
      }
    } 

    console.log(JSON.stringify(this.image))
  }







  submit(event: Event) {

    if (this.editExpForm.valid){
      this.expService.editExperience(this.expService.expToDateJson(this.editExpForm.value)).subscribe( experience => {

        });   
  }
}

}


