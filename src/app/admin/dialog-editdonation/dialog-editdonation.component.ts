import { Component, OnInit, Inject } from "@angular/core";
import { RSVPService } from "../../../services/rsvp.service";
import { RSVP, User } from "../../../models/rsvp.model";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DatePipe } from "@angular/common";
import { CustomValidators } from "../../../common/validators";

@Component({
  selector: "app-dialog-editdonation",
  templateUrl: "./dialog-editdonation.component.html",
  styleUrls: ["./dialog-editdonation.component.css"],
})
export class DialogEditdonationComponent implements OnInit {
  user: User;
  editrsvp: FormGroup;
  isLoading: boolean = false;

  constructor(
    private rsvpService: RSVPService,
    private datepipe: DatePipe,
    private dialogRef: MatDialogRef<DialogEditdonationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.user = this.data.user;

    this.editrsvp = new FormGroup({
      name: new FormControl(
        { value: this.user.name, disabled: false },
        [
          Validators.required,
          Validators.maxLength(50),
          CustomValidators.letterAndNumberSpaceOnly,
        ]
      ),
      staffId: new FormControl(
        { value: this.user.staffId, disabled: false },
        [
          Validators.required,
          Validators.maxLength(50),
          CustomValidators.letterAndNumberSpaceOnly,
        ]
      ),
      email: new FormControl({ value: this.user.email, disabled: false }, [
        Validators.required,
        Validators.maxLength(50),
        Validators.email,
      ]),
      userAttend: new FormControl({ value: this.user.userAttend.toString(), disabled: false }, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      // attending: new FormControl(
      //   { value: this.rsvp.attending.toString(), disabled: false },
      //   [Validators.required]
      // ),
    });
  }

  onSubmit() {
    if (this.editrsvp.invalid) {
      return;
    }

    this.isLoading = true;

    var editrsvp = new RSVP();
    editrsvp.firstName = this.editrsvp.controls.firstName.value;
    editrsvp.lastName = this.editrsvp.controls.lastName.value;
    editrsvp.email = this.editrsvp.controls.email.value;
    editrsvp.country = this.editrsvp.controls.country.value;
    editrsvp.mobile = this.editrsvp.controls.mobile.value;
    // editrsvp.attending = Number(this.editrsvp.controls.attending.value);
    editrsvp.attending = 0;

    editrsvp.id = this.user.id;

    this.rsvpService.UpdateRSVP(editrsvp).subscribe(
      (data) => {
        this.isLoading = false;
        this.dialogRef.close(this.editrsvp);
      },
      (err) => {
        var errorstr = JSON.stringify(err.error);
        alert(errorstr);
        this.isLoading = false;
      }
    );
  }
}
