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

@Component({
  selector: "app-dialog-editdonation",
  templateUrl: "./dialog-editdonation.component.html",
  styleUrls: ["./dialog-editdonation.component.css"],
})
export class DialogEditdonationComponent implements OnInit {
  rsvp: RSVP;
  editrsvp: FormGroup;
  isLoading: boolean = false;

  constructor(
    private rsvpService: RSVPService,
    private datepipe: DatePipe,
    private dialogRef: MatDialogRef<DialogEditdonationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.rsvp = this.data.rsvp;

    this.editrsvp = new FormGroup({
      firstName: new FormControl(
        { value: this.rsvp.firstName, disabled: false },
        [
          Validators.required,
          Validators.maxLength(50),
          CustomValidators.letterAndNumberSpaceOnly,
        ]
      ),
      lastName: new FormControl(
        { value: this.rsvp.lastName, disabled: false },
        [
          Validators.required,
          Validators.maxLength(50),
          CustomValidators.letterAndNumberSpaceOnly,
        ]
      ),
      email: new FormControl({ value: this.rsvp.email, disabled: false }, [
        Validators.required,
        Validators.maxLength(50),
        Validators.email,
      ]),
      mobile: new FormControl({ value: this.rsvp.mobile, disabled: false }, [
        Validators.required,
        Validators.maxLength(50),
        CustomValidators.sgMobileOnly,
      ]),
      country: new FormControl({ value: this.rsvp.country, disabled: false }, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      attending: new FormControl(
        { value: this.rsvp.attending.toString(), disabled: false },
        [Validators.required]
      ),
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
    editrsvp.attending = Number(this.editrsvp.controls.attending.value);

    editrsvp.id = this.rsvp.id;

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
