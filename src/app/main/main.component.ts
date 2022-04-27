import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  constructor() {}

  public isMobileLayout = false;
  
  ngOnInit() {
    window.onresize = () => (this.isMobileLayout = window.innerWidth <= 576);
  }

  goPage() {}
}
