import { iRegistrationAuth } from "./Auth/RegistrationAuth";
import { iBusinessInfo } from "./iBusinessInfo";
import { iCompanyMain } from "./iCompanyMain";
import { iRegistrationWorkers } from "./iRegistrationWorkers";
import { iLocationsModel } from "./iLocationModel";



export interface iRegistrationWizard {

  BusinessInfo ?: iBusinessInfo;
  LocationBusinessInfo ?:iLocationsModel;
  CompanyMain ?:iCompanyMain;
  LocationCompanyMain ?: iLocationsModel;
  RegistrationAuth ?:iRegistrationAuth;
  RegistrationWorkers ?:iRegistrationWorkers;
}
