export class Appointment {
  constructor(
    public _id: string,
    public time: Date,
    public patient: string,
    public doctor: string,
    public condition: string,
    public bill ?: string,
  ) {
  }
}
