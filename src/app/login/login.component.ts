import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service'
import {LoginService} from '../service/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   user = {name: "", password: ""};
   

  constructor(private cookies: CookieService, private loginService: LoginService) { 
  }

  login() {
    // this.apiService.postApi("/login", this.user).subscribe
    // ((data) => {

    // });
    // alert(this.user.name);

     this.cookies.set("isLogin", "true");
     this.loginService.isLogin = true;

  };
}
