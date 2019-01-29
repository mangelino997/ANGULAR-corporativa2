import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewAnalysisComponent } from './components/new-analysis/new-analysis.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyAnalysisComponent } from './components/my-analysis/my-analysis.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IndicativeImageComponent } from './components/indicative-image/indicative-image.component';
import { PhotographyGifComponent } from './components/photography-gif/photography-gif.component';
import { TeleradiographyGifComponent } from './components/teleradiography-gif/teleradiography-gif.component';
import { OrthopantomographyGifComponent } from './components/orthopantomography-gif/orthopantomography-gif.component';
import { CondylegraphyGifComponent } from './components/condylegraphy-gif/condylegraphy-gif.component';

const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'newanalysis', component: NewAnalysisComponent},
  {path: 'myanalysis', component: MyAnalysisComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'indicativeimage', component: IndicativeImageComponent},
  {path: 'gifphotography', component: PhotographyGifComponent},
  {path: 'gifteleradiography', component: TeleradiographyGifComponent},
  {path: 'giforthopantomography', component: OrthopantomographyGifComponent},
  {path: 'gifcondylegraphy', component: CondylegraphyGifComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }