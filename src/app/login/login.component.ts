import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service'
import {LoginService} from '../login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private cookies: CookieService, private loginService: LoginService) { 
  }

  click() {
    this.cookies.set("isLogin", "true");
    this.loginService.isLogin = true;
  };
}
