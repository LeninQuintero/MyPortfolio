import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MessagesComponent } from './pages/messages/messages.component';

const appRoutes: Routes=[
  {path: '', component:MainComponent},
  {path:'mensajes', component:MessagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
