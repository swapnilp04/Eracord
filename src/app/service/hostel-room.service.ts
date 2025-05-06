import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './../service/login.service'
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HostelRoom } from './../interface/hostel-room'
import { HostelStudent } from './../interface/hostel-student'


@Injectable({
  providedIn: 'root'
})
export class HostelRoomService {

  URL = "http://localhost:8080"
  //URL = "http://54.237.98.76:8080"

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getHostelRooms(hostelId: number): Observable<HostelRoom[]> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<HostelRoom[]>(`${this.loginService.URL}/hostels/${hostelId}/hostel_rooms`, {headers: myHeaders});
  }

  getHostelRoom(hostelId: number, hostelRoomID: number): Observable<HostelRoom> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<HostelRoom>(`${this.loginService.URL}/hostels/${hostelId}/hostel_rooms/${hostelRoomID}`, {headers: myHeaders});
  }

  createHostelRoom(hostelId: number, hostelRoom: HostelRoom): Observable<HostelRoom> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.post<HostelRoom>(`${this.loginService.URL}/hostels/${hostelId}/hostel_rooms`, hostelRoom, {headers: myHeaders});
  }

  updateHostelRoom(hostelId: number, hostelRoom: HostelRoom): Observable<HostelRoom> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.put<HostelRoom>(`${this.loginService.URL}/hostels/${hostelId}/hostel_rooms/${hostelRoom.id}`, hostelRoom, {headers: myHeaders});
  }

  getHostelRoomStudents(hostelId: number, hostelRoomId: number): Observable<HostelStudent> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.get<HostelStudent>(`${this.loginService.URL}/hostels/${hostelId}/hostel_rooms/${hostelRoomId}/students`, {headers: myHeaders});
  }

  removeHostelRoomStudents(hostelId: number, hostelRoomId: number, studentId: number): Observable<{}> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.delete<{}>(`${this.loginService.URL}/hostels/${hostelId}/hostel_rooms/${hostelRoomId}/students/${studentId}`, {headers: myHeaders});
  }

  deleteHostelRoom(hostelId: number, hostelRoomId: number): Observable<{}> {
    const myHeaders = this.loginService.getHeaders();
    return this.http.delete<{}>(`${this.loginService.URL}/hostels/${hostelId}/hostel_rooms/${hostelRoomId}`, {headers: myHeaders});
  }
}
