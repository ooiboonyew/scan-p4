import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "../../../models/rsvp.model";
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
import { DialogEditdonationComponent } from "../dialog-editdonation/dialog-editdonation.component";
import { ExcelFunction } from "../../../common/excelfunction";

@Component({
  selector: "app-attendance",
  templateUrl: "./attendance.component.html",
  styleUrls: ["./attendance.component.css"],
})
export class AttendanceComponent implements OnInit {
  users: User[];
  selectedAll: boolean;
  datasource: any[];
  dataSource: MatTableDataSource<User>;
  selection: SelectionModel<User> = new SelectionModel<User>(true, []);
  displayedColumns: string[] = [
    "num",
    "name",
    "staffId",
    "email",
    "userAttend",
    "guestAvailable",
    "guestAttend",
    "guestAbsent",
    "Edit",
  ];
  selectedfilter: string = "";

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private rSVPService: RSVPService,
    public dialog: MatDialog,
    private excelFunction: ExcelFunction,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    setTimeout(() => (this.appComponent.isLoading = true), 0);
    this.rSVPService.listUser().subscribe(
      (data) => {
        console.log(data);
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        this.users = data;
        console.log(this.users);
        this.dataSource = new MatTableDataSource<User>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        alert(err.error);
      }
    );
  }

  download() {
    this.appComponent.isLoading = true;
    // this.excelFunction.exportCustomHeaderAsExcelFile(this.users, "rsvp");
    this.appComponent.isLoading = false;
  }

  edit(user: User) {
    let dialogRef = this.dialog.open(DialogEditdonationComponent, {
      width: "60%",
      disableClose: true,
      data: {
        user: user,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        alert("Rsvp Update Successfully.");
        this.ngOnInit();
      }
    });
  }

  // email(rsvp: RSVP) {
  //   if (confirm("Are you sure you want to send email to " + rsvp.email + "?")) {
  //     this.appComponent.isLoading = true;
  //     this.rSVPService.EmailRSVP(rsvp.id).subscribe(
  //       (data) => {
  //         this.appComponent.isLoading = false;
  //         alert("Email Send Successfully.");
  //         this.ngOnInit();
  //       },
  //       (err) => {
  //         var errorstr = JSON.stringify(err.error);
  //         alert(errorstr);
  //         this.appComponent.isLoading = false;
  //       }
  //     );
  //   }
  // }
}
