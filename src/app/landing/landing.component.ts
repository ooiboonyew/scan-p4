import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { RSVP } from "../../models/rsvp.model";
import { RSVPService } from "../../services/rsvp.service";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from "@angular/forms";
import { CustomValidators } from "../../common/validators";
import { AppComponent } from "src/app/app.component";
import { Router } from "@angular/router";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
  encapsulation: ViewEncapsulation.None, // Add this line
})
export class LandingComponent implements OnInit {
  rsvp: RSVP;
  addrsvp: FormGroup;
  isSubmitted: boolean;
  selectedItems = [];
  dropdownSettings: IDropdownSettings;
  isAttending: boolean = false;
  from: string = "";
  zone: string = "";
  cluster: string = "";
  errorMessage: string = "";
  rsvpId: string = "";

  constructor(
    private rsvpService: RSVPService,
    private router: Router,
    private route: ActivatedRoute,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.isSubmitted = false;

    this.addrsvp = new FormGroup({
      name: new FormControl({ value: "", disabled: false }, [
        Validators.required,
        Validators.maxLength(200),
        CustomValidators.letterAndNumberSpaceforNameOnly,
      ]),
      from: new FormControl({ value: "", disabled: false }, [
        Validators.required,
      ]),
      designation: new FormControl({ value: "", disabled: false }, []),
      otherDesignation: new FormControl({ value: "", disabled: true }, [
        Validators.maxLength(200),
        CustomValidators.letterAndNumberSpaceOnly,
      ]),
      organisation: new FormControl({ value: "", disabled: false }, []),
      zone: new FormControl({ value: "", disabled: false }, []),
      cluster: new FormControl({ value: "", disabled: false }, []),
      school: new FormControl({ value: "", disabled: false }, []),
      division: new FormControl({ value: "", disabled: false }, []),
      otherDivision: new FormControl({ value: "", disabled: true }, [
        Validators.maxLength(200),
        CustomValidators.letterAndNumberSpaceOnly,
      ]),
      otherFrom: new FormControl({ value: "", disabled: true }, [
        Validators.maxLength(200),
        CustomValidators.letterAndNumberSpaceOnly,
      ]),
      attending: new FormControl({ value: "", disabled: false }, [
        Validators.required,
      ]),
      email: new FormControl({ value: "", disabled: false }, []),
      mobile: new FormControl({ value: "", disabled: false }, []),
      dietary: new FormControl({ value: "", disabled: false }, [
        // Validators.required,
      ]),
      otherDieraty: new FormControl({ value: "", disabled: true }, [
        Validators.maxLength(200),
        CustomValidators.letterAndNumberSpaceOnly,
      ]),
      dataProdection: new FormControl({ value: "", disabled: false }, [
        // Validators.required,
      ]),
      covidStatus: new FormControl({ value: "", disabled: false }, [
        // Validators.required,
      ]),
      otherCovidStatus: new FormControl({ value: "", disabled: true }, [
        Validators.maxLength(200),
        CustomValidators.letterAndNumberSpaceOnly,
      ]),
      parking: new FormControl({ value: "", disabled: false }, [
        // Validators.required,
      ]),
      tableZone: new FormControl({ value: "", disabled: false }, []),
      table: new FormControl({ value: "", disabled: false }, []),
    });

    this.route.queryParams.subscribe((params) => {
      this.rsvpId = params.id;
    });

    this.rsvpService.GetRsvp(this.rsvpId).subscribe(
      (data) => {
        this.appComponent.isLoading = false;
        this.rsvp = data;

        this.addrsvp.controls.name.setValue(this.rsvp.name);
        this.addrsvp.controls.from.setValue(this.rsvp.from);

        this.addrsvp.controls.tableZone.setValue(this.rsvp.tableZone);
        this.addrsvp.controls.table.setValue(this.rsvp.table);
        this.changeFrom(this.rsvp.from);
        this.addrsvp.controls.designation.setValue(this.rsvp.designation);

        if (this.rsvp.designation) {
          this.CheckIsOtherDesignation(this.rsvp.designation);
        }

        this.addrsvp.controls.otherDesignation.setValue(
          this.rsvp.otherDesignation
        );
        this.addrsvp.controls.division.setValue(this.rsvp.division);

        if (this.rsvp.division) {
          this.CheckIsOtherDivision(this.rsvp.division);
        }

        this.addrsvp.controls.zone.setValue(this.rsvp.zone);

        if (this.rsvp.zone) {
          this.changeZone(this.rsvp.zone);
        }

        
        this.addrsvp.controls.cluster.setValue(this.rsvp.cluster);
        if (this.rsvp.cluster) {
          this.changeCluster(this.rsvp.cluster);
        }
        this.addrsvp.controls.attending.setValue(this.rsvp.attending);

        this.addrsvp.controls.school.setValue(this.rsvp.school);

        if (this.rsvp.attending) {
          this.changeRB(this.rsvp.attending);

          this.addrsvp.controls.email.setValue(this.rsvp.email);
          this.addrsvp.controls.mobile.setValue(this.rsvp.mobile);
          this.addrsvp.controls.dataProdection.setValue(
            this.rsvp.dataProdection
          );
          this.addrsvp.controls.dietary.setValue(this.rsvp.dietary);
          this.addrsvp.controls.otherDieraty.setValue(this.rsvp.otherDieraty);

          if (this.rsvp.dietary) {
            this.CheckIsOtherDieraty(this.rsvp.dietary);
          }

          this.addrsvp.controls.covidStatus.setValue(this.rsvp.covidStatus);

          if (this.rsvp.covidStatus) {
            this.CheckisOtherCovidStatus(this.rsvp.covidStatus);
          }

          this.addrsvp.controls.otherCovidStatus.setValue(
            this.rsvp.otherCovidStatus
          );

          this.addrsvp.controls.parking.setValue(this.rsvp.parking);
        }

        console.log(this.rsvp);
      },
      (err) => {
        this.appComponent.isLoading = false;
        alert(err.error);
        // this.errormsg = err.error;
        // this.scanned = true;
      }
    );
  }

