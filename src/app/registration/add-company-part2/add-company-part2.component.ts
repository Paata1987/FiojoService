import { Input, Output } from '@angular/core';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { iBusinessInfo } from '@app/models/iBusinessInfo';
import { iCompanyMain } from '@app/models/iCompanyMain';
import { iLocationsModel } from '@app/models/iLocationModel';
import { iRegistrationWizard } from '@app/models/iRegistrationWizard';

@Component({
  selector: 'app-add-company-part2',
  templateUrl: './add-company-part2.component.html',
  styleUrls: ['./add-company-part2.component.scss']
})
export class AddCompanyPart2Component implements OnInit {


  @Input() public inputCompanyModelDetails!: iCompanyMain;
  @Input() public inputCompanyDetailsLocation!: iLocationsModel;
  @Input() public editMode!: boolean;
  @Output() save = new EventEmitter<iRegistrationWizard>();

  public newCompanyDetails : iRegistrationWizard={};

  public newPhone!: string;
  public  newEmail!: string;


  public regStepNewCompany: iCompanyMain = {
    Name: "", Email:[""], GroupName: "", OrgNumber: "", TypeCo: "", PaymentMethod: [""], Description: "", Phones:[""], Logo:"", BusinessInfo:"", Location:""
  };

  public regStepCompanyDetails: iBusinessInfo = {
    Name: "",  OrgNumber: "", Description: "", Phones:[""], Logo:"", Location:"", Emails:[""], Photo:[""], PostCode:"", WebSite:""
  };

   public newCompanyDetailsLocation : iLocationsModel =  {
    ApartmentsNumber:"", City:"", Country:"", Index:"", LocationOrStreetName:"", Municipality:"", Region:"", StreetNumber:""
  };
  /*
  public newCompanyDetailsLocation : iLocationsModel =  {
    ApartmentsNumber:"", City:"", Country:"", Index:"", LocationOrStreetName:"", Municipality:"", Region:"", StreetNumber:""
  };
*/
  //ToDo Delete and Create right query. And Code review
  public cTypes:string[]=["Akaka","Makaka"];
  public dropdownTypeName: string = "Type";

  constructor() {
    this.ClearingAnArray(this.regStepNewCompany.Phones);
    this.ClearingAnArray(this.regStepNewCompany.Email);

  }

  private ClearingAnArray(clearingElement:string[]){
    var index = clearingElement.findIndex(x => x == "")
    if (index > -1) {
      clearingElement.splice(index, 1);
    }
  }


  ngOnInit(): void {
    if (this.inputCompanyModelDetails != null || this.inputCompanyModelDetails != undefined) {
      this.regStepCompanyDetails.Name = this.inputCompanyModelDetails.Name;
      this.regStepCompanyDetails.OrgNumber = this.inputCompanyModelDetails.OrgNumber;
      this.regStepCompanyDetails.Emails = this.inputCompanyModelDetails.Email;
      this.regStepCompanyDetails.Phones = this.inputCompanyModelDetails.Phones;
      this.regStepCompanyDetails.Logo = this.inputCompanyModelDetails.Logo;
    }
    if (this.inputCompanyDetailsLocation != null || this.inputCompanyDetailsLocation != undefined) {
      this.newCompanyDetailsLocation = this.inputCompanyDetailsLocation;
    }
  }
  onFormSubmit() {

    this.newCompanyDetails.BusinessInfo=this.regStepCompanyDetails;
    this.newCompanyDetails.LocationBusinessInfo=this.newCompanyDetailsLocation;
    this.save.emit(this.newCompanyDetails);
  }

//ToDo Delete and Create right query
 //Get data from dropdowmMeny Type
 public TypeCo(selected: string) {
  this.regStepNewCompany.TypeCo = selected;
  this.dropdownTypeName = selected;
}



    //ToDo add validation
    public addToElement(val: string,element:string[]) {
      if (val != "") {
        element.push(val);
        val = "";
      }
    }


    public deleteFromArray(val: string,element:string[]) {
      var index = element.findIndex(x => x == val)
      if (index > -1) {
        element.splice(index, 1);
      }
      this.newPhone="";
      this.newEmail="";
    }


}

