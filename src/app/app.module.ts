import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxSoapModule } from 'ngx-soap';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminHomeComponent } from './admin/home/home.component';
import { AdminService } from 'src/services/admin.service';
import { RSVPService } from 'src/services/rsvp.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogoutComponent } from './admin/logout/logout.component';
import { ManageComponent } from './admin/manage/manage.component';
import { AccountComponent } from './admin/account/account.component';
import { LandingComponent } from './landing/landing.component';
import { RegisteredComponent } from './registered/registered.component';
import { DialogEditdonationComponent } from './admin/dialog-editdonation/dialog-editdonation.component';

import { ExcelFunction } from 'src/common/excelfunction';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { AgendaComponent } from './agenda/agenda.component';
import { FloorplanComponent } from './floorplan/floorplan.component';
import { BoothComponent } from './booth/booth.component';
import { MyqrComponent } from './myqr/myqr.component';
import { GuestLoginComponent } from './guest-login/guest-login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminHomeComponent,
    HomeComponent,
    LogoutComponent,
    ManageComponent,
    AccountComponent,
    LandingComponent,
    RegisteredComponent,
    DialogEditdonationComponent,
    MainComponent,
    AgendaComponent,
    FloorplanComponent,
    BoothComponent,
    MyqrComponent,
    GuestLoginComponent
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
    MaterialModule
  ],
  entryComponents: [
    DialogEditdonationComponent,
  ],
  providers: [DatePipe, RSVPService, AdminService, ExcelFunction],
  bootstrap: [AppComponent]
})
export class AppModule { }
