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

  APPOINTMENTS = [
    {
      date: moment().format('DD/MM/YYYY'),
      hour: moment().format('HH:mm'),
      patient: 'Pepe'
    },
    {
      date: moment().format('DD/MM/YYYY'),
      hour: moment().format('HH:mm'),
      patient: 'Pepe'
    },
    {
      date: moment().format('DD/MM/YYYY'),
      hour: moment().format('HH:mm'),
      patient: 'Pepe'
    },
  ];

  cols = 7;
  currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
  formClass = 'wide';
  rows = 4;
  schedules = [
    {
      id: 1,
      name: "Agenda 1"
    },
    {
      id: 2,
      name: "Agenda 2"
    },
  ];
  today = moment().format('dddd DD/MM/YYYY');
  todayDate = moment().format('DD/MM/YYYY');
  tiles = [
    {
      name: this.today,
      date: this.todayDate,
      appointments: [],
    }
  ];
  userRole: string;
  viewType = 'daily';

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
        this.formClass = 'handset';
      }
    });

    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
    ]).subscribe(result => {
      if (result.matches) {
        this.formClass = 'tablet';
      }
    });

    this.breakpointObserver.observe([
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape,
    ]).subscribe(result => {
      if (result.matches) {
        this.formClass = 'wide';
      }
    });
  }

  changeTypeOfView(event) {
    switch (event.value) {
      case "weekly":
        this.tiles = this.getDays('isoWeek');
        this.cols = 1;
        this.rows = 4;
        this.viewType = event.value;
        break;
      case "monthly":
        this.tiles = this.getDays('month');
        this.cols = 1;
        this.rows = 1;
        this.viewType = event.value;
        break;
      default:
        this.tiles = [{
          name: this.today,
          date: this.todayDate,
          appointments: [],
        }];
        this.cols = 7;
        this.rows = 4;
        this.viewType = event.value;
        break;
    }
  }

  getDays(period) {
    const startOfWeek = moment().startOf(period);
    const endOfWeek = moment().endOf(period);
    const days = [];
    let day = startOfWeek;
    while (day <= endOfWeek) {
      days.push({
          name: day.format('dddd DD/MM/YYYY'),
          date: day.format('DD/MM/YYYY'),
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

}
