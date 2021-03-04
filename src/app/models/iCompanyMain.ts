export interface iCompanyMain
{
  Name: string;
  Email: string[];
  OrgNumber: string;
  Phones: string[];
  BusinessInfo: string;
  Location:string;
  TypeCo: string;
  Description: string;
  Logo:string;
  GroupName: string;
  PaymentMethod: string[];


}

export class CompanyMain {
  Name!: string;
  Email!: string[];
  OrgNumber!: string;
  Phones!: string[];
  BusinessInfo!: string;
  Location!:string;
  TypeCo!: string;
  Description!: string;
  Logo!:string;
  GroupName!: string;
  PaymentMethod!: string[];

  constructor() { }

  init(init: iCompanyMain) {
      this.Name = init.Name;
      this.Email = init.Email;
      this.OrgNumber = init.OrgNumber;
      this.Phones = init.Phones;
      this.Location = init.Location;
      this.TypeCo = init.TypeCo;
      this.Description = init.Description;
      this.Logo = init.Logo;
      this.GroupName = init.GroupName;
      this.PaymentMethod = init.PaymentMethod;
    }
  }

