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
  todayName;
  today;
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

    moment.locale('es');
    this.todayName = moment().format('dddd DD/MM/YYYY');
    this.today = moment();
    this.lists = [
      {
        name: this.todayName,
        date: this.today,
        appointments: [],
      }
    ];

    this.validSchedules = this.schedulesService.getValidSchedules(this.viewType);
  }

  openBottomSheet(appointment): void {
    this.bottomSheet.open(FormComponent, {
      data: { appointment: appointment },
    });
  }

  changeTypeOfView(event) {
    switch (event.value) {
      case 'weekly':
        this.lists = this.getDays('isoWeek');
        this.viewType = event.value;
        break;
      case 'monthly':
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
    this.validSchedules = this.schedulesService.getValidSchedules(this.viewType);
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
      case 'available':

        break;
      case 'free':

        break;
      case 'programmed':

        break;
      default:

        break;
    }
  }

  getAppointments(date) {
    return this.schedulesService.getAppointments(date, this.validSchedules, this.selectedSchedules);
  }

}
