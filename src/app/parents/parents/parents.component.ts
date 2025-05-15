import { Component, OnInit } from '@angular/core';
import { ParentService } from './../../service/parent.service';
import { LoginService } from './../../service/login.service';
import { Parent } from './../../interface/parent';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../../service/alert.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBed, faUserPen, faFolderOpen, faMoneyBill, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {

  currentPage = 1;
  page = 1;
  totalItems: number = 10;
  search = "";
  faBed = faBed;
  faUserPen = faUserPen;
  faFolderOpen = faFolderOpen;
  faMoneyBill = faMoneyBill;
  faSquarePlus = faSquarePlus;
  isLoading = true;

  public parents: Parent[] = [];
  constructor(private parentService: ParentService, private loginService: LoginService, private alertService: AlertService,
    private router: Router, private route: ActivatedRoute){}


  ngOnInit(): void {
    this.route.queryParams
      //.filter(params => params.order)
      .subscribe(params => {
        this.page = params['page'] || 1;
        this.loadParents(this.page);
      }
    );
  }

  pageChanged(event: PageChangedEvent): void {
    this.router.navigateByUrl(this.router.url.replace(this.page.toString(), event.page.toString()));
  }

  searchTable(): void{
   this.loadParents(this.page);
  }

  loadParents(pageNumber: number): void {
    this.isLoading = true;
    this.parentService.getParents(pageNumber, this.search).subscribe (
      (response: any) => this.assignParents(response),
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

  assignParents(response: any) {
    this.parents = response.parents;
    this.totalItems = response.total;
  }

  isEdit(): boolean { 
    return this.loginService.isAdminAccountant();
  }

  isNew(): boolean { 
    return this.loginService.isAdminAccountant();
  }
}
