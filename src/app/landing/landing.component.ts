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
  checkbox1value: boolean = false;
  checkbox2value: boolean = false;
  selectedItems = [];
  dropdownSettings: IDropdownSettings;
  selectedorganization = "";
  selectedfunction = "";
  unSelectedAll: boolean;

  constructor(private rsvpService: RSVPService, private router: Router,
    private appComponent: AppComponent) { }

  ordersData = [
    { id: 100, name: 'Entresto' },
    { id: 200, name: 'LEQVIO / Inclisiran' },
    { id: 300, name: 'Pelacarsen' },
    { id: 400, name: 'Iptacopan' }
  ];

  get ordersFormArray() {
    return this.addrsvp.controls.orders as FormArray;
  }

  addCheckboxes() {
    this.ordersData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }

  uncheck() {
    this.unSelectedAll = false;

    const selectedOrderIds = this.addrsvp.value.orders
      .map((checked, i) => checked ? this.ordersData[i].name : null)
      .filter(v => v !== null);

      console.log(selectedOrderIds.length);

    if (selectedOrderIds.length > 0) {
      this.addrsvp.controls['brand'].setValue('default');
    }
    else {
      this.addrsvp.controls['brand'].setValue('');
    }
  }

  uncheckAll() {
    this.ordersFormArray.clear();
    this.ordersData.forEach(() => this.ordersFormArray.push(new FormControl(false)));

    if (this.unSelectedAll) {
      this.addrsvp.controls['brand'].setValue('default');
    }
    else {
      this.addrsvp.controls['brand'].setValue('');
    }
  }

  ngOnInit() {
    this.isSubmitted = false;

    this.addrsvp = new FormGroup({
      firstName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(50), CustomValidators.letterAndNumberSpaceOnly]),
      lastName: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(50), CustomValidators.letterAndNumberSpaceOnly]),
      email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(50), Validators.email]),
      country: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(50)]),

      organization: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(100)]),
      other_organization: new FormControl({ value: 'default', disabled: false }, [Validators.required, Validators.maxLength(100)]),

      function: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(100)]),
      other_function: new FormControl({ value: 'default', disabled: false }, [Validators.required, Validators.maxLength(100)]),

      brand: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.maxLength(100)]),
      orders: new FormArray([])

    });
    this.addCheckboxes();
  }


  onChangeOrganization(event) {
    const value = event.target.value;

    if (value == "Other") {
      this.addrsvp.controls['other_organization'].setValue('');
    }
    else {
      this.addrsvp.controls['other_organization'].setValue('default');
    }
  }

  onChangeFunction(event) {
    const value = event.target.value;

    if (value == "Other") {
      this.addrsvp.controls['other_function'].setValue('');
    }
    else {
      this.addrsvp.controls['other_function'].setValue('default');
    }
  }

  onSubmit() {
    var brands = "";

    const selectedOrderIds = this.addrsvp.value.orders
      .map((checked, i) => checked ? this.ordersData[i].name : null)
      .filter(v => v !== null);

    selectedOrderIds.forEach(item => {
      brands += item + ", "
    });

    if (brands.length > 0) {
      brands = brands.slice(0, -2)
    }else
    {
      brands = "None of the above"
    }

    this.isSubmitted = true;

    if (this.addrsvp.invalid) {
      return;
    }

    var rsvp = new RSVP();
    rsvp.firstName = this.addrsvp.controls.firstName.value;
    rsvp.lastName = this.addrsvp.controls.lastName.value;
    rsvp.email = this.addrsvp.controls.email.value;
    rsvp.country = this.addrsvp.controls.country.value;
    rsvp.organization = this.addrsvp.controls.organization.value;
    rsvp.function = this.addrsvp.controls.function.value;
    rsvp.brand = brands;

    if (rsvp.organization == "Other") {
      rsvp.organization = "Other-" + this.addrsvp.controls.other_organization.value;
    }

    if (rsvp.function == "Other") {
      rsvp.function = "Other-" + this.addrsvp.controls.other_function.value;
    }

    console.log(rsvp);
    this.appComponent.isLoading = true;
    this.rsvpService.AddRSVP(rsvp)
      .subscribe(data => {
        if (data.status == 200) {
          this.appComponent.isLoading = false;
          this.router.navigate(['registered']);
        }
        else {
          this.appComponent.isLoading = false;
          alert(JSON.stringify(data.result));
        }
      },
        err => {
          var errorstr = JSON.stringify(err.error)
          alert(errorstr)
          this.appComponent.isLoading = false;
        }
      );
  }

}
