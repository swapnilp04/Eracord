import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {LoginService} from '../service/login.service';
import { AlertService } from '../service/alert.service';
import { User } from '../interface/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public user :User = {username: "", password: ""};
  
  dismissible = true;
  
  constructor(private cookies: CookieService, private loginService: LoginService, 
    private _router: Router,
     private alertService: AlertService) { 
  }

  login() {
    this.loginService.loginUser(this.user).subscribe(
      (response: any) => this.successResponse(response),
      (error: any) => this.errorResponse(error),
      () => console.log('Done getting Student......')
    );
  };

  successResponse(response: any) {
    this.cookies.set('isLogin', 'true');
    this.cookies.set('token', response['token']);
    this.cookies.set('username', response['username']);
    this.cookies.set('role', response['role']);
    this.loginService.isLogin = true;
    this.loginService.username = response['username'];
    this._router.navigateByUrl('/dashboard');  // open welcome component
    this.alertService.success("Login Successful");
  }

  errorResponse(error: any): void {
    if(error.status == 400) {
      this.alertService.error(error.error.error);
    } 
  }  
}
