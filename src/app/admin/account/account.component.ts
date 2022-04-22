import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppComponent } from 'src/app/app.component';
import { AdminService } from "../../../services/admin.service";
import { Router } from "@angular/router";
import { ChangePasswordReq } from 'src/models/rsvp-request.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private appComponent: AppComponent, 
    private adminService: AdminService) { }

  ngOnInit() {
    this.accountForm = this.formBuilder.group({
      confirmpassword: ['', Validators.required,Validators.minLength(3)],
      oldpassword: ['', Validators.required],
      newpassword: ['', Validators.required]
    });
  }


  onSubmit() {

    if(this.accountForm.controls.newpassword.value != this.accountForm.controls.confirmpassword.value)
    {
      alert("The Confirm password field does not match the New password field.");
      return;
    }

    var changePasswordReq = new ChangePasswordReq();
    changePasswordReq.adminID = this.appComponent.admin.adminID;
    changePasswordReq.newpassword = this.accountForm.controls.newpassword.value;
    changePasswordReq.oldpassword = this.accountForm.controls.oldpassword.value;

    this.appComponent.isLoading = true;

    this.adminService.ChangePasswordAdmin(changePasswordReq)
    .subscribe(data => {
      if (data.status == 200) {
        this.appComponent.isLoading = false;
        alert("Change Password Successfully.")
        this.router.navigate(['admin/home']);
      }
      else {
        this.appComponent.isLoading = false;
        alert(data.result);
      }
    });
  }


}
