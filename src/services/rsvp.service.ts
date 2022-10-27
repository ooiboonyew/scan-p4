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
import { Config } from "protractor";

@Injectable()
export class RSVPService {
  constructor(private http: HttpClient) {}
  baseUrl: string = environment.Service_URL + "/rsvp";

  guestLogin(loginRequest: GuestLoginRequest): Observable<User> {
    return this.http.post<User>(this.baseUrl + "/guestLogin", loginRequest);
  }


  checkIn(loginRequest: GuestLoginRequest): Observable<User> {
    return this.http.post<User>(this.baseUrl + "/guestLogin", loginRequest);
  }

  CheckInGuest(loginRequest: GuestLoginRequest): Observable<RSVP> {
    return this.http.post<RSVP>(this.baseUrl + "/checkinGuest", loginRequest);
  }

  getSetting(id: string): Observable<Setting> {
    return this.http.get<Setting>(this.baseUrl + "/getSetting/" + id);
  }

  AddRSVP(rsvp): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + "/Add", rsvp);
  }

  GetRsvp(id: string): Observable<RSVP> {
    return this.http.get<RSVP>(this.baseUrl + "/getrsvp/" + id);
  }

  UpdateRSVP(rsvp: RSVP): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + "/Update", rsvp);
  }


  AddConfig(config: Config): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + "/Addconfig", config);
  }

  GetConfig(id: string): Observable<RSVP> {
    return this.http.get<RSVP>(this.baseUrl + "/getconfig/" + id);
  }

  UpdateConfig(config: Config): Observable<{}> {
    return this.http.post<{}>(this.baseUrl + "/Updateconfig", config);
  }

  DeleteConfig(id: string): Observable<RSVP> {
    return this.http.get<RSVP>(this.baseUrl + "/deleteConfig/" + id);
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
  
  listConfig(): Observable<[]> {
    return this.http.get<[]>(this.baseUrl + "/listConfig");
  }

  listRSVP(): Observable<[]> {
    return this.http.get<[]>(this.baseUrl + "/listRSVP");
  }

  Getuser(id: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + "/getuser/" + id);
  }

  GetRSVPByQR(qr: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + "/GetRSVPByQR/" + qr);
  }

  GetRsvpCount(location: string): Observable<number> {
    return this.http.get<number>(this.baseUrl + "/GetRsvpCount/" + location);
  }

  CheckIn(rsvp: RSVP): Observable<RSVP> {
    return this.http.post<RSVP>(this.baseUrl + "/checkin", rsvp);
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
