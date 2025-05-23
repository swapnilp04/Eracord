import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { ToWords } from 'to-words';
import { NgChartsModule } from 'ng2-charts';
import { StudentComponent } from './students/student/student.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { StudentAddEditComponent } from './students/student-add-edit/student-add-edit.component';
import { StudentsComponent } from './students/students/students.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
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
import { HostelRoomsComponent } from './hostel-room/hostel-rooms/hostel-rooms.component';
import { HostelStudentsComponent } from './hostel-room/hostel-students/hostel-students.component';
import { AssignHostelComponent } from './students/assign-hostel/assign-hostel.component';
import { SwapRoomComponent } from './students/swap-room/swap-room.component';
import { AssignStandardComponent } from './batchs/assign-standard/assign-standard.component';
import { BatchStandardsComponent } from './batchs/batch-standards/batch-standards.component';
import { BatchStandardAddEditComponent } from './batch-standards/batch-standard-add-edit/batch-standard-add-edit.component';
import { BatchStandardStudentsComponent } from './batch-standard-students/batch-standard-students/batch-standard-students.component';
import { BatchStandardStudentAddEditComponent } from './batch-standard-students/batch-standard-student-add-edit/batch-standard-student-add-edit.component';
import { TransactionsComponent } from './transactions/transactions/transactions.component';
import { TransactionsAddEditComponent } from './transactions/transactions-add-edit/transactions-add-edit.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AllTransactionsComponent } from './accounts/all-transactions/all-transactions.component';
import { UsersComponent } from './users/users/users.component';
import { AddEditUserComponent } from './users/add-edit-user/add-edit-user.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { StudentAccountsComponent } from './student-accounts/student-accounts/student-accounts.component';
import { DepositComponent } from './student-accounts/deposit/deposit.component';
import { WithdrawComponent } from './student-accounts/withdraw/withdraw.component';
import { DuesComponent } from './transactions/dues/dues.component';
import { NgxPrintModule } from 'ngx-print';
import { TransactionComponent } from './accounts/transaction/transaction.component';
import { BatchStandardsStudentsComponent } from './batchs/batch-standards-students/batch-standards-students.component';
import { EditHostelComponent } from './students/edit-hostel/edit-hostel.component';
import { StudentsListComponent } from './hostels/students-list/students-list.component';
import { DiscountsAddEditComponent } from './transactions/discounts-add-edit/discounts-add-edit.component';
import { CommentsComponent } from './comments/comments/comments.component';
import { CommentAddEditComponent } from './comments/comment-add-edit/comment-add-edit.component';
import { StudentCommentsComponent } from './students/student-comments/student-comments.component';
import { ExamsComponent } from './exams/exams/exams.component';
import { ExamAddEditComponent } from './exams/exam-add-edit/exam-add-edit.component';
import { ExamComponent } from './exams/exam/exam.component';
import { ExamStudentsComponent } from './exams/exam-students/exam-students.component';
import { StudentExamsComponent } from './students/student-exams/student-exams.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { AlertComponent } from './alert/alert.component';
import { SubjectsComponent } from './subjects/subjects/subjects.component';
import { ChaptersComponent } from './chapters/chapters/chapters.component';
import { SubjectComponent } from './subjects/subject/subject.component';
import { SubjectAddEditComponent } from './subjects/subject-add-edit/subject-add-edit.component';
import { TeachersComponent } from './teachers/teachers/teachers.component';
import { TeacherAddEditComponent } from './teachers/teacher-add-edit/teacher-add-edit.component';
import { TeacherComponent } from './teachers/teacher/teacher.component';
import { TeacherLogsComponent } from './teacher-logs/teacher-logs/teacher-logs.component';
import { TeacherLogsAddEditComponent } from './teacher-logs/teacher-logs-add-edit/teacher-logs-add-edit.component';
import { HomeComponent } from './homes/home/home.component';
import { LogsComponent } from './teachers/logs/logs.component';
import { BatchStandardsLogsComponent } from './batch-standards/batch-standards-logs/batch-standards-logs.component';
import { ReportLogsComponent } from './reports/report-logs/report-logs.component';
import { ReportBatchStandardLogComponent } from './reports/report-batch-standard-log/report-batch-standard-log.component';
import { CombinedClassAddEditComponent } from './teacher-logs/combined-class-add-edit/combined-class-add-edit.component';
import { GroupResultComponent } from './exams/group-result/group-result.component';
import { GroupResultDisplayComponent } from './exams/group-result-display/group-result-display.component';
import { TransactionReportsComponent } from './accounts/transaction-reports/transaction-reports.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StudentAdmissionFormComponent } from './students/student-admission-form/student-admission-form.component';
import { StudentExamsReportComponent } from './students/student-exams-report/student-exams-report.component';
import { StudentExamGraphReportsComponent } from './students/student-exam-graph-reports/student-exam-graph-reports.component';
import { GraphsLineGraphComponent } from './graphs/graphs-line-graph/graphs-line-graph.component';
import { LoadingImageComponent } from './graphs/loading-image/loading-image.component';
import { ChapterAddEditComponent } from './chapters/chapter-add-edit/chapter-add-edit.component';
import { ActiveStandardsComponent } from './standards/active-standards/active-standards.component';
import { MultiSelectComponent } from './utilies/multi-select/multi-select.component';
import { TeacherLogComponent } from './teacher-logs/teacher-log/teacher-log.component';
import { LogAttendanceStudentsComponent } from './teacher-logs/log-attendance-students/log-attendance-students.component';
import { StudentLogAttendanceComponent } from './students/student-log-attendance/student-log-attendance.component';
import { ReportsComponent } from './reports/reports/reports.component';
import { TeacherMonthlyReportComponent } from './reports/teacher-monthly-report/teacher-monthly-report.component';
import { StudentMonthlyReportComponent } from './reports/student-monthly-report/student-monthly-report.component';
import { ParentsComponent } from './parents/parents/parents.component';
import { ParentComponent } from './parents/parent/parent.component';
import { ParentAddEditComponent } from './parents/parent-add-edit/parent-add-edit.component';
import { AssignParentStudentComponent } from './parents/assign-parent-student/assign-parent-student.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentComponent,
    DashboardComponent,
    StudentAddEditComponent,
    StudentsComponent,
    StandardsComponent,
    StandardComponent,
    StandardAddEditComponent,
    BatchsComponent,
    BatchComponent,
    BatchAddEditComponent,
    HostelsComponent,
    HostelComponent,
    HostelAddEditComponent,
    HostelRoomAddEditComponent,
    HostelRoomComponent,
    HostelRoomsComponent,
    HostelStudentsComponent,
    AssignHostelComponent,
    SwapRoomComponent,
    AssignStandardComponent,
    BatchStandardsComponent,
    BatchStandardAddEditComponent,
    BatchStandardStudentsComponent,
    BatchStandardStudentAddEditComponent,
    TransactionsComponent,
    TransactionsAddEditComponent,
    AllTransactionsComponent,
    UsersComponent,
    AddEditUserComponent,
    StudentAccountsComponent,
    DepositComponent,
    WithdrawComponent,
    DuesComponent,
    TransactionComponent,
    BatchStandardsStudentsComponent,
    EditHostelComponent,
    StudentsListComponent,
    DiscountsAddEditComponent,
    CommentsComponent,
    CommentAddEditComponent,
    StudentCommentsComponent,
    ExamsComponent,
    ExamAddEditComponent,
    ExamComponent,
    ExamStudentsComponent,
    StudentExamsComponent,
    AlertComponent,
    SubjectsComponent,
    SubjectComponent,
    SubjectAddEditComponent,
    TeachersComponent,
    TeacherAddEditComponent,
    TeacherComponent,
    TeacherLogsComponent,
    TeacherLogsAddEditComponent,
    HomeComponent,
    LogsComponent,
    BatchStandardsLogsComponent,
    ReportLogsComponent,
    ReportBatchStandardLogComponent,
    CombinedClassAddEditComponent,
    GroupResultComponent,
    GroupResultDisplayComponent,
    TransactionReportsComponent,
    StudentAdmissionFormComponent,
    StudentExamsReportComponent,
    StudentExamGraphReportsComponent,
    GraphsLineGraphComponent,
    LoadingImageComponent,
    ChaptersComponent,
    ChapterAddEditComponent,
    ActiveStandardsComponent,
    MultiSelectComponent,
    TeacherLogComponent,
    LogAttendanceStudentsComponent,
    StudentLogAttendanceComponent,
    ReportsComponent,
    TeacherMonthlyReportComponent,
    StudentMonthlyReportComponent,
    ParentsComponent,
    ParentComponent,
    ParentAddEditComponent,
    AssignParentStudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPrintModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    TimepickerModule.forRoot(),
    FontAwesomeModule,
    NgChartsModule
  ],
  providers: [CookieService, ToWords],
  bootstrap: [AppComponent]
})
export class AppModule { }
