import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { Admin } from "src/models/rsvp.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  admin: Admin;

  constructor(private appComponent: AppComponent) {}

  ngOnInit() {
    this.admin = this.appComponent.admin;
  }
}
