import { User } from "./user";

export class Receptionist {

  constructor(
    public _id: User,
    public appointments: string[],
    public assignedDoctors: string[]
  ) {}

}
