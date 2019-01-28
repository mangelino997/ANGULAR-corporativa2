import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewAnalysisComponent } from './components/new-analysis/new-analysis.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyAnalysisComponent } from './components/my-analysis/my-analysis.component';

const routes: Routes = [
  {path: 'newanalysis', component: NewAnalysisComponent},
  {path: 'myanalysis', component: MyAnalysisComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
