import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatDividerModule,
  MatSelectModule, MatTabsModule, MatIconModule, MatCardModule, MatSidenavModule,
  MatAutocompleteModule, MatInputModule, MatRadioModule, MatTableModule, MatDialogModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatListModule, MatStepperModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { StompConfig, StompService } from '@stomp/ng2-stompjs';

//Servicios
import { TypeRehabilitationService } from './services/type-rehabilitation.service';
import { AfImageGifService } from './services/af-image-gif.service';
import { IndicativeImageService } from './services/indicative-image.service';
import { AtImageGifService } from './services/at-image-gif.service';
import { AoImageGifService } from './services/ao-image-gif.service';
import { ModuleService } from './services/module.service';

//Modelos
import { Analysis } from './modules/analysis';
import { Patient } from './modules/patient';
import { TypeRehabilitation } from './modules/type-rehabilitation';

//Componentes
import { SidenavComponent } from './components/home/sidenav/sidenav/sidenav.component';
import { LogoComponent } from './components/home/sidenav/header/logo/logo.component';
import { ToolbarComponent } from './components/home/toolbar/toolbar/toolbar.component';
import { ToolbarProfileComponent } from './components/home/toolbar/toolbar-profile/toolbar-profile.component';
import { HeaderComponent } from './components/home/sidenav/header/header/header.component';
import { NewAnalysisComponent } from './components/new-analysis/new-analysis.component';
import { FooterComponent } from './components/home/footer/footer.component'
import { ProfileComponent } from './components/profile/profile.component';
import { FooterSidenavComponent } from './components/home/sidenav/footer-sidenav/footer-sidenav.component';
import { PatientDataComponent } from './components/new-analysis/patient-data/patient-data.component';
import { PatientPhotoComponent } from './components/new-analysis/patient-photo/patient-photo.component';
import { AnalysisPhotographyComponent } from './components/new-analysis/analysis-photography/analysis-photography.component';
import { PatientRadiographyComponent } from './components/new-analysis/patient-radiography/patient-radiography.component';
import { AnalysisTeleradiographyComponent } from './components/new-analysis/analysis-teleradiography/analysis-teleradiography.component';
import { AnalysisOrthopantographyComponent } from './components/new-analysis/analysis-orthopantography/analysis-orthopantography.component';
import { AnalysisCandilographyComponent } from './components/new-analysis/analysis-candilography/analysis-candilography.component';
import { LoginComponent } from './components/login/login.component';
import { ProfessionalDataComponent } from './components/new-analysis/professional-data/professional-data.component';
import { ResultsComponent } from './components/new-analysis/results/results.component';
import { PhotographyImageService } from './services/photography-image.service';
import { OrthopantomographyImageService } from './services/orthopantomography-image.service';
import { CondylegraphyImageService } from './services/condylegraphy-image.service';
import { TeleradiographyImageService } from './services/teleradiography-image.service';
import { DateService } from './services/date.service';
import { AnalysisService } from './services/analysis.service';
import { MyAnalysisComponent } from './components/my-analysis/my-analysis.component';
import { MatStepper } from '@angular/material';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { PatientPhoto } from './modules/patiente-photo';
import { AnalysisPhotography } from './modules/analysisPhotography';
import { PatientRadiography } from './modules/patient-radiography';
import { AnalysisTeleradiography } from './modules/analysis-teleradiography';
import { AnalysisOrthopantomography } from './modules/analysis-orthopantomography';
import { AnalysisCondylegraphy } from './modules/analysis-condylegraphy';

const stompConfig: StompConfig = {
  url: 'ws://localhost:8084/meserws/socket',
  headers: {},
  heartbeat_in: 0,
  heartbeat_out: 20000,
  reconnect_delay: 5000,
  debug: true
};

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LogoComponent,
    ToolbarComponent,
    ToolbarProfileComponent,
    HeaderComponent,
    NewAnalysisComponent,
    FooterComponent,
    ProfileComponent,
    FooterSidenavComponent,
    PatientDataComponent,
    PatientPhotoComponent,
    AnalysisPhotographyComponent,
    PatientRadiographyComponent,
    AnalysisTeleradiographyComponent,
    AnalysisOrthopantographyComponent,
    AnalysisCandilographyComponent,
    LoginComponent,
    ProfessionalDataComponent,
    ResultsComponent,
    MyAnalysisComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatStepperModule,
    HttpModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    Analysis,
    Patient,
    PatientPhoto,
    AnalysisPhotography,
    PatientRadiography,
    PatientRadiography,
    AnalysisTeleradiography,
    TypeRehabilitation,
    TypeRehabilitationService,
    AfImageGifService,
    AtImageGifService,
    AoImageGifService,
    AnalysisOrthopantomography,
    AnalysisCondylegraphy,
    IndicativeImageService,
    PhotographyImageService,
    TeleradiographyImageService,
    OrthopantomographyImageService,
    CondylegraphyImageService,
    DateService,
    AnalysisService,
    ModuleService,
    StompService,
    {
      provide: StompConfig,
      useValue: stompConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }