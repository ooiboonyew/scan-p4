import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RSVPService } from "../../../services/rsvp.service";
import { AppComponent } from "src/app/app.component";
import { RSVP, User } from "src/models/rsvp.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-checkin",
  templateUrl: "./checkin.component.html",
  styleUrls: ["./checkin.component.css"],
})
export class CheckinComponent implements OnInit, AfterViewInit {
  rsvpId: string;
  rsvp: RSVP;
  fromGuestList: boolean;

  constructor(
    private router: Router,
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
      this.rsvpId = params.id;
      this.fromGuestList = params.guestlist;
    });

    this.rSVPService.GetRsvp(this.rsvpId).subscribe(
      (data) => {
        this.appComponent.isLoading = false;
        this.rsvp = data;
      },
      (err) => {
        this.appComponent.isLoading = false;
        alert(err.error);
        // this.errormsg = err.error;
        // this.scanned = true;
      }
    );
  }

  userAttend(elemet) {
    console.log(elemet);
    if (elemet.textContent.trim() == "Attended") {
      this.rsvp.checkedIn = false;
      elemet.textContent = "Check-in";
      elemet.classList = "btn btn-primary";
    } else {
      this.rsvp.checkedIn = true;
      elemet.textContent = "Attended";
      elemet.classList = "btn btn-success";
    }
  }

  cancel() {
    if (this.fromGuestList) {
      this.router.navigate(["admin/guest-list"]);
    } else {
      this.router.navigate(["admin/scan-qr"]);
    }
  }

  confirm() {
    let cfm = confirm("Confirm Check-in ?");

    console.log(this.rsvp);

    if (cfm) {
      this.appComponent.isLoading = true;
      this.rSVPService.CheckIn(this.rsvp).subscribe(
        (data) => {
          this.appComponent.isLoading = false;
          alert("Check-in Successfully.");

          if (this.fromGuestList) {
            this.router.navigate(["admin/guest-list"]);
          } else {
            this.router.navigate(["admin/scan-qr"]);
          }
        },
        (err) => {
          var errorstr = JSON.stringify(err.error);
          console.log(err.error);
          alert(errorstr.replace(new RegExp('"', "g"), ""));
          this.appComponent.isLoading = false;
        }
      );
    }
  }
}
