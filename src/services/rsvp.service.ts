import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { ApiResponse } from "../models/api.response";
import { environment } from "../environments/environment";
import { RSVP } from "../models/rsvp.model";

@Injectable()
export class RSVPService {
  constructor(private http: HttpClient) {}
  baseUrl: string = environment.Service_URL + "/rsvp";

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

  // UpdateRSVP(rsvp: RSVP): Observable<ApiResponse> {
  //   return this.http.post<ApiResponse>(this.baseUrl + '/Update', rsvp);
  // }
}
