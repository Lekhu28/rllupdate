export class Prescription {
  constructor(
    public doctor: string,
    public date: Date,
    public patient: string,
    public _id: string,
    public medicines: [
      {
        medicine: string,
        dose: string
      }
    ],
  ) {
  }
}