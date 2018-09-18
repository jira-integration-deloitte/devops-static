import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DevopsHttpService} from './devops-http.service';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import { TableDataComponent } from './table-data/table-data.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './table-data/sidebar.component';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
      path: 'reports',
      component: ReportComponent
    },
    {
        path: 'tabledata',
        component: TableDataComponent
    }
];

@NgModule({
  declarations: [
      AppComponent,
      ReportComponent,
      LoginComponent,
      TableDataComponent,
      HeaderComponent,
      FooterComponent,
      SidebarComponent
  ],
  imports: [
      RouterModule.forRoot(appRoutes),
      FormsModule,
      BrowserModule,
      HttpClientModule
  ],
  providers: [
    HttpClient,
    DevopsHttpService,
    FooterComponent,
    SidebarComponent,
    TableDataComponent,
    {
        provide: LocationStrategy,
        useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
