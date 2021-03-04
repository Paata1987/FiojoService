import { Component, EventEmitter, Input, OnInit, Output, VERSION } from '@angular/core';
import { PaymentType } from '@app/models/EnumPayment';
import { iCompanyMain } from '@app/models/iCompanyMain';
import { iLocationsModel } from '@app/models/iLocationModel';
import { iRegistrationWizard } from '@app/models/iRegistrationWizard';

@Component({
  selector: 'app-add-company-part1',
  templateUrl: './add-company-part1.component.html',
  styleUrls: ['./add-company-part1.component.scss']
})
export class AddCompanyPart1Component implements OnInit {

  @Input() public newCompanyModel!: iCompanyMain;
  /*
   =
  {
    Name: "", Email:[""], GroupName: "", OrgNumber: "", TypeCo: "", PaymentMethod: [""], Description: "", Phones:[""], Logo:"", BusinessInfo:"", Location:""
  };
*/
  @Input() public editMode!: boolean;
  @Output() save = new EventEmitter<iRegistrationWizard>();
  public newCompanyLocation : iLocationsModel = {
    ApartmentsNumber:"", City:"", Country:"", Index:"", LocationOrStreetName:"", Municipality:"", Region:"", StreetNumber:""
  };


  public regStepNewCompany: iCompanyMain = {
    Name: "", Email: [""], GroupName: "", OrgNumber: "", TypeCo: "", PaymentMethod: [""], Description: "", Phones: [""], Location:"", BusinessInfo:"", Logo:""
  };

  public newCompanyMain : iRegistrationWizard={};

  public dropdownTypeName: string = "Type";
  public companyTypes: string[] = [];
  public paymentMethods = PaymentType;
  name = 'Angular ' + VERSION.full;
  public newPhone!: string;
  public  newEmail!: string;



  //ToDo Delete and Create right query
  public cTypes:string[]=["Akaka","Makaka"];

  constructor() {
    this.ClearingAnArray(this.regStepNewCompany.Phones);
    this.ClearingAnArray(this.regStepNewCompany.Email);
  }

  ngOnInit(): void {
    this.companyTypes = ['Supplier', 'Customer', "Producer"];
  }

private ClearingAnArray(clearingElement:string[]){
  var index = clearingElement.findIndex(x => x == "")
  if (index > -1) {
    clearingElement.splice(index, 1);
  }
}



  onFormSubmit() {
    console.log("location: " +this.newCompanyLocation.StreetNumber)
    this.newCompanyMain.CompanyMain=this.regStepNewCompany;
    this.newCompanyMain.LocationCompanyMain=this.newCompanyLocation;
    this.save.emit(this.newCompanyMain);
  }


  //Get data from dropdowmMeny Type
  public TypeCo(selected: string) {
    this.regStepNewCompany.TypeCo = selected;
    this.dropdownTypeName = selected;
  }

  //for checkboxs
  public handleChange(val: string) {
    console.log("Val:  " + val);
    //check element in array
    var index = this.regStepNewCompany.PaymentMethod.findIndex(x => x == val)

    if (index > -1) {
      this.regStepNewCompany.PaymentMethod.splice(index, 1);
    } else {
      this.regStepNewCompany.PaymentMethod.push(val);
    }
    console.log("PaymentMethod : " + this.regStepNewCompany.PaymentMethod);
  }

  public autotext(inText: string) {
    if (inText == "textSupplier") {
      this.regStepNewCompany.Description = "Ay dede mallari";
    } else {
      this.regStepNewCompany.Description = "Кафе Тайской кухни";
    }
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



