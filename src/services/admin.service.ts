import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/index";
import { ApiResponse } from "../models/api.response";
import { LoginRequest, ChangePasswordReq } from "../models/rsvp-request.model";
import { Admin } from "../models/rsvp.model";
import { environment } from '../environments/environment';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.Service_URL + '/admin';

  Login(loginRequest: LoginRequest): Observable<Admin> {
    return this.http.post<Admin>(this.baseUrl + '/Login', loginRequest);
  }

  listAdmin(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl);
  }

  DeleteAdmin(adminID: number): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/Delete', adminID);
  }

  UpdateAdmin(admin: Admin): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/Update', admin);
  }

  AddAdmin(admin: Admin): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/Add', admin);
  }

  ChangePasswordAdmin(changePasswordReq: ChangePasswordReq): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + '/ChangePassword', changePasswordReq);
  }



}