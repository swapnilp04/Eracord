import { Component, OnInit } from '@angular/core';
import { UserService } from './../../service/user.service';
import { LoginService } from './../../service/login.service';
import { User } from './../../interface/user';
import { AlertService } from '../../service/alert.service';
import { faUserPlus, faUserCheck, faUserXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent  implements OnInit {

  public users: User[] = [];
  faUserPlus = faUserPlus;
  faUserCheck = faUserCheck;
  faUserXmark = faUserXmark;
  constructor(private userService: UserService, private loginService: LoginService, private alertService: AlertService){}


  ngOnInit(): void {
    this.loadUsers();
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }else if (error.status == 500) { 
      this.alertService.error(error.error.message);
    }
    if(error.status == 0) {
      this.loginService.toLogin();
    }
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe (
      (response: any) => this.assignUsers(response),
      (error: any) => this.errorHandle(error),
      () => console.log('Done getting Users......')
    );
  }

  deactiveUser(user: any): void {
    if(confirm("Are you sure to Deactivate User")) {
      this.userService.deactiveUser(user.id).subscribe (
        (response: any) => this.successDeactiveUser(user),
        (error: any) => this.errorHandle(error),
        () => console.log('Done getting Users......')
      );
    }
  }

  activeUser(user: any): void {
    if(confirm("Are you sure to Activate User")) {
      this.userService.activeUser(user.id).subscribe (
        (response: any) => this.successActiveUser(user),
        (error: any) => this.errorHandle(error),
        () => console.log('Done getting Users......')
      );
    }
  }
  
  assignUsers(response: any) {
    this.users = response
  }

  successDeactiveUser(user: any): void {
    this.alertService.success("User Deactiveted");
    user.active = false;
  }

  successActiveUser(user: any): void {
    this.alertService.success("User Activeted");
    user.active = true;
  }
}
