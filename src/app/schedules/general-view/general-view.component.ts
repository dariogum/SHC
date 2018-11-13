import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { ConfigService } from './../../auth/config.service';
import * as moment from 'moment';

@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.css']
})
export class GeneralViewComponent implements OnInit {

  SCHEDULES = [
    {
      id: 1,
      name: 'Agenda 1',
      professional: 1,
      weekDays: [0, 1, 2, 3, 4, 5, 6],
      periodicity: ['weekly'], //['monthly']
      validity: {
        start: moment('20180101'),
        end: moment('20181231'),
      },
      interval: 20,
      color: '#bbdefb',
    },
    {
      id: 2,
      name: 'Agenda 2',
      professional: 2,
      weekDays: [0, 1, 2, 3, 4, 5, 6],
      periodicity: ['weekly'], //['monthly']
      validity: {
        start: moment('20180101'),
        end: moment('20181231'),
      },
      interval: 30,
      color: '#dcedc8',
    },
  ];

  APPOINTMENTS = [
    {
      schedule: this.SCHEDULES[1],
      id: 1,
      date: moment(),
      hour: moment().format('HH:mm'),
      patient: 'Lola'
    },
    {
      schedule: this.SCHEDULES[0],
      id: 2,
      date: moment(),
      hour: moment().format('HH:mm'),
      patient: 'Tini'
    },
    {
      schedule: this.SCHEDULES[1],
      id: 3,
      date: moment(),
      hour: moment().format('HH:mm'),
      patient: 'Pepe'
    },
    {
      schedule: this.SCHEDULES[1],
      id: 1,
      date: moment('20181110'),
      hour: moment().format('HH:mm'),
      patient: 'Lola'
    },
    {
      schedule: this.SCHEDULES[0],
      id: 2,
      date: moment('20181110'),
      hour: moment().format('HH:mm'),
      patient: 'Tini'
    },
    {
      schedule: this.SCHEDULES[1],
      id: 3,
      date: moment('20181120'),
      hour: moment().format('HH:mm'),
      patient: 'Pepe'
    },
  ];

  currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
  screenType = 'wide';
  todayName = moment().format('dddd DD/MM/YYYY');
  today = moment();
  userRole: string;
  validSchedules = [];
  viewType = 'daily';
  selectedSchedules = [];

  lists = [
    {
      name: this.todayName,
      date: this.today,
      appointments: [],
    }
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    this.userRole = this.configService.getUserConfig(this.currentUser, 'role');

    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.screenType = 'handset';
      }
    });

    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
    ]).subscribe(result => {
      if (result.matches) {
        this.screenType = 'tablet';
      }
    });

    this.breakpointObserver.observe([
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape,
    ]).subscribe(result => {
      if (result.matches) {
        this.screenType = 'wide';
      }
    });

    moment.locale('es');

    this.getValidSchedules();
  }

  changeTypeOfView(event) {
    switch (event.value) {
      case "weekly":
        this.lists = this.getDays('isoWeek');
        this.viewType = event.value;
        break;
      case "monthly":
        this.lists = this.getDays('month');
        this.viewType = event.value;
        break;
      default:
        this.lists = [{
          name: this.todayName,
          date: this.today,
          appointments: [],
        }];
        this.viewType = event.value;
        break;
    }
    this.getValidSchedules();
  }

  getDays(period) {
    const startOfWeek = moment().startOf(period);
    const endOfWeek = moment().endOf(period);
    const days = [];
    let day = startOfWeek;
    while (day <= endOfWeek) {
      days.push({
        name: day.format('dddd DD/MM/YYYY'),
        date: day,
        appointments: [],
      });
      day = day.clone().add(1, 'd');
    }
    return days;
  }

  changeTypeOfAppointments(event) {
    switch (event.value) {
      case "available":

        break;
      case "free":

        break;
      case "programmed":

        break;
      default:

        break;
    }
  }

  getValidSchedules() {
    this.validSchedules = [];
    switch (this.viewType) {
      case "weekly":
        for (let i = this.SCHEDULES.length - 1; i >= 0; i--) {
          if (moment(this.SCHEDULES[i].validity.start) <= moment().startOf('isoWeek') &&
            moment(this.SCHEDULES[i].validity.end) >= moment().endOf('isoWeek')) {
            this.validSchedules.push(this.SCHEDULES[i]);
          }
        }
        break;
      case "monthly":
        for (let i = this.SCHEDULES.length - 1; i >= 0; i--) {
          if (moment(this.SCHEDULES[i].validity.start) <= moment().startOf('month') &&
            moment(this.SCHEDULES[i].validity.end) >= moment().endOf('month')) {
            this.validSchedules.push(this.SCHEDULES[i]);
          }
        }
        break;
      default:
        for (let i = this.SCHEDULES.length - 1; i >= 0; i--) {
          if (moment(this.SCHEDULES[i].validity.start) <= moment(this.today) &&
            moment(this.SCHEDULES[i].validity.end) >= moment(this.today)) {
            this.validSchedules.push(this.SCHEDULES[i]);
          }
        }
        break;
    }
  }

  getAppointments(date) {
    return this.APPOINTMENTS.filter(appointment => {
      let dateEval = appointment.date.format('DD/MM/YYYY') === date.format('DD/MM/YYYY');
      let validScheduleEval = this.validSchedules.indexOf(appointment.schedule) >= 0;
      let selectedScheduleEval = this.selectedSchedules.length > 0 ? this.selectedSchedules.indexOf(appointment.schedule) >= 0 : true;
      return (dateEval && validScheduleEval && selectedScheduleEval);
    });
  }

}
