import { Component, OnInit } from '@angular/core';
import {DevopsHttpService} from '../devops-http.service';
import {compileComponent} from '@angular/compiler/src/render3/r3_view_compiler';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service: DevopsHttpService, private router: Router) { }

  userName: String;
  password: String;

  doLogin() {
    const userName = this.userName;
    const password = this.password;

    const dataStr = '{"userName" : "' + userName + '", "password" : "' + password + '"}';
    const url = 'http://localhost:8088/devops-service/app/login';

    console.log(dataStr);

    this.service.postData(url, JSON.parse(dataStr)).subscribe(response => {
      console.log(response);
      this.router.navigate(['reports']);
    });
  }

}
