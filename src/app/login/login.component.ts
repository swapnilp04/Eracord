import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {LoginService} from '../service/login.service';
import { User } from '../interface/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public user :User = {username: "", password: ""};
  
  constructor(private cookies: CookieService, private loginService: LoginService, private _router: Router) { 
  }

  login() {
    this.loginService.loginUser(this.user).subscribe(
      (response: any) => this.successResponse(response),
      (error: any) => console.log(error),
      () => console.log('Done getting Student......')
    );
  };

  successResponse(response: any) {
    this.cookies.set('isLogin', 'true');
    this.cookies.set('token', response['token']);
    this.loginService.isLogin = true;
    this._router.navigateByUrl('/dashboard');  // open welcome component
  }
}
