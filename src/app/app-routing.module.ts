import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { StudentComponent } from './student/student.component';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component';
import { StandardsComponent } from './standards/standards/standards.component';
import { StandardComponent } from './standards/standard/standard.component';
import { StandardAddEditComponent } from './standards/standard-add-edit/standard-add-edit.component';


const routes: Routes = [
  {path: 'login' , component: LoginComponent},
  {path: 'dashboard' , component: DashboardComponent},
  {path: 'students' , component: StudentsComponent},
  {path: 'students/new' , component: StudentAddEditComponent},
  {path: 'students/:id' , component: StudentComponent},
  {path: 'students/:id/edit' , component: StudentAddEditComponent},

  {path: 'standards' , component: StandardsComponent},
  {path: 'standards/new' , component: StandardAddEditComponent},
  {path: 'standards/:id' , component: StandardComponent},
  {path: 'standards/:id/edit' , component: StandardAddEditComponent},

  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
