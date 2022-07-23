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
import { ManageComponent } from './admin/manage/manage.component';
import { AccountComponent } from './admin/account/account.component';
import { LandingComponent } from './landing/landing.component';
import { RegisteredComponent } from './registered/registered.component';
import { DialogEditdonationComponent } from './admin/dialog-editdonation/dialog-editdonation.component';
import { DialogEditboothComponent } from './admin/dialog-editbooth/dialog-editboothcomponent';


import { ExcelFunction } from 'src/common/excelfunction';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MainComponent } from './main/main.component';
import { AgendaComponent } from './agenda/agenda.component';
import { FloorplanComponent } from './floorplan/floorplan.component';
import { BoothComponent } from './booth/booth.component';
import { MyqrComponent } from './myqr/myqr.component';
import { GuestLoginComponent } from './guest-login/guest-login.component';
import { HomeComponent } from './admin/home/home.component';
import { ScanQrComponent } from './admin/scan-qr/scan-qr.component';
import { StatComponent } from './admin/stat/stat.component';
import { BoothSetupComponent } from './admin/booth-setup/booth-setup.component';
import { CheckinComponent } from './admin/checkin/checkin.component';
import { DialogUploaddonationComponent } from './admin/dialog-uploaddonation/dialog-uploaddonation.component';
import { DonationComponent } from './donation/donation.component';
import { QuizComponent } from './quiz/quiz.component';
import { PhotoComponent } from './photo/photo.component';
import { VotingComponent } from './voting/voting.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AttendanceComponent,
    ManageComponent,
    AccountComponent,
    LandingComponent,
    RegisteredComponent,
    DialogEditdonationComponent,
    DialogEditboothComponent,
    MainComponent,
    AgendaComponent,
    FloorplanComponent,
    BoothComponent,
    MyqrComponent,
    GuestLoginComponent,
    HomeComponent,
    ScanQrComponent,
    StatComponent,
    BoothSetupComponent,
    CheckinComponent,
    DialogUploaddonationComponent,
    DonationComponent,
    QuizComponent,
    PhotoComponent,
    VotingComponent
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
    DialogEditdonationComponent,
    DialogEditboothComponent,
    DialogUploaddonationComponent
  ],
  providers: [DatePipe, RSVPService, AdminService, ExcelFunction],
  bootstrap: [AppComponent]
})
export class AppModule { }
