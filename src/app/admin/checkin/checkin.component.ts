import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RSVPService } from "../../../services/rsvp.service";
import { AppComponent } from "src/app/app.component";
import { User } from "src/models/rsvp.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-checkin",
  templateUrl: "./checkin.component.html",
  styleUrls: ["./checkin.component.css"],
})
export class CheckinComponent implements OnInit, AfterViewInit {
  userId: string;
  user: User;
  numOfGuest: Array<any> = [];
  fromGuestList: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rSVPService: RSVPService,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.numOfGuest = Array.from({ length: 3 }, (v, k) => k);
    //this.appComponent.ngOnInit();
  }

  ngAfterViewInit() {
    //this.appComponent.isLoading = true;

    this.route.queryParams.subscribe((params) => {
      this.userId = params.id;
      this.fromGuestList = params.guestlist;
    });

    this.rSVPService.Getuser(this.userId).subscribe(
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

  guestAttend(elemet) {
    if (elemet.textContent.trim() == "Attended") {
      this.user.guestAttend -= 1;
      // elemet.textContent = "Check-in";
      // elemet.classList = "btn btn-primary";
    } else {
      this.user.guestAttend += 1;
      // elemet.textContent = "Attended";
      // elemet.classList = "btn btn-success";
    }
  }

  userAttend(elemet) {
    console.log(elemet);
    if (elemet.textContent.trim() == "Attended") {
      this.user.userAttend = 0;
      elemet.textContent = "Check-in";
      elemet.classList = "btn btn-primary";
    } else {
      this.user.userAttend = 1;
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

    console.log(this.user);

    if (cfm) {
      this.appComponent.isLoading = true;
      this.rSVPService.CheckIn(this.user).subscribe(
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