  changeRB(e) {
    var attending = "";
    if (this.rsvpId && !e.target) {
      attending = this.rsvp.attending;
    } else {
      attending = e.target.value;
    }

    if (attending == "Yes") {
      this.isAttending = true;
      this.addrsvp.controls.dietary.setValue("");
      this.addrsvp.controls.dataProdection.setValue("");
      this.addrsvp.controls.parking.setValue("");
      this.addrsvp.controls.covidStatus.setValue("");
      this.addrsvp.controls.email.setValue("");
      this.addrsvp.controls.mobile.setValue("");
      this.addrsvp.controls.otherDieraty.setValue("");
      this.addrsvp.controls.otherCovidStatus.setValue("");

      this.addrsvp.controls.otherDieraty.setValidators([]);
      this.addrsvp.controls.otherCovidStatus.setValidators([]);

      this.addrsvp.controls.dietary.setValidators([Validators.required]);
      this.addrsvp.controls.dataProdection.setValidators([Validators.required]);
      this.addrsvp.controls.covidStatus.setValidators([Validators.required]);
      this.addrsvp.controls.parking.setValidators([Validators.required]);
      this.addrsvp.controls.email.setValidators([
        Validators.required,
        Validators.maxLength(200),
        Validators.email,
      ]);
      this.addrsvp.controls.mobile.setValidators([
        Validators.required,
        Validators.maxLength(8),
        CustomValidators.sgMobileOnly,
      ]);
    } else {
      this.isAttending = false;

      this.addrsvp.controls.dietary.setValidators([]);
      this.addrsvp.controls.dataProdection.setValidators([]);
      this.addrsvp.controls.parking.setValidators([]);
      this.addrsvp.controls.covidStatus.setValidators([]);
      this.addrsvp.controls.email.setValidators([]);
      this.addrsvp.controls.mobile.setValidators([]);
      this.addrsvp.controls.otherDieraty.setValidators([]);
      this.addrsvp.controls.otherCovidStatus.setValidators([]);
      this.addrsvp.controls.dietary.setValue("");
      this.addrsvp.controls.dataProdection.setValue("");
      this.addrsvp.controls.parking.setValue("");
      this.addrsvp.controls.covidStatus.setValue("");
      this.addrsvp.controls.email.setValue("");
      this.addrsvp.controls.mobile.setValue("");
      this.addrsvp.controls.otherDieraty.setValue("");
      this.addrsvp.controls.otherCovidStatus.setValue("");
    }
  }

  CheckDataProdection(e) {
    // console.log(this.addrsvp.controls.dataProdection.value);

    // console.log(e);
    // console.log(e.target.checked);
    if (e.target.checked == false) {
      this.addrsvp.controls.dataProdection.setValue("");
      console.log(this.addrsvp.controls.dataProdection.value);
    }
  }

