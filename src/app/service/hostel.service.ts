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

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getHostels(): Observable<Hostel[]> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.get<Hostel[]>(`${this.URL}/hostels`, {headers: myHeaders});
  }

  getHostel(hostelID: number): Observable<Hostel> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.get<Hostel>(`${this.URL}/hostels/${hostelID}`, {headers: myHeaders});
  }

  createHostel(hostel: Hostel): Observable<Hostel> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.post<Hostel>(`${this.URL}/hostels`, hostel, {headers: myHeaders});
  }

  updateHostel(hostel: Hostel): Observable<Hostel> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.put<Hostel>(`${this.URL}/hostels/${hostel.id}`, hostel, {headers: myHeaders});
  }  
}
