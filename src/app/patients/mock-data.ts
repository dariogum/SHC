import { Gender } from './classes/gender';
import { Country } from './classes/country';
import { State } from './classes/state';
import { City } from './classes/city';
import { SocialSecurity } from './classes/socialsecurity';
import { BirthType } from './classes/birthtype';
import { BloodType } from './classes/bloodtype';
import { Patient } from './classes/patient';

export const CITIES: City[] = [
  { id: 1, name: 'Reconquista', state: 1, zipcode: 'S3560' }
];

export const COUNTRIES: Country[] = [
  { id: 1, name: 'Argentina' }
];

export const STATES: State[] = [
  { id: 1, name: "Buenos Aires", country: 1 },
  { id: 2, name: "Catamarca", country: 1 },
  { id: 3, name: "Chaco", country: 1 },
  { id: 4, name: "Chubut", country: 1 },
  { id: 5, name: "Córdoba", country: 1 },
  { id: 6, name: "Corrientes", country: 1 },
  { id: 7, name: "Entre Ríos", country: 1 },
  { id: 8, name: "Formosa", country: 1 },
  { id: 9, name: "Jujuy", country: 1 },
  { id: 10, name: "La Pampa", country: 1 },
  { id: 11, name: "La Rioja", country: 1 },
  { id: 12, name: "Mendoza", country: 1 },
  { id: 13, name: "Misiones", country: 1 },
  { id: 14, name: "Neuquén", country: 1 },
  { id: 15, name: "Río Negro", country: 1 },
  { id: 16, name: "Salta", country: 1 },
  { id: 17, name: "San Juan", country: 1 },
  { id: 18, name: "San Luis", country: 1 },
  { id: 19, name: "Santa Cruz", country: 1 },
  { id: 20, name: "Santa Fe", country: 1 },
  { id: 21, name: "Santiago del Estero", country: 1 },
  { id: 22, name: "Tierra del Fuego, Antártida e Islas del Atlántico Sur", country: 1 },
  { id: 23, name: "Tucumán", country: 1 }
];

export const SOCIALSECURITIES: SocialSecurity[] = [
  { id: 1, name: 'FESalud' },
  { id: 2, name: 'IAPOS' },
];

export const GENDERS: Gender[] = [
  { id: 1, name: 'Masculino' },
  { id: 2, name: 'Femenino' },
  { id: 3, name: 'Diverso' },
];

export const BIRTHTYPES: BirthType[] = [
  { id: 1, name: 'Natural' },
  { id: 2, name: 'Cesárea' }
];

export const BLOODTYPES: BloodType[] = [
  { id: 1, name: '0' },
  { id: 2, name: 'A' },
  { id: 3, name: 'B' },
  { id: 4, name: 'AB' },
];

export const PATIENTS: Patient[] = [
  {
    id: 0, name: 'Darío', lastname: 'Uberti', birthday: new Date(1987, 10, 6), gender: GENDERS[0], docType: 1, doc: '33038935',
    phone1: 3424669752, phone2: 3491421342, country: COUNTRIES[0], state: STATES[19], city: CITIES[0], street: 'Av. Gbdor. Freyre',
    number: 3169, floor: '2', apartment: 'A', socialSecurity1: SOCIALSECURITIES[0], socialSecurity1Number: '123456789',
    socialSecurity2: null, socialSecurity2Number: null, birthType: BIRTHTYPES[0], weightNewborn: 3500, bloodType: BLOODTYPES[1],
    rhFactor: 1, apgar: 10, gestationalAge: 39, circularCord: false, comments: null, father: null, mother: null, brothers: null,
    others: null
  },
  {
    id: 1, name: 'Verónica', lastname: 'Pedicino', birthday: new Date(1988, 9, 19), gender: GENDERS[1], docType: 1, doc: '34051871',
    phone1: 3424669752, phone2: 3491421342, country: COUNTRIES[0], state: STATES[19], city: CITIES[0], street: 'Av. Gbdor. Freyre',
    number: 3169, floor: '2', apartment: 'A', socialSecurity1: SOCIALSECURITIES[0], socialSecurity1Number: '123456789',
    socialSecurity2: null, socialSecurity2Number: null, birthType: BIRTHTYPES[0], weightNewborn: 3500, bloodType: BLOODTYPES[1],
    rhFactor: 1, apgar: 10, gestationalAge: 39, circularCord: false, comments: null, father: null, mother: null, brothers: null,
    others: null
  }
];