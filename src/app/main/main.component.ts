import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  constructor(
    private router: Router,
  ) {}

  // public isMobileLayout = false;
  
  ngOnInit() {
    // window.onresize = () => (this.isMobileLayout = window.innerWidth <= 576);
  }

  goPage() {
    window.location.href = '/event';
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
