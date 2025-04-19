import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {LoginService} from './service/login.service';
import { Observable } from 'rxjs';
import { setTheme } from 'ngx-bootstrap/utils';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BreakpointObserver,Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class AppComponent implements OnInit {
  title = 'Eracord';
  role = "";
  responsiveClass = "";
  
  constructor(private cookies: CookieService, private loginService: LoginService, private router: Router, 
    public responsive: BreakpointObserver) {
    this.loginService.isLogin = this.cookies.get("isLogin") == "true";
    this.loginService.username = this.cookies.get("username");
    this.loginService.role = this.cookies.get("role");
    this.role = this.cookies.get('role');


    type HttpRespone = {code: number, data: string};

    const observable = new Observable<HttpRespone>(subscriber => {
      console.log('Inside subscriber ...');
      subscriber.next({code: 200, data:"This is data 1....."})
      subscriber.next({code: 200, data:"This is data 1....."})
      subscriber.next({code: 200, data:"This is data 1....."})
      subscriber.error({code: 500, data:"An Error occured"})
      subscriber.error({code: 403, data:"Forbidden"})
      setTimeout(() => {
        subscriber.next({code: 200, data:"This is more data ....."});
        subscriber.complete();
      }, 3 * 1000);
      console.log('subscriber is done emitting ...');
    });

    // observable.subscribe({
    //   next(response: HttpRespone) {
    //     console.log('Got Data', response);
    //   },
    //   error(error: any) {
    //     console.log('Error Occured   ', error);
    //   },
    //   complete() {
    //     console.log('Done .......');
    //   }
    // });
    setTheme('bs5');
  }


  ngOnInit() {
    this.responsive.observe([ Breakpoints.XSmall, 
      Breakpoints.Small, 
      Breakpoints.Medium, 
      Breakpoints.Large, 
      Breakpoints.XLarge])
      .subscribe(result => {
        if(result.breakpoints['(max-width: 599.98px)']) {
          this.responsiveClass = "XSmall";
        } else if(result.breakpoints['(min-width: 600px) and (max-width: 959.98px)']) {
          this.responsiveClass = "Small";
        } else if(result.breakpoints['(min-width: 960px) and (max-width: 1279.98px)']) {
          this.responsiveClass = "Medium";
        } else if(result.breakpoints['(min-width: 1280px) and (max-width: 1919.98px)']) {
          this.responsiveClass = "Large";
        } else {
          this.responsiveClass = "Default";
        }
        
    });  
  }

  public activeLink(str: string) {
    return this.router.url.split('?')[0]  == str;
  }

  public loginLink(): string {
    return this.loginService.isLogin == true ? "/dashboard" : "/"
  }

  public get isLogin() {
    return this.loginService.isLogin;
  }

  isTeacher() {
    return this.cookies.get('role') == "Teacher";
  }

  isAdmin() {
    return this.cookies.get('role') == "Admin";
  }

  isAdminAccountant() { 
    return this.role == "Admin" || this.role == "Accountant";
  }

  public get getUsername() {
    return this.loginService.username; 
  }

  logoutUser(): void {
    this.loginService.logoutUser().subscribe (
      (response: any) => this.successLogout(),
      (error: any) => console.log(error),
      () => console.log('Done getting Hostel......')
    );
  }

  successLogout() {
    this.loginService.toLogin()
    this.router.navigate(['/']);
  }
}
