import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { ApiResponse } from "../models/api.response";
import { environment } from "../environments/environment";
import { RSVP, User } from "../models/rsvp.model";
import { GuestLoginRequest } from "../models/rsvp-request.model";

@Injectable()
export class RSVPService {
  constructor(private http: HttpClient) {}
  baseUrl: string = environment.Service_URL + "/rsvp";

  guestLogin(loginRequest: GuestLoginRequest): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/guestLogin', loginRequest);
  }

  listRSVP(): Observable<[]> {
    return this.http.get<[]>(this.baseUrl);
  }


  AddRSVP(rsvp: RSVP): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + "/Add", rsvp);
  }

  UpdateRSVP(rsvp: RSVP): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + "/Update", rsvp);
  }

  EmailRSVP(id: string): Observable<{}> {
    return this.http.get<ApiResponse>(this.baseUrl + '/email/' + id);
  }

  ScanQR(id: string): Observable<{}> {
    return this.http.get<ApiResponse>(this.baseUrl + '/scanqr/' + id);
  }

  // UpdateRSVP(rsvp: RSVP): Observable<ApiResponse> {
  //   return this.http.post<ApiResponse>(this.baseUrl + '/Update', rsvp);
  // }
}
