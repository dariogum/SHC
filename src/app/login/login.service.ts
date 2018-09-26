import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from './../classes/user';
import { environment } from './../../environments/environment';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	private apiUsersUrl = environment.url + '/v1/users';

	constructor(private http: HttpClient) { }

	parseUser(data): User {
		var user: User;

		user = {
			id: data.id,
			email: data.attributes.email,
			password: data.attributes.password,
			lastname: data.attributes.lastname,
			name: data.attributes.name,
			enabled: data.attributes.enabled,
		}

		return user;
	}

	parseUsers(data) {
		var users: User[] = [];
		for (var i = 0; i < data.length; i++) {
			users[i] = this.parseUser(data[i]);
		}
		return users;
	}

	verifyByEmail(data): Observable<User> {
		const url = `${this.apiUsersUrl}/login`;
		return this.http.post<any>(url, data, httpOptions)
			.pipe(
				map(response => this.parseUser(response.data)),
				catchError(this.handleError<User>(`verifyByEmail`))
			);
	}

	getUsers(): Observable<User[]> {
		return this.http.get<any>(this.apiUsersUrl)
			.pipe(
				map(response => this.parseUsers(response.data)),
				catchError(this.handleError<User[]>('getUsers', []))
			);
	}

	getUser(id: number): Observable<User> {
		const url = `${this.apiUsersUrl}/${id}`;
		return this.http.get<any>(url)
			.pipe(
				map(response => this.parseUser(response.data)),
				catchError(this.handleError<User>(`getUser id=${id}`))
			);
	}

	searchUsers(term: string): Observable<User[]> {
		if (!term.trim()) {
			return of([]);
		}
		return this.http.get<any>(`${this.apiUsersUrl}?filter=name:${term},lastname:${term}`)
			.pipe(
				map(response => this.parseUsers(response.data)),
				catchError(this.handleError<User[]>('searchusers', []))
			);
	}

	addUser(user: User): Observable<User> {
	  let data = {
	  	"data": {
	  		"type": "user",
		    "attributes": {
		      "email": user.email,
		      "password": user.password,
		      "lastname": user.lastname,
		      "name": user.name
		    }
	  	}
	  };
		return this.http.post<any>(this.apiUsersUrl, data, httpOptions)
			.pipe(
				map(response => this.parseUser(response.data)),
				catchError(this.handleError<User>('addUser'))
			);
	}

	updateUser(user: User): Observable<any> {
		const id = typeof user === 'number' ? user : user.id;
		const url = `${this.apiUsersUrl}/${id}`;

		let data = {
	  	"data": {
	  		"type": "user",
		    "id": user.id,
		    "attributes": {
					email: user.email,
					password: user.password,
					lastname: user.lastname,
					name: user.name,
					enabled: user.enabled,
		    }
	  	}
	  };

		return this.http.patch<any>(url, data, httpOptions)
			.pipe(
				map(response => response.data),
				catchError(this.handleError<any>('updateUser'))
			);
	}

	deleteUser(user: User | number): Observable<any> {
		const id = typeof user === 'number' ? user : user.id;
		const url = `${this.apiUsersUrl}/${id}`;

		return this.http.delete<any>(url, httpOptions)
			.pipe(
				map(response => response.data),
				catchError(this.handleError<any>('deleteUser'))
			);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}
}
