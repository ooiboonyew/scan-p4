import { Component, OnInit, Inject } from "@angular/core";
import { RSVPService } from "../../../services/rsvp.service";
import { RSVP } from "../../../models/rsvp.model";
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
  selector: "app-dialog-managersvp",
  templateUrl: "./dialog-managersvp.component.html",
  styleUrls: ["./dialog-managersvp.component.css"],
})
export class DialogManagersvpComponent implements OnInit {
  rsvp: RSVP;
  editrsvp: FormGroup;
  isLoading: boolean = false;
  selectedTab: number;
  addScreen: boolean;

  constructor(
    private rsvpService: RSVPService,
    private datepipe: DatePipe,
    private dialogRef: MatDialogRef<DialogManagersvpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.addScreen = this.data.addScreen;
    this.rsvp = this.data.user;

    this.editrsvp = new FormGroup({
      firstName: new FormControl(
        {
          value: this.addScreen ? "" : this.rsvp.firstName,
          disabled: false,
        },
        []
      ),
      lastName: new FormControl(
        {
          value: this.addScreen ? "" : this.rsvp.lastName,
          disabled: false,
        },
        []
      ),
      email: new FormControl(
        { value: this.addScreen ? "" : this.rsvp.email, disabled: false },
        []
      ),
      company: new FormControl(
        { value: this.addScreen ? "" : this.rsvp.company, disabled: false },
        []
      ),
      category: new FormControl(
        { value: this.addScreen ? "" : this.rsvp.category, disabled: false },
        []
      ),
      data1: new FormControl(
        { value: this.addScreen ? "" : this.rsvp.data1, disabled: false },
        []
      ),
      data2: new FormControl(
        { value: this.addScreen ? "" : this.rsvp.data2, disabled: false },
        []
      ),
      data3: new FormControl(
        { value: this.addScreen ? "" : this.rsvp.data3, disabled: false },
        []
      ),
      data4: new FormControl(
        { value: this.addScreen ? "" : this.rsvp.data4, disabled: false },
        []
      ),
      data5: new FormControl(
        { value: this.addScreen ? "" : this.rsvp.data5, disabled: false },
        []
      ),
      checkedIn: new FormControl(
        {
          value: this.addScreen ? "0" : this.rsvp.checkedIn ? "1" : "0",
          disabled: false,
        },
        []
      ),
    });
  }

  onSubmit() {
    if (this.editrsvp.invalid) {
      this.selectedTab = 0;
      return;
    }

    var editRsvp = this.rsvp;
    editRsvp.checkedIn = this.editrsvp.controls.checkedIn.value == "1";
    editRsvp.firstName = this.editrsvp.controls.firstName.value;
    editRsvp.lastName = this.editrsvp.controls.lastName.value;
    editRsvp.email = this.editrsvp.controls.email.value;
    editRsvp.category = this.editrsvp.controls.category.value;
    editRsvp.company = this.editrsvp.controls.company.value;
    editRsvp.data1 = this.editrsvp.controls.data1.value;
    editRsvp.data2 = this.editrsvp.controls.data2.value;
    editRsvp.data3 = this.editrsvp.controls.data3.value;
    editRsvp.data4 = this.editrsvp.controls.data4.value;
    editRsvp.data5 = this.editrsvp.controls.data5.value;

    this.isLoading = true;
    if (!this.addScreen) {
      editRsvp.id = this.rsvp.id;
    }

    console.log(editRsvp);

    if (!this.addScreen) {
      this.rsvpService.UpdateRSVP(editRsvp).subscribe(
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
      this.rsvpService.AddRSVP(editRsvp).subscribe(
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
