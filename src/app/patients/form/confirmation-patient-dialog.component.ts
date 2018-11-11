import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmation-patient-dialog',
  templateUrl: 'confirmation-patient-dialog.html',
})
export class ConfirmationPatientDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmationPatientDialogComponent>) {}

}
