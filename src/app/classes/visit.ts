import { Patient } from './patient';

export class Visit {
  id: number;
  patient: Patient;
  date: Date;
  weight: number;
  height: number;
  perimeter: number;
  diagnosis: string;
  treatment: string;
  files: any;
}