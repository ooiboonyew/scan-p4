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
import { DialogUploaddonationComponent } from "../dialog-uploaddonation/dialog-uploaddonation.component";
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
    "userAvailable",
    "userAttend",
    "guestAvailable",
    "guestAttend",
    "guestAbsent",
    "Edit",
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private rSVPService: RSVPService,
    public dialog: MatDialog,
    private excelFunction: ExcelFunction,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.filtertType = "name";
    setTimeout(() => (this.appComponent.isLoading = true), 0);
    this.rSVPService.listUser().subscribe(
      (data) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        this.users = data;
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

    this.rSVPService.listUser().subscribe(
      (data) => {
        this.appComponent.isLoading = false;

        if (this.filterText == "") {
          this.users = data;
        } else {
          if (this.filtertType == "name") {
            this.users = data.filter(
              (user: User) =>
                user.name
                  .toLocaleLowerCase()
                  .indexOf(this.filterText.toLocaleLowerCase()) > -1
            );
          } else if (this.filtertType == "staffId") {
            this.users = data.filter(
              (user: User) =>
                user.staffId
                  .toLocaleLowerCase()
                  .indexOf(this.filterText.toLocaleLowerCase()) > -1
            );
          } else {
            this.users = data.filter(
              (user: User) =>
                user.email
                  .toLocaleLowerCase()
                  .indexOf(this.filterText.toLocaleLowerCase()) > -1
            );
          }
        }

        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.appComponent.isLoading = false;
        alert(err.error);
      }
    );

    //if (this.filterText == "") {
      // this.rSVPService.listUser().subscribe(
      //   (data) => {
      //     this.appComponent.isLoading = false;
      //     this.users = data;
      //     console.log(data);
      //     this.dataSource = new MatTableDataSource<User>(data);
      //     this.dataSource.paginator = this.paginator;
      //     this.dataSource.sort = this.sort;
      //   },
      //   (err) => {
      //     this.appComponent.isLoading = false;
      //     alert(err.error);
      //   }
      // );
  //  } else {
      // this.users == null;

      // this.users = this.users.filter(
      //   (user: User) =>
      //     user.name
      //       .toLocaleLowerCase()
      //       .indexOf(this.filterText.toLocaleLowerCase()) > -1
      //);

      // console.log(this.users);
      // this.dataSource = new MatTableDataSource<User>(this.users);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;

      // this.appComponent.isLoading = false;
      // this.rSVPService.FilterUsers(this.filtertType, this.filterText).subscribe(
      //   (data) => {
      //     this.appComponent.isLoading = false;
      //     this.users = data;
      //     console.log(data);
      //     this.dataSource = new MatTableDataSource<User>(data);
      //     this.dataSource.paginator = this.paginator;
      //     this.dataSource.sort = this.sort;
      //   },
      //   (err) => {
      //     this.appComponent.isLoading = false;
      //     alert(err.error);
      //   }
      // );
    // }
  }

  import() {
    let dialogRef = this.dialog.open(DialogUploaddonationComponent, {
      width: '60%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        alert("Import Successfully.")
        this.ngOnInit();
      }
    });
  }

  download() {
    this.appComponent.isLoading = true;
    this.excelFunction.exportUserHeaderAsExcelFile(this.users, "rsvp");
    this.appComponent.isLoading = false;
  }

  add() {
    let dialogRef = this.dialog.open(DialogEditdonationComponent, {
      width: "80%",
      // height: "90%",
      disableClose: true,
      data: {
        user: {},
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
