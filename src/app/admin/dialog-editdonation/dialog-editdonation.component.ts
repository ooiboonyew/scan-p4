import { Component, OnInit, Inject } from "@angular/core";
import { RSVPService } from "../../../services/rsvp.service";
import { BoothActivities, User } from "../../../models/rsvp.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DatePipe } from "@angular/common";
import { CustomValidators } from "../../../common/validators";
import { UpdateUserRequest } from "src/models/rsvp-request.model";

@Component({
  selector: "app-dialog-editdonation",
  templateUrl: "./dialog-editdonation.component.html",
  styleUrls: ["./dialog-editdonation.component.css"],
})
export class DialogEditdonationComponent implements OnInit {
  user: User;
  boothActivities: BoothActivities[];
  changedBoothActivities: BoothActivities[];
  editrsvp: FormGroup;
  isLoading: boolean = false;
  selectedTab: number;
  addScreen: boolean;

  constructor(
    private rsvpService: RSVPService,
    private datepipe: DatePipe,
    private dialogRef: MatDialogRef<DialogEditdonationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.addScreen = this.data.addScreen;
    this.user = this.data.user;
    this.changedBoothActivities = [];
    //only user booth update.

    if (!this.addScreen) {
      this.rsvpService.GetBoothActivitiesByUser(this.data.user.id).subscribe(
        (data) => {
          this.boothActivities = data;
        },
        (err) => {
          alert(err.error);
        }
      );
    } else {
    }

    // this.user = this.data.user;
    this.editrsvp = new FormGroup({
      // name: new FormControl(
      //   { value: this.addScreen ? "" : this.user.name, disabled: false },
      //   [
      //     Validators.required,
      //     Validators.maxLength(50),
      //     CustomValidators.letterAndNumberSpaceOnly,
      //   ]
      // ),
      // staffId: new FormControl(
      //   { value: this.addScreen ? "" : this.user.staffId, disabled: false },
      //   [
      //     Validators.required,
      //     Validators.maxLength(50),
      //     CustomValidators.letterAndNumberSpaceOnly,
      //   ]
      // ),
      email: new FormControl(
        { value: this.addScreen ? "" : this.user.email, disabled: false },
        [Validators.required, Validators.maxLength(50), Validators.email]
      ),
      userAvailable: new FormControl(
        {
          value: this.addScreen ? "1" : this.user.userAvailable.toString(),
          disabled: false,
        },
        [Validators.required, Validators.maxLength(50)]
      ),
      userAttend: new FormControl(
        {
          value: this.addScreen ? "1" : this.user.userAttend.toString(),
          disabled: false,
        },
        [Validators.required, Validators.maxLength(50)]
      ),
      guestAvailable: new FormControl(
        {
          value: this.addScreen ? "0" : this.user.guestAvailable,
          disabled: false,
        },
        [
          Validators.required,
          CustomValidators.numberOnly,
          Validators.min(0),
          // Validators.max(4),
        ]
      ),
      guestAttend: new FormControl(
        { value: this.addScreen ? "0" : this.user.guestAttend, disabled: false },
        [
          Validators.required,
          CustomValidators.numberOnly,
          Validators.min(0),
          // Validators.max(4),
        ]
      ),
      chancesTotal: new FormControl(
        { value: this.addScreen ? "0" : this.user.chancesTotal, disabled: false },
        [
          Validators.required,
          CustomValidators.numberOnly,
          Validators.min(0),
        ]
      ),
      chancesLeft: new FormControl(
        { value: this.addScreen ? "0" : this.user.chancesLeft, disabled: false },
        [
          Validators.required,
          CustomValidators.numberOnly,
          Validators.min(0),
        ]
      )
    });
  }

  // changeChancesTotal(boothNum, chancesTotal) {
  //   if (!chancesTotal) {
  //     alert("Please Enter Valid Chances Total");
  //   }

  //   var numChancesTotal = Number(chancesTotal);
  //   if (numChancesTotal < 0) {
  //     numChancesTotal = 0;
  //   }

  //   console.log(numChancesTotal);

  //   var userboothFound = this.user.userBooths.find(
  //     (x) => x.boothNum == boothNum
  //   );
  //   userboothFound.chancesTotal = numChancesTotal;
  // }

  // changeChancesLeft(boothNum, chancesLeft) {
  //   if (!chancesLeft) {
  //     alert("Please Enter Valid Chances Total");
  //   }

  //   var numChancesLeft = Number(chancesLeft);
  //   if (numChancesLeft < 0) {
  //     numChancesLeft = 0;
  //   }

  //   var userboothFound = this.user.userBooths.find(
  //     (x) => x.boothNum == boothNum
  //   );
  //   userboothFound.chancesLeft = numChancesLeft;
  // }

  changeBooth(id, status) {
    var boothActivitiesFound = this.boothActivities.find((x) => x.id == id);
    boothActivitiesFound.status = Number(status);

    console.log(boothActivitiesFound);

    this.changedBoothActivities.push(boothActivitiesFound);
  }

  onSubmit() {
    if (this.editrsvp.invalid) {
      this.selectedTab = 0;
      return;
    }

    var editUser = new User();
    // editUser.name = this.editrsvp.controls.name.value;
    editUser.email = this.editrsvp.controls.email.value;
    // editUser.staffId = this.editrsvp.controls.staffId.value;
    editUser.userAvailable = Number(this.editrsvp.controls.userAvailable.value);
    editUser.userAttend = Number(this.editrsvp.controls.userAttend.value);
    editUser.guestAttend = Number(this.editrsvp.controls.guestAttend.value);   
    editUser.guestAvailable = Number(
      this.editrsvp.controls.guestAvailable.value
    );

    editUser.chancesLeft = Number(this.editrsvp.controls.chancesLeft.value);
    editUser.chancesTotal = Number(this.editrsvp.controls.chancesTotal.value);


    if (editUser.guestAttend > editUser.guestAvailable) {
      alert("Acc Attended cannot more than Acc Person.");
      return;
    }

    if (editUser.userAttend > editUser.userAvailable) {
      alert("Please set user available to YES, if you want set User Attended.");
      return;
    }

    if (editUser.chancesLeft > editUser.chancesTotal) {
      alert("Chances Left cannot more than Total Chances.");
      return;
    }

    this.isLoading = true;
    if (!this.addScreen) {
      editUser.id = this.user.id;
    }
    var updateUserRequest = new UpdateUserRequest();
    updateUserRequest.user = editUser;
    updateUserRequest.boothActivities = this.changedBoothActivities;

    if (!this.addScreen) {
      this.rsvpService.updateUser(updateUserRequest).subscribe(
        (data) => {
          this.isLoading = false;
          this.dialogRef.close(this.editrsvp);
        },
        (err) => {
          var errorstr = JSON.stringify(err.error);
          alert(errorstr.replace(new RegExp('"', "g"), ""));
          this.isLoading = false;
        }
      );
    } else {
      this.rsvpService.addUser(updateUserRequest).subscribe(
        (data) => {
          this.isLoading = false;
          this.dialogRef.close(this.editrsvp);
        },
        (err) => {
          var errorstr = JSON.stringify(err.error);
          alert(errorstr.replace(new RegExp('"', "g"), ""));
          this.isLoading = false;
        }
      );
    }
  }
}
