import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, tap, map, filter } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Appointment } from './../classes/appointment';
import { Patient } from './../classes/patient';
import { PatientService } from './../patients/patient.service';
import { Schedule } from './../classes/schedule';
import { User } from './../classes/user';
import { UserService } from './../users/user.service';
import * as moment from 'moment';

const APIVERSIONURL = environment.url + '/v1';
const APIAPPOINTMENTSURL = APIVERSIONURL + '/appointments';
const APISCHEDULESURL = APIVERSIONURL + '/schedules';

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  constructor(
    private http: HttpClient,
    private patientService: PatientService,
    private userService: UserService,
  ) { }

  compareHours(a, b) {
    if (a.hour < b.hour) {
      return -1;
    }
    if (a.hour > b.hour) {
      return 1;
    }
    return 0;
  }

  createSchedule(schedule: Schedule): Observable<Schedule> {
    const data = {
      'data': {
        'type': 'schedule',
        'attributes': {
          'name': schedule.name,
          'periodicity': schedule.periodicity,
          'validityStart': schedule.validityStart,
        }
      }
    };

    return this.http.post<any>(APISCHEDULESURL, data, HTTPOPTIONS)
      .pipe(
        map(response => this.parseSchedule(response.data)),
        catchError(this.handleError<Schedule>('addSchedule'))
      );
  }

  readSchedule(id): Observable<Schedule> {
    return this.http.get<any>(`${ APISCHEDULESURL }/${ id }`)
      .pipe(
        map(response => this.parseSchedule(response.data)),
        catchError(this.handleError<Schedule>(`getSchedule id=${ id }`))
      );
  }

  readSchedules(): Observable<Schedule[]> {
    return this.http.get<any>(`${ APISCHEDULESURL }?sort=name`)
      .pipe(
        map(response => this.parseSchedules(response.data)),
        catchError(this.handleError<Schedule[]>('getSchedules', []))
      );
  }

  updateSchedule(schedule: Schedule): Observable<Schedule> {
    const data = {
      'data': {
        'type': 'schedule',
        'id': schedule.id,
        'attributes': {
          'appointmentInterval': schedule.appointmentInterval,
          'color': schedule.color,
          'days': schedule.days,
          'name': schedule.name,
          'periodicity': schedule.periodicity,
          'professionals': schedule.professionals,
          'validityStart': schedule.validityStart,
          'validityEnd': schedule.validityEnd,
        }
      }
    };

    return this.http.patch<any>(`${ APISCHEDULESURL }/${ schedule.id }`, data, HTTPOPTIONS)
      .pipe(
        map(response => response.data),
        catchError(this.handleError<any>('updatePatient'))
      );
  }

  deleteSchedule(scheduleId) {
    return this.http.delete<any>(`${ APISCHEDULESURL }/${ scheduleId }`, HTTPOPTIONS)
      .pipe(catchError(this.handleError<any>('deleteSchedule')));
  }

  parseSchedules(data): Schedule[] {
    const schedules: Schedule[] = [];
    for (const schedule of data) {
      schedules.push(this.parseSchedule(schedule));
    }
    return schedules;
  }

  parseSchedule(data): Schedule {
    let days = [];
    let professionals = [];
    if (data.relationships && data.relationships.professionals.length) {
      professionals = this.userService.parseUsers(data.relationships.professionals);
    }
    if (data.relationships && data.relationships.days.length) {
      days = this.parseDays(data.relationships.days);
    }
    const schedule: Schedule = {
      appointmentInterval: data.attributes.appointmentInterval,
      color: data.attributes.color,
      days: days,
      id: data.id,
      name: data.attributes.name,
      periodicity: data.attributes.periodicity,
      professionals: professionals,
      validityEnd: data.attributes.validityEnd,
      validityStart: data.attributes.validityStart,
    };
    return schedule;
  }

  readScheduleDays(scheduleId, firstDay, lastDay): Observable<any[]> {
    firstDay = firstDay.format('YYYY-MM-DD');
    lastDay = lastDay.format('YYYY-MM-DD');
    return this.http.get<any>(`${ APISCHEDULESURL }/${ scheduleId }/${ firstDay }/${ lastDay }`)
      .pipe(
        map(response => this.parseDays(response.data)),
        catchError(this.handleError<Schedule[]>('getSchedulesDays', []))
      );
  }

  parseDays(data) {
    const days = [];
    for (const day of data) {
      days.push(this.parseDay(day));
    }
    return days;
  }

  parseDay(data) {
    const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    let dayName;
    let date = null;
    if (data.attributes.date) {
      date = moment(data.attributes.date);
      dayName = moment(data.attributes.date).format('ddd DD/MM/YYYY');
    } else {
      dayName = dayNames[data.attributes.weekDay];
    }
    return {
      active: data.attributes.active,
      appointments: this.parseAppointments(data.relationships.appointments),
      date: date,
      id: data.id,
      name: dayName,
      weekDay: data.attributes.weekDay,
    };
  }

  parseHours(data) {
    const hours = [];
    for (const hour of data) {
      hours.push(this.parseHour(hour));
    }
    return hours;
  }

  parseHour(data) {
    const hour = {
      end: data.attributes.end,
      id: data.id,
      start: data.attributes.start,
    };
    return hour;
  }

  createAppointment(appointment): Observable<Appointment> {
    const data = {
      'data': {
        'type': 'appointment',
        'attributes': {
          'confirmed': appointment.confirmed,
          'date': appointment.date.format('YYYY-MM-DD'),
          'indications': appointment.indications,
          'hour': appointment.hour,
          'patient': appointment.patient.id,
          'printed': appointment.printed,
          'professional': appointment.professional.id,
          'reminderData': appointment.reminderData,
          'reminderSent': appointment.reminderSent,
          'reminderWay': appointment.reminderWay,
          'reprogrammed': appointment.reprogrammed,
          'schedule': appointment.schedule.id,
        }
      }
    };

    return this.http.post<any>(APISCHEDULESURL, data, HTTPOPTIONS)
      .pipe(
        map(response => this.parseAppointment(response.data)),
        catchError(this.handleError<Appointment>('addSchedule'))
      );
  }

  readAppointment(id): Observable<Appointment> {
    return this.http.get<any>(`${ APIAPPOINTMENTSURL }/${ id }`)
      .pipe(
        map(response => this.parseAppointment(response.data)),
        catchError(this.handleError<Appointment>(`getAppointment id=${ id }`))
      );
  }

  readAppointments(): Observable<Appointment[]> {
    return this.http.get<any>(`${ APIAPPOINTMENTSURL }`)
      .pipe(
        map(response => this.parseAppointments(response.data)),
        catchError(this.handleError<Appointment[]>('getAppointments', []))
      );
  }

  updateAppointment(appointment: Appointment): Observable<Appointment> {
    const data = {
      'data': {
        'type': 'appointment',
        'id': appointment.id,
        'attributes': {
          'confirmed': appointment.confirmed,
          'date': appointment.date.format('YYYY-MM-DD'),
          'indications': appointment.indications,
          'hour': appointment.hour,
          'patient': appointment.patient.id,
          'printed': appointment.printed,
          'professional': appointment.professional.id,
          'reminderData': appointment.reminderData,
          'reminderSent': appointment.reminderSent,
          'reminderWay': appointment.reminderWay,
          'reprogrammed': appointment.reprogrammed,
          'schedule': appointment.schedule.id,
        }
      }
    };

    return this.http.patch<any>(`${ APIAPPOINTMENTSURL }/${ appointment.id }`, data, HTTPOPTIONS)
      .pipe(
        map(response => response.data),
        catchError(this.handleError<any>('updatePatient'))
      );
  }

  deleteAppointments(appointmentId) {
    return this.http.delete<any>(`${ APIAPPOINTMENTSURL }/${ appointmentId }`, HTTPOPTIONS)
      .pipe(catchError(this.handleError<any>('deleteAppointment')));
  }

  sendAppointmentReminder() {
    return true;
  }

  parseAppointments(data): Appointment[] {
    const appointments: Appointment[] = [];
    for (const appointment of data) {
      appointments.push(this.parseAppointment(appointment));
    }
    return appointments;
  }

  parseAppointment(data): Appointment {
    let patient = null;
    let professional = null;
    if (data.attributes.patient) {
      patient = this.patientService.parsePatient(data.relationships.patient.data);
    }
    if (data.attributes.professional) {
      professional = this.userService.parseUser(data.relationships.professional.data);
    }
    const appointment: Appointment = {
      confirmed: data.attributes.confirmed,
      date: data.attributes.date,
      id: data.id,
      indications: data.attributes.indications,
      hour: data.attributes.hour,
      patient: patient,
      printed: data.attributes.printed,
      professional: professional,
      reminderData: data.attributes.reminderData,
      reminderSent: data.attributes.reminderSent,
      reminderWay: data.attributes.reminderWay,
      reprogrammed: data.attributes.reprogrammed,
      schedule: data.attributes.schedule,
    };
    return appointment;
  }

  readPofessionals(): Observable<User[]> {
    return this.userService.getUsers();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${ operation } failed: ${ error.message }`);
      return of(result as T);
    };
  }
}
