import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HostelRoom } from './../interface/hostel-room'


@Injectable({
  providedIn: 'root'
})
export class HostelRoomService {

  URL = "http://localhost:8080"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getHostelRooms(hostelId: number): Observable<HostelRoom[]> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.get<HostelRoom[]>(`${this.URL}/hostels/${hostelId}/hostel_rooms`, {headers: myHeaders});
  }

  getHostelRoom(hostelRoomID: number): Observable<HostelRoom> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.get<HostelRoom>(`${this.URL}/hostel_rooms/${hostelRoomID}`, {headers: myHeaders});
  }

  createHostelRoom(hostelId: number, hostelRoom: HostelRoom): Observable<HostelRoom> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.post<HostelRoom>(`${this.URL}/hostels/${hostelId}/hostel_rooms`, hostelRoom, {headers: myHeaders});
  }

  updateHostelRoom(hostelId: number, hostelRoom: HostelRoom): Observable<HostelRoom> {
    const token = this.loginService.getToken();
    const myHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'token': token,
    });
    return this.http.put<HostelRoom>(`${this.URL}/hostels/${hostelRoom.id}/hostel_rooms/${hostelRoom.id}`, hostelRoom, {headers: myHeaders});
  }  
}
