import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


/***************************  Interceptors      */
import { HttpConfigInterceptor } from '@app/interceptors/httpconfig.interceptor';
import { SpinnerInterceptor } from '@app/interceptors/spinner.interceptor';
import { HttpErrorInterceptor } from '@app/interceptors/http-error.interceptor';

/***************************    Extra   *******************/
import { ClarityModule } from "@clr/angular";



/***************************    Material  *******************/





/***************************    Controllers  *******************/
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFound404Component } from './page-not-found404/page-not-found404.component';
import { SpinnerComponent } from '@app/spinner/spinner.component';
import { SpinnerService } from '@app/services/spinner.service';
import { AuthService } from '@app/services/auth.service';
import { HeaderComponent } from './header/header.component';
import { RegistrationAddCompanyComponent } from './registration/registration-add-company/registration-add-company.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AddCompanyPart1Component } from './registration/add-company-part1/add-company-part1.component';
import { AddCompanyPart2Component } from './registration/add-company-part2/add-company-part2.component';
import { AddCompanyPart3Component } from './registration/add-company-part3/add-company-part3.component';
import { AddCompanyPart0SummaryComponent } from './registration/add-company-part0-summary/add-company-part0-summary.component';
import { EnumToArrayPipe } from './models/EnumPayment';
import { LocationComponent } from './location/location.component';
import { AddLocationComponent } from './location/add-location/add-location.component';





@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    RegistrationComponent,
    PageNotFound404Component,
    SpinnerComponent,
    HeaderComponent,

    RegistrationAddCompanyComponent,
    AddCompanyPart1Component,
    AddCompanyPart2Component,
    AddCompanyPart3Component,
    AddCompanyPart0SummaryComponent,
    EnumToArrayPipe,
    LocationComponent,
    AddLocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClarityModule
  ],
  providers: [AuthService,SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  } ,
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
