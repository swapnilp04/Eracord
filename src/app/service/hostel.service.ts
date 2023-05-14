import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hostel } from './../interface/hostel'


@Injectable({
  providedIn: 'root'
})
export class HostelService {

  URL = "http://localhost:8080"
  //URL = "http://54.237.98.76:8080"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getHostels(): Observable<Hostel[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Hostel[]>(`${this.loginService.URL}/hostels`, {headers: myHeaders});
  }

  getHostel(hostelID: number): Observable<Hostel> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<Hostel>(`${this.loginService.URL}/hostels/${hostelID}`, {headers: myHeaders});
  }

  createHostel(hostel: Hostel): Observable<Hostel> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<Hostel>(`${this.loginService.URL}/hostels`, hostel, {headers: myHeaders});
  }

  updateHostel(hostel: Hostel): Observable<Hostel> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.put<Hostel>(`${this.loginService.URL}/hostels/${hostel.id}`, hostel, {headers: myHeaders});
  }  
}
