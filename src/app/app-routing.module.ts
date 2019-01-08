import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NewAnalisysComponent } from './components/new-analisys/new-analisys.component';

const routes: Routes = [
  {path: 'newanalisys', component: NewAnalisysComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
