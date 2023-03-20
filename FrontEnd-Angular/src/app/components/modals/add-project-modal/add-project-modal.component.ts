import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project, ProjectService } from 'src/app/services/project.service';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss']
})
export class AddProjectModalComponent implements OnInit {

  public projects: Project[] = [];
  public user: UserProfile = {
    name: '',
    title: '',
    urlProfilePic: '',
    urlBannerSm: '',
    urlBannerLg: '',
    aboutMe: '',
    urlGithub: '',
    urlTwitter: '',
    urlLinkedin: '',
    urlProfile: '',
    id: 0
  };

  public id: number = 0;
  private switchValue: boolean = false;
  private imgFormat: string | undefined;

  public minLengthPictureName: number = 1;
  public maxLengthPictureName: number = 50;
  public spinnerButton: boolean = false;
  public errorMaxSize: boolean = false;
  private directoryName: any;

  private imgSize: number = 0;
  private maxImageSize: number = 5242880;
  private image: any;

  alertSubmit: boolean = false;

  addProjectForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private fb: FormBuilder,
    private upFileService: UploadFilesService,
    private route: ActivatedRoute) {
      
    this.directoryName = this.route.snapshot.paramMap.get('username')?.toLowerCase();

    this.addProjectForm = this.fb.group({
      title: ['', [Validators.required]],
      urlProjectImg: [,[Validators.required]],
      urlProject: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.userService.getUser.subscribe(user => {
      this.id = user.id;
      this.user = user;
      this.projectService.getProject(user.id).subscribe(projects => {
        this.projects = projects;
      });
    });

    this.userService.getUser$.subscribe(() => {
      this.userService.getUser.subscribe(user => {
        this.id = user.id;
        this.user = user;
        this.projectService.getProject(user.id).subscribe(projects => {
          this.projects = projects;
        });
      });
    })
  }

  isValidField(field: string) {
    const fieldName = this.addProjectForm.get(field);
    return fieldName?.valid && (fieldName?.touched || fieldName?.dirty);
  }

  isInvalidField(field: string) {
    const fieldName = this.addProjectForm.get(field);
    return fieldName?.invalid && (fieldName?.touched || fieldName?.dirty);
  }

  errorsFeedback(field: string, validator: string) {
    const fieldName = this.addProjectForm.get(field);
    return fieldName?.hasError(validator);
  }

  requiredType(field: string, validator: string, type: string) {
    const fieldName = this.addProjectForm.get(field);
    return fieldName?.errors?.[validator]?.[type];
  }

  closeAlertSubmit() {
    this.alertSubmit = false;
  }

  captureFile(event: any) {
    this.image = event.target.files[0];
    this.imgSize = this.image.size;
    this.imgFormat = this.upFileService.getImageFormat(this.image.name);

    if (this.addProjectForm.valid) {

      if (this.imgSize <= this.maxImageSize) {
        this.errorMaxSize = false;
      } else {
        this.errorMaxSize = true;
      }
    }
  }

  submit(event: Event) {

    if (this.addProjectForm.valid) {
      let list = this.projects;
      let newProject: Project = this.addProjectForm.value;
     
      this.projectService.addProject(newProject, this.user.id).subscribe( project => {
        newProject = project;

          this.upFileService.uploadFileFire(this.image, this.directoryName, `project-${project.id}.${this.imgFormat}`)
            .then(resp => {
              this.upFileService.getUrlUpFileFire(resp).then(url => {
                newProject.urlProjectImg = url;
                this.projectService.editProject(newProject).subscribe(project => {
                  list.push(project);
                  this.projectService.getNewProject$.next(list);
                  this.userService.getUser$.next(this.user);
                })
              })
                .catch(error => {
                  console.log(error);
                })
            })
            .catch(error => {
              console.log(error);
            })
      });

      this.alertSubmit = true;
      setTimeout(() => this.closeAlertSubmit(), 5 * 1000);
      this.addProjectForm.reset();

    } else {
      this.addProjectForm.markAllAsTouched();
    }
  }

}
