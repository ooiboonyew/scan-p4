import { Component, OnInit, ViewChild } from "@angular/core";
import { RSVP } from "../../../models/rsvp.model";
import { RSVPService } from "../../../services/rsvp.service";
import { AppComponent } from "src/app/app.component";
import {
  MatPaginator,
  MatTableDataSource,
  MatSort,
  MatSnackBar,
  MatDialog,
} from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { DialogUploaddonationComponent } from "../dialog-uploaddonation/dialog-uploaddonation.component";
import { ExcelFunction } from "../../../common/excelfunction";
import { UpdateUserRequest } from "src/models/rsvp-request.model";
import { Router } from "@angular/router";
import { DialogManagersvpComponent } from "../dialog-managersvp/dialog-managersvp.component";

@Component({
  selector: "app-attendance",
  templateUrl: "./attendance.component.html",
  styleUrls: ["./attendance.component.css"],
})
export class AttendanceComponent implements OnInit {
  filtertType: string;
  filterText: string;
  rsvps: RSVP[];
  selectedAll: boolean;
  datasource: any[];
  dataSource: MatTableDataSource<RSVP>;
  selection: SelectionModel<RSVP> = new SelectionModel<RSVP>(true, []);
  displayedColumns: string[] = [
    "num",
    "firstName",
    "lastName",
    "email",
    "company",
    "category",
    "qr",
    "data1",
    // "data2",
    // "data3",
    // "data4",
    // "data5",
    "createdDate",
    "checkedInDate",
    "Edit",
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router,
    private rSVPService: RSVPService,
    public dialog: MatDialog,
    private excelFunction: ExcelFunction,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.filtertType = "email";
    setTimeout(() => (this.appComponent.isLoading = true), 0);
    this.rSVPService.listRSVP().subscribe(
      (data) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        this.rsvps = data;
        this.dataSource = new MatTableDataSource<RSVP>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        alert(err.error);
      }
    );
  }

  reset() {
    this.filterText = "";
    this.filtertType = "name";
    this.ngOnInit();
  }

  filter() {
    this.appComponent.isLoading = true;

    this.rSVPService.listRSVP().subscribe(
      (data) => {
        this.appComponent.isLoading = false;

        if (this.filterText == "") {
          this.rsvps = data;
        } else {
          // this.rsvps = data.filter(
          //   (rsvp: RSVP) =>
          //     rsvp.email
          //       .toLocaleLowerCase()
          //       .indexOf(this.filterText.toLocaleLowerCase()) > -1
          // );
          if (this.filtertType == "firstName") {
            this.rsvps = data.filter(
              (rsvp: RSVP) =>
                rsvp.firstName
                  .toLocaleLowerCase()
                  .indexOf(this.filterText.toLocaleLowerCase()) > -1
            );

            this.rsvps.forEach((rsvp, index) => {
              rsvp.num = index + 1;
            });
          } else if (this.filtertType == "company") {
            this.rsvps = data.filter(
              (rsvp: RSVP) =>
                rsvp.company
                  .toLocaleLowerCase()
                  .indexOf(this.filterText.toLocaleLowerCase()) > -1
            );

            this.rsvps.forEach((rsvp, index) => {
              rsvp.num = index + 1;
            });
          } else {
            this.rsvps = data.filter(
              (rsvp: RSVP) =>
                rsvp.email
                  .toLocaleLowerCase()
                  .indexOf(this.filterText.toLocaleLowerCase()) > -1
            );

            this.rsvps.forEach((rsvp, index) => {
              rsvp.num = index + 1;
            });
          }
        }

        this.dataSource = new MatTableDataSource<RSVP>(this.rsvps);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.appComponent.isLoading = false;
        alert(err.error);
      }
    );
  }

  import() {
    let dialogRef = this.dialog.open(DialogUploaddonationComponent, {
      width: "60%",
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        alert("Import Successfully.");
        this.ngOnInit();
      }
    });
  }

  download() {
    this.appComponent.isLoading = true;
    this.excelFunction.exportCustomHeaderAsExcelFile(this.rsvps, "rsvp");
    this.appComponent.isLoading = false;
  }

  add() {
    let dialogRef = this.dialog.open(DialogManagersvpComponent, {
      width: "80%",
      height: "80%",
      disableClose: true,
      data: {
        rsvp: {},
        addScreen: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        alert("Guest Add Successfully.");
        this.ngOnInit();
      }
    });
  }

  attend(rsvp: RSVP) {
    if (confirm("Are you sure you want to check-in " + rsvp.email + "?")) {
      this.rSVPService.CheckIn(rsvp).subscribe(
        (data) => {
          rsvp.checkedIn = true;
          rsvp.checkedInDate = data.checkedInDate;
          this.appComponent.isLoading = false;
        },
        (err) => {
          var errorstr = JSON.stringify(err.error);
          alert(errorstr.replace(new RegExp('"', "g"), ""));
          this.appComponent.isLoading = false;
        }
      );
    }
  }

  edit(rsvp: RSVP) {
    let dialogRef = this.dialog.open(DialogManagersvpComponent, {
      width: "80%",
      height: "80%",
      disableClose: true,
      data: {
        addScreen: false,
        rsvp: rsvp,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        alert("Guest Update Successfully.");
        this.ngOnInit();
      }
    });
  }
}
