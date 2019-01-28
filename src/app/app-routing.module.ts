import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NewAnalysisComponent } from './components/new-analysis/new-analysis.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyAnalysisComponent } from './components/my-analysis/my-analysis.component';

const routes: Routes = [
  {path: 'newanalysis', component: NewAnalysisComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'generalesmisanalisis', component: MyAnalysisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
