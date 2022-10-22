import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./admin/login/login.component";
import { AttendanceComponent } from "./admin/attendance/attendance.component";
import { HomeComponent } from "./admin/home/home.component";
import { StatComponent } from "./admin/stat/stat.component";
import { ScanQrComponent } from "./admin/scan-qr/scan-qr.component";
import { CheckinComponent } from "./admin/checkin/checkin.component";
import { ConfigComponent } from "./admin/config/config.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  // { path: 'checkin', component: GuestCheckinComponent },
  // { path: 'checkedin', component: GuestCheckedinComponent },
  // { path: 'admin', component: LoginComponent },
  { path: "admin/login", component: LoginComponent },
  // { path: 'admin/account', component: AccountComponent },
  { path: "admin", component: HomeComponent },
  { path: "admin/config-list", component: ConfigComponent },
  { path: "admin/scan-qr", component: ScanQrComponent },
  { path: "admin/checkin", component: CheckinComponent },
  { path: "admin/stat", component: StatComponent },
  // { path: 'admin/booth-setup', component: BoothSetupComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
