export interface iUserRoles {
  id: number;
  roleName: string;
  //"id": "5edb7d22574579629410a116",
  //"roleName": "Admin"
}
export class UserRoles {
  id!: number;
  roleName!: string;
  constructor() { }


  static init(input: iUserRoles) {
    return {
      id: input.id,
      name: input.roleName

    };
  }
}
