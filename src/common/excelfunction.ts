import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { DatePipe } from "@angular/common";

const EXCEL_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".csv";
import { RSVP, User } from "../models/rsvp.model";

export class ExcelFunction {
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer: any = XLSX.write(wb, { bookType: "csv", type: "array" });
    this.saveExcelFile(excelBuffer, excelFileName);
  }

  public exportUserHeaderAsExcelFile(
    rsvps: User[],
    excelFileName: string
  ): void {
    var jsons = [];
    var datePipe = new DatePipe("en-US");

    rsvps.forEach((user) => {
      var json = {
        "#": user.num,
        // "name": user.name,
        // "staffId": user.staffId,
        email: user.email,
        available: user.userAvailable == 1 ? "Yes" : "No",
        attended: user.userAttend == 1 ? "Yes" : "No",
        acc_person: user.guestAvailable,
        acc_attended: user.guestAttend,
        acc_absent: user.guestAvailable - user.guestAttend,
        chancesTotal: user.chancesTotal,
        chancesLeft: user.chancesLeft,
        createdDate: user.createdDate
          ? new Date(
              JSON.parse(JSON.stringify(user.createdDate))._seconds * 1000
            ).toLocaleString()
          : "",
        lastCheckInDate: user.lastCheckInDate
          ? new Date(
              JSON.parse(JSON.stringify(user.lastCheckInDate))._seconds * 1000
            ).toLocaleString()
          : "",
      };
      jsons.push(json);
    });

    var Heading = [
      [
        "#",
        "Email",
        "Available",
        "Attended",
        "Acc Person",
        "Acc Attended",
        "Acc Absent",
        "Total Chances",
        "Chances Left",
        "Created Date",
        "Check In Date",
      ],
      // ["#", "Attending", "First Name", "Last Name", "E-mail", "Mobile", "Country", "Registered Date", "Email Date"],
    ];

    const ws = XLSX.utils.book_new();

    XLSX.utils.sheet_add_aoa(ws, Heading);
    XLSX.utils.sheet_add_json(ws, jsons, { origin: "A2", skipHeader: true });
    const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer: any = XLSX.write(wb, { bookType: "csv", type: "array" });
    this.saveExcelFile(excelBuffer, excelFileName);
  }

  public exportCustomHeaderAsExcelFile(
    rsvps: RSVP[],
    excelFileName: string
  ): void {
    var jsons = [];
    var datePipe = new DatePipe("en-US");

    rsvps.forEach((rsvp) => {
      var json = {
        "#": rsvp.num,
        // "attending": rsvp.attending == 0 ? "Physical" : "Virtual",
        name: rsvp.name,
        from: rsvp.from,
        otherFrom: rsvp.otherFrom,
        designation: rsvp.designation,
        otherDesignation: rsvp.otherDesignation,
        divsion: rsvp.division,
        otherDivision: rsvp.otherDivision,
        zone: rsvp.zone,
        cluster: rsvp.cluster,
        school: rsvp.school,
        attending: rsvp.attending,
        email: rsvp.email,
        mobile: rsvp.mobile,
        dataProdection: rsvp.dataProdection,
        dietary: rsvp.dietary,
        otherDieraty: rsvp.otherDieraty,
        covidStatus: rsvp.covidStatus,
        otherCovidStatus: rsvp.otherCovidStatus,
        parking: rsvp.parking,
        tableZone: rsvp.tableZone,
        table: rsvp.table,
        checkedInDate: rsvp.checkedInDate
        ? new Date(
            JSON.parse(JSON.stringify(rsvp.checkedInDate))._seconds * 1000
          ).toLocaleString()
        : "",
        createdDate: rsvp.createdDate
          ? new Date(
              JSON.parse(JSON.stringify(rsvp.createdDate))._seconds * 1000
            ).toLocaleString()
          : "",
        emailDate: rsvp.emailDate
          ? new Date(
              JSON.parse(JSON.stringify(rsvp.emailDate))._seconds * 1000
            ).toLocaleString()
          : "",
      };
      jsons.push(json);
    });

    var Heading = [
      [
        "#",
        "Name",
        "From",
        "Other From",
        "Designation",
        "Division",
        "Other Divsion",
        "Other Designation",
        "Zone",
        "Cluster",
        "School",
        "Attending",
        "E-mail",
        "Mobile",
        "Data Prodection",
        "Dietary",
        "Other Dieraty",
        "Vaccination Status",
        "Other Vaccination Status",
        "Parking",
        "Table Zone",
        "Table",
        "Check In Date",
        "Registered Date",
        "Email Date",
      ],
      // ["#", "Attending", "First Name", "Last Name", "E-mail", "Mobile", "Country", "Registered Date", "Email Date"],
    ];

    const ws = XLSX.utils.book_new();

    XLSX.utils.sheet_add_aoa(ws, Heading);
    XLSX.utils.sheet_add_json(ws, jsons, { origin: "A2", skipHeader: true });
    const wb: XLSX.WorkBook = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer: any = XLSX.write(wb, { bookType: "csv", type: "array" });
    this.saveExcelFile(excelBuffer, excelFileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const today = new Date();
    const date =
      today.getFullYear() +
      "" +
      (today.getMonth() + 1) +
      "" +
      today.getDate() +
      "_";
    const time =
      today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    const name = fileName + date + time;
    FileSaver.saveAs(data, name + EXCEL_EXTENSION);
  }
}
