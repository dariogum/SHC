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

  calendarView = 'month';
  currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
  lists = [];
  loading = false;
  screenType = 'wide';
  selectedSchedules = [];
  selectedDay;
  selectedDayName;
  selectedMonth;
  selectedMonthName;
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

    this.validSchedules = this.schedulesService.getValidSchedules(this.viewType);
    this.changeTypeOfView({ value: this.viewType });
  }

  openBottomSheet(appointment): void {
    this.bottomSheet.open(FormComponent, {
      data: { appointment: appointment },
    });
  }

  chosenMonthHandler(normlizedMonth: any, datepicker: MatDatepicker<any>) {
    datepicker.close();
    this.selectedMonth = normlizedMonth.month();
    this.changeTypeOfView({ value: this.viewType });
  }

  changeTypeOfView(event) {
    this.loading = true;
    this.viewType = event.value;
    this.validSchedules = this.schedulesService.getValidSchedules(this.viewType);
    switch (event.value) {
      case 'weekly':
        this.lists = this.getDays('week');
        break;
      case 'monthly':
        if (this.selectedMonth === undefined) {
          this.selectedMonth = moment().month();
        }
        this.selectedMonthName = moment().month(this.selectedMonth).format('MMMM');
        this.calendarView = 'year';
        this.lists = this.getDays('month');
        break;
      default:
        if (!this.selectedDay) {
          this.selectedDay = moment();
        }
        this.selectedDayName = this.selectedDay.format('dddd DD/MM/YYYY');
        this.lists = [{
          appointments: this.getAppointments(this.selectedDay),
          date: this.selectedDay,
          name: this.selectedDayName,
        }];
        break;
    }
    this.loading = false;
  }

  getDays(period) {
    let start;
    let end;
    if (period === 'month') {
      start = moment().month(this.selectedMonth).startOf(period);
      end = moment().month(this.selectedMonth).endOf(period);
    } else {
      start = moment().startOf(period);
      end = moment().endOf(period);
    }
    let day = start;
    const days = [];
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
