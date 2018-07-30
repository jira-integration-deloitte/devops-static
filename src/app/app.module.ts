import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DevopsHttpService} from './devops-http.service';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
      path: 'reports',
      component: ReportComponent
    }
];

@NgModule({
  declarations: [
      AppComponent,
      ReportComponent,
      LoginComponent
  ],
  imports: [
      RouterModule.forRoot(appRoutes),
      FormsModule,
      BrowserModule,
      HttpClientModule,
      Ng2GoogleChartsModule
  ],
  providers: [
    HttpClient,
    DevopsHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
