import { Component, OnInit, ViewChild } from "@angular/core";
import { Booth } from "../../../models/rsvp.model";
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
import { DialogEditboothComponent } from "../dialog-editbooth/dialog-editboothcomponent";
import { ExcelFunction } from "../../../common/excelfunction";

@Component({
  selector: 'app-booth-setup',
  templateUrl: './booth-setup.component.html',
  styleUrls: ['./booth-setup.component.css']
})
export class BoothSetupComponent implements OnInit {
  filtertType: string;
  filterText: string;
  booths: Booth[];
  selectedAll: boolean;
  datasource: any[];
  dataSource: MatTableDataSource<Booth>;
  selection: SelectionModel<Booth> = new SelectionModel<Booth>(true, []);
  displayedColumns: string[] = [
    "boothNum",
    "secretDigit",
    "status",
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
    this.rSVPService.ListBooth().subscribe(
      (data) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        this.booths = data;
        console.log(data);
        this.dataSource = new MatTableDataSource<Booth>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        alert(err.error);
      }
    );
  }

  // download() {
  //   this.appComponent.isLoading = true;
  //   this.excelFunction.exportUserHeaderAsExcelFile(this.users, "rsvp");
  //   this.appComponent.isLoading = false;
  // }


  add(){
    let dialogRef = this.dialog.open(DialogEditboothComponent, {
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
        alert("Booth Add Successfully.");
        this.ngOnInit();
      }
    });
  }

  edit(booth: Booth) {
    let dialogRef = this.dialog.open(DialogEditboothComponent, {
      width: "80%",
      // height: "90%",
      disableClose: true,
      data: {
        booth: booth,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        alert("Booth Update Successfully.");
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
