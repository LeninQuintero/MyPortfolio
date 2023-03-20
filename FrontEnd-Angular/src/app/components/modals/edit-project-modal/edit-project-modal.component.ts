import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Project, ProjectService } from 'src/app/services/project.service';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-project-modal',
  templateUrl: './edit-project-modal.component.html',
  styleUrls: ['./edit-project-modal.component.scss']
})
export class EditProjectModalComponent implements OnInit {
@Input() 
idModal: string | undefined;

@Input() 
project: Project= {
  id: 0,
  title: '',
  urlProjectImg: '',
  urlProject: '',
  description: ''
}

public editProjectForm: FormGroup;
public spinnerButton: boolean = false;
public errorMaxSize: boolean = false;
private directoryName: any;
private imgSize: number = 0;
private maxImageSize: number = 5242880;
private image: any;
private imgFormat: string | undefined;
private projects: Project[] = [];
private alertSubmit: boolean;
private userId: number = 0;

constructor(private userService: UserService,
  private fb: FormBuilder,
  private projectService: ProjectService,
  private upFilesService: UploadFilesService,
  private route: ActivatedRoute) {

  this.directoryName = this.route.snapshot.paramMap.get('username')?.toLowerCase();
  
  this.editProjectForm = this.fb.group({
    id: [, [Validators.required]],
    title: ['', [Validators.required]],
    urlProjectImg: [,],
    urlProject: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });
  this.alertSubmit = false;
}

ngOnInit(): void {
  this.userService.getUser.subscribe(user => {
    this.userId = user.id;
    this.projectService.getProject(user.id).subscribe(projects => {
      this.projects = projects;
    });
  });

  this.editProjectForm.controls['id'].setValue(this.project.id);
  this.editProjectForm.controls['title'].setValue(this.project.title);
  this.editProjectForm.controls['urlProject'].setValue(this.project.urlProject);
  this.editProjectForm.controls['description'].setValue(this.project.description);
}

closeAlertSubmit() {
  this.alertSubmit = false;
}

captureFile(event: any) {
  this.image = event.target.files[0];
  this.imgSize = this.image.size;
  this.imgFormat = this.upFilesService.getImageFormat(this.image.name);
  if (this.editProjectForm.valid) {
    if (this.imgSize <= this.maxImageSize) {
      this.errorMaxSize = false;
    } else{
      this.errorMaxSize = true;
    }
  }
}

projectDelete(event: Event) {
  this.projectService.deleteProject(this.project.id).subscribe(() => {
    let list = this.projects;
    const fileName = this.upFilesService.getFileNameFromUrl(this.project.urlProjectImg);
    const fileExt = this.upFilesService.getFileExtFromUrl(fileName);
    const fileUrl = `project-${this.project.id}.${fileExt}`;

    this.upFilesService.deleteFileFire(this.directoryName, fileUrl);

    list.filter(educ => { return educ.id !== this.project.id });
    this.projectService.getNewProject$.next(list);
  });
}

submit(event: Event) {
  if (this.editProjectForm.valid) {
    let list = this.projects;
    let newProject: Project = this.editProjectForm.value;
    let urlImg = this.project.urlProjectImg;

    if (this.editProjectForm.get('urlProjectImg')?.dirty) {
      this.upFilesService.uploadFileFire(this.image, this.directoryName, `project-${this.project.id}.${this.imgFormat}`)
        .then(resp => {
          this.upFilesService.getUrlUpFileFire(resp).then(url => {
            newProject.urlProjectImg = url
            this.projectService.editProject(newProject).subscribe(project => {
              list.push(project);
              this.projectService.getNewProject$.next(list);
            })
          }).catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    } else {
      newProject.urlProjectImg = urlImg;
      this.projectService.editProject(newProject).subscribe(project => {
        list.push(project);
        this.projectService.getNewProject$.next(list);
      })
    }

    this.alertSubmit = true;

    setTimeout(() => this.closeAlertSubmit(), 5 * 1000);

    this.editProjectForm.reset();

  } else {
    this.editProjectForm.markAllAsTouched();
  }
}

}
