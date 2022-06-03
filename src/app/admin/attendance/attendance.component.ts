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
  filtertType: string;
  filterText: string;
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
    this.filtertType = "staffId";
    setTimeout(() => (this.appComponent.isLoading = true), 0);
    this.rSVPService.listUser().subscribe(
      (data) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        this.users = data;
        console.log(data);
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

  filter() {
    console.log(this.filterText);
    this.appComponent.isLoading = true;

    if (this.filterText == "") {
      this.rSVPService.listUser().subscribe(
        (data) => {
          this.appComponent.isLoading = false;
          this.users = data;
          console.log(data);
          this.dataSource = new MatTableDataSource<User>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          this.appComponent.isLoading = false;
          alert(err.error);
        }
      );
    } else {
      this.rSVPService.FilterUsers(this.filtertType, this.filterText).subscribe(
        (data) => {
          this.appComponent.isLoading = false;
          this.users = data;
          console.log(data);
          this.dataSource = new MatTableDataSource<User>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (err) => {
          this.appComponent.isLoading = false;
          alert(err.error);
        }
      );
    }
  }

  download() {
    this.appComponent.isLoading = true;
    this.excelFunction.exportUserHeaderAsExcelFile(this.users, "rsvp");
    this.appComponent.isLoading = false;
  }


  add(){
    let dialogRef = this.dialog.open(DialogEditdonationComponent, {
      width: "80%",
      // height: "90%",
      disableClose: true,
      data: {
        user: {},
        addScreen: true
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        alert("Guest Add Successfully.");
        this.ngOnInit();
      }
    });
  }

  edit(user: User) {
    let dialogRef = this.dialog.open(DialogEditdonationComponent, {
      width: "80%",
      // height: "90%",
      disableClose: true,
      data: {
        addScreen: false,
        user: user,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        alert("Guest Update Successfully.");
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
