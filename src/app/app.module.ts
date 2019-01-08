import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatToolbarModule, MatDividerModule,
  MatSelectModule, MatTabsModule, MatIconModule, MatCardModule, MatSidenavModule,
  MatAutocompleteModule, MatInputModule, MatRadioModule, MatTableModule, MatDialogModule,
  MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { ToastrModule } from 'ngx-toastr';
import { SidenavComponent } from './components/home/sidenav/sidenav/sidenav.component';
import { LogoComponent } from './components/home/sidenav/header/logo/logo.component';
import { ToolbarComponent } from './components/home/toolbar/toolbar/toolbar.component';
import { ProfileComponent } from './components/home/toolbar/profile/profile.component';
import { HeaderComponent } from './components/home/sidenav/header/header/header.component';
import { NewAnalisysComponent } from './components/new-analisys/new-analisys.component';
import { FooterComponent } from './components/home/footer/footer.component'

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LogoComponent,
    ToolbarComponent,
    ProfileComponent,
    HeaderComponent,
    NewAnalisysComponent,
    FooterComponent
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
    HttpModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
