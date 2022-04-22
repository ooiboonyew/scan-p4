import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements AfterViewInit {

  constructor(private router: Router) { }

  ngAfterViewInit() {
    let cfm = confirm("Are you sure you want to log out?");

    if (cfm) {
      if (sessionStorage.getItem("token") !== null) {
        sessionStorage.clear();
        this.router.navigate(['admin/login']);
      }
    } else {
      this.router.navigate(['admin/manage']);
    }
  }
}


