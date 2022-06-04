import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RSVPService } from "../../../services/rsvp.service";
import { MatDialogRef } from '@angular/material';
import { CustomValidators } from "../../../common/validators";

@Component({
  selector: 'app-dialog-uploaddonation',
  templateUrl: './dialog-uploaddonation.component.html',
  styleUrls: ['./dialog-uploaddonation.component.css']
})
export class DialogUploaddonationComponent implements OnInit {
  uploadrsvp: FormGroup;
  isLoading: boolean = false;
  isRequired: boolean = false;

  constructor(private rsvpService: RSVPService,
    // private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogUploaddonationComponent>,
  ) { }

  ngOnInit() {

    this.uploadrsvp = new FormGroup({
      file: new FormControl('', [Validators.required, CustomValidators.excelfile]),
      fileSource: new FormControl('', [Validators.required])
    });

  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.isRequired = false;
      const file = event.target.files[0];
      this.uploadrsvp.patchValue({
        fileSource: file
      });
    }
  }

  onSubmit() {
    if (!this.uploadrsvp.get('fileSource').value)
      this.isRequired = true;
    else
      this.isRequired = false;

    if (this.uploadrsvp.invalid) {
      return;
    }

    this.isLoading = true;
    var formData = new FormData();
    formData.append('file', this.uploadrsvp.get('fileSource').value);

    this.rsvpService.ImportRSVP(formData).subscribe(
      (data) => {
        this.isLoading = false;
        this.dialogRef.close("Successful");

      },
      (err) => {
        this.isLoading = false;
        alert(err.error);
      });
      
  }

}