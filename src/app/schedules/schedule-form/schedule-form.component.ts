import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgForm, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { HourPickerComponent } from './../../hour-picker/hour-picker.component';
import { SchedulesService } from './../schedules.service';
import { Schedule } from './../../classes/schedule';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {

  filteredProfessionals;
  screenType = 'wide';
  professionals;
  schedule: Schedule;
  @ViewChild('scheduleDataForm') public scheduleDataForm: NgForm;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private schedulesService: SchedulesService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
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

    this.getProfessionals();
    this.getSchedule();
  }

  getSchedule(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.schedulesService.getSchedule(id)
      .subscribe(schedule => this.schedule = schedule);
  }

  getProfessionals() {
    this.professionals = this.schedulesService.getProfessionals();
  }

  updateSchedule(event) {
    let controlName: string;
    if (event.value !== undefined && event.source) {
      controlName = event.source.ngControl.name;
    } else if (event.value !== undefined) {
      controlName = event.targetElement.name;
    } else {
      controlName = event.target.name;
    }
    const isDataControl = this.scheduleDataForm.controls[controlName] &&
      !this.scheduleDataForm.controls[controlName].pristine;
    if (isDataControl) {
      this.schedulesService.updateSchedule(this.schedule).subscribe();
    }
  }

  displayFn(schedule?: Schedule): string | undefined {
    return schedule ? schedule.name : undefined;
  }

  addHour(day) {
    day.hours.push({
      start: null,
      end: null
    });
  }

  removeHour(day, hour) {
    day.hours = day.hours.filter(filteredHour => filteredHour !== hour);
  }

  applyHoursToAllDays(days, hours) {
    for (let i = days.length - 1; i >= 0; i--) {
      days[i].hours = hours;
    }
  }

  compareDates(a, b) {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  }

  selectDay(event) {
    for (let i = this.schedule.selectedDays.length - 1; i >= 0; i--) {
      if (this.schedule.selectedDays[i].date.format('YYYYMMDD') === event.value.format('YYYYMMDD')) {
        return false;
      }
    }
    this.schedule.selectedDays.push(
      {
        date: event.value,
        name: event.value.format('dddd DD/MM/YYYY'),
        active: true,
        hours: []
      }
    );
    this.schedule.selectedDays.sort(this.compareDates);
  }

  removeDay(day) {
    this.schedule.selectedDays = this.schedule.selectedDays.filter(filteredDay => filteredDay !== day);
  }

  deleteSchedule() {
    this.schedulesService.deleteSchedule(this.schedule.id).subscribe(confirmation => {
      const snackBarRef = this.snackBar.open('Agenda eliminada correctamente', 'OK', {
        duration: 2500,
      });
      this.router.navigate(['schedules']);
    });
  }

}
