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
    this.schedulesService.createAppointment(this.data.selectedSchedule, this.data.appointment)
      .subscribe(appointment => {
        this.bottomSheetRef.dismiss();
        const snackBarRef = this.snackBar.open('El turno fue asignado correctamente', 'OK', {
          duration: 2500,
        });
      });
  }

  updateAppointment(event) {
    let controlName: string;
    if (event.value !== undefined && event.source) {
      controlName = event.source.ngControl.name;
    } else if (event.value !== undefined) {
      controlName = event.targetElement.name;
    } else {
      controlName = event.target.name;
    }
    const isDataControl = this.appointmentDataForm.controls[controlName] &&
      !this.appointmentDataForm.controls[controlName].pristine;
    if (isDataControl) {
      this.schedulesService.updateAppointment(this.data.appointment).subscribe();
    }
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
