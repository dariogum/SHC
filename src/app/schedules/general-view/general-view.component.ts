import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatBottomSheet } from '@angular/material';

import { ConfigService } from './../../auth/config.service';
import { FormComponent } from './../form/form.component';
import { SchedulesService } from './../schedules.service';
import * as moment from 'moment';

@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.css']
})
export class GeneralViewComponent implements OnInit {

  currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
  lists = [];
  screenType = 'wide';
  selectedSchedules = [];
  today;
  todayName;
  userRole: string;
  validSchedules = [];
  viewType = 'daily';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private bottomSheet: MatBottomSheet,
    private configService: ConfigService,
    private schedulesService: SchedulesService,
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

    this.validSchedules = this.schedulesService.getValidSchedules(this.viewType);

    moment.locale('es');
    this.today = moment();
    this.todayName = this.today.format('dddd DD/MM/YYYY');
    this.lists = [
      {
        appointments: this.getAppointments(this.today),
        date: this.today,
        name: this.todayName,
      }
    ];
  }

  openBottomSheet(appointment): void {
    this.bottomSheet.open(FormComponent, {
      data: { appointment: appointment },
    });
  }

  changeTypeOfView(event) {
    this.viewType = event.value;
    this.validSchedules = this.schedulesService.getValidSchedules(this.viewType);
    switch (event.value) {
      case 'weekly':
        this.lists = this.getDays('week');
        break;
      case 'monthly':
        this.lists = this.getDays('month');
        break;
      default:
        this.lists = [{
          appointments: this.getAppointments(this.today),
          date: this.today,
          name: this.todayName,
        }];
        break;
    }
  }

  getDays(period) {
    const start = moment().startOf(period);
    const end = moment().endOf(period);
    let days = [];
    let day = start;
    while (day <= end) {
      days.push({
        appointments: this.getAppointments(day),
        date: day,
        name: day.format('ddd DD/MM/YYYY'),
      });
      day = day.clone().add(1, 'd');
    }
    return days;
  }

  getAppointments(date) {
    return this.schedulesService.getAppointments(date, this.validSchedules, this.selectedSchedules);
  }

}
