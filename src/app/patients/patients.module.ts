import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatListModule, MatCardModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatMenuModule, MatExpansionModule, MatCheckboxModule, MatDialogModule, MatStepperModule, MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';

import { PatientsRoutingModule } from './patients-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { NewPatientDialogComponent } from './list/new-patient-dialog.component';
import { ConfirmationDialogComponent } from './form/confirmation-dialog.component';
import { ConfirmationPatientDialogComponent } from './form/confirmation-patient-dialog.component';
import { AgePipe, AgeUpPipe } from './age.pipe';

@NgModule({
  imports: [
    CommonModule,
    PatientsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatMenuModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatDialogModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  declarations: [
    ListComponent,
    FormComponent,
    AgePipe,
    AgeUpPipe,
    NewPatientDialogComponent,
    ConfirmationDialogComponent,
    ConfirmationPatientDialogComponent
  ],
  entryComponents: [
    NewPatientDialogComponent,
    ConfirmationDialogComponent,
    ConfirmationPatientDialogComponent
  ]
})
export class PatientsModule { }
