import { Component, OnInit } from '@angular/core';
import { ExamService } from './../../service/exam.service';
import { LoginService } from './../../service/login.service';
import { Exam } from './../../interface/exam';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AlertService } from '../../service/alert.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { faFilePen, faFolderOpen, faSquarePlus, faFileLines } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {

  public exams: Exam[] = [];
  currentPage = 1;
  public page = 1;
  totalItems: number = 10;
  faFilePen = faFilePen;
  faFolderOpen = faFolderOpen;
  faSquarePlus = faSquarePlus;
  faFileLines = faFileLines;
  isLoading = true;

  constructor(private examService: ExamService, private loginService: LoginService, private alertService: AlertService,
    private router: Router, private route: ActivatedRoute){}



  ngOnInit(): void {
    this.route.queryParams
      //.filter(params => params.order)
      .subscribe(params => {
        this.page = params['page'] || 1;
        this.loadExams(this.page);
      }
    );
  }

  pageChanged(event: PageChangedEvent): void {
    this.router.navigateByUrl(this.router.url.replace(this.page.toString(), event.page.toString()));
  }

  changed(e: any) {
    this.page = 1;
    this.currentPage = 1;
    this.loadExams(this.page);  
  }

  errorHandle(error: any): void {
    if(error.status == 401) {
      this.loginService.toLogin();
    } else if (error.status == 403) {
      this.alertService.error("Unauthorized");
    }
    if(error.status == 0) {
      this.loginService.toLogin();
    }
    this.isLoading = false;
  }

  loadExams(pageNumber: number): void {
    this.isLoading = true;
    this.examService.getExams(pageNumber).subscribe (
      (response: any) => this.assignExam(response),
      (error: any) => this.errorHandle(error),
      () => this.disableLoading(pageNumber)
    );
  }

  disableLoading(pageNumber: number) {
    setTimeout(() => {
      this.currentPage = parseInt(pageNumber.toString())
      this.isLoading = false;
    }, 200);
  }

  assignExam(response: any) {
    this.exams = response.exams
    this.totalItems = response.total;
  }

}
