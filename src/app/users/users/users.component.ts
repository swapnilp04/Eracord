import { Component, OnInit } from '@angular/core';
import { UserService } from './../../service/user.service';
import { LoginService } from './../../service/login.service';
import { User } from './../../interface/user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent  implements OnInit {

  public users: User[] = [];
  constructor(private userService: UserService, private loginService: LoginService){}


  ngOnInit(): void {
    this.loadUsers();
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
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
  
  assignUsers(response: any) {
    this.users = response
  }
}
