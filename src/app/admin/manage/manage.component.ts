import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  constructor( private appComponent: AppComponent) { }

  ngOnInit() {
//    alert(sessionStorage.getItem("token"));

    // alert(this.appComponent.isAdminPage);
    // alert(this.appComponent.isUserLoggedIn);
    // alert(JSON.stringify(this.appComponent.admin));

  }

}
