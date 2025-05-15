import {Role} from "./role";

export class UserAuth {
  _id!: number;
  firstName!: string;
  lastName!: string;
  username!: string;
  type!: Role;
  token?: string;
}
