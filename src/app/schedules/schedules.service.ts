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

  parseAppointment(data): Appointment {
    let patient = this.patientService.parsePatient(data.relationships.patient);
    let professional = this.userService.parseUser(data.relationships.professional);
    let schedule = this.parseSchedule(data.relationships.schedule);

    let appointment: Appointment = {
      confirmed: data.attributes.confirmed,
      date: data.attributes.date,
      hour: data.attributes.hour.substring(0, data.attributes.hour.length - 3),
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
    let days = this.parseScheduleDays(data.relationships.days);
    let professionals = this.userService.parseUsers(data.relationships.professionals);

    schedule = {
      appointmentInterval: data.attributes.appointmentInterval,
      color: data.attributes.color,
      id: data.id,
      days: days,
      name: data.attributes.name,
      periodicity: data.attributes.periodicity,
      professionals: professionals,
      validityEnd: data.attributes.validityEnd,
      validityStart: data.attributes.validityStart,
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

  parseScheduleDays(periodicity, daysData) {
    let daysNames = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
    let days = [];
    for(let day of daysData) {
      if(periodicity === 2) {
        day.name = moment(day.date).format('ddd DD/MM/YYYY');
      } else {
        day.name = daysNames[day.weekDay];
      }
    }
    return days;
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

  parseDays(days) {
    for (let day of days) {
      day.name = moment(day.date).format('ddd DD/MM/YYYY');
      day.relationships.appointments.sort(this.compareHours);
    }
    return days;
  }

  getDays(firstDay, lastDay) {
    firstDay = firstDay.format('YYYY-MM-DD');
    lastDay = lastDay.format('YYYY-MM-DD');
    return this.http.get<any>(`${APISCHEDULESURL}/${firstDay}/${lastDay}`)
      .pipe(
        map(days => this.parseDays(days.data)),
        catchError(this.handleError<Schedule[]>('getValidSchedules', []))
      );
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

  getAppointments(date, validSchedules, selectedSchedules) {
    let formattedDate = date.clone().format('YYYY-MM-DD');
    let schedules = '';
    if (selectedSchedules.length) {
      for (let schedule of selectedSchedules) {
        schedules += schedule.id + ',';
      }
    } else {
      for (let schedule of validSchedules) {
        schedules += schedule.id + ',';
      }
    }
    schedules = schedules.substring(0, schedules.length - 1);
    return this.http.get<any>(`${APIAPPOINTMENTSURL}/${formattedDate}/${schedules}`)
      .pipe(
        map(response => {
          let appointmentList = this.parseAppointments(response.data);
          return appointmentList.concat(
            this.getAppointmentsSpots(date, validSchedules, selectedSchedules, appointmentList))
            .sort(this.compareHours);
        }),
        catchError(this.handleError<Appointment[]>('getAppointments', []))
      );
    /*
    return appointmentsList.concat(this.getAppointmentsSpots(date, validSchedules, selectedSchedules, appointmentsList)).sort(this.compareHours);
    */
  }

  getAppointmentsSpots(date, validSchedules, selectedSchedules, appointmentList) {
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
              let filteredAppointments = appointmentList.filter(appointment => {
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
    return [];
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

  deleteSchedule(scheduleId: number): Observable<any> {
    const url = `${APISCHEDULESURL}/${scheduleId}`;

    return this.http.delete<any>(url, HTTPOPTIONS)
      .pipe(
        catchError(this.handleError<any>('deleteSchedule'))
      );
  }
}
