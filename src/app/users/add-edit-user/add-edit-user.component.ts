import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from './../../service/user.service';
import { LoginService } from './../../service/login.service';
import { User } from './../../interface/user';
import { Transaction } from './../../interface/transaction';
import { Cheque } from './../../interface/cheque';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit{
  public user = {} as User;
  public isNew = true;
  public isLoading: boolean = false;

  constructor(private userService: UserService, private location: Location, private router: Router, private route: ActivatedRoute, 
    private loginService: LoginService){}

  ngOnInit(): void {
    this.user.role = "Clerk";
    if(this.router.url.includes('/edit')) {
      this.isNew = false;
    }
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    }
  }

  createUser(user: User): void {
    this.userService.createUser(user).subscribe (
      (response: any) => this.back(),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting User......')
    );
  }

  updateUser(user: User): void {
    this.userService.createUser(user).subscribe (
      (response: any) => this.back(),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting User......')
    );
  }

  loadUser(userID: number): void {
    this.userService.getUser(userID).subscribe (
      (response: any) => this.assignUser(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting User......')
    );
  }

  assignUser(response: any) {
    this.user = response;
  }


  onChangeRole(newObj: number): void {
    this.user.role = newObj.toString();

  }

  back(): void {
    this.router.navigate(['/users']);
  }
}
