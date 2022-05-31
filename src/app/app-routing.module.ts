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

const routes: Routes = [
  { path: '', component: GuestLoginComponent },
  { path: 'login', component: GuestLoginComponent },
  { path: 'event', component: LandingComponent },
  { path: 'event/agenda', component: AgendaComponent },
  { path: 'event/floor-plan', component: FloorplanComponent },
  { path: 'event/booth', component: BoothComponent },
  { path: 'event/my-qr', component: MyqrComponent },
  { path: 'admin', component: LoginComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/account', component: AccountComponent },
  { path: 'admin/attendance', component: AttendanceComponent },
  { path: 'admin/manage', component: ManageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
