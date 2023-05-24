import { Component, OnInit, ViewChild } from "@angular/core";
import { Config } from "../../../models/rsvp.model";
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
import { ExcelFunction } from "../../../common/excelfunction";
import { Router } from "@angular/router";
import { DialogManageconfigComponent } from "../dialog-manageconfig/dialog-manageconfig.component";

@Component({
  selector: "app-config",
  templateUrl: "./config.component.html",
  styleUrls: ["./config.component.css"],
})
export class ConfigComponent implements OnInit {
  configs: Config[];
  selectedAll: boolean;
  datasource: any[];
  dataSource: MatTableDataSource<Config>;
  selection: SelectionModel<Config> = new SelectionModel<Config>(true, []);
  // displayedColumns: string[] = ["num", "location","sublocation", "Edit"];
  displayedColumns: string[] = ["num", "location", "Edit"];

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
    setTimeout(() => (this.appComponent.isLoading = true), 0);
    this.rSVPService.listConfig().subscribe(
      (data) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        this.configs = data;
        this.dataSource = new MatTableDataSource<Config>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = this.pathDataAccessor;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        alert(err.error);
      }
    );
  }

  pathDataAccessor(item: any, path: string): any {
    return path.split(".").reduce((accumulator: any, key: string) => {
      return accumulator
        ? path.includes(".")
          ? accumulator[key]
          : accumulator[key].toLocaleLowerCase()
        : undefined;
    }, item);
  }

  download() {
    this.appComponent.isLoading = true;

    this.rSVPService.listRSVP().subscribe(
      (data) => {
        this.excelFunction.exportRSVPHeaderAsExcelFile(data, "Scanning_Report");
        this.appComponent.isLoading = false;
      },
      (err) => {
        setTimeout(() => (this.appComponent.isLoading = false), 0);
        alert(err.error);
      }
    );
  }

  add() {
    let dialogRef = this.dialog.open(DialogManageconfigComponent, {
      width: "80%",
      height: "80%",
      disableClose: true,
      data: {
        config: {},
        addScreen: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        alert("Configuration Add Successfully.");
        this.ngOnInit();
      }
    });
  }

  edit(config: Config) {
    let dialogRef = this.dialog.open(DialogManageconfigComponent, {
      width: "80%",
      height: "80%",
      disableClose: true,
      data: {
        addScreen: false,
        config: config,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        alert("Configuration Update Successfully.");
        this.ngOnInit();
      }
    });
  }


  delete(config: Config) {
    if (confirm("Are you sure you delete " + config.location + "?")) {
      this.appComponent.isLoading = true;

      this.rSVPService.DeleteConfig(config.id).subscribe(
        (data) => {
          alert("Configuration Delete Successfully.");
          this.ngOnInit();
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
}
