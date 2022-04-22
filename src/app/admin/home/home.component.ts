import { Component, OnInit, ViewChild } from '@angular/core';
import { RSVP } from "../../../models/rsvp.model";
import { RSVPService } from "../../../services/rsvp.service";
import { AppComponent } from 'src/app/app.component';
import { MatPaginator, MatTableDataSource, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogEditdonationComponent } from '../dialog-editdonation/dialog-editdonation.component';
import { ExcelFunction } from "../../../common/excelfunction";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  rsvps: RSVP[];
  selectedAll: boolean;
  datasource: any[];
  totalselect: number = 100;
  dataSource: MatTableDataSource<RSVP>;
  selection: SelectionModel<RSVP> = new SelectionModel<RSVP>(true, []);
  displayedColumns: string[] = ['rsvpID', 'firstName', 'lastName', 'email','country','organization', 'function', 'brand', 'createdDate', 'Edit'];
  selectedfilter: string = "";

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private rSVPService: RSVPService, public dialog: MatDialog,
    private excelFunction: ExcelFunction,
    private appComponent: AppComponent) { }

  ngOnInit() {
    setTimeout(() => this.appComponent.isLoading = true, 0);
    this.rSVPService.listRSVP()
      .subscribe(data => {
        console.log(data);
        setTimeout(() => this.appComponent.isLoading = false, 0);
        this.rsvps = data;
        this.dataSource = new MatTableDataSource<RSVP>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {
        setTimeout(() => this.appComponent.isLoading = false, 0);
        alert(err.error);
      });
  }

  download() {
    this.appComponent.isLoading = true;
    this.excelFunction.exportCustomHeaderAsExcelFile(this.rsvps, "rsvp");
    this.appComponent.isLoading = false;
  }

  edit(rsvp: RSVP) {
    let dialogRef = this.dialog.open(DialogEditdonationComponent, {
      width: '60%',
      disableClose: true,
      data: {
        rsvp: rsvp,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        alert("Rsvp Update Successfully.")
        this.ngOnInit();
      }
    });
  }

}
