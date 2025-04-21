import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from './../../service/user.service';
import { LoginService } from './../../service/login.service';
import { User } from './../../interface/user';
import { Transaction } from './../../interface/transaction';
import { Cheque } from './../../interface/cheque';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../service/alert.service';
import {  faChevronLeft, faCircleCheck} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit{
  public user = {} as User;
  public isNew = true;
  public isLoading = false;
  faChevronLeft = faChevronLeft;
  faCircleCheck = faCircleCheck;

  constructor(private userService: UserService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService, private alertService: AlertService){}

  ngOnInit(): void {
    this.user.role = "Clerk";
    if(this.router.url.includes('/edit')) {
      this.loadUser()
      this.isNew = false;
    }
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
  }

  createUser(user: User): void {
    this.isLoading = true;
    this.userService.createUser(user).subscribe (
      (response: any) => this.successCreateUser(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  successCreateUser(response: any): void {
    this.back();
    this.alertService.success("New User has been created Successful");
  }

  updateUser(user: User): void {
    this.isLoading = true;
    this.userService.updatePassword(user).subscribe (
      (response: any) => this.logoutUser(),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  loadUser(): void {
    this.isLoading = true;
    this.userService.getUser().subscribe (
      (response: any) => this.assignUser(response),
      (error: any) => this.errorHandle(error),
      () => this.isLoadingFalse()
    );
  }

  assignUser(response: any) {
    this.user = response;
  }


  onChangeRole(newObj: number): void {
    this.user.role = newObj.toString();

  }

  back(): void {
    this.location.back();
  }

  isLoadingFalse(): void {
    this.isLoading = false;    
  }

  logoutUser(): void {
    this.loginService.logoutUser().subscribe (
      (response: any) => this.loginService.toLogin(),
      (error: any) => console.log(error),
      () => console.log('Done getting Hostel......')
    );
  }
}
