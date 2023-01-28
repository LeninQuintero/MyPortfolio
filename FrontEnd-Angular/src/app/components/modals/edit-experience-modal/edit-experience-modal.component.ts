import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Experience, ExperienceForm, ExperienceService } from 'src/app/services/experience.service';
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
  expForm: ExperienceForm={
    id:0,
    position: '',
    companyName: '',
    urlCompanyLogo: '',
    currentJob: false,
    startMonthDate: 0,
    startYearDate: 0,
    endMonthDate: 0,
    endYearDate: 0,
    location: '',
    description: ''
  }
  
  public editExpForm: FormGroup;


  public minLengthPictureName: number = 1;
  public maxLengthPictureName: number = 50;
  public spinnerButton: boolean = false;
  public errorMaxSize: boolean = false;
  private directoryName: any;
  private urlImgName: string = "";
  private actualImgName: string = "";
  private imgSize: number = 0;
  private maxImageSize: number = 5242880;
  private image: any;
  private formDataImage = new FormData();
  private imgFormat: string | undefined;
 private experiences: Experience[]=[];
  alertSubmit: boolean;
  private id: number=0;


  constructor(
    private userService: UserService, 
    private fb: FormBuilder, 
    private expService: ExperienceService, 
    private upFilesService: UploadFilesService,
    private route: ActivatedRoute){
      
    this.directoryName = this.route.snapshot.paramMap.get('username');
    this.editExpForm = this.fb.group({
      id: [, [Validators.required]],
      position: [, [Validators.required]],
      companyName: [, [Validators.required]],
      urlCompanyLogo: [, ],
      currentJob: [false, ],
      startMonthDate: [, [Validators.required]],
      startYearDate: [, [Validators.required]],
      endMonthDate: [, [Validators.required]],
      endYearDate: [, [Validators.required]],
      location: [, [Validators.required]],
      description: [, [Validators.required]]
    });
    this.alertSubmit = false;
  }

  ngOnInit(): void {  

    this.userService.getUser.subscribe(user => {
      this.id = user.id;
      this.expService.getExperiences(user.id).subscribe(experiences => {
        this.experiences = experiences;
      });
    });

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

  closeAlertSubmit(){
    this.alertSubmit = false;
  }

  captureFile(event: any) {
    this.image = event.target.files[0];
    this.imgSize = this.image.size;
    this.imgFormat = this.upFilesService.getImageFormat(this.image.name);
    if (this.editExpForm.valid) {
      if (this.imgSize <= this.maxImageSize) {
        this.errorMaxSize = false;
      }
      if (this.imgSize >= this.maxImageSize) {
        this.errorMaxSize = true;
      }
    }
  }

  expDelete(event: Event) {
      this.expService.deleteExperience(this.expForm.id).subscribe(() => {
        let list = this.experiences;
        const fileName = this.upFilesService.getFileNameFromUrl(this.expForm.urlCompanyLogo);
        const fileExt = this.upFilesService.getFileExtFromUrl(fileName);
        this.upFilesService.deleteFileFire(this.directoryName, `experience-${this.expForm.id}.${fileExt}`);
        list.filter(exp => { return exp.id !== this.expForm.id });
        this.expService.getNewExperiences$.next(list);
      });
  }

  submit(event: Event) {
    if (this.editExpForm.valid) {
      let list = this.experiences;
      let newExperience: Experience = this.expService.expToDateJson(this.editExpForm.value);
      let urlLogo= this.expForm.urlCompanyLogo;
    
      if(this.editExpForm.get('urlCompanyLogo')?.dirty){
        this.upFilesService.uploadFileFire(this.image, this.directoryName, `experience-${this.expForm.id}.${this.imgFormat}`)
        .then(resp => {
            this.upFilesService.getUrlUpFileFire(resp).then( url => {
                newExperience.urlCompanyLogo = url
                this.expService.editExperience(newExperience).subscribe(experience => {
                list.push(experience);
                this.expService.getNewExperiences$.next(list);
                })
            }).catch(error => console.log(error))
          })
          .catch(error => console.log(error))
      } else {
        newExperience.urlCompanyLogo = urlLogo;
        this.expService.editExperience(newExperience).subscribe(experience => {
        list.push(experience);
        this.expService.getNewExperiences$.next(list);
        })
      }

      this.alertSubmit = true;

      setTimeout(() => this.closeAlertSubmit(), 5 * 1000);

      this.editExpForm.reset();

    } else {
      this.editExpForm.markAllAsTouched();
    }

}


}