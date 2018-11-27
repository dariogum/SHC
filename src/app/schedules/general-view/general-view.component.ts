import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatBottomSheet } from '@angular/material';
import { MatDatepicker } from '@angular/material/datepicker';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, filter, tap } from 'rxjs/operators';

import { ConfigService } from './../../auth/config.service';
import { Appointment } from './../../classes/appointment';
import { AppointmentFormComponent } from './../appointment-form/appointment-form.component';
import { Patient } from './../../classes/patient';
import { PatientService } from './../../patients/patient.service';
import { Schedule } from './../../classes/schedule';
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
  selectedPatient: Patient;
  patients: Observable<Patient[]>;
  screenType = 'wide';
  schedules: Schedule[];
  searchPatientsTerms = new Subject<string>();
  selectedSchedules = [];
  startView = 'month';
  userRole: string;
  view = 'daily';
  withoutFilters = true;

  @ViewChild('patientSearchBox') patientSearchBox: ElementRef;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private bottomSheet: MatBottomSheet,
    private configService: ConfigService,
    private patientService: PatientService,
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

    this.patients = this.searchPatientsTerms.pipe(
      debounceTime(300),
      filter(term => term.length > 2),
      distinctUntilChanged(),
      switchMap((term: string) => this.patientService.searchPatients(term)),
    );
  }

  openBottomSheet(appointment): void {
    this.bottomSheet.open(AppointmentFormComponent, {
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
        this.monthName = this.day.clone().format('MMMM')
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
    this.schedulesService.getValidSchedules(this.view, this.day.clone()).subscribe(schedules => {
      this.schedules = schedules;
      while (firstDay <= lastDay) {
        let day = {
          appointments: this.schedulesService.getAppointments(firstDay, this.schedules, this.selectedSchedules),
          date: firstDay.clone(),
          name: firstDay.clone().format('ddd DD/MM/YYYY'),
        };
        this.days.push(day);
        firstDay = firstDay.add(1, 'd');
      }
    });
  }

  displayFn(patient?: Patient): string | undefined {
    return patient ? patient.lastname + ' ' + patient.name : undefined;
  }

  searchPatients(term) {
    if (typeof (term) === 'string') {
      this.withoutFilters = true;
      this.searchPatientsTerms.next(term);
    } else {
      this.filterAppointmentsByPatient(term);
    }
  }

  filterAppointmentsByPatient(patient) {
    this.withoutFilters = false;
    for (let day of this.days) {
      day.filteredAppointments = day.appointments.map(appointments => {
        let ap = appointments.filter(appointment => appointment.patient === patient);
        return (ap.length > 0) ? ap[0] : null;
      });
    }
  }

  clearPatient() {
    this.withoutFilters = true;
    this.patientSearchBox.nativeElement.value = '';
  }
}
