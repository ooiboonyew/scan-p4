import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GuestLoginRequest } from "src/models/rsvp-request.model";
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { RSVPService } from "src/services/rsvp.service";
import { Admin } from "src/models/rsvp.model";

@Component({
  selector: "app-guest-login",
  templateUrl: "./guest-login.component.html",
  styleUrls: ["./guest-login.component.css"],
})
export class GuestLoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  //submitted: boolean = false;
  //errorMessage: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private appComponent: AppComponent,
    private router: Router,
    private rsvpService: RSVPService
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
      staffId: ["", Validators.required],
    });
  }

  onSubmit() {
    //this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.appComponent.isLoading = true;

    var loginRequest = new GuestLoginRequest();
    loginRequest.email = this.loginForm.controls.email.value;
    loginRequest.staffId = this.loginForm.controls.staffId.value;

    //temp
    // this.appComponent.isLoading = false;
    // this.appComponent.user = {
    //   adminID: 123,
    //   name: "ooi",
    //   password: "",
    //   email: "ooi@aira",
    //   isSuperAdmin: false,
    // };

    // sessionStorage.setItem("usertoken", JSON.stringify(this.appComponent.user));
    // this.appComponent.isUserLoggedIn = true;
    // this.router.navigate(["event"]);

    this.rsvpService.guestLogin(loginRequest).subscribe(
      (data) => {
        this.appComponent.isLoading = false;
        console.log(data);
        this.appComponent.user = data;
        sessionStorage.setItem(
          "usertoken",
          JSON.stringify(this.appComponent.user)
        );
        this.appComponent.isUserLoggedIn = true;
        this.router.navigate(["event"]);
      },
      (err) => {
        this.appComponent.isLoading = false;
        alert(err.error);
      }
    );
  }

  ngAfterViewInit() {
    if (sessionStorage.getItem("usertoken") !== null) {
      this.router.navigate(["/event"]);
      this.appComponent.isUserLoggedIn = true;
    } else {
      this.appComponent.isUserLoggedIn = false;
    }
  }
}
