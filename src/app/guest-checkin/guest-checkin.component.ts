import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GuestLoginRequest } from "src/models/rsvp-request.model";
import { Router } from "@angular/router";
import { AppComponent } from "src/app/app.component";
import { RSVPService } from "src/services/rsvp.service";

@Component({
  selector: "app-guest-checkin",
  templateUrl: "./guest-checkin.component.html",
  styleUrls: ["./guest-checkin.component.scss"],
})
export class GuestCheckinComponent implements OnInit {
  checkinForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private appComponent: AppComponent,
    private router: Router,
    private rsvpService: RSVPService
  ) {}

  ngOnInit() {
    this.checkinForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          // Validators.email,
          // Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      name: ["", [Validators.required]],
    });
  }

  onSubmit() {
    //this.submitted = true;

    if (this.checkinForm.invalid) {
      return;
    }

    this.appComponent.isLoading = true;

    var loginRequest = new GuestLoginRequest();
    loginRequest.email = this.checkinForm.controls.email.value;
    loginRequest.name = this.checkinForm.controls.name.value;

    this.rsvpService.CheckInGuest(loginRequest).subscribe(
      (data) => {
        this.appComponent.isLoading = false;
        console.log(data);
        window.location.href = "/checkedin";
      },
      (err) => {
        this.appComponent.isLoading = false;
        this.errorMessage = err.error;
      }
    );
  }
}
