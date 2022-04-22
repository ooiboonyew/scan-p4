import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.csv';
import { RSVP } from "../models/rsvp.model";

export class ExcelFunction {

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'csv', type: 'array' });
    this.saveExcelFile(excelBuffer, excelFileName);
  }

  public exportCustomHeaderAsExcelFile(rsvps: RSVP[], excelFileName: string): void {
    var jsons = [];
    var datePipe = new DatePipe('en-US');

    rsvps.forEach(rsvp => {
      console.log(rsvp.createdDate);
      var json = {
        "id": rsvp.id,
        "attending": rsvp.attending == 0 ? "Physical" : "Virtual",
        "firstName": rsvp.firstName,
        "lastName": rsvp.lastName,
        "email": rsvp.email,
        "mobile": rsvp.mobile,
        "country": rsvp.country,
        "createdDate": new Date(JSON.parse(JSON.stringify(rsvp.createdDate))._seconds * 1000).toLocaleString()
      };
      jsons.push(json);
    });

    var Heading = [
      ["Id", "Attending", "First Name", "Last Name", "E-mail", "Mobile", "Country", "Registered Date"],
      // ["ID", "Patient organization", "First Name", "Last Name", "E-mail"],
    ];

    const ws = XLSX.utils.book_new();

    XLSX.utils.sheet_add_aoa(ws, Heading);
    XLSX.utils.sheet_add_json(ws, jsons, { origin: 'A2', skipHeader: true });
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'csv', type: 'array' });
    this.saveExcelFile(excelBuffer, excelFileName);
  }



  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const today = new Date();
    const date = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate() + '_';
    const time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    const name = fileName + date + time;
    FileSaver.saveAs(data, name + EXCEL_EXTENSION);
  }


}