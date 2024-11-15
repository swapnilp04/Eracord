import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {LoginService} from '../service/login.service';
import { User } from '../interface/user';
import { Alert } from './../interface/alert';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public user :User = {username: "", password: ""};
  public alerts: Alert[] = [];
  dismissible = true;
  
  constructor(private cookies: CookieService, private loginService: LoginService, private _router: Router) { 
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
    this.loginService.isLogin = true;
    this.loginService.username = response['username'];
    this._router.navigateByUrl('/dashboard');  // open welcome component
  }

  errorResponse(error: any): void {
    if(error.status == 400) {
      this.alerts.push({type:"danger", msg: error.error.error});
    } 
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
