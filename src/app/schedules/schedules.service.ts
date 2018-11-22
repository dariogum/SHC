import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Schedule } from './../classes/schedule';
import * as moment from 'moment';

const PROFESSIONALS = [
    {
      id: 1,
      name: 'Roberto',
      lastname: 'Loprete'
    },
    {
      id: 2,
      name: 'Natalie',
      lastname: 'Costrosa'
    },
  ];

const SCHEDULES = [
    {
      id: 1,
      name: 'Agenda 1',
      professionals: [PROFESSIONALS[0]],
      days: [
        {
          active: true,
          hours: [
            {
              start: moment().set({'hour': 8, 'minute': 30}),
              end: moment().set({'hour': 12, 'minute': 45}),
            },
            {
              start: moment().set({'hour': 16, 'minute': 30}),
              end: moment().set({'hour': 19, 'minute': 30}),
            }
          ]
        },
        {
          active: true,
          hours:[
            {
              start: moment().set({'hour': 8, 'minute': 30}),
              end: moment().set({'hour': 12, 'minute': 45}),
            },
            {
              start: moment().set({'hour': 16, 'minute': 30}),
              end: moment().set({'hour': 19, 'minute': 30}),
            }
          ]
        },
        {
          active: true,
          hours: [
            {
              start: moment().set({'hour': 8, 'minute': 30}),
              end: moment().set({'hour': 12, 'minute': 45}),
            },
            {
              start: moment().set({'hour': 16, 'minute': 30}),
              end: moment().set({'hour': 19, 'minute': 30}),
            }
          ]
        },
        {
          active: true,
          hours: [
            {
              start: moment().set({'hour': 8, 'minute': 30}),
              end: moment().set({'hour': 12, 'minute': 45}),
            },
            {
              start: moment().set({'hour': 16, 'minute': 30}),
              end: moment().set({'hour': 19, 'minute': 30}),
            }
          ]
        },
        {
          active: true,
          hours: [
            {
              start: moment().set({'hour': 8, 'minute': 30}),
              end: moment().set({'hour': 12, 'minute': 45}),
            },
            {
              start: moment().set({'hour': 16, 'minute': 30}),
              end: moment().set({'hour': 19, 'minute': 30}),
            }
          ]
        },
        {
          active: true,
          hours: [
            {
              start: moment().set({'hour': 8, 'minute': 30}),
              end: moment().set({'hour': 12, 'minute': 45}),
            },
            {
              start: moment().set({'hour': 16, 'minute': 30}),
              end: moment().set({'hour': 19, 'minute': 30}),
            }
          ]
        },
        {
          active: true,
          hours: [
            {
              start: moment().set({'hour': 8, 'minute': 30}),
              end: moment().set({'hour': 12, 'minute': 45}),
            },
            {
              start: moment().set({'hour': 16, 'minute': 30}),
              end: moment().set({'hour': 19, 'minute': 30}),
            }
          ]
        },
      ],
      periodicity: '1',
      validityStart: new Date(2018,0,1),
      validityEnd: new Date(2018,11,31),
      appointmentInterval: 20,
      color: '#bbdefb',
      selectedDays: [],
    },
    {
      id: 2,
      name: 'Agenda 2',
      professionals: [PROFESSIONALS[0], PROFESSIONALS[1]],
      days: [
        {
          active: true,
          hours: [
            {
              start: moment().set({'hour': 8, 'minute': 30}),
              end: moment().set({'hour': 12, 'minute': 45}),
            },
            {
              start: moment().set({'hour': 16, 'minute': 30}),
              end: moment().set({'hour': 19, 'minute': 30}),
            }
          ]
        },
        {
          active: true,
          hours:[
            {
              start: moment().set({'hour': 8, 'minute': 30}),
              end: moment().set({'hour': 12, 'minute': 45}),
            },
            {
              start: moment().set({'hour': 16, 'minute': 30}),
              end: moment().set({'hour': 19, 'minute': 30}),
            }
          ]
        },
        {
          active: true,
          hours: [
            {
              start: moment().set({'hour': 8, 'minute': 30}),
              end: moment().set({'hour': 12, 'minute': 45}),
            },
            {
              start: moment().set({'hour': 16, 'minute': 30}),
              end: moment().set({'hour': 19, 'minute': 30}),
            }
          ]
        },
        {
          active: true,
          hours: [
            {
              start: moment().set({'hour': 8, 'minute': 30}),
              end: moment().set({'hour': 12, 'minute': 45}),
            },
            {
              start: moment().set({'hour': 16, 'minute': 30}),
              end: moment().set({'hour': 19, 'minute': 30}),
            }
          ]
        },
        {
          active: true,
          hours: [
            {
              start: moment().set({'hour': 8, 'minute': 30}),
              end: moment().set({'hour': 12, 'minute': 45}),
            },
            {
              start: moment().set({'hour': 16, 'minute': 30}),
              end: moment().set({'hour': 19, 'minute': 30}),
            }
          ]
        },
        {
          active: true,
          hours: [
            {
              start: moment().set({'hour': 8, 'minute': 30}),
              end: moment().set({'hour': 12, 'minute': 45}),
            },
            {
              start: moment().set({'hour': 16, 'minute': 30}),
              end: moment().set({'hour': 19, 'minute': 30}),
            }
          ]
        },
        {
          active: true,
          hours: [
            {
              start: moment().set({'hour': 8, 'minute': 30}),
              end: moment().set({'hour': 12, 'minute': 45}),
            },
            {
              start: moment().set({'hour': 16, 'minute': 30}),
              end: moment().set({'hour': 19, 'minute': 30}),
            }
          ]
        },
      ],
      periodicity: '2',
      validityStart: new Date(2018,0,1),
      validityEnd: new Date(2018,11,31),
      appointmentInterval: 30,
      color: '#dcedc8',
      selectedDays: [],
    },
  ];

