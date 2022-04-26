import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RSVP } from "../../models/rsvp.model";
import { RSVPService } from "../../services/rsvp.service";
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CustomValidators } from "../../common/validators";
import { AppComponent } from 'src/app/app.component';
import { Router } from "@angular/router";
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None // Add this line
})
export class LandingComponent implements OnInit {
  rsvp: RSVP;
  addrsvp: FormGroup;
  isSubmitted: boolean;
  selectedItems = [];
  dropdownSettings: IDropdownSettings;

  constructor(private rsvpService: RSVPService, private router: Router,
    private appComponent: AppComponent) { }


  ngOnInit() {
    this.isSubmitted = false;

    this.addrsvp = new FormGroup({
      firstName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(50), CustomValidators.letterAndNumberSpaceOnly]),
      lastName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(50), CustomValidators.letterAndNumberSpaceOnly]),
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(50), Validators.email]),
      mobile: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(50), CustomValidators.sgMobileOnly]),
      country: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(50)]),
      attending: new FormControl({ value: '', disabled: false }, [Validators.required])
    });
  }


  onSubmit() {
    this.isSubmitted = true;

    if (this.addrsvp.invalid) {
      return;
    }

    var rsvp = new RSVP();
    rsvp.firstName = this.addrsvp.controls.firstName.value;
    rsvp.lastName = this.addrsvp.controls.lastName.value;
    rsvp.email = this.addrsvp.controls.email.value;
    rsvp.mobile = this.addrsvp.controls.mobile.value;
    rsvp.country = this.addrsvp.controls.country.value;
    rsvp.attending = Number(this.addrsvp.controls.attending.value);

    console.log(rsvp);
    this.appComponent.isLoading = true;
    this.rsvpService.AddRSVP(rsvp)
      .subscribe(data => {      
          this.appComponent.isLoading = false;
          this.router.navigate(['registered']);
      },
        err => {
          var errorstr = JSON.stringify(err.error)
          console.log(err.error);
          alert(errorstr)
          this.appComponent.isLoading = false;
        }
      );
  }

}
