import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

}
