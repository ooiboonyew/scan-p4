import { Component, OnInit } from "@angular/core";
import { RSVPService } from "../../services/rsvp.service";
import { AppComponent } from "src/app/app.component";
import { User, UserBooth } from "src/models/rsvp.model";
import { PlayBoothRequest } from "src/models/rsvp-request.model";

@Component({
  selector: "app-booth",
  templateUrl: "./booth.component.html",
  styleUrls: ["./booth.component.css"],
})
export class BoothComponent implements OnInit {
  user: User;
  userBooth: UserBooth;
  secretDigit: string;
  message: string;

  constructor(
    private rSVPService: RSVPService,
    private appComponent: AppComponent
  ) {}
  ngOnInit() {
    this.message = "";
    this.rSVPService.Getuser(this.appComponent.user.id).subscribe(
      (data) => {
        this.user = data;
        this.userBooth = null;
      },
      (err) => {
        alert(err.error);
      }
    );
  }

  play(userBooth) {
    this.userBooth = userBooth;
    console.log(userBooth);
  }

  cancel() {
    this.userBooth = null;
  }

  done() {
    // window.location.href = '/event/booth';
    this.appComponent.isLoading = true;

    this.rSVPService.Getuser(this.appComponent.user.id).subscribe(
      (data) => {
        this.appComponent.isLoading = false;
        this.user = data;
        this.message = null;
        this.userBooth = null;
      },
      (err) => {
        this.appComponent.isLoading = false;
        alert(err.error);
      }
    );
  }

  confirm() {
    let cfm = confirm("Confirm Check-in ?");

    if (cfm) {
      var playBoothRequest = new PlayBoothRequest();
      playBoothRequest.userId = this.user.id;
      playBoothRequest.boothNum = this.userBooth.boothNum;
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
          console.log(this.userBooth);
        }
      );
    }
  }

  onOtpChange(otp) {
    this.secretDigit = otp;
  }
}
