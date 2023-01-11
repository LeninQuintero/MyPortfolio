import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { HomeComponent } from './components/home/home.component';
import { UserResolver } from './resolver/username.route.resolver';
import { ProfileGuard } from './guards/profile.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: ':username', component: MainComponent, resolve: { username: UserResolver } },
  { path: ':username/mensajes', component: MessagesComponent, canActivate: [ProfileGuard], resolve: { username: UserResolver } },
  { path: '**', redirectTo: 'home' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }