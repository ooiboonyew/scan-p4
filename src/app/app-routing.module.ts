import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { AdminHomeComponent } from './admin/home/home.component';
import { LogoutComponent } from './admin/logout/logout.component';
import { ManageComponent } from './admin/manage/manage.component';
import { AccountComponent } from './admin/account/account.component';
import { LandingComponent } from './landing/landing.component';
import { RegisteredComponent } from './registered/registered.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'registration', component: LandingComponent },
  { path: 'registered', component: RegisteredComponent },
  // { path: 'landing', component: LandingComponent },
  { path: '', component: MainComponent },
  { path: 'home', component: HomeComponent },

  { path: 'admin', component: LoginComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/account', component: AccountComponent },
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin/manage', component: ManageComponent },
  { path: 'admin/logout', component: LogoutComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
