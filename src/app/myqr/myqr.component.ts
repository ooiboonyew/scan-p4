import { Component, OnInit } from '@angular/core';
import { AppComponent } from "src/app/app.component";

@Component({
  selector: 'app-myqr',
  templateUrl: './myqr.component.html',
  styleUrls: ['./myqr.component.css']
})
export class MyqrComponent implements OnInit {
  public myAngularxQrCode: string = "";

  constructor(
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.myAngularxQrCode = this.appComponent.user.id;

  }

}
