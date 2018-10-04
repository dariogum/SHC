import { BirthType } from './../classes/birthtype';
import { BloodType } from './../classes/bloodtype';
import { Country } from './../classes/country';
import { Gender } from './../classes/gender';
import { Patient } from './../classes/patient';
import { SocialSecurity } from './../classes/socialsecurity';
import { State } from './../classes/state';
import { Visit } from './../classes/visit';

export const COUNTRIES: Country[] = [
  { id: 1, name: 'Argentina' }
];

export const STATES: State[] = [
  { id: 1, name: "Buenos Aires", country: 1 },
  { id: 2, name: "Capital Federal", country: 1 },
  { id: 3, name: "Catamarca", country: 1 },
  { id: 4, name: "Chaco", country: 1 },
  { id: 5, name: "Chubut", country: 1 },
  { id: 6, name: "Córdoba", country: 1 },
  { id: 7, name: "Corrientes", country: 1 },
  { id: 8, name: "Entre Ríos", country: 1 },
  { id: 9, name: "Formosa", country: 1 },
  { id: 10, name: "Jujuy", country: 1 },
  { id: 11, name: "La Pampa", country: 1 },
  { id: 12, name: "La Rioja", country: 1 },
  { id: 13, name: "Mendoza", country: 1 },
  { id: 14, name: "Misiones", country: 1 },
  { id: 15, name: "Neuquén", country: 1 },
  { id: 16, name: "Río Negro", country: 1 },
  { id: 17, name: "Salta", country: 1 },
  { id: 18, name: "San Juan", country: 1 },
  { id: 19, name: "San Luis", country: 1 },
  { id: 20, name: "Santa Cruz", country: 1 },
  { id: 21, name: "Santa Fe", country: 1 },
  { id: 22, name: "Santiago del Estero", country: 1 },
  { id: 23, name: "Tucumán", country: 1 }
];

