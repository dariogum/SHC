import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Patient } from './../../classes/patient';
import { Router, NavigationExtras } from '@angular/router';
import { PatientService } from './../patient.service';

@Component({
  selector: 'new-patient-dialog',
  templateUrl: 'new-patient-dialog.html',
})
export class NewPatientDialogComponent {

	patient: Patient = new Patient();

  constructor(public dialogRef: MatDialogRef<NewPatientDialogComponent>, private router: Router, private patientService: PatientService) {}

  addPacient() {
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