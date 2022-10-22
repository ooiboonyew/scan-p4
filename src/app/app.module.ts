import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxSoapModule } from 'ngx-soap';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';
import { DatePipe } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgOtpInputModule } from  'ng-otp-input';

import { AppComponent } from './app.component';
import { LoginComponent } from './admin/login/login.component';
import { AttendanceComponent } from './admin/attendance/attendance.component';
import { AdminService } from 'src/services/admin.service';
import { RSVPService } from 'src/services/rsvp.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExcelFunction } from 'src/common/excelfunction';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './admin/home/home.component';
import { ScanQrComponent } from './admin/scan-qr/scan-qr.component';
import { StatComponent } from './admin/stat/stat.component';
import { CheckinComponent } from './admin/checkin/checkin.component';
import { DialogUploaddonationComponent } from './admin/dialog-uploaddonation/dialog-uploaddonation.component';
import { GuestCheckinComponent } from './guest-checkin/guest-checkin.component';
import { GuestCheckedinComponent } from './guest-checkedin/guest-checkedin.component';
import { DialogManagersvpComponent } from './admin/dialog-managersvp/dialog-managersvp.component';
import { DialogManageconfigComponent } from './admin/dialog-manageconfig/dialog-manageconfig.component';
import { ConfigComponent } from './admin/config/config.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AttendanceComponent,
    DialogManagersvpComponent,
    MainComponent,
    HomeComponent,
    ScanQrComponent,
    StatComponent,
    CheckinComponent,
    DialogUploaddonationComponent,
    GuestCheckinComponent,
    GuestCheckedinComponent,
    DialogManagersvpComponent,
    DialogManageconfigComponent,
    ConfigComponent,
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSoapModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    QRCodeModule,
    ZXingScannerModule,
    NgOtpInputModule
  ],
  entryComponents: [
    DialogManagersvpComponent,
    DialogUploaddonationComponent,
    DialogManageconfigComponent
  ],
  providers: [DatePipe, RSVPService, AdminService, ExcelFunction],
  bootstrap: [AppComponent]
})
export class AppModule { }
