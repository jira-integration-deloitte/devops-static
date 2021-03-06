import { Component, OnInit } from '@angular/core';
import {DevopsHttpService} from '../devops-http.service';
import {Router} from '@angular/router';
import {Constants} from '../constants';

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
    const url = Constants.HOST + '/devops-service/app/login';

    console.log(dataStr);

    this.service.postData(url, JSON.parse(dataStr)).subscribe(response => {
      console.log(response);
      this.router.navigate(['reports']);
    });
  }

}
