import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Admin } from 'src/models/rsvp.model';
import { MatSidenav} from '@angular/material';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rsvp-web';
  isUserLoggedIn: boolean = false;
  isLoading: boolean = false;
  isAdminPage: boolean = false;
  admin: Admin;

  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;

  constructor(private router: Router, private location: Location) {
  }

  ngOnInit() {

    if (this.location.path().startsWith("/admin", 0)) {
      this.isAdminPage = true;
    } else {
      this.isAdminPage = false;
    }

    if (this.isAdminPage) {
      this.admin = JSON.parse(sessionStorage.getItem("token"));
      if (this.admin == null) {
        this.isUserLoggedIn = false;
        this.router.navigate(['/admin/login']);
      }
      else {
        this.isUserLoggedIn = true;
      }
    }
  }

  logout() {
    let cfm = confirm("Are you sure you want to log out?");

    if (cfm) {
      if (sessionStorage.getItem("token") !== null) {
        sessionStorage.clear();
        this.isUserLoggedIn = false;
        this.router.navigate(['admin/login']);
      }
    }
  }


}
