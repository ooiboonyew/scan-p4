import { Component, OnInit } from "@angular/core";
import { RSVPService } from "../../services/rsvp.service";
import { AppComponent } from "src/app/app.component";
import { User, UserBooth } from "src/models/rsvp.model";

@Component({
  selector: "app-booth",
  templateUrl: "./booth.component.html",
  styleUrls: ["./booth.component.css"],
})
export class BoothComponent implements OnInit {
  user: User;
  userBooth: UserBooth;
  digit1: number;
  digit2: number;
  digit3: number;
  digit4: number;

  constructor(
    private rSVPService: RSVPService,
    private appComponent: AppComponent
  ) {}
  ngOnInit() {
    this.rSVPService.Getuser(this.appComponent.user.id).subscribe(
      (data) => {
        this.user = data;
        console.log(this.user);
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

  confirm() {
    let cfm = confirm("Confirm Check-in ?");

    console.log(this.digit1);

    if (cfm) {
      // this.appComponent.isLoading = true;
      // this.rSVPService.CheckIn(this.user).subscribe(
      //   (data) => {
      //     this.appComponent.isLoading = false;
      //     alert("Check-in Successfully.");
      //     // this.router.navigate(["admin/scan-qr"]);
      //   },
      //   (err) => {
      //     var errorstr = JSON.stringify(err.error);
      //     console.log(err.error);
      //     alert(errorstr.replace(new RegExp('"', "g"), ""));
      //     this.appComponent.isLoading = false;
      //   }
      // );
    }
  }

  keyPressNumbers(event) {

    let element;
    // if (event.code !== "Backspace")
    //   element = event.srcElement.nextElementSibling;

    // if (event.code === "Backspace")
    //   element = event.srcElement.previousElementSibling;

    // if (element == null) return;
    // else element.focus();

    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      console.log("here 2");
      event.preventDefault();
      return false;
    } else {
      console.log("here");
      element = event.srcElement.nextElementSibling;
      element.focus();
      return true;
    }

    



  }

  onDigitInput(event, value) {

    // var charCode = (event.which) ? event.which : event.keyCode;

    // console.log(charCode)
    console.log(event);
    console.log(value);

    if(value > 9){
      if(event.code == "digit1")
      {
        this.digit1 = event.code
      }
    }

    let element;
    if (event.code !== "Backspace")
      element = event.srcElement.nextElementSibling;

    if (event.code === "Backspace")
      element = event.srcElement.previousElementSibling;

    if (element == null) return;
    else element.focus();
  }
}

//   onDigitInput(event) {
//     let element;
//     console.log(event);
//     if (event.shiftKey && event.keyCode == 9) {
//       console.log("here ok")
//       element = event.srcElement.previousElementSibling;
//     } else {
//       console.log("here ok")

//       if (event.code !== "Backspace")
//         element = event.srcElement.nextElementSibling;

//       if (event.code === "Backspace")
//         element = event.srcElement.previousElementSibling;
//     }
//     if (element == null) return;
//     else element.focus();
//   }
// }