export const SOCIALSECURITIES: SocialSecurity[] = [
  { id: 111, name: 'Particular', accepted: true },
  { id: 1, name: 'Agente Prop. Médica', accepted: true },
  { id: 2, name: 'AMOEIAG', accepted: true },
  { id: 3, name: 'AMPS-Ley 5110', accepted: true },
  { id: 4, name: 'ASIO', accepted: true },
  { id: 5, name: 'Asociart ART', accepted: true },
  { id: 6, name: 'BANCARIOS - O.S.S.B', accepted: true },
  { id: 7, name: 'Berkley ART', accepted: true },
  { id: 8, name: 'Caminos Protegidos ART', accepted: true },
  { id: 9, name: 'Camioneros', accepted: true },
  { id: 10, name: 'Camioneros Primero', accepted: true },
  { id: 11, name: 'COLONIA SUIZA SALUD ART', accepted: true },
  { id: 12, name: 'Coop. Trabajo Humana', accepted: true },
  { id: 13, name: 'DASUTEN', accepted: true },
  { id: 14, name: 'Docthos (Swiss Medical)', accepted: true },
  { id: 15, name: 'EMPRESAL - OSSEG', accepted: true },
  { id: 16, name: 'EXPERTA ART', accepted: true },
  { id: 17, name: 'Farmacia (Sta Fe) - Asoc', accepted: true },
  { id: 18, name: 'Farmacia OS Bs. As. - Gapresa', accepted: true },
  { id: 19, name: 'Fed. Patronal Seguros ART', accepted: true },
  { id: 20, name: 'FESALUD - Planes varios', accepted: true },
  { id: 21, name: 'Fesalud Obra Social', accepted: true },
  { id: 22, name: 'Galeno S.A.', accepted: true },
  { id: 23, name: 'Galeno ART', accepted: true },
  { id: 24, name: 'GERDANNA SALUD S.A.', accepted: true },
  { id: 25, name: 'Inst. Aut. Pcial. Seguro E. Ríos', accepted: true },
  { id: 26, name: 'IOSFA (Osfa-Diba_Iose)', accepted: true },
  { id: 27, name: 'LA HOLANDO ART', accepted: true },
  { id: 28, name: 'La Segunda ART', accepted: true },
  { id: 29, name: 'Ladrilleros (Diltey SA)', accepted: true },
  { id: 30, name: 'LIDERAR S.A. ART', accepted: true },
  { id: 31, name: 'MAPFRE Seg. De Vida S.A.', accepted: true },
  { id: 32, name: 'MARITIMOS - O.S.P.M.', accepted: true },
  { id: 33, name: 'MEDICAR WORK (Numuse)', accepted: true },
  { id: 34, name: 'MEDICUS SA', accepted: true },
  { id: 35, name: 'MEDIFE', accepted: true },
  { id: 36, name: 'MOSAISTAS', accepted: true },
  { id: 37, name: 'Molineros (Prevención Salud)', accepted: true },
  { id: 38, name: 'MOTOCICLISTAS', accepted: true },
  { id: 39, name: 'OMINT S.A. De SERVICIOS', accepted: true },
  { id: 40, name: 'OMINT ART', accepted: true },
  { id: 41, name: 'OPDEA', accepted: true },
  { id: 42, name: 'OSDE', accepted: true },
  { id: 43, name: 'OSFGPICIY - Fed. De la Carne', accepted: true },
  { id: 44, name: 'OSETYA', accepted: true },
  { id: 45, name: 'OSIAD Salud (ImagenS)', accepted: true },
  { id: 46, name: 'OSMATA', accepted: true },
  { id: 47, name: 'OSMISS (Ministros y Secret.)', accepted: true },
  { id: 48, name: 'OSPA VIAL', accepted: true },
  { id: 49, name: 'OSPACA - ACA (Iter Medicina)', accepted: true },
  { id: 50, name: 'OSPE - Petroleros', accepted: true },
  { id: 51, name: 'OSPEDICI (Iter Medicina)', accepted: true },
  { id: 52, name: 'OSPeGap - Petróleo y Gas', accepted: true },
  { id: 53, name: 'OSPEGA', accepted: true },
  { id: 54, name: 'OSPIA - Alimentación', accepted: true },
  { id: 55, name: 'OSPICA (Cueros y Afines)', accepted: true },
  { id: 56, name: 'OSPIDA - Imprenta', accepted: true },
  { id: 57, name: 'OSPIM - Madereros', accepted: true },
  { id: 58, name: 'OSPIQYP - Químic. y Petroquim.', accepted: true },
  { id: 59, name: 'OSPRByL Barrido y Limpieza', accepted: true },
  { id: 60, name: 'OSTV (Trabaj. Viales)', accepted: true },
  { id: 61, name: 'PASTELEROS', accepted: true },
  { id: 62, name: 'PINTURA', accepted: true },
  { id: 63, name: 'Poder Judicial', accepted: true },
  { id: 64, name: 'Policia Federal Arg.', accepted: true },
  { id: 65, name: 'PREVENCION ART', accepted: true },
  { id: 66, name: 'Prevención Salud', accepted: true },
  { id: 67, name: 'ProFru ART - R.A.S.', accepted: true },
  { id: 68, name: 'SAN PEDRO', accepted: true },
  { id: 69, name: 'SANCOR MEDICINA PRIVADA S.A.', accepted: true },
  { id: 70, name: 'Sancor Seguro Integro ART', accepted: true },
  { id: 71, name: 'Seguros Victoria ART - Medinth', accepted: true },
  { id: 72, name: 'SUTIAGA', accepted: true },
  { id: 73, name: 'SWISS MEDICAL ART', accepted: true },
  { id: 74, name: 'SWISS MEDICAL GROUP', accepted: true },
  { id: 75, name: 'Televisión Salud', accepted: true },
  { id: 76, name: 'Unión Personal (G.M.Ace)', accepted: true },
  { id: 77, name: 'UTA', accepted: true },
  { id: 78, name: 'UTEPLIM - Limpieza Privada', accepted: true },
  { id: 79, name: 'VISITAL SRL - ANDAR', accepted: true },
  { id: 80, name: 'IAPOS', accepted: false },
  { id: 81, name: 'AMUR', accepted: false },
  { id: 82, name: 'ACA Salud', accepted: false },
  { id: 83, name: 'FEDERADA SALUD', accepted: false },
  { id: 84, name: 'JERARQUICOS SALUD', accepted: false },
  { id: 85, name: 'CAJA FORENSE', accepted: false },
  { id: 86, name: 'CAJA INGENIEROS', accepted: false },
  { id: 87, name: 'CIENCIAS ECONOMICAS', accepted: false },
  { id: 88, name: 'Provincia ART', accepted: false },
  { id: 89, name: 'ATSA - Sanidad', accepted: false },
  { id: 90, name: 'LUZ Y FUERZA', accepted: false },
  { id: 91, name: 'OSDOP - Conu', accepted: false },
  { id: 92, name: 'OSDOP - Fuera de convenio', accepted: false },
  { id: 93, name: 'OSECAC', accepted: false },
  { id: 94, name: 'OSFFENTOS (Scis)', accepted: false },
  { id: 95, name: 'OSPAC - Arte Curar', accepted: false },
  { id: 96, name: 'OSPACA - Cerveceros (SCIS)', accepted: false },
  { id: 97, name: 'OSPECON', accepted: false },
  { id: 98, name: 'OSPEDYC - UTEDYC', accepted: false },
  { id: 99, name: 'OSPERSAMS (Sancor O.S.)', accepted: false },
  { id: 100, name: 'OSPIL - Lecheros', accepted: false },
  { id: 101, name: 'OSPIT - Textiles (Conu)', accepted: false },
  { id: 102, name: 'OSPIT - Fuera de convenio', accepted: false },
  { id: 103, name: 'OSPLAD - Docentes', accepted: false },
  { id: 104, name: 'OSPRERA', accepted: false },
  { id: 105, name: 'OSTCARA - Carne', accepted: false },
  { id: 106, name: 'OSTEP (Scis)', accepted: false },
  { id: 107, name: 'OSUTHGRA (S. Garay)', accepted: false },
  { id: 108, name: 'Telegraf. y Radioteleg. (Scis)', accepted: false },
  { id: 109, name: 'U.N.L. - Univ. Nacional Litoral', accepted: false },
  { id: 110, name: 'UOM - Metalúrgicos', accepted: false },
];

export const GENDERS: Gender[] = [
  { id: 1, name: 'Masculino' },
  { id: 2, name: 'Femenino' },
  { id: 3, name: 'Diverso' },
];

export const BIRTHTYPES: BirthType[] = [
  { id: 1, name: 'Parto' },
  { id: 2, name: 'Cesárea' }
];

export const BLOODTYPES: BloodType[] = [
  { id: 1, name: '0' },
  { id: 2, name: 'A' },
  { id: 3, name: 'B' },
  { id: 4, name: 'AB' },
];

export const USERSSTATES = [
  {
    user: 1,
    ids: ['all']
  },
  {
    user: 2,
    ids: [21]
  }
];

export const USERSCONFIG = [
  {
    user: 1,
    address: [true],
    states: ['all'],
    cities: ['all'],
    multipleSocialSecurity: [true],
  },
  {
    user: 2,
    address: [false],
    states: [21],
    cities: [4160, 18233],
    multipleSocialSecurity: [false],
  }
];