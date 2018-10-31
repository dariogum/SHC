import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'confirmation-user-dialog',
  templateUrl: 'confirmation-user-dialog.html',
})
export class ConfirmationUserDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmationUserDialogComponent>) {}

}