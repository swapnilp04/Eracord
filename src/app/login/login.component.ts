import { Component, OnInit } from '@angular/core';
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

export class LoginComponent implements OnInit{
  public user :User = {username: "", password: ""};
  
  dismissible = true;

  isLoading = false;
  
  constructor(private cookies: CookieService, private loginService: LoginService, 
    private _router: Router,
     private alertService: AlertService) { 
  }

  ngOnInit(): void {
    this.checkLogin();
  }

  login() {
    this.isLoading = true;
    this.loginService.loginUser(this.user).subscribe(
      (response: any) => this.successResponse(response),
      (error: any) => this.errorResponse(error),
      () => this.reloadPage()
    );
  };

  checkLogin() {
    if(this.cookies.get('isLogin')) {
      this._router.navigateByUrl('/dashboard');
    }
  }

  successResponse(response: any) {
    this.cookies.deleteAll();
    this.cookies.set('isLogin', 'true');
    this.cookies.set('token', response['token']);
    this.cookies.set('username', response['username']);
    this.cookies.set('role', response['role']);
    this.cookies.set('id', response['id']);
    this.loginService.isLogin = true;
    this.loginService.username = response['username'];
    //this._router.navigateByUrl('/dashboard');  // open welcome component
    this.alertService.success("Login Successful");
    this.disableLoading()
  }

  disableLoading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }

  reloadPage() {
    window.location.reload(); 
    this.disableLoading();
  }

  errorResponse(error: any): void {
    if(error.status == 400) {
      this.alertService.error(error.error.error);
    }
    this.isLoading = false;    
  }  
}
