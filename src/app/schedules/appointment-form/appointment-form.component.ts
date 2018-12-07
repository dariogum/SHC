import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, filter, tap } from 'rxjs/operators';

import { Patient } from './../../classes/patient';
import { PatientService } from './../../patients/patient.service';
import { Schedule } from './../../classes/schedule';
import { SchedulesService } from './../schedules.service';
import * as moment from 'moment';

@Component({
  selector: 'app-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {

  hour = 0;
  minutes = 0;
  patients: Observable<Patient[]>;
  searchPatientsTerms = new Subject<string>();

  @ViewChild('appointmentDataForm') public appointmentDataForm: NgForm;
  @ViewChild('appPatientSearchBox') appPatientSearchBox: ElementRef;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<AppointmentFormComponent>,
    public dialog: MatDialog,
    private patientService: PatientService,
    private schedulesService: SchedulesService,
    public snackBar: MatSnackBar,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.patients = this.searchPatientsTerms.pipe(
      debounceTime(300),
      filter(term => term.length > 2),
      distinctUntilChanged(),
      switchMap((term: string) => this.patientService.searchPatients(term)),
    );
  }

  onSubmit() {
    if (!this.data.appointment.id) {
      this.schedulesService.createAppointment(this.data.selectedSchedule, this.data.appointment)
        .subscribe(appointment => {
          if (appointment.id) {
            this.snackBar.open('El turno fue asignado correctamente', 'OK', {
              duration: 2500,
            });
          }
        });
    } else if (this.data.appointment.id && !this.appointmentDataForm.pristine) {
      this.schedulesService.updateAppointment(this.data.appointment)
        .subscribe(appointment => {
          if (appointment) {
            this.snackBar.open('El turno fue modificado correctamente', 'OK', {
              duration: 2500,
            });
          }
        });
    }
    this.bottomSheetRef.dismiss();
  }

  displayFn(patient?: Patient): string | undefined {
    return patient ? patient.lastname + ' ' + patient.name : undefined;
  }

  searchPatients(term) {
    if (typeof (term) === 'string') {
      this.searchPatientsTerms.next(term);
    }
  }

  clearPatient() {
    this.appPatientSearchBox.nativeElement.value = '';
  }

}
