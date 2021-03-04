export interface iBusinessInfo {
  Name: string;
  Description: string;
  Location: string;
  PostCode: string;
  Phones: Array<string>;
  Emails: Array<string>;
  WebSite: string;
  Logo: string;
  Photo: Array<string>;
  OrgNumber: string;
}

export class BusinessInfo {
  Name!: string;
  Description!: string;
  Location!: string;
  PostCode!: string;
  Phones!: Array<string>;
  Emails!: Array<string>;
  WebSite!: string;
  Logo!: string;
  Photo!: Array<string>;
  OrgNumber!: string;

  constructor() { }

  init(init: iBusinessInfo) {
      this.Name = init.Name;
      this.Description = init.Description;
      this.Location = init.Location;
      this.PostCode = init.PostCode;
      this.Phones = init.Phones;
      this.Emails = init.Emails;
      this.WebSite = init.WebSite;
      this.Logo = init.Logo;
      this.Photo = init.Photo;
      this.OrgNumber = init.OrgNumber;

    }
  }
