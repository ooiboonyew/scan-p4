import { Component, OnInit } from "@angular/core";
import { RSVPService } from "../../services/rsvp.service";
import { AppComponent } from "src/app/app.component";
import { Booth, User } from "src/models/rsvp.model";
import { PlayBoothRequest } from "src/models/rsvp-request.model";

@Component({
  selector: "app-booth",
  templateUrl: "./booth.component.html",
  styleUrls: ["./booth.component.css"],
})
export class BoothComponent implements OnInit {
  user: User;
  booths: Booth[]
  selectedBooth: Booth;
  secretDigit: string;
  message: string;

  constructor(
    private rSVPService: RSVPService,
    private appComponent: AppComponent
  ) {}
  ngOnInit() {
    this.message = "";
    this.selectedBooth = null;
    this.rSVPService.Getuser(this.appComponent.user.id).subscribe(
      (data) => {
        this.user = data;

        this.rSVPService.ListBooth().subscribe(
          (data) => {
            this.booths = data;
            this.booths = this.booths.filter(x => x.status == 1);
          },
          (err) => {
            alert(err.error);
          }
        );
      },
      (err) => {
        alert(err.error);
      }
    );
  }

  play(booth) {
    this.selectedBooth = booth;
  }

  cancel() {
    this.selectedBooth = null;
  }

  done() {
    // window.location.href = '/event/booth';
    this.appComponent.isLoading = true;

    this.rSVPService.Getuser(this.appComponent.user.id).subscribe(
      (data) => {
        this.appComponent.isLoading = false;
        this.user = data;
        this.message = null;
        this.selectedBooth = null;
        // this.userBooth = null;
      },
      (err) => {
        this.appComponent.isLoading = false;
        alert(err.error);
      }
    );
  }

  confirm() {
    let cfm = confirm("Confirm Play Booth?");

    if (cfm) {
      var playBoothRequest = new PlayBoothRequest();
      playBoothRequest.userId = this.user.id;
      playBoothRequest.boothNum = this.selectedBooth.boothNum;
      playBoothRequest.secretDigit = this.secretDigit;

      this.appComponent.isLoading = true;
      this.rSVPService.PlayBooth(playBoothRequest).subscribe(
        (data) => {
          this.message = "Play Successfully.";
          this.appComponent.isLoading = false;
        },
        (err) => {
          var errorstr = JSON.stringify(err.error);
          console.log(err.error);
          this.message = errorstr.replace(new RegExp('"', "g"), "");
          this.appComponent.isLoading = false;
          // console.log(this.userBooth);
        }
      );
    }
  }

  onOtpChange(otp) {
    this.secretDigit = otp;
  }
}
