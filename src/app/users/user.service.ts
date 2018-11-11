import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { User } from './../classes/user';
import { environment } from './../../environments/environment';
import * as moment from 'moment';

const APIUSERSURL = environment.url + '/v1/users';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  parseUser(data): User {
    let user: User;

    user = {
      id: data.id,
      email: data.attributes.email,
      enabled: data.attributes.enabled,
      lastname: data.attributes.lastname,
      name: data.attributes.name,
      password: data.attributes.password,
    };

    return user;
  }

  parseUsers(data) {
    const users: User[] = [];
    for (let i = 0; i < data.length; i++) {
      users[i] = this.parseUser(data[i]);
    }
    return users;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<any>(`${APIUSERSURL}`)
      .pipe(
        map(response => this.parseUsers(response.data)),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  getUser(id: number): Observable<User> {
    const url = `${APIUSERSURL}/${id}`;

    return this.http.get<any>(url)
      .pipe(
        map(response => this.parseUser(response.data)),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  searchUsers(terms: string): Observable<User[]> {
    if (!terms.trim()) {
      return of([]);
    }
    terms = terms.toLowerCase();
    terms = encodeURI(terms);

    return this.http.get<any>(`${APIUSERSURL}/search/${terms}`)
      .pipe(
        map(response => this.parseUsers(response.data)),
        catchError(this.handleError<User[]>('searchusers', []))
      );
  }

  addUser(user: User): Observable<User> {
    const data = {
      'data': {
        'attributes': {
          email: user.email,
          enabled: user.enabled,
          lastname: user.lastname,
          name: user.name,
          password: user.password,
        },
        'type': 'user',
      }
    };

    return this.http.post<any>(APIUSERSURL, data, httpOptions)
      .pipe(
        map(response => this.parseUser(response.data)),
        catchError(this.handleError<User>('addUser'))
      );
  }

  updateUser(user: User): Observable<any> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${APIUSERSURL}/${id}`;

    const data = {
      'data': {
        'attributes': {
          email: user.email,
          enabled: user.enabled,
          lastname: user.lastname,
          name: user.name,
        },
        'id': user.id,
        'type': 'user',
      }
    };

    return this.http.patch<any>(url, data, httpOptions)
      .pipe(
        map(response => response.data),
        catchError(this.handleError<any>('updateUser'))
      );
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${APIUSERSURL}/${userId}`;

    return this.http.delete<any>(url, httpOptions)
      .pipe(
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
