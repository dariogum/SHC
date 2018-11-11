import { Injectable } from '@angular/core';

import { BIRTHTYPES } from './birthtypes';
import { BLOODTYPES } from './bloodtypes';
import { CITIES } from './cities';
import { COUNTRIES } from './countries';
import { DOCTYPES } from './doctypes';
import { GENDERS } from './genders';
import { SOCIALSECURITIES } from './socialsecurities';
import { STATES } from './states';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {

  filterParameters = null;

  constructor() { }

  filterCallback(item) {
    for (let i = this.filterParameters.length - 1; i >= 0; i--) {
      if (this.filterParameters[i] === item.id) {
        return true;
      }
    }
    return false;
  }

  getArrayFiltered(array, params) {
    if (params && params[0] !== 'all') {
      this.filterParameters = params;
      return array.filter(this.filterCallback, this);
    }
    return array;
  }

  getBirthTypes(params?) {
    return this.getArrayFiltered(BIRTHTYPES, params);
  }

  getBloodTypes(params?) {
    return this.getArrayFiltered(BLOODTYPES, params);
  }

  getCities(params?) {
    return this.getArrayFiltered(CITIES, params);
  }

  getCountries(params?) {
    return this.getArrayFiltered(COUNTRIES, params);
  }

  getDocTypes(params?) {
    return this.getArrayFiltered(DOCTYPES, params);
  }

  getGenders(params?) {
    return this.getArrayFiltered(GENDERS, params);
  }

  getSocialSecurities(params?) {
    return this.getArrayFiltered(SOCIALSECURITIES, params);
  }

  getStates(params?) {
    return this.getArrayFiltered(STATES, params);
  }

  getBirthType(id) {
    return BIRTHTYPES.find(item => item.id === id);
  }

  getBloodType(id) {
    return BLOODTYPES.find(item => item.id === id);
  }

  getCity(id) {
    return CITIES.find(item => item.id === id);
  }

  getCountry(id) {
    return COUNTRIES.find(item => item.id === id);
  }

  getDocType(id) {
    return DOCTYPES.find(item => item.id === id);
  }

  getGender(id) {
    return GENDERS.find(item => item.id === id);
  }

  getSocialSecurity(id) {
    return SOCIALSECURITIES.find(item => item.id === id);
  }

  getState(id) {
    return STATES.find(item => item.id === id);
  }
}
