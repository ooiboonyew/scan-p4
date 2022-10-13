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
    console.log(resultString);

    this.rSVPService.GetRSVPByQR(resultString).subscribe(
      (data) => {
        this.appComponent.isLoading = false;

        if (data.id == null) {
          alert("QR Not Found");
        } else {
          this.scanned = true;
          this.router.navigate(["admin/checkin"], {
            queryParams: { id: data.id },
          });
        }
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
