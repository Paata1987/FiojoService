export interface iRegistrationAuth {
  Username: string;
  Password: string;
  CultureCode: string;
  RoleId: string;
  LanguageCode:string
}
export class RegistrationUserAuth  {
  Username!: string;
  Password!: string;
  CultureCode!: string;
  RoleId!: string;
  LanguageCode!:string;
  constructor() { }


  static init(input: iRegistrationAuth) {
    return {
      Username: input.Username,
      Password: input.Password,
      CultureCode: input.CultureCode,
      RoleId: input.RoleId,
      Language:input.LanguageCode
    };
  }
}
