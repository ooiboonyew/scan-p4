import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginRequest } from "src/models/rsvp-request.model";
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { AdminService } from "../../../services/admin.service";
import { Admin } from "src/models/rsvp.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  //submitted: boolean = false;
  //errorMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private appComponent: AppComponent,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    //this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.appComponent.isLoading = true;

    var loginRequest = new LoginRequest();
    loginRequest.email = this.loginForm.controls.email.value;
    loginRequest.password = this.loginForm.controls.password.value;

    this.adminService.Login(loginRequest).subscribe(
      (data) => {
        this.appComponent.isLoading = false;
        console.log(data);
        this.appComponent.admin = data;
        sessionStorage.setItem(
          "admintoken",
          JSON.stringify(this.appComponent.admin)
        );
        this.appComponent.isAdminLoggedIn = true;
        this.router.navigate(["admin"]);
      },
      (err) => {
        this.appComponent.isLoading = false;
        alert(err.error);
      }
    );
  }

  ngAfterViewInit() {
    if (sessionStorage.getItem("admintoken") !== null) {
      this.router.navigate(["admin"]);
      this.appComponent.isAdminLoggedIn = true;
    } else {
      this.appComponent.isAdminLoggedIn = false;
    }
  }
}
