import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map, filter } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Appointment } from './../classes/appointment';
import { Schedule } from './../classes/schedule';
import { Patient } from './../classes/patient';
import { User } from './../classes/user';
import { SCHEDULES, PROFESSIONALS } from './../catalogs/schedules';
import * as moment from 'moment';

const APIVERSIONURL = environment.url + '/v1';
const APISCHEDULESURL = APIVERSIONURL + '/schedules';
const APIAPPOINTMENTSURL = APIVERSIONURL + '/appointments';

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
  ) { }

  parseAppointment(data): Appointment {
    let appointment: Appointment;
    let patient: Patient;
    let professional: User;
    let schedule: Observable<Schedule> = this.getSchedule(data.attributes.schedule);

    appointment = {
      confirmed: data.attributes.confirmed,
      date: data.attributes.date,
      hour: data.attributes.hour,
      id: data.id,
      indications: data.attributes.indications,
      patient: patient,
      printed: data.attributes.printed,
      professional: professional,
      reminderData: data.attributes.reminderData,
      reminderSent: data.attributes.reminderSent,
      reminderWay: data.attributes.reminderWay,
      reprogrammed: data.attributes.reprogrammed,
      schedule: schedule,
    };

    return appointment;
  }

  parseAppointments(data) {
    const appointments: Appointment[] = [];
    for (let i = 0; i < data.length; i++) {
      appointments[i] = this.parseAppointment(data[i]);
    }

    return appointments;
  }

  parseSchedule(data): Schedule {
    let schedule: Schedule;
    const days = [];

    schedule = {
      appointmentInterval: data.attributes.appointmentInterval,
      color: data.attributes.color,
      id: data.id,
      name: data.attributes.name,
      periodicity: data.attributes.periodicity,
      professionals: [],
      selectedDays: [],
      validityEnd: data.attributes.validityEnd,
      validityStart: data.attributes.validityStart,
      weekDays: days,
    };

    return schedule;
  }

  parseSchedules(data) {
    const schedules: Schedule[] = [];
    for (let i = 0; i < data.length; i++) {
      schedules[i] = this.parseSchedule(data[i]);
    }

    return schedules;
  }

  getValidSchedules(view, day): Observable<Schedule[]> {
    let start;
    let end;
    switch (view) {
      case 'weekly':
        start = day.clone().startOf('week');
        end = day.clone().endOf('week');
        break;
      case 'monthly':
        start = day.clone().startOf('month');
        end = day.clone().endOf('month');
        break;
      default:
        start = day.clone();
        end = day.clone();
        break;
    }
    start = start.format('YYYY-MM-DD');
    end = end.format('YYYY-MM-DD');
    return this.http.get<any>(`${APISCHEDULESURL}/${start}/${end}`)
      .pipe(
        map(response => this.parseSchedules(response.data)),
        catchError(this.handleError<Schedule[]>('getValidSchedules', []))
      );
  }

  compareHours(a, b) {
    if (a.hour < b.hour) {
      return -1;
    }
    if (a.hour > b.hour) {
      return 1;
    }
    return 0;
  }

  getAppointments(date, validSchedules, selectedSchedules) {
    let formattedDate = date.clone().format('YYYY-MM-DD');
    return this.http.get<any>(`${APIAPPOINTMENTSURL}?date:${formattedDate}`)
      .pipe(
        map(response => this.parseAppointments(response.data)),
        catchError(this.handleError<Appointment[]>('getAppointments', []))
      );
  /*
  const validScheduleEval = validSchedules.indexOf(appointment.schedule) >= 0;
  const selectedScheduleEval = selectedSchedules.length > 0 ? selectedSchedules.indexOf(appointment.schedule) >= 0 : true;

  return appointmentsList.concat(this.getAppointmentsSpots(date, validSchedules, selectedSchedules, appointmentsList)).sort(this.compareHours);
  */
  }

  getAppointmentsSpots(date, validSchedules, selectedSchedules, appointmentsList) {
    const weekDay = date.weekday();
    const spots = [];
    for (const schedule of validSchedules) {
      if (selectedSchedules.length === 0 || selectedSchedules.indexOf(schedule) > -1) {
        let day;
        if (schedule.periodicity === '1') {
          day = schedule.weekDays[weekDay];
        } else {
          for (const daySelected of schedule.selectedDays) {
            if (daySelected.date.format('YYYYMMDD') === date.format('YYYYMMDD')) {
              day = daySelected;
              break;
            }
          }
        }
        if (day && day.active) {
          let spot;
          let spotHour;
          for (const hour of day.hours) {
            spotHour = hour.start.clone();
            while (spotHour < hour.end) {
              spot = {
                date: date,
                hour: spotHour.format('HH:mm'),
                id: 3,
                indications: null,
                patient: null,
                reminderData: null,
                reminderWay: null,
                schedule: schedule,
              }
              let filteredAppointments = appointmentsList.filter(appointment => {
                const a = appointment.date.format('YYYYMMDD') === spot.date.format('YYYYMMDD');
                const b = appointment.hour === spot.hour;
                const c = appointment.schedule === spot.schedule;
                return (a && b && c);
              });
              if (filteredAppointments.length === 0) {
                spots.push(spot);
              }
              spotHour = spotHour.add(schedule.appointmentInterval, 'm');
            }
          }
        }
      }
    }
    return spots;
  }

  getProfessionals() {
    return PROFESSIONALS;
  }

  getSchedule(id): Observable<Schedule> {
    const url = `${APISCHEDULESURL}/${id}`;

    return this.http.get<any>(url)
      .pipe(
        map(response => this.parseSchedule(response.data)),
        catchError(this.handleError<Schedule>(`getSchedule id=${id}`))
      );
  }

  updateSchedule(schedule): Observable<any> {
    return of(true);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
