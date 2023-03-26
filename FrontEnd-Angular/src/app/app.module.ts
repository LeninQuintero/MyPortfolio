import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { ContactFormComponent } from './components/main/contact-form/contact-form.component';
import { BannerComponent } from './components/main/banner/banner.component';
import { ProfileComponent } from './components/main/profile/profile.component';
import { ArticlesGridComponent } from './components/main/articles-grid/articles-grid.component';
import { SkillsComponent } from './components/main/skills/skills.component';
import { ProjectsComponent } from './components/main/projects/projects.component';
import { AcercaDeComponent } from './components/main/articles-grid/acerca-de/acerca-de.component';
import { ExperiencesComponent } from './components/main/articles-grid/experiences/experiences.component';
import { EducationComponent } from './components/main/articles-grid/education/education.component';
import { CertificationsComponent } from './components/main/articles-grid/certifications/certifications.component';
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';
import { TriggerLoginModalComponent } from './components/buttons/trigger-login-modal/trigger-login-modal.component';
import { TogglerUserMenuComponent } from './components/buttons/toggler-user-menu/toggler-user-menu.component';
import { NavbarTogglerComponent } from './components/buttons/navbar-toggler/navbar-toggler.component';
import { EditBannerModalComponent } from './components/modals/edit-banner-modal/edit-banner-modal.component';
import { EditProfilePictureModalComponent } from './components/modals/edit-profile-picture-modal/edit-profile-picture-modal.component';
import { EditProfileTitleModalComponent } from './components/modals/edit-profile-title-modal/edit-profile-title-modal.component';
import { EditAcercadeModalComponent } from './components/modals/edit-acercade-modal/edit-acercade-modal.component';
import { AddExperienceModalComponent } from './components/modals/add-experience-modal/add-experience-modal.component';
import { EditExperienceModalComponent } from './components/modals/edit-experience-modal/edit-experience-modal.component';
import { EditEducationModalComponent } from './components/modals/edit-education-modal/edit-education-modal.component';
import { AddEducationModalComponent } from './components/modals/add-education-modal/add-education-modal.component';
import { AddCertificationModalComponent } from './components/modals/add-certification-modal/add-certification-modal.component';
import { EditCertificationModalComponent } from './components/modals/edit-certification-modal/edit-certification-modal.component';
import { ShowCertificateModalComponent } from './components/modals/show-certificate-modal/show-certificate-modal.component';
import { AddSkillModalComponent } from './components/modals/add-skill-modal/add-skill-modal.component';
import { EditSkillModalComponent } from './components/modals/edit-skill-modal/edit-skill-modal.component';
import { EditProjectModalComponent } from './components/modals/edit-project-modal/edit-project-modal.component';
import { AddProjectModalComponent } from './components/modals/add-project-modal/add-project-modal.component';
import { TriggerAddItemComponent } from './components/buttons/trigger-add-item/trigger-add-item.component';
import { TriggerEditItemComponent } from './components/buttons/trigger-edit-item/trigger-edit-item.component';
import { TriggerShowCertificateComponent } from './components/buttons/trigger-show-certificate/trigger-show-certificate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesComponent } from './pages/messages/messages.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';






@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    ContactFormComponent,
    BannerComponent,
    ProfileComponent,
    ArticlesGridComponent,
    SkillsComponent,
    ProjectsComponent,
    AcercaDeComponent,
    ExperiencesComponent,
    EducationComponent,
    CertificationsComponent,
    LoginModalComponent,
    TriggerLoginModalComponent,
    TogglerUserMenuComponent,
    NavbarTogglerComponent,
    EditBannerModalComponent,
    EditProfilePictureModalComponent,
    EditProfileTitleModalComponent,
    EditAcercadeModalComponent,
    AddExperienceModalComponent,
    EditExperienceModalComponent,
    EditEducationModalComponent,
    AddEducationModalComponent,
    AddCertificationModalComponent,
    EditCertificationModalComponent,
    ShowCertificateModalComponent,
    AddSkillModalComponent,
    EditSkillModalComponent,
    EditProjectModalComponent,
    AddProjectModalComponent,
    TriggerAddItemComponent,
    TriggerEditItemComponent,
    TriggerShowCertificateComponent,
    MessagesComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }