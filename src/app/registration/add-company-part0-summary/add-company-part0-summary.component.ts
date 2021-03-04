import { Component, OnInit } from '@angular/core';
import { iBusinessInfo } from '@app/models/iBusinessInfo';
import { iCompanyMain } from '@app/models/iCompanyMain';
import { iRegistrationWizard } from '@app/models/iRegistrationWizard';

@Component({
  selector: 'app-add-company-part0-summary',
  templateUrl: './add-company-part0-summary.component.html',
  styleUrls: ['./add-company-part0-summary.component.scss']
})
export class AddCompanyPart0SummaryComponent implements OnInit {

  // Show or Hide  Components
  public companyInfoSuccessful: boolean = true;
  public companyDitailsSuccessful: boolean = false;
  public newWorckerSuccessful: boolean = false;

// For  Set and Get models for Componencts
  public newCompanyModel!:iCompanyMain;
  public newDetailsCompany!:iBusinessInfo;
  public registrationWizard: iRegistrationWizard ={};
  constructor() { }

  ngOnInit(): void {
  }
  public savePart1(modelNewCompany: iRegistrationWizard) {
    //console.log("saved in summary model: " + modelNewCompany.BusinessInfo);
    this.companyInfoSuccessful = false;
    this.companyDitailsSuccessful = true;
    this.newWorckerSuccessful = false;
    this.registrationWizard.CompanyMain=modelNewCompany.CompanyMain!;
    this.registrationWizard.LocationCompanyMain=modelNewCompany.LocationCompanyMain!;

  }
  public savePart2(modelDetailsCompany: iRegistrationWizard) {
     // console.log("saved in summary model: " + modelDetailsCompany.Description);
    this.companyInfoSuccessful = false;
    this.companyDitailsSuccessful = false;
    this.newWorckerSuccessful = true;
    this.newDetailsCompany=modelDetailsCompany.BusinessInfo!;
    this.registrationWizard.LocationCompanyMain=modelDetailsCompany.LocationBusinessInfo!;
  }
  public savePart3(modelNewCompany: iCompanyMain) {
    console.log("saved in summary model: " + modelNewCompany.Description);
    this.companyInfoSuccessful = false;
    this.companyDitailsSuccessful = false;
    this.newWorckerSuccessful = false;
  }

}

