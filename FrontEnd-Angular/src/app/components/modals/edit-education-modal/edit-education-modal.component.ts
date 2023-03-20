import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Education, EducationForm, EducationService } from 'src/app/services/education.service';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-education-modal',
  templateUrl: './edit-education-modal.component.html',
  styleUrls: ['./edit-education-modal.component.scss']
})
export class EditEducationModalComponent implements OnInit {
  @Input()
  idModal: string | undefined;

  @Input()
  educForm: EducationForm = {
    id: 0,
    institute: '',
    title: '',
    urlInstituteLogo: '',
    currentStudy: false,
    location: '',
    endMonthDate: 0,
    endYearDate: 0
  }

  public editEducForm: FormGroup;
  public spinnerButton: boolean = false;
  public errorMaxSize: boolean = false;
  private directoryName: any;
  private imgSize: number = 0;
  private maxImageSize: number = 5242880;
  private image: any;
  private imgFormat: string | undefined;
  private educations: Education[] = [];
  private alertSubmit: boolean;
  private userId: number = 0;

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private educationService: EducationService,
    private upFilesService: UploadFilesService,
    private route: ActivatedRoute) {

    this.directoryName = this.route.snapshot.paramMap.get('username')?.toLowerCase();
    this.editEducForm = this.fb.group({
      id: [, [Validators.required]],
      institute: ['', [Validators.required]],
      title: ['', [Validators.required]],
      urlInstituteLogo: [,],
      currentStudy: [false,],
      location: ['', [Validators.required]],
      endMonthDate: ['', [Validators.required]],
      endYearDate: ['', [Validators.required]]
    });
    this.alertSubmit = false;
  }

  ngOnInit(): void {
    this.userService.getUser.subscribe(user => {
      this.userId = user.id;
      this.educationService.getEducation(user.id).subscribe(educations => {
        this.educations = educations;
      });
    });

    this.editEducForm.controls['id'].setValue(this.educForm?.id);
    this.editEducForm.controls['institute'].setValue(this.educForm?.institute);
    this.editEducForm.controls['title'].setValue(this.educForm?.title);
    this.editEducForm.controls['currentStudy'].setValue(this.educForm?.currentStudy);
    this.editEducForm.controls['location'].setValue(this.educForm?.location);
    this.editEducForm.controls['endMonthDate'].setValue(this.educForm?.endMonthDate);
    this.editEducForm.controls['endYearDate'].setValue(this.educForm?.endYearDate);
  }

  get getCurrentStudy(): boolean {
    return this.editEducForm.get('currentStudy')?.value
  }

  closeAlertSubmit() {
    this.alertSubmit = false;
  }

  captureFile(event: any) {
    this.image = event.target.files[0];
    this.imgSize = this.image.size;
    this.imgFormat = this.upFilesService.getImageFormat(this.image.name);
    if (this.editEducForm.valid) {
      if (this.imgSize <= this.maxImageSize) {
        this.errorMaxSize = false;
      }
      if (this.imgSize >= this.maxImageSize) {
        this.errorMaxSize = true;
      }
    }
  }

  educDelete(event: Event) {
    this.educationService.deleteEducation(this.educForm.id).subscribe(() => {
      let list = this.educations;
      const fileName = this.upFilesService.getFileNameFromUrl(this.educForm.urlInstituteLogo);
      const fileExt = this.upFilesService.getFileExtFromUrl(fileName);
      const fileUrl = `education-${this.educForm.id}-logo.${fileExt}`;

      if (this.educForm.urlInstituteLogo != this.educationService.getEducationDefaultLogo) {
        this.upFilesService.deleteFileFire(this.directoryName, fileUrl);
      }

      list.filter(educ => { return educ.id !== this.educForm.id });
      this.educationService.getNewEducation$.next(list);
    });
  }

  submit(event: Event) {
    if (this.editEducForm.valid) {
      let list = this.educations;
      let newEducation: Education = this.educationService.educationToDateJson(this.editEducForm.value);
      let urlLogo = this.educForm.urlInstituteLogo;

      if (this.editEducForm.get('urlInstituteLogo')?.dirty) {
        this.upFilesService.uploadFileFire(this.image, this.directoryName, `education-${this.educForm.id}.${this.imgFormat}`)
          .then(resp => {
            this.upFilesService.getUrlUpFileFire(resp).then(url => {
              newEducation.urlInstituteLogo = url
              this.educationService.editEducation(newEducation).subscribe(education => {
                list.push(education);
                this.educationService.getNewEducation$.next(list);
              })
            }).catch(error => console.log(error))
          })
          .catch(error => console.log(error))
      } else {
        newEducation.urlInstituteLogo = urlLogo;
        this.educationService.editEducation(newEducation).subscribe(education => {
          list.push(education);
          this.educationService.getNewEducation$.next(list);
        })
      }

      this.alertSubmit = true;

      setTimeout(() => this.closeAlertSubmit(), 5 * 1000);

      this.editEducForm.reset();

    } else {
      this.editEducForm.markAllAsTouched();
    }
  }

}