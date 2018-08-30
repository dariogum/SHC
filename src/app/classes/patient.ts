import { Gender } from './gender';
import { Country } from './country';
import { State } from './state';
import { City } from './city';
import { SocialSecurity } from './socialsecurity';
import { BirthType } from './birthtype';
import { BloodType } from './bloodtype';
import { Visit } from './visit';

export class Patient {
  id: number;
  lastname: string;
  name: string;
  birthday: Date;
  gender: Gender;
  docType: number;
  doc: string;
  phone1: number;
  phone2: number;
  country: Country;
  state: State;
  city: City;
  street: string;
  number: number;
  floor: string;
  apartment: string;
  socialSecurity1: SocialSecurity;
  socialSecurity1Number: string;
  socialSecurity2: SocialSecurity;
  socialSecurity2Number: string;
  birthType: BirthType;
  weightNewborn: number;
  bloodType: BloodType;
  rhFactor: number;
  apgar: number;
  gestationalAge: number;
  comments: string;
  father: string;
  mother: string;
  brothers: string;
  others: string;
  visits: Visit[];
}