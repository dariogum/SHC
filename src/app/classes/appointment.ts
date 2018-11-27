import { Schedule } from './schedule';

export class Appointment {
  confirmed: boolean;
  date: any;
  hour: any;
  id: number;
  indications: string;
  patient: any;
  printed: boolean;
  professional: any;
  reminderData: any;
  reminderSent: boolean;
  reminderWay: any;
  reprogrammed: boolean;
  schedule: Schedule;
}
