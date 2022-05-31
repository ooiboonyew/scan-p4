import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { Admin, User } from "src/models/rsvp.model";
import { MatSidenav } from "@angular/material";
import { environment } from "../environments/environment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "rsvp-web";
  isLoading: boolean = false;
  isAdminPage: boolean = false;
  isAdminLoggedIn: boolean = false;
  admin: Admin;

  isEventPage: boolean = false;
  user: User;
  isUserLoggedIn: boolean = false;

  @ViewChild("sidenav", { static: false }) sidenav: MatSidenav;

  constructor(public router: Router, private location: Location) {}

  ngOnInit() {
    if (this.location.path().startsWith("/admin", 0)) {
      this.isAdminPage = true;
    } else {
      this.isAdminPage = false;
    }

    if (this.isAdminPage) {
      this.admin = JSON.parse(sessionStorage.getItem("admintoken"));
      if (this.admin == null) {
        this.isAdminLoggedIn = false;
        this.router.navigate(["/admin/login"]);
      } else {
        this.isAdminLoggedIn = true;
      }
    }

    if (this.location.path().startsWith("/event", 0)) {
      this.isEventPage = true;
    } else {
      this.isEventPage = false;
    }

    if (this.isEventPage) {
      this.user = JSON.parse(sessionStorage.getItem("usertoken"));

      console.log(this.isEventPage);
      console.log(this.user);

      if (this.user == null) {
        this.isUserLoggedIn = false;
        this.router.navigate(["/login"]);
      } else {
        this.isUserLoggedIn = true;
      }
    }
  }

  logoutuser() {
    let cfm = confirm("Are you sure you want to log out?");

    if (cfm) {
      if (sessionStorage.getItem("usertoken") !== null) {
        sessionStorage.clear();
        this.isUserLoggedIn = false;
        this.router.navigate(["login"]);
      }
    }
  }

  logoutadmin() {
    let cfm = confirm("Are you sure you want to log out?");

    if (cfm) {
      if (sessionStorage.getItem("admintoken") !== null) {
        sessionStorage.clear();
        this.isAdminLoggedIn = false;
        this.router.navigate(["admin/login"]);
      }
    }
  }
}
