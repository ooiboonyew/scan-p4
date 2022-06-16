import { Component, OnInit } from "@angular/core";
import { RSVPService } from "../../services/rsvp.service";
import { AppComponent } from "src/app/app.component";
import { Booth } from "src/models/rsvp.model";
import { PlayBoothRequest } from "src/models/rsvp-request.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-donation",
  templateUrl: "./donation.component.html",
  styleUrls: ["./donation.component.css"],
})
export class DonationComponent implements OnInit {
  booths: Booth[];

  constructor(
    private router: Router,
    private rSVPService: RSVPService,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    setTimeout(() => (this.appComponent.isLoading = true), 0);

    this.rSVPService.ListBooth().subscribe(
      (data) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);

        console.log(data);
        this.booths = data;
      },
      (err) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        alert(err.error);
      }
    );
  }

  donate(url) {
    console.log(url);

    window.open(url, "_blank");
  }
}
