import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Patient } from './../classes/patient';
import { Gender } from './../classes/gender';
import { Country } from './../classes/country';
import { State } from './../classes/state';
import { City } from './../classes/city';
import { SocialSecurity } from './../classes/socialsecurity';
import { BirthType } from './../classes/birthtype';
import { BloodType } from './../classes/bloodtype';
import { Visit } from './../classes/visit';
import { GENDERS, COUNTRIES, STATES, CITIES, SOCIALSECURITIES, BIRTHTYPES, BLOODTYPES } from './mock-data';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class PatientService {

	private apiUrl = 'http://localhost:8080/v1/patients';

	constructor(private http: HttpClient) { }

	findInJson(needle, haystack) {
		for (var i = haystack.length - 1; i >= 0; i--) {
			if(haystack[i].id === needle) {
				return haystack[i];
			}
		}
		return null;
	}

	parseVisit(data): Visit {
		var visit: Visit = {
			id: data.id,
			date: data.attributes.date,
			weight: data.attributes.weight,
			height: data.attributes.height,
			perimeter: data.attributes.perimeter,
			diagnosis: data.attributes.diagnosis,
			treatment: data.attributes.treatment,
			files: null
		};

		return visit;
	}

	parsePatient(data): Patient {
		var patient: Patient;
		var gender: Gender = this.findInJson(data.attributes.gender, GENDERS);
		var country: Country = this.findInJson(data.attributes.country, COUNTRIES);
		var state: State = this.findInJson(data.attributes.country, STATES);
		var city: City = this.findInJson(data.attributes.city, CITIES);
		var socialSecurity1: SocialSecurity = this.findInJson(data.attributes.socialSecurity1, SOCIALSECURITIES);
		var socialSecurity2: SocialSecurity = this.findInJson(data.attributes.socialSecurity2, SOCIALSECURITIES);
		var birthtype: BirthType = this.findInJson(data.attributes.birthType, BIRTHTYPES);
		var bloodtype: BloodType = this.findInJson(data.attributes.bloodType, BLOODTYPES);
		var visits: Visit[] = [];

		for (var i = 0; i < data.relationships.visits.length; i++) {
			visits[i] = this.parseVisit(data.relationships.visits[i].data);
		}

		patient = {
			id: data.id,
			lastname: data.attributes.lastname,
			name: data.attributes.name,
			birthday: data.attributes.birthday,
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
			socialSecurity1Number: data.attributes.socialSecurity1Number,
			socialSecurity2: socialSecurity2,
			socialSecurity2Number: data.attributes.socialSecurity2Number,
			birthType: birthtype,
			weightNewborn: data.attributes.weightNewborn,
			bloodType: bloodtype,
			rhFactor: data.attributes.rhFactor,
			apgar: data.attributes.apgar,
			gestationalAge: data.attributes.gestationalAge,
			comments: data.attributes.comments,
			father: data.attributes.father,
			mother: data.attributes.mother,
			brothers: data.attributes.brothers,
			others: data.attributes.others,
			visits: visits
		}

		return patient;
	}

	parsePatients(data) {
		var patients: Patient[] = [];
		for (var i = 0; i < data.length; i++) {
			patients[i] = this.parsePatient(data[i]);
		}
		return patients;
	}

	getPatients(): Observable<Patient[]> {
		return this.http.get<any>(this.apiUrl)
		.pipe(
			map(response => this.parsePatients(response.data)),
			tap(patients => console.log('fetched patients')),
			catchError(this.handleError('getPatients', []))
			);
	}

	getPatient(id: number): Observable<Patient> {
		const url = `${this.apiUrl}/${id}`;
		return this.http.get<any>(url)
		.pipe(
			map(response => this.parsePatient(response.data)),
			tap(patient => console.log(`fetched patient id=${id}`)),
			catchError(this.handleError<any>(`getPatient id=${id}`))
			);
	}

	searchPatients(term: string): Observable<any> {
		if (!term.trim()) {
			return of([]);
		}
		return this.http.get<any>(`${this.apiUrl}?filter=name:${term},lastname:${term}`)
		.pipe(
			map(response => this.parsePatients(response.data)),
			tap(_ => console.log(`found patients matching "${term}"`)),
			catchError(this.handleError<any>('searchpatients', []))
			);
	}

	addPatient(patient: Patient): Observable<any> {
		return this.http.post<any>(this.apiUrl, patient, httpOptions)
		.pipe(
			map(response => response.data),
			tap((patient: Patient) => console.log(`added hero w/ id=${patient.id}`)),
			catchError(this.handleError<any>('addPatient'))
			);
	}

	updatePatient(patient: Patient): Observable<any> {
		return this.http.put<any>(this.apiUrl, patient, httpOptions)
		.pipe(
			map(response => response.data),
			tap(_ => console.log(`updated hero id=${patient.id}`)),
			catchError(this.handleError<any>('updatePatient'))
			);
	}

	deletePatient(patient: Patient | number): Observable<any> {
		const id = typeof patient === 'number' ? patient : patient.id;
		const url = `${this.apiUrl}/${id}`;

		return this.http.delete<any>(url, httpOptions)
		.pipe(
			map(response => response.data),
			tap(_ => console.log(`deleted patient id=${id}`)),
			catchError(this.handleError<any>('deletePatient'))
			);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}
}
