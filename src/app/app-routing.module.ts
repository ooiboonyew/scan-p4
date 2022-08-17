import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { AttendanceComponent } from './admin/attendance/attendance.component';
import { ManageComponent } from './admin/manage/manage.component';
import { AccountComponent } from './admin/account/account.component';
import { LandingComponent } from './landing/landing.component';
import { RegisteredComponent } from './registered/registered.component';
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
import { DonationComponent } from './donation/donation.component';
import { QuizComponent } from './quiz/quiz.component';
import { GuideComponent } from './guide/guide.component';
import { VotingComponent } from './voting/voting.component';
import { PhotoComponent } from './photo/photo.component';
import { PhotoVendorComponent } from './photo-vendor/photo-vendor.component';
import { PhotoUBSComponent } from './photo-ubs/photo-ubs.component';
import { GuestCheckinComponent } from './guest-checkin/guest-checkin.component';
import { GuestCheckedinComponent } from './guest-checkedin/guest-checkedin.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  // { path: 'login', component: GuestLoginComponent },
  { path: 'registration', component: LandingComponent },
  { path: 'registered', component: RegisteredComponent },
  { path: 'checkin', component: GuestCheckinComponent },
  { path: 'checkedin', component: GuestCheckedinComponent },

  // { path: 'admin', component: LoginComponent },
  { path: 'admin/login', component: LoginComponent },
  // { path: 'admin/account', component: AccountComponent },
  { path: 'admin', component: HomeComponent },
  { path: 'admin/guest-list', component: AttendanceComponent },
  // { path: 'admin/scan-qr', component: ScanQrComponent },
  // { path: 'admin/checkin', component: CheckinComponent },

  { path: 'admin/stat', component: StatComponent },
  // { path: 'admin/booth-setup', component: BoothSetupComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
