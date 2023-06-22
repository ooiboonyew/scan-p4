import { Component, OnInit } from '@angular/core';
import { RSVPService } from "../../../services/rsvp.service";
import { AppComponent } from "src/app/app.component";
import { Summary } from 'src/models/rsvp.model';
import { ExcelFunction } from "../../../common/excelfunction";

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  summary: Summary;


  constructor(
    private excelFunction: ExcelFunction,
    private rSVPService: RSVPService,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    setTimeout(() => (this.appComponent.isLoading = true), 0);
    this.rSVPService.Summary().subscribe(
      (data) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        this.summary = data;
        console.log(data);
      },
      (err) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        alert(err.error);
      }
    );
  }

  download() {
    setTimeout(() => (this.appComponent.isLoading = true), 0);
    this.rSVPService.listEntrance().subscribe(
      (data) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        this.excelFunction.exportCustomHeaderAsExcelFile(data, "rsvp");

        console.log(data);
      },
      (err) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        alert(err.error);
      }
    );
  }

}
