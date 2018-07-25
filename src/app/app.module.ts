import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DevopsHttpService} from './devops-http.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ReportComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    DevopsHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
