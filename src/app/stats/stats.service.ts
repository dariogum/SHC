import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class StatsService {
	private apiStatsUrl = environment.url + '/v1/stats';

	constructor(private http: HttpClient) { }

	getStats(startDate, endDate) {
		return forkJoin(
			this.http.get<any>(`${this.apiStatsUrl}/newPatients/${startDate},${endDate}`),
			this.http.get<any>(`${this.apiStatsUrl}/visits/${startDate},${endDate}`),
			this.http.get<any>(`${this.apiStatsUrl}/visitsByMonth/${startDate},${endDate}`),
			this.http.get<any>(`${this.apiStatsUrl}/visitsByPatients/${startDate},${endDate}`),
			this.http.get<any>(`${this.apiStatsUrl}/visitsBySocialSecurity/${startDate},${endDate}`)
		).pipe(
			catchError(this.handleError<any>('getStats'))
		);
	}

	getNewPatients(startDate, endDate): Observable<number> {
		return this.http.get<number>(`${this.apiStatsUrl}/newPatients/${startDate},${endDate}`)
			.pipe(
				catchError(this.handleError<number>('getNewPatients'))
			);
	}

	getVisits(startDate, endDate): Observable<number> {
		return this.http.get<number>(`${this.apiStatsUrl}/visits/${startDate},${endDate}`)
			.pipe(
				catchError(this.handleError<number>('getVisits'))
			);
	}

	getVisitsByMonth(startDate, endDate): Observable<any> {
		return this.http.get<any>(`${this.apiStatsUrl}/visitsByMonth/${startDate},${endDate}`)
			.pipe(
				catchError(this.handleError<any>('getVisitsByMonth', []))
			);
	}

	getVisitsByPatients(startDate, endDate): Observable<any> {
		return this.http.get<any>(`${this.apiStatsUrl}/visitsByPatients/${startDate},${endDate}`)
			.pipe(
				catchError(this.handleError<any>('getVisitsByPatients', []))
			);
	}

	getVisitsBySocialSecurity(startDate, endDate): Observable<any> {
		return this.http.get<any>(`${this.apiStatsUrl}/visitsBySocialSecurity/${startDate},${endDate}`)
			.pipe(
				catchError(this.handleError<any>('getVisitsBySocialSecurity', []))
			);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}
}
