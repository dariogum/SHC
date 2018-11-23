import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Schedule } from './../classes/schedule';
import { APPOINTMENTS } from './../catalogs/appointments';
import { SCHEDULES, PROFESSIONALS } from './../catalogs/schedules';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  constructor() { }

  getValidSchedules(viewType) {
    switch (viewType) {
      case 'weekly':
        return SCHEDULES.filter(schedule =>
          moment(schedule.validityStart) <= moment().startOf('isoWeek') &&
          moment(schedule.validityEnd) >= moment().endOf('isoWeek'));
        break;
      case 'monthly':
        return SCHEDULES.filter(schedule =>
          moment(schedule.validityStart) <= moment().startOf('month') &&
          moment(schedule.validityEnd) >= moment().endOf('month'));
        break;
      default:
        return SCHEDULES.filter(schedule =>
          moment(schedule.validityStart) <= moment(moment()) &&
          moment(schedule.validityEnd) >= moment(moment()));
        break;
    }
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
    const appointmentsList = APPOINTMENTS.filter(appointment => {
      const dateEval = appointment.date.format('YYYYMMDD') === date.format('YYYYMMDD');
      const validScheduleEval = validSchedules.indexOf(appointment.schedule) >= 0;
      const selectedScheduleEval = selectedSchedules.length > 0 ? selectedSchedules.indexOf(appointment.schedule) >= 0 : true;
      return (dateEval && validScheduleEval && selectedScheduleEval);
    });
    return appointmentsList.concat(this.getAppointmentsSpots(date, validSchedules, appointmentsList)).sort(this.compareHours);
  }

  getAppointmentsSpots(date, validSchedules, appointmentsList) {
    const weekDay = date.weekday();
    const spots = [];
    for (const schedule of validSchedules) {
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
    return spots;
  }

  getProfessionals() {
    return PROFESSIONALS;
  }

  getSchedule(id): Observable<Schedule> {
    return of(SCHEDULES.filter(schedule => schedule.id === id)[0]);
  }

  updateSchedule(schedule): Observable<any> {
    return of(true);
  }
}
