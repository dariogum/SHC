import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatBottomSheet } from '@angular/material';
import { MatDatepicker } from '@angular/material/datepicker';

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
  day;
  days = [];
  loading = false;
  monthName;
  screenType = 'wide';
  schedules = [];
  selectedSchedules = [];
  startView = 'month';
  userRole: string;
  view = 'daily';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private bottomSheet: MatBottomSheet,
    private configService: ConfigService,
    private schedulesService: SchedulesService,
  ) { }

  ngOnInit() {
    moment.locale('es');
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

    this.day = moment();
    this.changeView(false, false);
  }

  openBottomSheet(appointment): void {
    this.bottomSheet.open(FormComponent, {
      data: { appointment: appointment },
    });
  }

  changeView(event, dayPicker) {
    let firstDay;
    let lastDay;
    switch (this.view) {
      case "weekly":
        this.startView = 'month';
        firstDay = this.day.clone().startOf('week');
        lastDay = this.day.clone().endOf('week');
        break;
      case "monthly":
        if (dayPicker) dayPicker.close();
        if (event) this.day = event;
        this.startView = 'year';
        firstDay = this.day.clone().startOf('month');
        lastDay = this.day.clone().endOf('month');
        this.monthName = this.day.format('MMMM')
        break;
      default:
        this.startView = 'month';
        firstDay = this.day.clone();
        lastDay = this.day.clone();
        break;
    }
    this.setDays(firstDay, lastDay);
  }

  setDays(firstDay, lastDay) {
    this.days = [];
    this.schedules = this.schedulesService.getValidSchedules(this.view, this.day);
    while (firstDay <= lastDay) {
      let day = {
        appointments: this.getAppointments(firstDay),
        date: firstDay,
        name: firstDay.format('ddd DD/MM/YYYY'),
      };
      this.days.push(day);
      firstDay = firstDay.add(1, 'd');
    }
  }

  getAppointments(date) {
    return this.schedulesService.getAppointments(date, this.schedules, this.selectedSchedules);
  }

}
