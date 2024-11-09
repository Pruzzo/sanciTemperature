export class DateTemperature {
  temperature: number;
  createdAt: Date;
  constructor() {
    this.temperature = 0;
    this.createdAt = new Date();
  }
}