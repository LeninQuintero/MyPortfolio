import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { HomeComponent } from './components/home/home.component';
import { UserResolver } from './resolver/username.route.resolver';
import { ProfileGuard } from './guards/profile.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: ':username', component: MainComponent, resolve: { username: UserResolver } },
  { path: ':username/mensajes', component: MessagesComponent, canActivate: [ProfileGuard], resolve: { username: UserResolver } },
  { path: '**', redirectTo: 'page-not-found' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }