import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RSVPService } from "../../../services/rsvp.service";
import { AppComponent } from "src/app/app.component";
import { User } from "src/models/rsvp.model";

@Component({
  selector: "app-checkin",
  templateUrl: "./checkin.component.html",
  styleUrls: ["./checkin.component.css"],
})
export class CheckinComponent implements OnInit, AfterViewInit {
  userId: string;
  user: User;
  constructor(
    private route: ActivatedRoute,
    private rSVPService: RSVPService,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    //this.appComponent.ngOnInit();
  }

  ngAfterViewInit() {
    //this.appComponent.isLoading = true;

    this.route.queryParams.subscribe((params) => {
      this.userId = params.id;
    });

    this.rSVPService.ScanQR(this.userId).subscribe(
      (data) => {
        this.appComponent.isLoading = false;
        this.user = data;
      },
      (err) => {
        this.appComponent.isLoading = false;
        alert(err.error);
        // this.errormsg = err.error;
        // this.scanned = true;
      }
    );
  }
}
