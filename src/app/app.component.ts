import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {LoginService} from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eracord';
  
  constructor(private cookies: CookieService, private loginService: LoginService) {
    this.loginService.isLogin = this.cookies.get("isLogin") == "true";
  }

  public get isLogin() {
    return this.loginService.isLogin;
  }
}
