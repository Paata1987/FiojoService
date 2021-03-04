import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRoles } from '@app/models/iUserRoles';
import { AuthService } from '@app/services/auth.service';
import { RegistrationService } from '@app/services/registration.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent  {
  //ToDo initialize "selectedCompany" as type
  public selectedCompany:any;
  public searchItem: string="";
  public preSearchItems: string[] = [];

  //ToDo create service for get company list

  // It is Moc data
 
public  companyList :ICompanies[]=[
  { name: "Lavash pendir LLC", edited: this.FormattedDate(new Date('05/10/2020')),raiting:8,accountTurnover:20000, overseer:"Mushvig Veliyev" },
  { name: "Yara logistic AS", edited: this.FormattedDate(new Date("09/14/2019")),raiting:5,accountTurnover:9100, overseer:"Alihan Garayev" },
  { name: "Kaxeti cafe", edited: this.FormattedDate(new Date("01/05/2020")),raiting:2,accountTurnover:48800, overseer:"Ulduz Shafieva" },
  { name: "Nargile", edited: this.FormattedDate(new Date("01/21/2021")),raiting:6,accountTurnover:120080, overseer:"Ibragim Ibragimov" },
  { name: "Pirojok cafe", edited: this.FormattedDate(new Date("02/25/2019")),raiting:4,accountTurnover:5000, overseer:"Aida Kuliyeva" },
  { name: "Cofe Home", edited: this.FormattedDate(new Date("08/13/2020")),raiting:9,accountTurnover:8200, overseer:"Farid Babaev" }
];
// It is Moc data
public searchCompanyList = new FormGroup({
    item: new FormControl('', [ Validators.required, Validators.minLength(4)]),
  });

  constructor() {
    this.fillPreSearch()
   }

private fillPreSearch(){
  this.companyList.forEach((element:ICompanies) => {
    this.preSearchItems.push(element.name);
 });
}
  submit() {
    console.info('Form submit', this.searchCompanyList.value.item);
  }
  
  private FormattedDate(yourDate:any): string {
    let formattedDate = (moment(yourDate).utc()).format('DD-MM-YYYY');
    return formattedDate;
  }

}
//ToDo expotr to file iCompaniesModel.ts. Or create class with interface
export interface ICompanies{
  name:string;
  edited:string;
  raiting:number;
  accountTurnover:number;
  overseer: string;
}
