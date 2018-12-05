import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { User } from './../classes/user';

const APIUSERSURL = environment.url + '/v1/users';
const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http: HttpClient) { }

  parseUser(data): User {
    const user: User = {
      email: data.attributes.email,
      enabled: data.attributes.enabled,
      id: data.id,
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

  verifyByEmail(data): Observable<User> {
    const url = `${ APIUSERSURL }/login`;
    return this.http.post<any>(url, data, HTTPOPTIONS)
      .pipe(
        map(response => this.parseUser(response.data)),
        catchError(this.handleError<User>(`verifyByEmail`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${ operation } failed: ${ error.message }`);
      return of(result as T);
    };
  }
}
