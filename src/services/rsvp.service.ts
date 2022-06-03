import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { ApiResponse } from "../models/api.response";
import { environment } from "../environments/environment";
import { RSVP, Summary, User } from "../models/rsvp.model";
import {
  GuestLoginRequest,
  PlayBoothRequest,
  UpdateUserRequest,
} from "../models/rsvp-request.model";

@Injectable()
export class RSVPService {
  constructor(private http: HttpClient) {}
  baseUrl: string = environment.Service_URL + "/rsvp";

  guestLogin(loginRequest: GuestLoginRequest): Observable<User> {
    return this.http.post<User>(this.baseUrl + "/guestLogin", loginRequest);
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
    return this.http.get<ApiResponse>(this.baseUrl + "/email/" + id);
  }

  GetEmptyUserBooth(): Observable<[]> {
    return this.http.get<[]>(this.baseUrl + "/GetEmptyUserBooth");
  }

  GetBoothActivitiesByUser(id: string): Observable<[]> {
    return this.http.get<[]>(this.baseUrl + "/getBoothActivitiesByUser/" + id);
  }

  GetBoothActivitiesByBooth(id: string): Observable<[]> {
    return this.http.get<[]>(this.baseUrl + "/getBoothActivitiesByBooth/" + id);
  }

  FilterUsers(filtertType, filterText): Observable<[]> {
    return this.http.get<[]>(
      this.baseUrl + "/filterUsers/" + filtertType + "/" + filterText
    );
  }

  listUser(): Observable<[]> {
    return this.http.get<[]>(this.baseUrl + "/listusers");
  }

  Getuser(id: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + "/getuser/" + id);
  }

  CheckIn(user: User): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + "/checkin", user);
  }

  PlayBooth(playBoothRequest: PlayBoothRequest): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + "/playBooth", playBoothRequest);
  }

  updateUser(updateUserRequest: UpdateUserRequest): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + "/updateUser", updateUserRequest);
  }

  addUser(updateUserRequest: UpdateUserRequest): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + "/addeUser", updateUserRequest);
  }

  Summary(): Observable<Summary> {
    return this.http.get<Summary>(this.baseUrl + "/summary");
  }

  // UpdateRSVP(rsvp: RSVP): Observable<ApiResponse> {
  //   return this.http.post<ApiResponse>(this.baseUrl + '/Update', rsvp);
  // }
}
