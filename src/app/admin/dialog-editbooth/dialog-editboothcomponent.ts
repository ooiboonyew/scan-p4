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
import {
  UpdateBoothRequest,
  UpdateUserRequest,
} from "src/models/rsvp-request.model";
import { ConstantPool } from "@angular/compiler";

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
  filtertType: string;
  // filterText: string = "";

  constructor(
    private rsvpService: RSVPService,
    private datepipe: DatePipe,
    private dialogRef: MatDialogRef<DialogEditboothComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.filtertType = "staffId";
    this.addScreen = this.data.addScreen;
    this.booth = this.data.booth;
    this.changedBoothActivities = [];
    //only user booth update.

    if (!this.addScreen) {
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
      boothName: new FormControl(
        { value: this.addScreen ? "" : this.booth.boothName, disabled: false },
        [
          Validators.required,
          Validators.maxLength(50),
          CustomValidators.letterAndNumberSpaceOnly,
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
      boothLink: new FormControl(
        { value: this.addScreen ? "" : this.booth.boothLink, disabled: false },
        [
          Validators.required,
          Validators.maxLength(50),
          CustomValidators.url,
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

  reset(filterText, filtertType) {
    filterText.value = "";
    filtertType.selectedIndex = 0;
    this.ngOnInit();
  }

  filter(filterText, filtertType) {
    this.isLoading = true;
    this.rsvpService
      .GetBoothActivitiesByBooth(this.data.booth.boothNum)
      .subscribe(
        (data) => {
          this.isLoading = false;
          if (filterText == "") {
            this.boothActivities = data;
          } else {
            if (filtertType == "name") {
              this.boothActivities = data.filter(
                (user: User) =>
                  user.name
                    .toLocaleLowerCase()
                    .indexOf(filterText.toLocaleLowerCase()) > -1
              );
            } else if (filtertType == "staffId") {
              this.boothActivities = data.filter(
                (user: User) =>
                  user.staffId
                    .toLocaleLowerCase()
                    .indexOf(filterText.toLocaleLowerCase()) > -1
              );
            } else {
              this.boothActivities = data.filter(
                (user: User) =>
                  user.email
                    .toLocaleLowerCase()
                    .indexOf(filterText.toLocaleLowerCase()) > -1
              );
            }
          }
        },
        (err) => {
          this.isLoading = false;
          alert(err.error);
        }
      );
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
    editBooth.boothName = this.editrsvp.controls.boothName.value;
    editBooth.secretDigit = this.editrsvp.controls.secretDigit.value;
    editBooth.boothLink = this.editrsvp.controls.boothLink.value;
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
