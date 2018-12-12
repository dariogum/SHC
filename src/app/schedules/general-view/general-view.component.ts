import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatBottomSheet } from '@angular/material';
import { MatDatepicker } from '@angular/material/datepicker';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, filter, tap } from 'rxjs/operators';

import { ConfigService } from './../../auth/config.service';
import { AppointmentFormComponent } from './../appointment-form/appointment-form.component';
import { Patient } from './../../classes/patient';
import { PatientService } from './../../patients/patient.service';
import { Schedule } from './../../classes/schedule';
import { SchedulesService } from './../schedules.service';
import { User } from './../../classes/user';
import { UserService } from './../../users/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.css']
})
export class GeneralViewComponent implements OnInit {

  currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
  day;
  loading = false;
  loadingSchedules = true;
  monthName;
  patients: Observable<Patient[]>;
  professionals: Observable<User[]>;
  selectedPatient: Patient;
  screenType = 'wide';
  schedules: Schedule[];
  searchPatientsTerms = new Subject<string>();
  searchProfessionalsTerms = new Subject<string>();
  selectedProfessional: User;
  selectedSchedule: Schedule;
  startView = 'month';
  userRole: string;
  view = 'daily';
  withoutFilters = true;

  @ViewChild('patientSearchBox') patientSearchBox: ElementRef;
  @ViewChild('professionalSearchBox') professionalSearchBox: ElementRef;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private bottomSheet: MatBottomSheet,
    private configService: ConfigService,
    private patientService: PatientService,
    private schedulesService: SchedulesService,
    private userService: UserService,
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

    this.readSchedules();

    this.day = moment();

    this.patients = this.searchPatientsTerms.pipe(
      debounceTime(300),
      filter(term => term.length > 2),
      distinctUntilChanged(),
      switchMap((term: string) => this.patientService.searchPatients(term)),
    );

    this.professionals = this.searchProfessionalsTerms.pipe(
      debounceTime(300),
      filter(term => term.length > 2),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchUsers(term)),
    );
  }

  openBottomSheet(appointment): void {
    this.bottomSheet.open(AppointmentFormComponent, {
      data: {
        selectedSchedule: this.selectedSchedule,
        appointment: appointment,
      },
    });
  }

  changeView(event, dayPicker) {
    let firstDay;
    let lastDay;
    switch (this.view) {
      case 'weekly':
        this.startView = 'month';
        firstDay = this.day.clone().startOf('week');
        lastDay = this.day.clone().endOf('week');
        break;
      case 'monthly':
        if (dayPicker) { dayPicker.close(); }
        if (event) { this.day = event; }
        this.startView = 'year';
        firstDay = this.day.clone().startOf('month');
        lastDay = this.day.clone().endOf('month');
        this.monthName = this.day.clone().format('MMMM');
        break;
      default:
        this.startView = 'month';
        firstDay = this.day.clone();
        lastDay = this.day.clone();
        break;
    }
    if (this.selectedSchedule) {
      this.loading = true;
      this.readScheduleDays(firstDay, lastDay);
    }
  }

  readSchedules() {
    return this.schedulesService.readSchedules().subscribe(schedules => {
      this.schedules = schedules;
      if (this.schedules.length === 1) {
        this.selectedSchedule = this.schedules[0];
        this.changeView(false, false);
      }
      this.loadingSchedules = false;
    });
  }

  readScheduleDays(firstDay, lastDay) {
    this.selectedSchedule.days = [];
    return this.schedulesService.readScheduleDays(this.selectedSchedule.id, firstDay, lastDay)
      .subscribe(days => {
        this.selectedSchedule.days = days;
        this.loading = false;
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
      this.filterAppointmentsByPatient();
    }
  }

  filterAppointmentsByPatient() {
    this.withoutFilters = false;
    for (const day of this.selectedSchedule.days) {
      day.filteredAppointments = day.appointments.filter(appointment => {
        return (appointment.patient && appointment.patient.id === this.selectedPatient.id);
      });
    }
  }

  displayUserFn(professional?: User): string | undefined {
    return professional ? professional.lastname + ' ' + professional.name : undefined;
  }

  searchProfessionals(term) {
    if (typeof (term) === 'string') {
      this.withoutFilters = true;
      this.searchProfessionalsTerms.next(term);
    } else {
      this.filterAppointmentsByProfessionals();
    }
  }

  filterAppointmentsByProfessionals() {
    this.withoutFilters = false;
    for (const day of this.selectedSchedule.days) {
      day.filteredAppointments = day.appointments.filter(appointment => {
        return (appointment.professional && appointment.professional.id === this.selectedProfessional.id);
      });
    }
  }

  clearPatient() {
    this.withoutFilters = true;
    this.patientSearchBox.nativeElement.value = '';
  }

  clearProfessional() {
    this.withoutFilters = true;
    this.professionalSearchBox.nativeElement.value = '';
  }

}
