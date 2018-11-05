import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';

import { Patient } from './../../classes/patient';
import { PatientService } from './../patient.service';

@Component({
  selector: 'new-patient-dialog',
  templateUrl: 'new-patient-dialog.html',
})
export class NewPatientDialogComponent {

	patient: Patient = new Patient();

  constructor(
    public dialogRef: MatDialogRef<NewPatientDialogComponent>,
    private patientService: PatientService,
    private router: Router,
  ) { }

  addPatient() {
    this.patientService.addPatient(this.patient)
      .subscribe(patient => {
        this.dialogRef.close();
        let navigationExtras: NavigationExtras = {
          queryParams: { 'newPatient': true }
        };
        this.router.navigate(['patients/' + patient.id], navigationExtras);
      }
      );
  }

}