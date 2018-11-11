import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-image-dialog',
  templateUrl: 'image-dialog.html',
})
export class ImageDialogComponent {

  constructor(public dialogRef: MatDialogRef<ImageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

}
