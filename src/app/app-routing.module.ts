import { PageNotFound404Component } from './page-not-found404/page-not-found404.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomePageComponent } from '@app/home-page/home-page.component';
import { LoginComponent } from '@app/login/login.component';
import { RegistrationComponent } from '@app/registration/registration.component';
import { AuthGuard } from '@app/guards/auth.guard';
import { RegistrationAddCompanyComponent } from '@app/registration/registration-add-company/registration-add-company.component';
import { AddCompanyPart1Component } from '@app/registration/add-company-part1/add-company-part1.component';
import { AddCompanyPart2Component } from './registration/add-company-part2/add-company-part2.component';
import { AddCompanyPart3Component } from './registration/add-company-part3/add-company-part3.component';
import { AddCompanyPart0SummaryComponent } from './registration/add-company-part0-summary/add-company-part0-summary.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard] },
  { path: 'registration-step1', component: AddCompanyPart1Component, canActivate: [AuthGuard] },
  { path: 'registration-step2', component: AddCompanyPart2Component, canActivate: [AuthGuard] },
  { path: 'registration-step3', component: AddCompanyPart3Component, canActivate: [AuthGuard] },
  { path: 'registration-summary', component: AddCompanyPart0SummaryComponent, canActivate: [AuthGuard] },
  
  { path: 'addCompany', component: RegistrationAddCompanyComponent , canActivate: [AuthGuard]},
  { path: '**', component: PageNotFound404Component }  // Wildcard route for a 404 page. Mast be always last
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
