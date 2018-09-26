import { Patient } from './patient';

export class Visit {
  id: number;
  date: Date;
  weight: number;
  height: number;
  perimeter: number;
  bloodPressure: string;
  diagnosis: string;
  treatment: string;
  files: any;
}