import { Component, OnInit, Inject } from "@angular/core";
import { RSVPService } from "../../../services/rsvp.service";
import { Booth, BoothActivities, User } from "../../../models/rsvp.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DatePipe } from "@angular/common";
import { CustomValidators } from "../../../common/validators";
import { UpdateBoothRequest, UpdateUserRequest } from "src/models/rsvp-request.model";

@Component({
  selector: "app-dialog-editbooth",
  templateUrl: "./dialog-editbooth.component.html",
  styleUrls: ["./dialog-editbooth.component.css"],
})
export class DialogEditboothComponent implements OnInit {
  booth: Booth;
  boothActivities: BoothActivities[];
  changedBoothActivities: BoothActivities[];
  editrsvp: FormGroup;
  isLoading: boolean = false;
  selectedTab: number;
  addScreen: boolean;

  constructor(
    private rsvpService: RSVPService,
    private datepipe: DatePipe,
    private dialogRef: MatDialogRef<DialogEditboothComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.addScreen = this.data.addScreen;
    this.booth = this.data.booth;
    this.changedBoothActivities = [];
    //only user booth update.

    if (!this.addScreen) {
      console.log("here");
      this.rsvpService
        .GetBoothActivitiesByBooth(this.data.booth.boothNum)
        .subscribe(
          (data) => {
            console.log(data);
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
      boothNum: new FormControl(
        {
          value: this.addScreen ? "" : this.booth.boothNum,
          disabled: this.addScreen ? false : true,
        },
        [
          Validators.required,
          Validators.maxLength(50),
          CustomValidators.numberOnly,
        ]
      ),
      secretDigit: new FormControl(
        {
          value: this.addScreen ? "" : this.booth.secretDigit,
          disabled: false,
        },
        [
          Validators.required,
          CustomValidators.numberOnly,
          Validators.minLength(4),
          Validators.maxLength(4),
        ]
      ),
      status: new FormControl(
        {
          value: this.addScreen ? "0" : this.booth.status.toString(),
          disabled: false,
        },
        [Validators.required, Validators.maxLength(50)]
      ),
    });
  }



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

    var editBooth = new Booth();
    editBooth.boothNum = this.editrsvp.controls.boothNum.value;
    editBooth.secretDigit = this.editrsvp.controls.secretDigit.value;
    editBooth.status = Number(this.editrsvp.controls.status.value);

    this.isLoading = true;

    if (!this.addScreen) {
      editBooth.id = this.booth.id;
    }
    
    var updateBoothRequest = new UpdateBoothRequest();
    updateBoothRequest.booth = editBooth;
    updateBoothRequest.boothActivities = this.changedBoothActivities;

    if (!this.addScreen) {
      this.rsvpService.UpdateBooth(updateBoothRequest).subscribe(
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
      this.rsvpService.AddBooth(editBooth).subscribe(
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
