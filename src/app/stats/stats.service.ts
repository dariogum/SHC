import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
	private apiStatsUrl = environment.url + '/v1/stats';

  constructor(private http: HttpClient) { }

  getTotal(startDate, endDate): Observable<any> {
  	return this.http.get<any>(`${this.apiStatsUrl}/total/${startDate},${endDate}`)
			.pipe(
				catchError(this.handleError<any>('getTotal', []))
			);
	}

	getTotalByMonth(startDate, endDate): Observable<any> {
  	return this.http.get<any>(`${this.apiStatsUrl}/totalByMonth/${startDate},${endDate}`)
			.pipe(
				catchError(this.handleError<any>('getTotalByMonth', []))
			);
	}

	getTotalByPatients(startDate, endDate): Observable<any> {
  	return this.http.get<any>(`${this.apiStatsUrl}/totalByPatients/${startDate},${endDate}`)
			.pipe(
				catchError(this.handleError<any>('getTotalByPatients', []))
			);
	}

	getTotalBySocialSecurity(startDate, endDate): Observable<any> {
  	return this.http.get<any>(`${this.apiStatsUrl}/totalBySocialSecurity/${startDate},${endDate}`)
			.pipe(
				catchError(this.handleError<any>('getTotalBySocialSecurity', []))
			);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}
}
