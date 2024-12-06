import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students/students.component';
import { StudentComponent } from './students/student/student.component';
import { StudentAddEditComponent } from './students/student-add-edit/student-add-edit.component';
import { AssignHostelComponent } from './students/assign-hostel/assign-hostel.component';
import { SwapRoomComponent } from './students/swap-room/swap-room.component';
import { StandardsComponent } from './standards/standards/standards.component';
import { StandardComponent } from './standards/standard/standard.component';
import { StandardAddEditComponent } from './standards/standard-add-edit/standard-add-edit.component';
import { BatchsComponent } from './batchs/batchs/batchs.component';
import { BatchComponent } from './batchs/batch/batch.component';
import { BatchAddEditComponent } from './batchs/batch-add-edit/batch-add-edit.component';
import { BatchStandardAddEditComponent } from './batch-standards/batch-standard-add-edit/batch-standard-add-edit.component';
import { BatchStandardStudentAddEditComponent } from './batch-standard-students/batch-standard-student-add-edit/batch-standard-student-add-edit.component';
import { BatchStandardsStudentsComponent } from './batchs/batch-standards-students/batch-standards-students.component';

import { TransactionsAddEditComponent } from './transactions/transactions-add-edit/transactions-add-edit.component';
import { DiscountsAddEditComponent } from './transactions/discounts-add-edit/discounts-add-edit.component';
import { DuesComponent } from './transactions/dues/dues.component';

import { HostelsComponent } from './hostels/hostels/hostels.component';
import { HostelComponent } from './hostels/hostel/hostel.component';
import { HostelAddEditComponent } from './hostels/hostel-add-edit/hostel-add-edit.component';
import { StudentsListComponent } from './hostels/students-list/students-list.component'; // hostel students list
import { HostelRoomAddEditComponent } from './hostel-room/hostel-room-add-edit/hostel-room-add-edit.component';
import { HostelRoomComponent } from './hostel-room/hostel-room/hostel-room.component';
import { AllTransactionsComponent } from './accounts/all-transactions/all-transactions.component';
import { TransactionComponent } from './accounts/transaction/transaction.component';
import { UsersComponent } from './users/users/users.component';
import { AddEditUserComponent } from './users/add-edit-user/add-edit-user.component';
import { DepositComponent } from './student-accounts/deposit/deposit.component';
import { WithdrawComponent } from './student-accounts/withdraw/withdraw.component';
import { CommentsComponent } from './comments/comments/comments.component';
import { CommentAddEditComponent } from './comments/comment-add-edit/comment-add-edit.component';
import { ExamsComponent } from './exams/exams/exams.component';
import { ExamAddEditComponent } from './exams/exam-add-edit/exam-add-edit.component';

const routes: Routes = [
  {path: 'login' , component: LoginComponent},
  {path: 'dashboard' , component: DashboardComponent},
  {path: 'students' , component: StudentsComponent},
  {path: 'students/new' , component: StudentAddEditComponent},
  {path: 'students/:id' , component: StudentComponent},
  {path: 'students/:id' , component: StudentComponent},
  {path: 'students/:id/edit' , component: StudentAddEditComponent},
  {path: 'students/:id/assign-hostel' , component: AssignHostelComponent},
  {path: 'students/:id/change-room' , component: SwapRoomComponent},
  {path: 'students/:student_id/batch-standards/new' , component: BatchStandardStudentAddEditComponent},
  {path: 'students/:student_id/transactions/new' , component: TransactionsAddEditComponent},
  {path: 'students/:student_id/discounts/new' , component: DiscountsAddEditComponent},
  {path: 'students/:student_id/transactions/dues' , component: DuesComponent},
  {path: 'students/:student_id/student-accounts/deposit' , component: DepositComponent},
  {path: 'students/:student_id/student-accounts/withdraw' , component: WithdrawComponent},
  {path: 'students/:student_id/comments/new' , component: CommentAddEditComponent},

  {path: 'comments' , component: CommentsComponent},

  {path: 'exams' , component: ExamsComponent},
  {path: 'exams/new' , component: ExamAddEditComponent},

  {path: 'standards' , component: StandardsComponent},
  {path: 'standards/new' , component: StandardAddEditComponent},
  {path: 'standards/:id' , component: StandardComponent},
  {path: 'standards/:id/edit' , component: StandardAddEditComponent},

  {path: 'batchs' , component: BatchsComponent},
  {path: 'batchs/new' , component: BatchAddEditComponent},
  {path: 'batchs/:id' , component: BatchComponent},
  {path: 'batchs/:id/edit' , component: BatchAddEditComponent},
  {path: 'batchs/:batch_id/standards/new' , component: BatchStandardAddEditComponent},
  {path: 'batchs/:batch_id/standards/:id' , component: BatchStandardsStudentsComponent},
  {path: 'batchs/:batch_id/standards/:id/edit' , component: BatchStandardAddEditComponent},


  {path: 'hostels' , component: HostelsComponent},
  {path: 'hostels/new' , component: HostelAddEditComponent},
  {path: 'hostels/:id' , component: HostelComponent},
  {path: 'hostels/:id/edit' , component: HostelAddEditComponent},
  {path: 'hostels/:id/students-list' , component: StudentsListComponent},

  {path: 'hostels/:hostel_id/hostel-rooms/new' , component: HostelRoomAddEditComponent},
  {path: 'hostels/:hostel_id/hostel-rooms/:id' , component: HostelRoomComponent},
  {path: 'hostels/:hostel_id/hostel-rooms/:id/edit' , component: HostelRoomAddEditComponent},

  {path: 'transactions' , component: AllTransactionsComponent},
  {path: 'transactions/students/:student_id/receipt/:id' , component: TransactionComponent},

  {path: 'users' , component: UsersComponent},
  {path: 'users/new' , component: AddEditUserComponent},
  {path: 'users/edit' , component: AddEditUserComponent},
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
