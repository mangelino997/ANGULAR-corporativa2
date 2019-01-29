import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewAnalysisComponent } from './components/new-analysis/new-analysis.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyAnalysisComponent } from './components/my-analysis/my-analysis.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'newanalysis', component: NewAnalysisComponent},
  {path: 'myanalysis', component: MyAnalysisComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
