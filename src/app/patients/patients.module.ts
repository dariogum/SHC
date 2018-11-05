import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatStepperModule,
    MatToolbarModule,
} from '@angular/material';

import { AgePipe, AgeUpPipe } from './age.pipe';
import { FormComponent } from './form/form.component';
import { ConfirmationPatientDialogComponent } from './form/confirmation-patient-dialog.component';
import { ListComponent } from './list/list.component';
import { NewPatientDialogComponent } from './list/new-patient-dialog.component';
import { PatientsRoutingModule } from './patients-routing.module';
import { ConfirmationDialogComponent } from './visits/confirmation-dialog.component';
import { ImageDialogComponent } from './visits/image-dialog.component';
import { VisitsComponent } from './visits/visits.component';

@NgModule({
  imports: [
    CommonModule,
    PatientsRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
  ],
  declarations: [
    AgePipe,
    AgeUpPipe,
    ConfirmationDialogComponent,
    ConfirmationPatientDialogComponent,
    FormComponent,
    ImageDialogComponent,
    ListComponent,
    NewPatientDialogComponent,
    VisitsComponent
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    ConfirmationPatientDialogComponent,
    ImageDialogComponent,
    NewPatientDialogComponent,
  ]
})
export class PatientsModule { }
