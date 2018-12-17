import { Injectable } from '@angular/core';
import { Application } from './../../classes/application';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { VACCINATIONS, AGES, DOSES } from './../../catalogs/vaccinations';
import { environment } from './../../../environments/environment';
import * as moment from 'moment';

const APIVERSIONURL = environment.url + '/v1';
const APIAPPLICATIONSURL = APIVERSIONURL + '/applications';
const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  constructor(
    private http: HttpClient,
  ) { }

  applicationToJson(application, patientId) {
    const applicationDate = moment(application.date);
    const applicationDay = applicationDate.format('YYYY-MM-DD');
    return {
      'data': {
        'type': 'application',
        'id': application.id,
        'attributes': {
          'patient': patientId,
          'date': applicationDay,
          'age': application.age.id,
          'vaccine': application.vaccine.id,
          'dose': application.dose.id,
        }
      }
    };
  }

  createApplication(application: Application, patientId: number): Observable<Application> {
    const data = this.applicationToJson(application, patientId);

    return this.http.post<any>(APIAPPLICATIONSURL, data, HTTPOPTIONS)
      .pipe(
        map(response => this.parseApplication(response.data)),
        catchError(this.handleError<Application>('createApplication'))
      );
  }

  readApplications(patient: number): Observable<Application[]> {
    return this.http.get<any>(`${APIAPPLICATIONSURL}/byPatient/${patient}`)
      .pipe(
        map(response => this.parseApplications(response.data)),
        catchError(this.handleError<Application[]>('readApplications', []))
      );
  }

  updateApplication(application: Application, patientId: Number): Observable<any> {
    const id = typeof application === 'number' ? application : application.id;
    const url = `${APIAPPLICATIONSURL}/${id}`;
    const data = this.applicationToJson(application, patientId);

    return this.http.patch<any>(url, data, HTTPOPTIONS)
      .pipe(
        map(response => response.data),
        catchError(this.handleError<any>('updateVisit'))
      );
  }

  deleteApplication(application: Application): Observable<any> {
    const id = typeof application === 'number' ? application : application.id;
    return this.http.delete<any>(`${APIAPPLICATIONSURL}/${id}`, HTTPOPTIONS)
      .pipe(
        catchError(this.handleError<any>('deleteApplication'))
      );
  }

  parseApplications(data): Application[] {
    const applications = [];
    for (const application of data) {
      applications.push(this.parseApplication(application));
    }
    return applications;
  }

  parseApplication(data): Application {
    const applicationAge = AGES.filter(age => age.id === data.attributes.age)[0];
    const applicationVaccine = VACCINATIONS.filter(vaccine => vaccine.id === data.attributes.vaccine)[0];
    const applicationDose = DOSES.filter(dose => dose.id === data.attributes.dose)[0];
    const application: Application = {
      age: applicationAge,
      date: data.attributes.date,
      dose: applicationDose,
      id: data.id,
      vaccine: applicationVaccine,
    };
    return application;
  }

  readAges() {
    return AGES;
  }

  readDoses() {
    return DOSES;
  }

  readVaccinations() {
    return VACCINATIONS;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
