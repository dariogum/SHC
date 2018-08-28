import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Patient } from './../classes/patient';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

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

	getPatients(): Observable<Patient[]> {
		return this.http.get<Patient[]>(this.apiUrl)
			.pipe(
				tap(patients => console.log('fetched patients')),
				catchError(this.handleError('getPatients', []))
			);
	}

	getPatient(id: number): Observable<Patient> {
		const url = `${this.apiUrl}/${id}`;
		return this.http.get<any>(url).pipe(
			map(response => response.data),
			tap(patient => console.log(`fetched patient id=${id}`)),
			catchError(this.handleError<Patient>(`getPatient id=${id}`))
		);
	}

	addPatient(patient: Patient): Observable<Patient> {
		return this.http.post<Patient>(this.apiUrl, patient, httpOptions).pipe(
			tap((patient: Patient) => console.log(`added hero w/ id=${patient.id}`)),
			catchError(this.handleError<Patient>('addPatient'))
		);
	}

	updatePatient(patient: Patient): Observable<any> {
		return this.http.put(this.apiUrl, patient, httpOptions).pipe(
			tap(_ => console.log(`updated hero id=${patient.id}`)),
			catchError(this.handleError<any>('updatePatient'))
		);
	}

	deletePatient(patient: Patient | number): Observable<Patient> {
		const id = typeof patient === 'number' ? patient : patient.id;
		const url = `${this.apiUrl}/${id}`;

		return this.http.delete<Patient>(url, httpOptions).pipe(
			tap(_ => console.log(`deleted patient id=${id}`)),
			catchError(this.handleError<Patient>('deletePatient'))
		);
	}

	searchPatients(term: string): Observable<Patient[]> {
		if (!term.trim()) {
			return of([]);
		}
		return this.http.get<any>(`${this.apiUrl}?filter=name:${term},lastname:${term}`).pipe(
			map(response => response.data),
			tap(_ => console.log(`found patients matching "${term}"`)),
			catchError(this.handleError<Patient[]>('searchpatients', []))
		);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}
}
