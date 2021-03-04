export interface iRegistrationWorkers {
  Id : string;
  MembershipMain: string;
  FirstName : string;
  LastName : string;
  Phones : string[];
  Language : string;
  GroupName : string;
  Photo: string;
}

export class RegistrationWorkers {
  Id!: string;
  MembershipMain!: string;
  FirstName! : string;
  LastName! : string;
  Phones! : string[];
  Language! : string;
  GroupName! : string;
  Photo!: string;


  constructor() { }

  init(init: iRegistrationWorkers) {
      this.Id = init.Id;
      this.MembershipMain = init.MembershipMain;
      this.FirstName = init.FirstName;
      this.LastName = init.LastName;
      this.Phones = init.Phones;
      this.Language = init.Language;
      this.GroupName = init.GroupName;
      this.Photo = init.Photo;
    }
  }
