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
import { BatchsComponent } from './batchs/batchs/batchs.component';
import { BatchComponent } from './batchs/batch/batch.component';
import { BatchAddEditComponent } from './batchs/batch-add-edit/batch-add-edit.component';

import { HostelsComponent } from './hostels/hostels/hostels.component';
import { HostelComponent } from './hostels/hostel/hostel.component';
import { HostelAddEditComponent } from './hostels/hostel-add-edit/hostel-add-edit.component';
import { HostelRoomAddEditComponent } from './hostel-room/hostel-room-add-edit/hostel-room-add-edit.component';
import { HostelRoomComponent } from './hostel-room/hostel-room/hostel-room.component';

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

  {path: 'batchs' , component: BatchsComponent},
  {path: 'batchs/new' , component: BatchAddEditComponent},
  {path: 'batchs/:id' , component: BatchComponent},
  {path: 'batchs/:id/edit' , component: BatchAddEditComponent},

  {path: 'hostels' , component: HostelsComponent},
  {path: 'hostels/new' , component: HostelAddEditComponent},
  {path: 'hostels/:id' , component: HostelComponent},
  {path: 'hostels/:id/edit' , component: HostelAddEditComponent},

  {path: 'hostels/:hostel_id/hostel-rooms/new' , component: HostelRoomAddEditComponent},
  {path: 'hostels/:hostel_id/hostel-rooms/:id' , component: HostelRoomComponent},
  {path: 'hostels/:hostel_id/hostel-rooms/:id/edit' , component: HostelRoomAddEditComponent},
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
