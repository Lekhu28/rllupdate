import {Appointment} from "./appointment";

export class Patient {
  constructor(public _id: string | any,
              public first_name: string, public last_name: string,
              public phone_number: string, public age: number, public address: string, public gender: string
    , public profile_img: string | any
           
    
    , public Appointment: any | Appointment []
  ) {
  }
}