  changeFrom(e) {
    if (this.rsvpId && !e.target) {
      this.from = this.rsvp.from;
    } else {
      this.from = e.target.value;
    }

    if (this.from == "Schools") {
      this.addrsvp.controls.designation.setValue("");
      this.addrsvp.controls.zone.setValue("");
      this.addrsvp.controls.cluster.setValue("");
      this.addrsvp.controls.school.setValue("");

      this.addrsvp.controls.designation.setValidators([Validators.required]);
      this.addrsvp.controls.zone.setValidators([Validators.required]);
    } else {
      if (this.from == "SPED") {
        this.addrsvp.controls.designation.setValidators([]);
        this.addrsvp.controls.designation.setValue("");
      }
      this.zone = "";
      this.addrsvp.controls.zone.setValidators([]);
      this.addrsvp.controls.zone.setValue("");
      this.addrsvp.controls.cluster.setValidators([]);
      this.cluster = "";
      this.addrsvp.controls.cluster.setValue("");
      this.addrsvp.controls.school.setValidators([]);
      this.addrsvp.controls.school.setValue("");
    }

    if (this.from == "SPED") {
      this.addrsvp.controls.school.setValue("");
      this.addrsvp.controls.school.setValidators([Validators.required]);
    } else {
      this.addrsvp.controls.school.setValidators([]);
    }

    if (this.from == "HQ") {
      this.addrsvp.controls.division.enable();

      this.addrsvp.controls.designation.setValue("");
      this.addrsvp.controls.division.setValidators([Validators.required]);
      this.addrsvp.controls.designation.setValidators([
        Validators.required,
        Validators.maxLength(200),
        CustomValidators.letterAndNumberSpaceOnly,
      ]);
    } else {
      this.addrsvp.controls.division.disable();
      this.addrsvp.controls.division.setValue("");
      this.addrsvp.controls.division.setValidators([]);
      this.addrsvp.controls.designation.setValue("");

      if (this.from == "SPED") {
        this.addrsvp.controls.designation.setValidators([]);
      }
    }

    if (this.from == "Seconded") {
      this.addrsvp.controls.organisation.enable();
      this.addrsvp.controls.organisation.setValidators([
        Validators.required,
        Validators.maxLength(200),
        CustomValidators.letterAndNumberSpaceOnly,
      ]);
      this.addrsvp.controls.designation.setValidators([
        Validators.required,
        Validators.maxLength(200),
        CustomValidators.letterAndNumberSpaceOnly,
      ]);
    } else {
      this.addrsvp.controls.organisation.disable();
      this.addrsvp.controls.organisation.setValue("");
      this.addrsvp.controls.organisation.setValidators([]);
      this.addrsvp.controls.designation.setValue("");

      if (this.from == "SPED") {
        this.addrsvp.controls.designation.setValidators([]);
      }
    }

    if (this.from == "SEAB" || this.from == "Teacher" || this.from == "NIE") {
      this.addrsvp.controls.designation.setValue("");
      this.addrsvp.controls.designation.setValidators([
        Validators.required,
        Validators.maxLength(200),
        CustomValidators.letterAndNumberSpaceOnly,
      ]);
    } else {
      this.addrsvp.controls.designation.setValue("");

      if (this.from == "SPED") {
        this.addrsvp.controls.designation.setValidators([]);
      }
    }

    //*ngIf="from == 'HQ'|| from == 'Seconded' || from == 'SEAB' || from == 'Others'"

    if (this.from != "Others") {
      this.addrsvp.controls.otherFrom.disable();
      this.addrsvp.controls.otherFrom.setValue("");

      if (this.from == "SPED") {
        this.addrsvp.controls.designation.setValidators([]);
      }
    } else {
      this.addrsvp.controls.otherFrom.setValue("");
      this.addrsvp.controls.designation.setValue("");

      this.addrsvp.controls.otherFrom.setValidators([
        Validators.required,
        Validators.maxLength(200),
        CustomValidators.letterAndNumberSpaceOnly,
      ]);
      this.addrsvp.controls.otherFrom.enable();
      this.addrsvp.controls.designation.setValidators([
        Validators.required,
        Validators.maxLength(200),
        CustomValidators.letterAndNumberSpaceOnly,
      ]);
    }
  }

  changeZone(e) {
    if (this.rsvpId && !e.target) {
      this.zone = this.rsvp.zone;
    } else {
      this.zone = e.target.value;
    }

    this.addrsvp.controls.cluster.setValidators([Validators.required]);
  }

  changeCluster(e) {
    if (this.rsvpId && !e.target) {
      this.cluster = this.rsvp.cluster;
    } else {
      this.cluster = e.target.value;
    }

    this.addrsvp.controls.school.setValidators([Validators.required]);
  }

  CheckIsOtherDieraty(e) {
    var dietary = "";
    if (this.rsvpId && !e.target) {
      dietary = this.rsvp.dietary;
    } else {
      dietary = e.target.value;
    }

    if (dietary != "Others") {
      this.addrsvp.controls.otherDieraty.disable();
      this.addrsvp.controls.otherDieraty.setValue("");
    } else {
      this.addrsvp.controls.otherDieraty.setValidators([
        Validators.required,
        Validators.maxLength(200),
        CustomValidators.letterAndNumberSpaceOnly,
      ]);
      this.addrsvp.controls.otherDieraty.enable();
    }
    // this.disableControl(e);
  }

