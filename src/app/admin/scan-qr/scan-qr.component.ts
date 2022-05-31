import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { RSVPService } from "../../../services/rsvp.service";
import { AppComponent } from "src/app/app.component";
import { RSVP } from "src/models/rsvp.model";
import { stringify } from "querystring";
import { Router } from "@angular/router";

@Component({
  selector: "app-scan-qr",
  templateUrl: "./scan-qr.component.html",
  styleUrls: ["./scan-qr.component.css"],
})
export class ScanQrComponent implements OnInit, AfterViewInit {
  rsvp: RSVP;
  scanned: boolean = false;
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
    this.appComponent.ngOnInit();
  }

  ngAfterViewInit() {}

  onCodeResult(resultString: string) {
    if (resultString == "") {
      this.scanned = false;
      return;
    }
    this.appComponent.isLoading = true;

    this.rSVPService.ScanQR(resultString).subscribe(
      (data) => {
        this.scanned = true;
        this.appComponent.isLoading = false;
        this.router.navigate(["admin/checkin"], {
          queryParams: { id: data.id },
        });
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
