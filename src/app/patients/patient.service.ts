import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { BirthType } from './../classes/birthtype';
import { BloodType } from './../classes/bloodtype';
import { City } from './../classes/city';
import { Country } from './../classes/country';
import { Gender } from './../classes/gender';
import { Patient } from './../classes/patient';
import { SocialSecurity } from './../classes/socialsecurity';
import { State } from './../classes/state';
import { Visit } from './../classes/visit';
import { environment } from './../../environments/environment';
import { CITIES } from './mock-cities';
import { GENDERS, COUNTRIES, STATES, SOCIALSECURITIES, BIRTHTYPES, BLOODTYPES } from './mock-data';
import * as moment from 'moment';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class PatientService {

	private apiPatientsUrl = environment.url + '/v1/patients';
	private apiVisitsUrl = environment.url + '/v1/visits';
	private apiFilesUrl = environment.url + '/v1/files';
	private apiVersionUrl = environment.url + '/v1';

	constructor(private http: HttpClient) { }

	findInJson(needle, haystack) {
		for (let i = haystack.length - 1; i >= 0; i--) {
			if (haystack[i].id === needle) {
				return haystack[i];
			}
		}
		
		return null;
	}

	parseVisit(data): Visit {
		let files = [];

		if (data.relationships && data.relationships.files) {
			for (let i = 0; i < data.relationships.files.data.length; i++) {
				files[i] = {
					id: data.relationships.files.data[i].data.id,
					url: this.apiVersionUrl + data.relationships.files.data[i].links.self
				};
			}
		}

		let visit: Visit = {
			id: data.id,
			date: moment(data.attributes.date).toDate(),
			weight: data.attributes.weight,
			height: data.attributes.height,
			perimeter: data.attributes.perimeter,
			bloodPressure: data.attributes.bloodPressure,
			diagnosis: data.attributes.diagnosis,
			treatment: data.attributes.treatment,
			files: files
		};

		return visit;
	}

	parsePatient(data): Patient {
		let patient: Patient;
		let birthday: Date = null;
		let gender: Gender = null;
		let country: Country = null;
		let state: State = null;
		let city: City = null;
		let socialSecurity1: SocialSecurity = null;
		let socialSecurity2: SocialSecurity = null;
		let birthtype: BirthType = null;
		let bloodtype: BloodType = null;
		let visits: Visit[] = [];

		if (data.attributes.birthday) {
			birthday = moment(data.attributes.birthday).toDate()
		}
		if (data.attributes.gender) {
			gender = this.findInJson(data.attributes.gender, GENDERS);
		}
		if (data.attributes.country) {
			country = this.findInJson(data.attributes.country, COUNTRIES);
		}
		if (data.attributes.state) {
			state = this.findInJson(data.attributes.state, STATES);
		}
		if (data.attributes.city) {
			city = this.findInJson(data.attributes.city, CITIES);
		}
		if (data.attributes.socialSecurity1) {
			socialSecurity1 = this.findInJson(data.attributes.socialSecurity1, SOCIALSECURITIES);
		}
		if (data.attributes.socialSecurity2) {
			socialSecurity2 = this.findInJson(data.attributes.socialSecurity2, SOCIALSECURITIES);
		}
		if (data.attributes.birthType) {
			birthtype = this.findInJson(data.attributes.birthType, BIRTHTYPES);
		}
		if (data.attributes.bloodType) {
			bloodtype = this.findInJson(data.attributes.bloodType, BLOODTYPES);
		}
		if (data.relationships && data.relationships.visits) {
			for (let i = 0; i < data.relationships.visits.data.length; i++) {
				visits[i] = this.parseVisit(data.relationships.visits.data[i].data);
			}
		}

		patient = {
			id: data.id,
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
			socialSecurity1Number: data.attributes.socialSecurity1Number,
			socialSecurity2: socialSecurity2,
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
			visits: visits
		}

		return patient;
	}

	parsePatients(data) {
		let patients: Patient[] = [];
		for (let i = 0; i < data.length; i++) {
			patients[i] = this.parsePatient(data[i]);
		}

		return patients;
	}

	getPatients(): Observable<Patient[]> {
		return this.http.get<any>(`${this.apiPatientsUrl}?sort=-id&page=first`)
			.pipe(
				map(response => this.parsePatients(response.data)),
				catchError(this.handleError<Patient[]>('getPatients', []))
			);
	}

	getPatient(id: number): Observable<Patient> {
		const url = `${this.apiPatientsUrl}/${id}`;

		return this.http.get<any>(url)
			.pipe(
				map(response => this.parsePatient(response.data)),
				catchError(this.handleError<Patient>(`getPatient id=${id}`))
			);
	}

	searchPatients(term: string): Observable<Patient[]> {
		if (!term.trim()) {
			return of([]);
		}

		return this.http.get<any>(`${this.apiPatientsUrl}?filter=name:${term},lastname:${term}`)
			.pipe(
				map(response => this.parsePatients(response.data)),
				catchError(this.handleError<Patient[]>('searchpatients', []))
			);
	}

	addPatient(patient: Patient): Observable<Patient> {
		let data = {
			"data": {
				"type": "patient",
				"attributes": {
					"lastname": patient.lastname,
					"name": patient.name
				}
			}
		};

		return this.http.post<any>(this.apiPatientsUrl, data, httpOptions)
			.pipe(
				map(response => this.parsePatient(response.data)),
				catchError(this.handleError<Patient>('addPatient'))
			);
	}

	updatePatient(patient: Patient): Observable<any> {
		const id = typeof patient === 'number' ? patient : patient.id;
		const url = `${this.apiPatientsUrl}/${id}`;

		let gender: Number = patient.gender === null ? null : patient.gender.id;
		let country: Number = patient.country === null ? null : patient.country.id;
		let state: Number = patient.state === null ? null : patient.state.id;
		let city: Number = patient.city === null ? null : patient.city.id;
		let socialSecurity1: Number = patient.socialSecurity1 === null ? null : patient.socialSecurity1.id;
		let socialSecurity2: Number = patient.socialSecurity2 === null ? null : patient.socialSecurity2.id;
		let birthtype: Number = patient.birthType === null ? null : patient.birthType.id;
		let bloodtype: Number = patient.bloodType === null ? null : patient.bloodType.id;
		let birthday = null;
		if (patient.birthday) {
			let birthdate = moment(patient.birthday);
			birthday = birthdate.format("YYYY-MM-DD");
		}

		let data = {
			"data": {
				"type": "patient",
				"id": patient.id,
				"attributes": {
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
					socialSecurity1Number: patient.socialSecurity1Number,
					socialSecurity2: socialSecurity2,
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
					others: patient.others
				}
			}
		};

		return this.http.patch<any>(url, data, httpOptions)
			.pipe(
				map(response => response.data),
				catchError(this.handleError<any>('updatePatient'))
			);
	}

	deletePatient(patientId: number): Observable<any> {
		const url = `${this.apiPatientsUrl}/${patientId}`;

		return this.http.delete<any>(url, httpOptions)
			.pipe(
				catchError(this.handleError<any>('deletePatient'))
			);
	}

	visitToJson(visit: Visit, patientId: Number) {
		let visitdate = moment(visit.date);
		let visitday = visitdate.format("YYYY-MM-DD");
		let data = {
			"data": {
				"type": "patient",
				"id": visit.id,
				"attributes": {
					"patient": patientId,
					"date": visitday,
					"weight": visit.weight,
					"height": visit.height,
					"perimeter": visit.perimeter,
					"bloodPressure": visit.bloodPressure,
					"diagnosis": visit.diagnosis,
					"treatment": visit.treatment,
				}
			}
		};

		return data;
	}

	addVisit(visit: Visit, patientId: Number): Observable<Visit> {
		let data = this.visitToJson(visit, patientId);

		return this.http.post<any>(this.apiVisitsUrl, data, httpOptions)
			.pipe(
				map(response => this.parseVisit(response.data)),
				catchError(this.handleError<Visit>('addVisit'))
			);
	}

	updateVisit(visit: Visit, patientId: Number): Observable<any> {
		const id = typeof visit === 'number' ? visit : visit.id;
		const url = `${this.apiVisitsUrl}/${id}`;
		let data = this.visitToJson(visit, patientId);

		return this.http.patch<any>(url, data, httpOptions)
			.pipe(
				map(response => response.data),
				catchError(this.handleError<any>('updateVisit'))
			);
	}

	deleteVisit(visit: Visit | number): Observable<any> {
		const id = typeof visit === 'number' ? visit : visit.id;
		const url = `${this.apiVisitsUrl}/${id}`;

		return this.http.delete<any>(url, httpOptions)
			.pipe(
				catchError(this.handleError<any>('deleteVisit'))
			);
	}

	uploadFiles(files: FileList, visitId: number): any {
		const uploadData = new FormData();

		for (let i = files.length - 1; i >= 0; i--) {
			uploadData.set("visit", visitId.toString());
			uploadData.append('visitFiles[' + i + ']', files[i], files[i].name);
		}

		return this.http.post<any>(this.apiFilesUrl, uploadData).pipe(
			catchError(this.handleError<any>('uploadFiles'))
		);
	}

	deleteFile(fileId: number): Observable<any> {
		const url = `${this.apiFilesUrl}/${fileId}`;

		return this.http.delete<any>(url, httpOptions)
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
