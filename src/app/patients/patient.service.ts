import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BirthType } from './../classes/birthtype';
import { BloodType } from './../classes/bloodtype';
import { CatalogsService } from './../catalogs/catalogs.service';
import { City } from './../classes/city';
import { Country } from './../classes/country';
import { environment } from './../../environments/environment';
import { Gender } from './../classes/gender';
import { Patient } from './../classes/patient';
import { SocialSecurity } from './../classes/socialsecurity';
import { State } from './../classes/state';
import { Visit } from './../classes/visit';
import * as moment from 'moment';

const APIVERSIONURL = environment.url + '/v1';
const APIFILESURL = APIVERSIONURL + '/files';
const APIPATIENTSURL = APIVERSIONURL + '/patients';
const APIVISITSURL = APIVERSIONURL + '/visits';

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private catalogsService: CatalogsService,
    private http: HttpClient,
  ) { }

  parseVisit(data): Visit {
    const files = [];
    if (data.relationships && data.relationships.files) {
      for (let i = 0; i < data.relationships.files.data.length; i++) {
        files[i] = {
          id: data.relationships.files.data[i].data.id,
          url: APIVERSIONURL + data.relationships.files.data[i].links.self
        };
      }
    }

    const visit: Visit = {
      bloodPressure: data.attributes.bloodPressure,
      date: moment(data.attributes.date).toDate(),
      diagnosis: data.attributes.diagnosis,
      files: files,
      height: data.attributes.height,
      id: data.id,
      perimeter: data.attributes.perimeter,
      studiesResults: data.attributes.studiesResults,
      treatment: data.attributes.treatment,
      weight: data.attributes.weight,
    };

    return visit;
  }

  parsePatient(data): Patient {
    let patient: Patient;
    let birthday: Date = null;
    let birthtype: BirthType = null;
    let bloodtype: BloodType = null;
    let country: Country = null;
    let city: City = null;
    let gender: Gender = null;
    let socialSecurity1: SocialSecurity = null;
    let socialSecurity2: SocialSecurity = null;
    let state: State = null;
    const visits: Visit[] = [];

    if (data.attributes.birthday) {
      birthday = moment(data.attributes.birthday).toDate();
    }
    if (data.attributes.birthType) {
      birthtype = this.catalogsService.getBirthType(data.attributes.birthType);
    }
    if (data.attributes.bloodType) {
      bloodtype = this.catalogsService.getBloodType(data.attributes.bloodType);
    }
    if (data.attributes.city) {
      city = this.catalogsService.getCity(data.attributes.city);
    }
    if (data.attributes.country) {
      country = this.catalogsService.getCountry(data.attributes.country);
    }
    if (data.attributes.gender) {
      gender = this.catalogsService.getGender(data.attributes.gender);
    }
    if (data.attributes.socialSecurity1) {
      socialSecurity1 = this.catalogsService.getSocialSecurity(data.attributes.socialSecurity1);
    }
    if (data.attributes.socialSecurity2) {
      socialSecurity2 = this.catalogsService.getSocialSecurity(data.attributes.socialSecurity2);
    }
    if (data.attributes.state) {
      state = this.catalogsService.getState(data.attributes.state);
    }
    if (data.relationships && data.relationships.visits) {
      for (let i = 0; i < data.relationships.visits.data.length; i++) {
        visits[i] = this.parseVisit(data.relationships.visits.data[i].data);
      }
    }

    patient = {
      id: data.id,
      oldId: data.attributes.oldId,
      lastname: data.attributes.lastname,
      name: data.attributes.name,
      birthday: birthday,
      gender: gender,
      docType: data.attributes.docType,
      doc: data.attributes.doc,
      phone1: data.attributes.phone1,
      phone2: data.attributes.phone2,
      country: country,
      state: state,
      city: city,
      street: data.attributes.street,
      number: data.attributes.number,
      floor: data.attributes.floor,
      apartment: data.attributes.apartment,
      socialSecurity1: socialSecurity1,
      socialSecurity1Plan: data.attributes.socialSecurity1Plan,
      socialSecurity1Number: data.attributes.socialSecurity1Number,
      socialSecurity2: socialSecurity2,
      socialSecurity2Plan: data.attributes.socialSecurity2Plan,
      socialSecurity2Number: data.attributes.socialSecurity2Number,
      birthType: birthtype,
      weightNewborn: data.attributes.weightNewborn,
      bloodType: bloodtype,
      rhFactor: data.attributes.rhFactor,
      apgar1: data.attributes.apgar1,
      apgar2: data.attributes.apgar2,
      gestationalAge: data.attributes.gestationalAge,
      comments: data.attributes.comments,
      father: data.attributes.father,
      mother: data.attributes.mother,
      brothers: data.attributes.brothers,
      others: data.attributes.others,
      visits: visits,
      applications: [],
    };

    return patient;
  }

  parsePatients(data) {
    const patients: Patient[] = [];
    for (let i = 0; i < data.length; i++) {
      patients[i] = this.parsePatient(data[i]);
    }

    return patients;
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<any>(`${APIPATIENTSURL}?sort=-modifiedAt&page=first`)
      .pipe(
        map(response => this.parsePatients(response.data)),
        catchError(this.handleError<Patient[]>('getPatients', []))
      );
  }

  getPatient(id: number): Observable<Patient> {
    const url = `${APIPATIENTSURL}/${id}`;

    return this.http.get<any>(url)
      .pipe(
        map(response => this.parsePatient(response.data)),
        catchError(this.handleError<Patient>(`getPatient id=${id}`))
      );
  }

  searchPatients(terms: string): Observable<Patient[]> {
    if (!terms.trim()) {
      return of([]);
    }
    terms = terms.toLowerCase();
    terms = encodeURI(terms);

    return this.http.get<any>(`${APIPATIENTSURL}/search/${terms}`)
      .pipe(
        map(response => this.parsePatients(response.data)),
        catchError(this.handleError<Patient[]>('searchpatients', []))
      );
  }

  addPatient(patient: Patient): Observable<Patient> {
    const data = {
      'data': {
        'type': 'patient',
        'attributes': {
          'lastname': patient.lastname,
          'name': patient.name,
          'createdBy': JSON.parse(localStorage.getItem('currentUser')).id,
          'modifiedBy': JSON.parse(localStorage.getItem('currentUser')).id
        }
      }
    };

    return this.http.post<any>(APIPATIENTSURL, data, HTTPOPTIONS)
      .pipe(
        map(response => this.parsePatient(response.data)),
        catchError(this.handleError<Patient>('addPatient'))
      );
  }

  updatePatient(patient: Patient): Observable<any> {
    const id = typeof patient === 'number' ? patient : patient.id;
    const url = `${APIPATIENTSURL}/${id}`;

    let birthday = null;
    const birthtype: Number = patient.birthType === null ? null : patient.birthType.id;
    const bloodtype: Number = patient.bloodType === null ? null : patient.bloodType.id;
    const city: Number = patient.city === null ? null : patient.city.id;
    const country: Number = patient.country === null ? null : patient.country.id;
    const gender: Number = patient.gender === null ? null : patient.gender.id;
    const socialSecurity1: Number = patient.socialSecurity1 === null ? null : patient.socialSecurity1.id;
    const socialSecurity2: Number = patient.socialSecurity2 === null ? null : patient.socialSecurity2.id;
    const state: Number = patient.state === null ? null : patient.state.id;
    if (patient.birthday) {
      const birthdate = moment(patient.birthday);
      birthday = birthdate.format('YYYY-MM-DD');
    }

    const data = {
      'data': {
        'type': 'patient',
        'id': patient.id,
        'attributes': {
          lastname: patient.lastname,
          name: patient.name,
          birthday: birthday,
          gender: gender,
          docType: patient.docType,
          doc: patient.doc,
          phone1: patient.phone1,
          phone2: patient.phone2,
          country: country,
          state: state,
          city: city,
          street: patient.street,
          number: patient.number,
          floor: patient.floor,
          apartment: patient.apartment,
          socialSecurity1: socialSecurity1,
          socialSecurity1Plan: patient.socialSecurity1Plan,
          socialSecurity1Number: patient.socialSecurity1Number,
          socialSecurity2: socialSecurity2,
          socialSecurity2Plan: patient.socialSecurity2Plan,
          socialSecurity2Number: patient.socialSecurity2Number,
          birthType: birthtype,
          weightNewborn: patient.weightNewborn,
          bloodType: bloodtype,
          rhFactor: patient.rhFactor,
          apgar1: patient.apgar1,
          apgar2: patient.apgar2,
          gestationalAge: patient.gestationalAge,
          comments: patient.comments,
          father: patient.father,
          mother: patient.mother,
          brothers: patient.brothers,
          others: patient.others,
          modifiedBy: JSON.parse(localStorage.getItem('currentUser')).id
        }
      }
    };

    return this.http.patch<any>(url, data, HTTPOPTIONS)
      .pipe(
        map(response => response.data),
        catchError(this.handleError<any>('updatePatient'))
      );
  }

  deletePatient(patientId: number): Observable<any> {
    const url = `${APIPATIENTSURL}/${patientId}`;

    return this.http.delete<any>(url, HTTPOPTIONS)
      .pipe(
        catchError(this.handleError<any>('deletePatient'))
      );
  }

  visitToJson(visit: Visit, patientId: Number) {
    const visitdate = moment(visit.date);
    const visitday = visitdate.format('YYYY-MM-DD');

    const data = {
      'data': {
        'type': 'patient',
        'id': visit.id,
        'attributes': {
          'patient': patientId,
          'date': visitday,
          'weight': visit.weight,
          'height': visit.height,
          'perimeter': visit.perimeter,
          'bloodPressure': visit.bloodPressure,
          'diagnosis': visit.diagnosis,
          'treatment': visit.treatment,
          'studiesResults': visit.studiesResults,
        }
      }
    };

    return data;
  }

  addVisit(visit: Visit, patientId: Number): Observable<Visit> {
    const data = this.visitToJson(visit, patientId);

    return this.http.post<any>(APIVISITSURL, data, HTTPOPTIONS)
      .pipe(
        map(response => this.parseVisit(response.data)),
        catchError(this.handleError<Visit>('addVisit'))
      );
  }

  updateVisit(visit: Visit, patientId: Number): Observable<any> {
    const id = typeof visit === 'number' ? visit : visit.id;
    const url = `${APIVISITSURL}/${id}`;
    const data = this.visitToJson(visit, patientId);

    return this.http.patch<any>(url, data, HTTPOPTIONS)
      .pipe(
        map(response => response.data),
        catchError(this.handleError<any>('updateVisit'))
      );
  }

  deleteVisit(visit: Visit | number): Observable<any> {
    const id = typeof visit === 'number' ? visit : visit.id;
    const url = `${APIVISITSURL}/${id}`;

    return this.http.delete<any>(url, HTTPOPTIONS)
      .pipe(
        catchError(this.handleError<any>('deleteVisit'))
      );
  }

  uploadFiles(files: FileList, visitId: number): any {
    const uploadData = new FormData();

    for (let i = files.length - 1; i >= 0; i--) {
      uploadData.set('visit', visitId.toString());
      uploadData.append('visitFiles[' + i + ']', files[i], files[i].name);
    }

    return this.http.post<any>(APIFILESURL, uploadData).pipe(
      catchError(this.handleError<any>('uploadFiles'))
    );
  }

  deleteFile(fileId: number): Observable<any> {
    const url = `${APIFILESURL}/${fileId}`;

    return this.http.delete<any>(url, HTTPOPTIONS)
      .pipe(
        catchError(this.handleError<any>('deleteFile'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
