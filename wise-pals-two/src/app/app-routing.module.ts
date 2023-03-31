import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { TutorStatisticsComponent } from './tutor-statistics/tutor-statistics.component';
import { TutorListComponent } from './tutor-list/tutor-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'statistics', component: TutorStatisticsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tutorlist', component: TutorListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