  CheckisOtherCovidStatus(e) {
    var covidStatus = "";
    if (this.rsvpId && !e.target) {
      covidStatus = this.rsvp.covidStatus;
    } else {
      covidStatus = e.target.value;
    }

    if (covidStatus != "Others") {
      this.addrsvp.controls.otherCovidStatus.disable();
      this.addrsvp.controls.otherCovidStatus.setValue("");
    } else {
      this.addrsvp.controls.otherCovidStatus.setValidators([
        Validators.required,
        Validators.maxLength(200),
        CustomValidators.letterAndNumberSpaceOnly,
      ]);
      this.addrsvp.controls.otherCovidStatus.enable();
    }
  }

  CheckIsOtherDivision(e) {
    var division = "";
    if (this.rsvpId && !e.target) {
      division = this.rsvp.division;
    } else {
      division = e.target.value;
    }

    if (division != "Others") {
      this.addrsvp.controls.otherDivision.disable();
      this.addrsvp.controls.otherDivision.setValue("");
    } else {
      this.addrsvp.controls.otherDivision.setValidators([
        Validators.required,
        Validators.maxLength(200),
        CustomValidators.letterAndNumberSpaceOnly,
      ]);
      this.addrsvp.controls.otherDivision.enable();
    }
  }

  CheckIsOtherDesignation(e) {
    var designation = "";
    if (this.rsvpId && !e.target) {
      designation = this.rsvp.designation;
    } else {
      designation = e.target.value;
    }

    if (designation != "Others") {
      this.addrsvp.controls.otherDesignation.disable();
      this.addrsvp.controls.otherDesignation.setValue("");
    } else {
      this.addrsvp.controls.otherDesignation.setValidators([
        Validators.required,
        Validators.maxLength(200),
        CustomValidators.letterAndNumberSpaceOnly,
      ]);
      this.addrsvp.controls.otherDesignation.enable();
    }
  }

  onSubmit() {
    this.isSubmitted = true;

    console.log(this.addrsvp);

    if (this.addrsvp.invalid) {
      return;
    }

    var rsvp = new RSVP();
    rsvp.name = this.addrsvp.controls.name.value;
    rsvp.attending = this.addrsvp.controls.attending.value;
    rsvp.email = this.addrsvp.controls.email.value;
    rsvp.mobile = this.addrsvp.controls.mobile.value;
    rsvp.dietary = this.addrsvp.controls.dietary.value;
    rsvp.otherDieraty = this.addrsvp.controls.otherDieraty.value;
    rsvp.covidStatus = this.addrsvp.controls.covidStatus.value;
    rsvp.otherCovidStatus = this.addrsvp.controls.otherCovidStatus.value;
    rsvp.dataProdection = this.addrsvp.controls.dataProdection.value;
    rsvp.parking = this.addrsvp.controls.parking.value;
    rsvp.school = this.addrsvp.controls.school.value;
    rsvp.division = this.addrsvp.controls.division.value;
    rsvp.from = this.addrsvp.controls.from.value;
    rsvp.designation = this.addrsvp.controls.designation.value;
    rsvp.otherDesignation = this.addrsvp.controls.otherDesignation.value;
    rsvp.organisation = this.addrsvp.controls.organisation.value;
    rsvp.zone = this.addrsvp.controls.zone.value;
    rsvp.cluster = this.addrsvp.controls.cluster.value;
    rsvp.otherDivision = this.addrsvp.controls.otherDivision.value;
    rsvp.otherFrom = this.addrsvp.controls.otherFrom.value;
    rsvp.table = this.addrsvp.controls.table.value;
    rsvp.tableZone = this.addrsvp.controls.tableZone.value;
    
    console.log(rsvp);
    this.appComponent.isLoading = true;

    if (this.rsvpId) {
      rsvp.id = this.rsvpId;
      this.rsvpService.UpdateRSVP(rsvp).subscribe(
        (data) => {
          this.appComponent.isLoading = false;
          alert("Update Successfully.");
          this.router.navigate(["/admin/guest-list"]);

        },
        (err) => {
          var errorstr = JSON.stringify(err.error);
          console.log(err.error);
          // alert(errorstr.replace('"/g', ""))
          alert(errorstr.replace(new RegExp('"', "g"), ""));
          this.appComponent.isLoading = false;
        }
      );
    } else {
      this.rsvpService.AddRSVP(rsvp).subscribe(
        (data) => {
          this.appComponent.isLoading = false;
          this.router.navigate(["registered"]);
        },
        (err) => {
          var errorstr = JSON.stringify(err.error);
          console.log(err.error);
          // alert(errorstr.replace('"/g', ""))
          alert(errorstr.replace(new RegExp('"', "g"), ""));
          this.appComponent.isLoading = false;
        }
      );
    }
  }
}
