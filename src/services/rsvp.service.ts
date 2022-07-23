import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { ApiResponse } from "../models/api.response";
import { environment } from "../environments/environment";
import { Booth, RSVP, Summary, User, Setting } from "../models/rsvp.model";
import {
  GuestLoginRequest,
  PlayBoothRequest,
  UpdateBoothRequest,
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

  getSetting(id: string): Observable<Setting> {
    return this.http.get<Setting>(this.baseUrl + "/getSetting/" + id);
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

  GetBoothActivitiesByUser(id: string): Observable<[]> {
    return this.http.get<[]>(this.baseUrl + "/getBoothActivitiesByUser/" + id);
  }

  GetBoothActivitiesByBooth(id: number): Observable<[]> {
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

  ImportRSVP(formdata: FormData): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + '/Import', formdata);
  }

  updateUser(updateUserRequest: UpdateUserRequest): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + "/updateUser", updateUserRequest);
  }

  addUser(updateUserRequest: UpdateUserRequest): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + "/addUser", updateUserRequest);
  }

  Summary(): Observable<Summary> {
    return this.http.get<Summary>(this.baseUrl + "/summary");
  }

  ListBooth(): Observable<[]> {
    return this.http.get<[]>(this.baseUrl + "/listBooth");
  }

  UpdateBooth(updateBoothRequest: UpdateBoothRequest): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + "/updateBooth", updateBoothRequest);
  }

  AddBooth(booth: Booth): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + "/addBooth", booth);
  }

  // UpdateRSVP(rsvp: RSVP): Observable<ApiResponse> {
  //   return this.http.post<ApiResponse>(this.baseUrl + '/Update', rsvp);
  // }
}
