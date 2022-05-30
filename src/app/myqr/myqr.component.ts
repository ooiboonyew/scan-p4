import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myqr',
  templateUrl: './myqr.component.html',
  styleUrls: ['./myqr.component.css']
})
export class MyqrComponent implements OnInit {
  public myAngularxQrCode: string = "";

  ngOnInit() {
    this.myAngularxQrCode = 'Your QR code data string';

  }

}