const APPOINTMENTS = [
    {
      schedule: SCHEDULES[1],
      id: 1,
      date: moment(),
      hour: moment().format('HH:mm'),
      patient: 'Lola',
      reminderWay: null,
      reminderData: null,
      indications: 'Indicaciones de prueba',
    },
    {
      schedule: SCHEDULES[0],
      id: 2,
      date: moment(),
      hour: moment().format('HH:mm'),
      patient: 'Tini',
      reminderWay: null,
      reminderData: null,
      indications: 'Indicaciones de prueba',
    },
    {
      schedule: SCHEDULES[1],
      id: 3,
      date: moment(),
      hour: moment().format('HH:mm'),
      patient: 'Pepe',
      reminderWay: null,
      reminderData: null,
      indications: 'Indicaciones de prueba',
    },
    {
      schedule: SCHEDULES[1],
      id: 1,
      date: moment('20181110'),
      hour: moment().format('HH:mm'),
      patient: 'Lola',
      reminderWay: null,
      reminderData: null,
      indications: 'Indicaciones de prueba',
    },
    {
      schedule: SCHEDULES[0],
      id: 2,
      date: moment('20181110'),
      hour: moment().format('HH:mm'),
      patient: 'Tini',
      reminderWay: null,
      reminderData: null,
      indications: 'Indicaciones de prueba',
    },
    {
      schedule: SCHEDULES[1],
      id: 3,
      date: moment('20181120'),
      hour: moment().format('HH:mm'),
      patient: 'Sonia',
      reminderWay: null,
      reminderData: null,
      indications: 'Indicaciones de prueba',
    },
  ];

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
    if (a.hour < b.hour)
      return -1;
    if (a.hour > b.hour)
      return 1;
    return 0;
  }

  getAppointments(date, validSchedules, selectedSchedules) {
    let appointmentsList = APPOINTMENTS.filter(appointment => {
      const dateEval = appointment.date.format('DD/MM/YYYY') === date.format('DD/MM/YYYY');
      const validScheduleEval = validSchedules.indexOf(appointment.schedule) >= 0;
      const selectedScheduleEval = selectedSchedules.length > 0 ? selectedSchedules.indexOf(appointment.schedule) >= 0 : true;
      return (dateEval && validScheduleEval && selectedScheduleEval);
    });
    let appointmentsSpots = this.getAppointmentsSpots(date, validSchedules, selectedSchedules);
    return appointmentsList.concat(appointmentsSpots).sort(this.compareHours);
  }

  getAppointmentsSpots(date, validSchedules, selectedSchedules) {
    let weekDay = date.weekday();
    let spots = [];
    for (let schedule of validSchedules) {
      if (schedule.periodicity === '1') {
        if (schedule.days[weekDay].active) {
          let spotHour;
          let endHour;
          for (let hour of schedule.days[weekDay].hours) {
            spotHour = hour.start;
            while (spotHour < hour.end) {
              spots.push({
                schedule: schedule,
                id: 3,
                date: date,
                hour: spotHour.format('HH:mm'),
                patient: null,
                reminderWay: null,
                reminderData: null,
                indications: null,
              });
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
    return of(SCHEDULES.filter(schedule => schedule.id === id)[0]);
  }

  updateSchedule(schedule): Observable<any> {
    return of(true);
  }
}
