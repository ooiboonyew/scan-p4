import { Component, OnInit, Inject } from "@angular/core";
import { RSVPService } from "../../../services/rsvp.service";
import { Config } from "../../../models/rsvp.model";
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
  selector: 'app-dialog-manageconfig',
  templateUrl: './dialog-manageconfig.component.html',
  styleUrls: ['./dialog-manageconfig.component.css']
})
export class DialogManageconfigComponent implements OnInit {
  config: Config;
  editconfig: FormGroup;
  isLoading: boolean = false;
  selectedTab: number;
  addScreen: boolean;

  constructor(
    private rsvpService: RSVPService,
    private datepipe: DatePipe,
    private dialogRef: MatDialogRef<DialogManageconfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.addScreen = this.data.addScreen;
    this.config = this.data.config;

    this.editconfig = new FormGroup({
      name: new FormControl(
        {
          value: this.addScreen ? "" : this.config.name,
          disabled: false,
        },
        []
      ),
    });
  }

  onSubmit() {
    if (this.editconfig.invalid) {
      this.selectedTab = 0;
      return;
    }

    var editconfig = this.config;
    editconfig.name = this.editconfig.controls.name.value;
 
    this.isLoading = true;
    if (!this.addScreen) {
      editconfig.id = this.config.id;
    }

    console.log(editconfig);

    if (!this.addScreen) {
      this.rsvpService.UpdateConfig(editconfig).subscribe(
        (data) => {
          this.isLoading = false;
          this.dialogRef.close(this.editconfig);
        },
        (err) => {
          var errorstr = JSON.stringify(err.error);
          alert(errorstr.replace(new RegExp('"', "g"), ""));
          this.isLoading = false;
        }
      );
    } else {
      this.rsvpService.AddConfig(editconfig).subscribe(
        (data) => {
          this.isLoading = false;
          this.dialogRef.close(this.editconfig);
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

