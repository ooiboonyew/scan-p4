import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RSVPService } from "../../../services/rsvp.service";
import { AppComponent } from "src/app/app.component";
import { Config, RSVP, RSVP_Scan } from "src/models/rsvp.model";
import { stringify } from "querystring";
import { Router } from "@angular/router";

@Component({
  selector: "app-scan-qr",
  templateUrl: "./scan-qr.component.html",
  styleUrls: ["./scan-qr.component.css"],
})
export class ScanQrComponent implements OnInit {
  rsvp: RSVP;
  scanned: boolean = false;
  selectedConfig: Config = null;
  selectedEntry = "";
  count: number = 0;
  msg: string = "";
  userInput: number;

  configs: Config[];

  // attended: boolean = false;
  // errormsg: string = "";
  //qrstring: string = "";
  // @ViewChild('scaninput') input: ElementRef;

  constructor(
    private rSVPService: RSVPService,
    private router: Router,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    // this.appComponent.ngOnInit();
    setTimeout(() => (this.appComponent.isLoading = true), 0);

    this.rSVPService.listConfig().subscribe(
      (data) => {
        this.appComponent.isLoading = false;
        this.configs = data;
      },
      (err) => {
        this.appComponent.isLoading = false;
        alert(err.error);
      }
    );
  }

  selectConfig() {
    this.counting();
  }

  entry(input) {
    this.appComponent.isLoading = true;
    this.selectedEntry = input;
    var req = {
      location: this.selectedConfig.location,
      entry: input,
      userInput: this.userInput,
    };

    this.rSVPService.AddRSVP(req).subscribe(
      (data) => {
        this.count = data;
        this.appComponent.isLoading = false;
        this.scanned = true;

        setTimeout(
          () => ((this.scanned = false), (this.userInput = null)),
          2000
        );
      },
      (err) => {
        this.appComponent.isLoading = false;
        alert(err.error);
        // this.errormsg = err.error;
        // this.scanned = true;
      }
    );

    // this.selectedEntry = input;
  }

  counting() {
    this.appComponent.isLoading = true;

    this.rSVPService.GetRsvpCount(this.selectedConfig.location).subscribe(
      (data) => {
        console.log(data);
        this.appComponent.isLoading = false;
        this.count = data;
      },
      (err) => {
        this.appComponent.isLoading = false;
        alert(err.error);
      }
    );
  }
}
