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

	private apiPatientsUrl = 'http://localhost:8080/v1/patients';
	private apiVisitsUrl = 'http://localhost:8080/v1/visits';

	constructor(private http: HttpClient) { }

	findInJson(needle, haystack) {
		for (var i = haystack.length - 1; i >= 0; i--) {
			if (haystack[i].id === needle) {
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
		var gender: Gender = null;
		var country: Country = null;
		var state: State = null;
		var city: City = null;
		var socialSecurity1: SocialSecurity = null;
		var socialSecurity2: SocialSecurity = null;
		var birthtype: BirthType = null;
		var bloodtype: BloodType = null;
		var visits: Visit[] = [];

		if(data.attributes.gender) {
			gender = this.findInJson(data.attributes.gender, GENDERS);
		}
		if(data.attributes.country) {
			country = this.findInJson(data.attributes.country, COUNTRIES);
		}
		if(data.attributes.state) {
			state = this.findInJson(data.attributes.state, STATES);
		}
		if(data.attributes.city) {
			city = this.findInJson(data.attributes.city, CITIES);
		}
		if(data.attributes.socialSecurity1) {
			socialSecurity1 = this.findInJson(data.attributes.socialSecurity1, SOCIALSECURITIES);
		}
		if(data.attributes.socialSecurity2) {
			socialSecurity2 = this.findInJson(data.attributes.socialSecurity2, SOCIALSECURITIES);
		}
		if(data.attributes.birthType) {
			birthtype = this.findInJson(data.attributes.birthType, BIRTHTYPES);
		}
		if(data.attributes.bloodType) {
			bloodtype = this.findInJson(data.attributes.bloodType, BLOODTYPES);
		}
		if(data.relationships && data.relationships.visits) {
			for (var i = 0; i < data.relationships.visits.length; i++) {
				visits[i] = this.parseVisit(data.relationships.visits[i].data);
			}
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
		return this.http.get<any>(this.apiPatientsUrl)
			.pipe(
				map(response => this.parsePatients(response.data)),
				tap(),
				catchError(this.handleError<Patient[]>('getPatients', []))
			);
	}

	getPatient(id: number): Observable<Patient> {
		const url = `${this.apiPatientsUrl}/${id}`;
		return this.http.get<any>(url)
			.pipe(
				map(response => this.parsePatient(response.data)),
				tap(),
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
				tap(),
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
				tap(),
				catchError(this.handleError<Patient>('addPatient'))
			);
	}

	updatePatient(patient: Patient): Observable<any> {
		const id = typeof patient === 'number' ? patient : patient.id;
		const url = `${this.apiPatientsUrl}/${id}`;

		var gender: Number = patient.gender === null ? null : patient.gender.id;
		var country: Number = patient.country === null ? null : patient.country.id;
		var state: Number = patient.state === null ? null : patient.state.id;
		var city: Number = patient.city === null ? null : patient.city.id;
		var socialSecurity1: Number = patient.socialSecurity1 === null ? null : patient.socialSecurity1.id;
		var socialSecurity2: Number = patient.socialSecurity2 === null ? null : patient.socialSecurity2.id;
		var birthtype: Number = patient.birthType === null ? null : patient.birthType.id;
		var bloodtype: Number = patient.bloodType === null ? null : patient.bloodType.id;

		var birthdate = moment(patient.birthday);
		var birthday = birthdate.format("YYYY-MM-DD");

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
					apgar: patient.apgar,
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
				tap(),
				catchError(this.handleError<any>('updatePatient'))
			);
	}

	deletePatient(patient: Patient | number): Observable<any> {
		const id = typeof patient === 'number' ? patient : patient.id;
		const url = `${this.apiPatientsUrl}/${id}`;

		return this.http.delete<any>(url, httpOptions)
			.pipe(
				map(response => response.data),
				tap(),
				catchError(this.handleError<any>('deletePatient'))
			);
	}

	addVisit(visit: Visit, patientId: Number): Observable<Visit> {
		var visitdate = moment(visit.date);
		var visitday = visitdate.format("YYYY-MM-DD");
		
	  let data = {
	  	"data": {
	  		"type": "visit",
		    "attributes": {
		    	"patient": patientId,
		      "date": visitday,
					"weight": visit.weight,
					"height": visit.height,
					"perimeter": visit.perimeter,
					"diagnosis": visit.diagnosis,
					"treatment": visit.treatment,
		    }
	  	}
	  };
		return this.http.post<any>(this.apiVisitsUrl, data, httpOptions)
			.pipe(
				map(response => this.parseVisit(response.data)),
				tap(),
				catchError(this.handleError<Visit>('addVisit'))
			);
	}

	updateVisit(visit: Visit, patientId: Number): Observable<any> {
		const id = typeof visit === 'number' ? visit : visit.id;
		const url = `${this.apiVisitsUrl}/${id}`;

		var visitdate = moment(visit.date);
		var visitday = visitdate.format("YYYY-MM-DD");

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
					"diagnosis": visit.diagnosis,
					"treatment": visit.treatment,
		    }
	  	}
	  };

		return this.http.patch<any>(url, data, httpOptions)
			.pipe(
				map(response => response.data),
				tap(),
				catchError(this.handleError<any>('updateVisit'))
			);
	}

	deleteVisit(visit: Visit | number): Observable<any> {
		const id = typeof visit === 'number' ? visit : visit.id;
		const url = `${this.apiVisitsUrl}/${id}`;

		return this.http.delete<any>(url, httpOptions)
			.pipe(
				map(response => response.data),
				tap(),
				catchError(this.handleError<any>('deleteVisit'))
			);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}
}
